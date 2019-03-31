import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

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
            <Container style={styles.containerInnerPd}>
                <CustomHeader/>

                <View style={styles.contentWrap}>

                    <View style={{marginBottom: 36}}>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>수리가</Text>
                                <Text style={stylesReg.leftGuideTxt}>필요한제품</Text>
                                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={localStyles.myPrdListWrap}>
                            {this.state.data.map((product, idx) => 
                                <TouchableOpacity 
                                    key={idx} 
                                    onPress={ () => Actions.AfterServiceApplyProduct({ 
                                        clientPrdId : product.clientPrdId,
                                        clientPrdNm : product.clientPrdNm
                                    }) }
                                >

                                    <View style={localStyles.myPrdBoxWrap}>
                                        <Text style={localStyles.myPrdNumTxt}>{ pad(++idx, 2) }</Text>
                            
                                        <View style={localStyles.myPrdImgWrap}>
                                            <Image source={{ uri: product.prdTypeImg.fileUrl }} style={localStyles.myPrdImg} />
                                        </View>
                            
                                        <View style={localStyles.myPrdInfoTxtWrap}>
                                            <Text style={localStyles.myPrdNameTxt} numberOfLines={1}>{product.clientPrdNm}</Text>
                                            <Text style={localStyles.myPrdDscTxt}>{product.clientPrdDsc}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                             )}
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
  
  const productCardSize = wp(48, 52);
  
  const localStyles = StyleSheet.create({
    myPrdBoxWrap: {
      alignItems: "center",
      backgroundColor : color.defaultColor,
      width : productCardSize,
      height: 280,
      marginBottom: 10
    },
    myPrdNumTxt: {
      color : color.whiteColor,
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 14
    },
    myPrdImgWrap: {
      marginBottom: 14
    },
    myPrdImg: {
      height: 100,
      width: 100
    },
    myPrdInfoTxtWrap: {
      justifyContent: "center",
      alignItems: "center"
    },
    myPrdNameTxt: {
      marginBottom: 10,
      color : color.whiteColor,
      fontSize: 16,
      fontWeight: "bold",
      paddingLeft: 10,
      paddingRight: 10
    },
    myPrdDscTxt: {
      color: color.whiteColor,
      fontSize: 13,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: "center",
      height: 45
    },
    myPrdListWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      flexWrap: "wrap"
    }
  });

export default ListBusinessProductType;