import React, { Component } from "react";
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import {Container, H1, H3, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetBizProduct from '~/Main/Functions/GetBizProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class ListBusinessProductType extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getBizProduct();
    }

    // 등록된 사업장 제품 조회
    _getBizProduct = () => {
        GetBizProduct(this.props.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._getBizProduct).then(async resultData => {
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
            <Container style={styles.containerSwiper}>
                <CustomHeader/>

                <View style={styles.contentWrap}>
                    <View style={styles.fxDirRow}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                            <Text style={stylesReg.leftGuideTxt}>수리가</Text>
                            <Text style={stylesReg.leftGuideTxt}>필요한것을</Text>
                            <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                        </View>
                    </View>
                    
                    <View style={styles.fx3}>
                        <View style={[styles.fx1, styles.justiConCenter]}>
                            <View style={{backgroundColor : color.defaultColor, height : 5, marginRight : 26}}/>
                        </View>
                        <View style={styles.fx5}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            {this.state.data.map((product, idx) => 
                                <TouchableOpacity 
                                    key={idx} 
                                    onPress={ () => Actions.AfterServiceApplyProduct({ 
                                        clientPrdId : product.clientPrdId,
                                        clientPrdNm : product.clientPrdNm
                                    }) }
                                    style={[styles.mr7, styles.pd10, styles.alignItemsCenter, {backgroundColor : color.defaultColor, width : productCardSize}]}
                                >
                                    <View style={[styles.fx1, styles.justiConCenter]}>
                                        <H1 style={{color : color.whiteColor}}> 
                                            { pad(++idx, 2) }
                                        </H1>
                                    </View>
                                    <View style={[styles.fx3, styles.justiConCenter]}>
                                        <Image 
                                            source={{ uri: product.prdTypeImg.fileUrl }} 
                                            style={{height : productCardSize - 20, width : productCardSize - 20}} />
                                    </View>
                                    <View style={[styles.fx2, styles.justiConCenter, styles.alignItemsCenter]}>
                                        <H3 style={[styles.mb10, {color : color.whiteColor}]}>{product.clientPrdNm}</H3>
                                        <Text style={styles.whiteFont}>짧은 설명에 대해</Text>
                                        <Text style={styles.whiteFont}>20자 내로 작성</Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            </ScrollView>
                        </View>
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
  
const productCardSize = wp(40, 20);

export default ListBusinessProductType;