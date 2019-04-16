import React, { Component } from "react";
import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, H1, H3, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import GetProdType from '~/Main/Functions/GetProdType';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const SLIDER_1_FIRST_ITEM = 0;

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data : [],
          slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    componentDidMount() {
        this._drawProductType();
        BackHandler.addEventListener('hardwareBackPress', () => Actions.ListBusinessPlace()) // Listen for the hardware back button on Android to be pressed
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => Actions.ListBusinessPlace()) // Remove listener
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity 
                key={index} 
                onPress={this._nextButton(item.prdTypeId, item.prdTypeKoNm)}
                style={[styles.pd15, {backgroundColor : color.defaultColor, height : '80%'}]}
            >
                <View style={styles.fx1}>
                    <H1 style={{color : color.whiteColor}}>{ item.prdTypeKoNm }</H1>
                </View>
                <View style={[styles.fx2, styles.fxDirRow]}>
        
                    <View style={[styles.fx1, styles.justiConEnd]}>
                        <H1 style={{color : color.whiteColor}}>
                            { pad(++index, 2) }
                        </H1>
                    </View>
                    <View style={[styles.fx2, styles.justiConEnd, styles.alignItemsEnd]}>
                        <Image source={{uri : (item.image.fileUrl) ? item.image.fileUrl : 'insert404'}} style={{height : itemWidth/2, width : itemWidth/2}} />
                    </View>
        
                </View>
           </TouchableOpacity>
        );
    }

    // 제품 타입 선택
    _nextButton = (prodTypeId, prodTypeNm, prodFileUrl) => () => {
        Actions.InputShowCase({
            prodTypeId : prodTypeId,
            prodTypeNm : prodTypeNm,
            prodFileUrl : prodFileUrl
        })
    }

    // 제품 타입 조회
    _drawProductType = () => {
        GetProdType().then(result => {
            GetCommonData(result, this._drawProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data});
                    } else {
                        alert(resultData.resultMsg)
                    }
                }
            });
        });
    }

    render() {
        return (
            <Container style={styles.containerScroll}>
                <CustomHeader/>

                <View style={styles.contentWrap}>
                    <View style={{marginBottom: 21}}>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>등록할</Text>
                                <Text style={stylesReg.leftGuideTxt}>제품종류를</Text>
                                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.fxDirRow, styles.justiConBetween, styles.fxWraWra]}>
                        {this.state.data.map((item, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={this._nextButton(item.prdTypeId, item.prdTypeKoNm, item.image.fileUrl)}
                            >
                                <View 
                                style={[
                                    styles.mb15, 
                                    styles.pd10,
                                    styles.alignItemsCenter,
                                    styles.justiConCenter,
                                    { 
                                    backgroundColor : color.defaultColor, 
                                    height : productCardSize, 
                                    width : productCardSize
                                }]}>
                                <Image source={{uri : (item.image.fileUrl) ? item.image.fileUrl : 'insert404'}} 
                                    style={[styles.mb10, {
                                    height : productCardSize - 60, 
                                    width : productCardSize - 60
                                    }]}/>
                                <Text style={localStyles.whiteFont}>{item.prdTypeKoNm}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        </View>
                    </ScrollView>
                    
                </View>
                
      </Container>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}
const productCardSize = wp(47.5, (styles.containerInnerPd.paddingLeft * 2));

const localStyles = StyleSheet.create({
  whiteFont: {
    color: color.whiteColor,
    fontSize: 16,
    fontWeight: "500"
  }
});


export default InputProdType;