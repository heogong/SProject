import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetBizProduct from '~/Main/Functions/GetBizProduct'
import DelProductMst from '~/Main/Functions/DelProductMst'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

const LEAST_COUNT = 1; // 사업장 정보 최소 카운트
let SELECT_IDX = null // 제품 INDEX
class ListBusinessProductType extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [],
        isModalVisible : false, // confirm modal
        isAlertModal : false, // alert modal
        resultMsg : null,
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
                      this.setState({
                        isAlertModal : true,
                        resultMsg : resultData.resultMsg
                      })
                    }
                }
            });
        });
    }

    // 고객 제품 삭제
    _delProductMst = () => {
      const { data } = this.state;

      DelProductMst(data[SELECT_IDX].clientPrdId).then(result => {
          GetCommonData(result, this._delProductMst).then(async resultData => {
              if(resultData !== undefined) {
                  const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                  console.log(resultData);
                  if(ResultBool) {
                      this.setState({ 
                        data: data.filter((s, sidx) => SELECT_IDX !== sidx),
                        isModalVisible : false
                      })
                  } else {
                    this.setState({
                      isAlertModal : true,
                      resultMsg : resultData.resultMsg
                    })
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
                                <Text style={stylesReg.leftGuideTxt}>제품을</Text>
                                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={localStyles.myPrdListWrap}>
                            {this.state.data.map((product, idx) => 
                                <TouchableOpacity 
                                    key={idx} 
                                    onPress={ () => Actions.MyEditProdShowCase({ 
                                        bizId : product.clientBplaceId,
                                        clientPrdId : product.clientPrdId,
                                        number : idx
                                    }) }
                                >
                                <View style={localStyles.myPrdBoxWrap}>
                                {(this.state.data.length > LEAST_COUNT) ? (
                                    <TouchableOpacity 
                                      onPress={ () => { 
                                        this.setState({isModalVisible : true}),
                                        SELECT_IDX = idx
                                      }} 
                                      style={localStyles.closeIconWrap}
                                    >
                                        <Image source={require('~/Common/Image/card_delete_2.png')} resizeMode="contain" style={localStyles.closeIconImg}/>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={[localStyles.closeIconWrap, localStyles.closeIconImg]}/>
                                )}

                                    <Text style={localStyles.myPrdNumTxt}>{ pad(++idx, 2) }</Text>

                                    <View style={localStyles.myPrdImgWrap}>
                                        <Image source={{ uri: product.prdTypeImg.fileUrl }} style={localStyles.myPrdImg} />
                                    </View>

                                    <View style={localStyles.myPrdInfoTxtWrap}>
                                        <Text style={localStyles.myPrdNameTxt}>{product.clientPrdNm}</Text>
                                        <Text style={localStyles.myPrdDscTxt}>짧은 설명에 대해 짧은 설명에 대해 짧은 설명에 대해</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                             )}
                        </View>
                    </ScrollView>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={() => this.setState({isModalVisible : false})}
                    onPress2={this._delProductMst}
                    infoText1={"등록하신 제품 정보를 삭제할까요?"}
                    infoText2={null}
                    btnText1="아니오"
                    btnText2="네"
                />

                {/* alert 메세지 모달 */}
                <CustomModal
                    modalType="ALERT"
                    isVisible={this.state.isAlertModal}
                    onPress={ () => this.setState({isAlertModal : false})}
                    infoText={this.state.resultMsg}
                    btnText="확인"
                />
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
      marginBottom: 10
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
      fontWeight: "bold"
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
    },
    closeIconImg: {
      width: 24,
      height: 24
    },
    closeIconWrap: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginTop: 10
    }
  });

export default ListBusinessProductType;