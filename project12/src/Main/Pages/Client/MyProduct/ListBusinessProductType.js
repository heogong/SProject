import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetBizProductTypeList from '~/Main/Functions/GetBizProductTypeList'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class ListBusinessProductType extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [],
        slider1ActiveSlide: 0
      };
    }

    static defaultProps = {
        bizId : 1 // test
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
    
    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader/>
                <View style={styles.contentWrap}>

                    <View style={{marginBottom: 36}}>

                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>조회할</Text>
                                <Text style={stylesReg.leftGuideTxt}>제품종류를</Text>
                                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                            </View>
                            <View style={stylesReg.rightStepNumWrap}>
                                <Text style={stylesReg.rightStepNum}></Text>
                            </View>
                        </View>
                    
                        <View style={stylesReg.procBarWrap}>
                            {/* <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View> */}
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[styles.fxDirRow, styles.justiConBetween, styles.fxWraWra]}>

                        {this.state.data.map((item, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={ () => Actions.AfterServiceProdList({
                                    bizId : this.props.bizId,
                                    prodTypeId : item.prdTypeId
                                }) }
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
                                    <Image source={{ uri: item.prdTypeImg.fileUrl }}
                                        style={[styles.mb10, {
                                            height : productCardSize - 60, 
                                            width : productCardSize - 60
                                        }]}
                                    />
                                    <Text style={localStyles.whiteFont}>{ item.prdType.prdTypeKoNm }</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        </View>
                    </ScrollView>

                    <View style={styles.footerBtnWra}>
                        <CustomButton 
                            onPress={Actions.MyRegBusinessProdType}
                            DefaultLineBtn={true}
                        >
                            제품 추가하기
                        </CustomButton>
                    </View>
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

export default ListBusinessProductType;