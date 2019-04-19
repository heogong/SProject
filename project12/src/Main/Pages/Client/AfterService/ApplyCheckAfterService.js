import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import Spinner from 'react-native-loading-spinner-overlay';

import GetProduct from '~/Main/Functions/GetProduct'
import GetAfterServiceApplyInfo from '~/Main/Functions/GetAfterServiceApplyInfo'
import GetCommonData from '~/Common/Functions/GetCommonData';
import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import RegAfterService from '~/Main/Functions/RegAfterService';
import PaymentAfterService from '~/Main/Functions/PaymentAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

let SELECT_INDEX = null; // 카드 선택 index

class ApplyCheckAfterService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            bplace : {
                bplaceNm : null,
                addr : {
                    addressName : null
                },
                detail : {
                    detailAddr1 : null
                }
            },
            prdTypeImg : {
                fileUrl : null
            },
            images : [] // 제품 이미지 데이터
        }, // 제품 데이터
        asRecvDsc : null,
        isAlertModal : false, // alert 용
        resultMsg : null, // alert 용
        isModalVisible : false,
        spinner : false,
      };
    }

    componentWillMount() {
        // this._getProduct();
        //this._getListCard();
        this._getAsRecvInfo();
    }

    // AS 접수 정보 조회
    _getAsRecvInfo = () => {
        GetAfterServiceApplyInfo(this.props.asRecvId).then(result => {
            GetCommonData(result, this._getAsRecvInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data,
                        });
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

    // AS 결제 요청
    _paymentAfterService = () => {

        this.setState({isModalVisible : false});
        this.setState({spinner : true}); // 로딩 모달 시작

        PaymentAfterService(this.props.billingKeyId, this.props.asRecvId).then(result => {
            GetCommonData(result, this._paymentAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({spinner : false});
                        Actions.AfterServiceApplyProductComplete({
                            asRecvId : this.props.asRecvId
                        })
                    } else {
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg,
                            spinner : false
                        })
                    }
                }
            });
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'A/S 출장비 결제중입니다.'}
                    textStyle={styles.whiteFont}
                    style={{color: color.whiteColor}}
                />
                <View style={{
                    paddingLeft : styles.containerInnerPd.paddingLeft,
                    paddingRight : styles.containerInnerPd.paddingRight
                }}>
                    <CustomHeader title="A/S신청내역"/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={localStyles.contentWrap}>
                        <View style={localStyles.titleWrap}>
                        <Image source={{uri : (this.state.data.prdTypeImgUrl) ? this.state.data.prdTypeImgUrl : 'insert404'}} style={localStyles.titleImg}/>
                        <Text style={localStyles.titleNameTxt}>{this.state.data.bplaceNm}</Text>
                        <Text style={localStyles.subNameTxt}>{this.state.data.clientPrdNm}</Text>
                        </View>

                        <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                        <Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

                        <Text style={localStyles.histBoxSubTitleTxt}>{this.state.data.clientPrdNm}</Text>
                        <Text style={localStyles.histBoxInfoTxt}>
                            {
                                this.state.data.bplaceAddrRoad == "" && this.props.state.bplaceAddrRoad == null 
                                ? this.state.data.bplaceAddr
                                : this.state.data.bplaceAddrRoad
                            } {this.state.data.bplaceAddrDtl}
                        </Text>
                        
                        <Text style={localStyles.histBoxSubTitleTxt}>A/S 증상</Text>
                        <Text style={localStyles.histBoxInfoTxt}>{this.state.data.asItemNm}</Text>

                        <Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
                        <Text style={localStyles.histBoxInfoTxt}>{this.state.data.asRecvDsc}</Text>

                        <Text style={localStyles.histBoxSubTitleTxt}>{this.state.data.orderNm}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={localStyles.histBoxInfoTxt}>공급가액</Text>
                            <Text style={localStyles.histBoxInfoTxt}>￦{this.state.data.valueAmount}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingBottom: 5}}>
                            <Text style={localStyles.histBoxInfoTxt}>부가세</Text>
                            <Text style={localStyles.histBoxInfoTxt}>￦{this.state.data.texAmount}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderColor: "#c9cacb", paddingTop: 5}}>
                            <Text style={localStyles.histBoxInfoTxt}>결제금액</Text>
                            <Text style={[localStyles.histBoxInfoTxt, {color: color.defaultColor}]}>￦{this.state.data.totalAmount}</Text>
                        </View>
                        </View>

                    </View>
                
                </ScrollView>

                <View style={[styles.footerBtnWrap, {borderTopWidth: 1, borderColor: "#c9cacb", paddingLeft: 26, paddingRight: 26, paddingBottom: 26, paddingTop: 10}]}>
                    <View style={styles.mb10}>
                        <Text style={localStyles.bottomTxt}>입력하신 사항이 정확한가요?</Text>
                        <Text style={localStyles.bottomTxt}>매칭이 시작되면 출장비가 결제되니 꼼꼼하게 살펴주세요.</Text>
                    </View>

                    <CustomButton 
                        onPress={ ()=> this.setState({isModalVisible : true}) }
                        disabled={this.state.disabledBtn}
                        edgeFill={true}
                        fillTxt={true}
                    >
                        A/S 업체 매칭시작
                    </CustomButton>

                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={ () => this.setState({isModalVisible : false}) }
                    onPress2={this._paymentAfterService}
                    infoText1="입력하신 사항이 정확한가요?"
                    infoText2="확정하신경우 출장비가 결제됩니다."
                    btnText1="취소"
                    btnText2="확인"
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
  

const localStyles = StyleSheet.create({
    titleWrap: {
      alignItems : 'center'
    },
    titleImg: {
      width: 80,
      height: 80,
      marginTop: -40
    },
    boxTitleWrap: {
      marginBottom: 20,
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25
    },
    boxTitleTxt: {
      flex: 1,
      fontSize: 18,
      color : color.whiteColor,
      fontWeight: "bold"
    },
    contentWrap: {
      paddingLeft: 26,
      paddingRight: 26,
      marginTop: 40,
      paddingBottom: 26,
      backgroundColor: color.defaultColor,
    },
    titleNameTxt: {
      marginTop: 14,
      fontSize: 18,
      fontWeight: "bold",
      color: color.whiteColor
    },
    subNameTxt: {
      marginTop: 7,
      marginBottom: 30,
      fontSize: 14,
      fontWeight: "bold",
      color: color.whiteColor
    },
    histBoxWrap: {
      backgroundColor: color.whiteColor,
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 24,
      paddingRight: 24
    },
    histBoxTitleTxt: {
      color:'#28c8f5',
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 6
    },
    histBoxSubTitleTxt: {
      fontSize: 15,
      color: "#1e1e32",
      fontWeight: "bold",
      marginBottom: 10,
      marginTop: 20
    },
    histBoxInfoTxt: {
      fontSize: 13,
      color: "#8e8e98",
      lineHeight: 20
    },
    bottomTxt: {
      fontSize: 14, color: "#8e8e98", textAlign: "center"
    }
  });

export default ApplyCheckAfterService;