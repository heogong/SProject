import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Root, ActionSheet, Container, Text } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetAfterServiceApplyInfo from '~/Main/Functions/GetAfterServiceApplyInfo'
import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import PaymentAddAfterService from '~/Main/Functions/PaymentAddAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let SELECT_INDEX = null; // 카드 선택 index
let SELECT_INDEX_1 = null; // 할부 선택 index

class AfterServiceAddPayment extends Component {
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
        isModalVisible1 : false,

        selected: false, // 결제 카드 선택 여부
        selected1: false, // 할부 선택 여부
        disabledBtn : true,
        selCardQuota : 0, // 선택한 할부 개월 수(기본 일시불)
        cardData : ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"],
        cardQuotaData : [
            { text : 'CANCLE', icon: "close", iconColor: "#fa213b",  cardQuota: 0 },
            { text : '일시불',  cardQuota: 0 },
            { text : '2개월',  cardQuota: 2 },
            { text : '3개월',  cardQuota: 3 },
            { text : '4개월',  cardQuota: 4 },
            { text : '5개월',  cardQuota: 5 },
            { text : '6개월',  cardQuota: 6 },
            { text : '7개월',  cardQuota: 7 },
            { text : '8개월',  cardQuota: 8 },
            { text : '9개월',  cardQuota: 9 },
            { text : '10개월',  cardQuota: 10 },
            { text : '11개월',  cardQuota: 11 },
            { text : '12개월',  cardQuota: 12 }
        ],
        buttonTitle : '결제카드선택',
        buttonTitle_1 : '할부선택',
        // 카드 할부가 5만원 이상만 가능하므로 아래 여부 검사
        isCardQuota: (this.props.asPrgsMst.totalAmount).replace(/,/gi, "") >= 50000 ? true : false,
        spinner : false
      };
    }

    componentWillMount() {
        this._getAsRecvInfo();
        this._getListCard();
    }

    // AS 접수 정보 조회
    _getAsRecvInfo = () => {
        GetAfterServiceApplyInfo(this.props.asPrgsMst.asRecvId).then(result => {
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

    // 내 결제카드 목록 조회
    _getListCard = () => {
        ListCard().then(result => {
            GetCommonData(result, this._getListCard).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        const newCard = resultData.data.map((card) => {
                            return { ...card, text : `${card.cardName} [ ${card.cardNum} ]`};
                        });

                        this.setState({ cardData: newCard.concat([
                            { text : '카드 등록', icon: "ios-add-circle-outline", iconColor: "#25de5b", billingKeyId : -1 },
                            { text : 'CANCLE', icon: "close", iconColor: "#fa213b", billingKeyId : 0 }
                        ]) });
                    } else {
                        this.setState({
                            isAlertModal1 : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        });
    }

    // 추가 AS 결제 요청
    _paymentAddAfterService = () => {

        this.setState({isModalVisible : false})
        this.setState({spinner : true}); // 로딩 모달 시작

        PaymentAddAfterService(this.state.cardData[SELECT_INDEX].billingKeyId, this.props.asPrgsMst.asPrgsId, this.state.selCardQuota).then(result => {
            GetCommonData(result, this.PaymentAddAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        // 성골 Alert 표시
                        this.setState({
                            isAlertModal1 : true,
                            resultMsg : "결제가 완료되었습니다.",
                            spinner : false
                        })
                    } else {
                        this.setState({
                            isAlertModal1 : true,
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
            <Root>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'추가 A/S 결제중입니다.'}
                    textStyle={styles.whiteFont}
                    style={{color: color.whiteColor}}
                />
                <Container style={styles.container}>
                    <View style={{
                        paddingLeft : styles.containerInnerPd.paddingLeft,
                        paddingRight : styles.containerInnerPd.paddingRight
                    }}>
                        <CustomHeader title="추가 A/S 결제"/>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={localStyles.contentWrap}>
                            <View style={localStyles.titleWrap}>
                                <Image source={{uri : (this.state.data.prdTypeImgUrl) ? this.state.data.prdTypeImgUrl : 'insert404'}} style={localStyles.titleImg}/>
                                <Text style={localStyles.titleNameTxt}>{this.state.data.bplaceNm}</Text>
                                <Text style={localStyles.subNameTxt}>{this.state.data.clientPrdNm}</Text>
                            </View>

                            <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                                <Text style={localStyles.histBoxTitleTxt}>청구비용</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 내역</Text>
                                <Text style={localStyles.histBoxInfoTxt}>{this.props.asPrgsMst.asAddTitle}</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 사유</Text>
                                <Text style={localStyles.histBoxInfoTxt}>{this.props.asPrgsMst.asAddComment}</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 비용({this.props.asPrgsMst.asAddStatNm})</Text>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={localStyles.histBoxInfoTxt}>공급가액</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>￦{this.props.asPrgsMst.valueAmount}</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={localStyles.histBoxInfoTxt}>부가세</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>￦{this.props.asPrgsMst.texAmount}</Text>
                                </View>
                                {this.state.isCardQuota
                                ?
                                    <View style={{paddingBottom: 5, paddingTop: 5}}>
                                        {/* <Text style={localStyles.histBoxInfoTxt}>할부</Text> */}
                                        <CustomButton 
                                            DefaultLineBtn={true}
                                            CustomBtnStyle={{height: 40, marginTop: 10, marginBottom: 0}}
                                            CustomFontStyle={{fontSize: 14}}
                                            onPress={() =>
                                                ActionSheet.show(
                                                    {
                                                        options: this.state.cardQuotaData,
                                                        cancelButtonIndex: this.state.cardQuotaData.length - 1,
                                                        title: this.state.buttonTitle_1
                                                    },
                                                    buttonIndex => {
                                                        const { cardQuotaData, selected } = this.state;

                                                        SELECT_INDEX_1 = buttonIndex;

                                                        if(buttonIndex == 0) {
                                                        // Cancle 을 선택하면
                                                            this.setState({
                                                                disabledBtn : true,
                                                                buttonTitle_1 : '할부선택',
                                                                selected1: false
                                                            })
                                                        } else {

                                                            // state 변경
                                                            this.setState({ 
                                                                selCardQuota: cardQuotaData[buttonIndex].cardQuota,
                                                                selected1: true,
                                                                buttonTitle_1: cardQuotaData[buttonIndex].text,
                                                                disabledBtn : (selected === true) ? false : true // 결제카드가 선택되어 있으면
                                                            });
                                                        }
                                                    })
                                            }
                                        >
                                        {this.state.buttonTitle_1}
                                        </CustomButton>
                                    </View>
                                    :
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingBottom: 5}}>
                                        <Text style={localStyles.histBoxInfoTxt}>할부</Text>
                                        <Text style={localStyles.histBoxInfoTxt}>일시불(5만원 이하)</Text>
                                    </View>
                                }
                                
                                <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderColor: "#c9cacb", paddingTop: 5}}>
                                    <Text style={localStyles.histBoxInfoTxt}>결제금액</Text>
                                    <Text style={[localStyles.histBoxInfoTxt, {color: color.defaultColor}]}>￦{this.props.asPrgsMst.totalAmount}</Text>
                                </View>
                            </View>

                        </View>
                    
                    </ScrollView>

                    <View style={[styles.footerBtnWrap, {borderTopWidth: 1, borderColor: "#c9cacb", paddingLeft: 26, paddingRight: 26, paddingBottom: 26, paddingTop: 10}]}>
                        <CustomButton 
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: this.state.cardData,
                                        cancelButtonIndex: this.state.cardData.length - 1,
                                        title: "결제카드"
                                    },
                                    buttonIndex => {
                                        const { cardData, selected1 } = this.state;
                                        //this.setState({ selectIndex : buttonIndex });
                                        SELECT_INDEX = buttonIndex;

                                        if(cardData[buttonIndex].billingKeyId > 0) {
                                            this.setState({ 
                                                selected: true,
                                                buttonTitle: cardData[buttonIndex].text,
                                                disabledBtn : 
                                                    this.state.isCardQuota
                                                    // 할부가 가능하면
                                                    ? (selected1 === true) ? false : true // 할부 선택 여부를 검사
                                                    // 할부가 불가능하면
                                                    : false // 결제 하기 버튼 활성화
                                            });
                                            // this._paymentAfterService();
                                        } else if(cardData[buttonIndex].billingKeyId == -1) { // 카드 추가
                                            Actions.CardInputInfo({regAsCard : true, getListCard: this._getListCard});
                                        } else if(cardData[buttonIndex].billingKeyId == 0) { // cancle
                                            this.setState({
                                                disabledBtn : true,
                                                buttonTitle : '결제카드선택',
                                                selected: false
                                            })
                                        }
                                    })
                            }
                            DefaultLineBtn={true}
                            CustomBtnStyle={styles.mb5}
                        >
                            {this.state.buttonTitle}
                        </CustomButton>
                            
                        <CustomButton 
                            onPress={ () => this.setState({isModalVisible : true})}
                            disabled={this.state.disabledBtn}
                        >
                            결제 하기
                        </CustomButton>

                    </View>

                    <CustomModal
                        modalType="CONFIRM"
                        isVisible={this.state.isModalVisible}
                        onPress1={ () => this.setState({isModalVisible : false}) }
                        onPress2={this._paymentAddAfterService}
                        infoText1="A/S 사항이 정확한가요?"
                        infoText2="확정하신경우 A/S비용이 결제됩니다."
                        btnText1="취소"
                        btnText2="확인"
                    />

                    {/* alert 메세지 모달 */}
                    <CustomModal
                        modalType="ALERT"
                        isVisible={this.state.isAlertModal1}
                        //onPress={ () => Actions.ResetMain({client : true})}
                        onPress={ () => Actions.ClientMain()}
                        infoText={this.state.resultMsg}
                        btnText="확인"
                    />

                </Container>
            </Root>
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

export default AfterServiceAddPayment;