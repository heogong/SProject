import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, H1} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Actions } from 'react-native-router-flux';
import GetBizProductTypeList from '~/Main/Functions/GetBizProductTypeList'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

const SLIDER_1_FIRST_ITEM = 0;

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class ListBusinessProductType extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [],
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM
      };
    }

    componentDidMount() {
        this._getBizProductTypeList();
    }

    // 등록된 사업장 제품 타입 조회
    _getBizProductTypeList = () => {
        GetBizProductTypeList(this.props.bizId).then(result => {
            GetCommonData(result, this._getBizProductTypeList).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data: resultData.data });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }
    
    _renderItem = ({item, index}) => (
        // <TouchableOpacity onPress={ () => this._nextButton(item.prdTypeId) }>
        <TouchableOpacity 
            onPress={ () => Actions.AfterServiceProdList({
                bizId : this.props.bizId,
                prodTypeId : item.prdTypeId
            }) }
        >
            <View style={[styles.pd15, {backgroundColor : color.defaultColor, height : '100%'}]}>
                <View style={styles.fx1}>
                <H1 style={{color : color.whiteColor}}>{ item.prdType.prdTypeKoNm }</H1>
                </View>
                <View style={[styles.fx2, styles.fxDirRow]}>
        
                <View style={[styles.fx1, styles.justiConEnd]}>
                    <H1 style={{color : color.whiteColor}}>
                    { pad(++index, 2) }
                    </H1>
                </View>
                <View style={[styles.fx2, styles.justiConEnd, styles.alignItemsEnd]}>
                    <Image source={{ uri: item.prdTypeImg.fileUrl }} style={{height : itemWidth/2, width : itemWidth/2}} />
                </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader/>
                <View style={styles.fx1}>
                    <View style={[styles.fx1]}>
                        <H1>신청할</H1>
                        <H1>제품종류를</H1>
                        <H1>선택해주세요</H1>
                    </View>

                    <View style={styles.fx3}>
                        <View style={[styles.fx1, styles.alignItemsStart, styles.justiConStart]}>
                        <Pagination
                            dotsLength={this.state.data.length}
                            activeDotIndex={this.state.slider1ActiveSlide}
                            containerStyle={localStyles.paginationContainer}
                            dotColor={color.defaultColor}
                            dotStyle={localStyles.paginationDot}
                            inactiveDotColor={color.defaultColor}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                        />
                        </View>

                        <View style={styles.fx5}>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            renderItem={this._renderItem}
                            sliderWidth={viewportWidth}
                            activeSlideAlignment={'start'}
                            itemWidth={itemWidth}
                            data={this.state.data}
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        />
                        </View>
                    </View>
                </View>

            </Container>
        )
    }
}

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(65);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;


const localStyles = StyleSheet.create({
    paginationContainer: {
        paddingVertical: 0
    },
    paginationDot: {
        borderRadius: 4,
        marginHorizontal: 0,
        height: 10,
        width: 10
    }
});

export default ListBusinessProductType;