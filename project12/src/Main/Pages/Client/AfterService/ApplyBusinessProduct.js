import React, { Component } from "react";
import { Image, StyleSheet, View } from 'react-native'
import { ActionSheet, Container, Icon, Item, Picker, Root, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import { SelectBox } from "react-native-picker-select";

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import GetAfterServiceCase from '~/Main/Functions/GetAfterServiceCase';
import RegAfterService from '~/Main/Functions/RegAfterService';
import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import PaymentAfterService from '~/Main/Functions/PaymentAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

let SELECT_INDEX = null; // 카드 선택 index
class ApplyBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            prdTypeImg : {
                fileUrl : null
            },
            images : [] // 제품 이미지 데이터
        }, // 제품 데이터
        asRecvDsc : null,
        etcComment : null,
        asCaseData: [], // 제품 증상 데이터
        selected: undefined,
        disabledBtn : true,
        cardData : ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"],
        buttonTitle : '결제카드선택',
        isAlertModal : false, // alert 용
        resultMsg : null // alert 용
      };
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });

        if(value == -1) {
            this.setState({disabledBtn : true})
        } else {

            if(SELECT_INDEX !== null) {
                if(this.state.cardData[SELECT_INDEX].billingKeyId > 0) {
                    this.setState({disabledBtn : false})
                }
            } 
        }
    }

    componentWillMount() {
        this._getAfterServiceCase();
        this._getListCard();
    }
   
    componentDidMount() {
        this._getProduct();
    }

    // 등록된 사업장 제품 조회
    _getProduct = () => {
        GetProduct(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
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

    // AS 제품 증상 조회
    _getAfterServiceCase = () => {
        GetAfterServiceCase(207).then(result => {
        // GetAfterServiceCase(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData.data);
                    if(ResultBool) {
                        this.setState({asCaseData : resultData.data});
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
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        });
    }

    _nextButton = () => {
        // const {asCaseData, selected, asRecvDsc, etcComment, cardData} = this.state;

        // Actions.AfterServiceApplyProductCheck({
        //     clientPrdId: this.props.clientPrdId,
        //     asItemNm : asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm,
        //     asItemId : selected,
        //     asRecvDsc : asRecvDsc,
        //     etcComment : etcComment,
        //     billingKeyId : cardData[SELECT_INDEX].billingKeyId
        // });
        this._regAfterService();
    }

    // 회원 AS 접수
    _regAfterService = () => {
        const {asCaseData, selected, asRecvDsc, etcComment, cardData} = this.state

        RegAfterService(
            this.props.clientPrdId,
            selected,
            asRecvDsc, 
            etcComment).then(result => {
            GetCommonData(result, this._regAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        // 증상내역 text
                        asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm;
                        // 신청 내역 확인 페이지 이동
                        Actions.AfterServiceApplyProductCheck({
                            clientPrdId: this.props.clientPrdId,
                            asItemNm : asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm,
                            asItemId : selected,
                            asRecvDsc : asRecvDsc,
                            etcComment : etcComment,
                            asRecvId : resultData.data.asRecvId,
                            billingKeyId : cardData[SELECT_INDEX].billingKeyId
                        });
                        // this._paymentAfterService(resultData.data.asRecvId);
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
    // _paymentAfterService = (asRecvId) => {
    //     const {cardData} = this.state;

    //     PaymentAfterService(cardData[SELECT_INDEX].billingKeyId, asRecvId).then(result => {
    //         GetCommonData(result, this._paymentAfterService).then(async resultData => {
    //             if(resultData !== undefined) {
    //                 const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
    //                 console.log(resultData);
    //                 if(ResultBool) {
    //                     Actions.AfterServiceApplyProductComplete({
    //                         asRecvId : asRecvId
    //                     })
    //                 } else {
    //                     alert("AS 결제 요청 - "+resultData.resultMsg);
    //                 }
    //             }
    //         });
    //     })
    // }

    // 입력완료 확인
    // _regAfterServiceConfirm = () => {
    //     Alert.alert(
    //         '',
    //         '입력하신 사항이 정확한가요?\n확정하신경우 출장비 결제',
    //         [
    //             {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //             {
    //                 text: '네', onPress: () => (
    //                     this._regAfterService()
    //                 ) 
    //             },
    //         ],
    //         { cancelable: false }
    //     )
    // }

    render() {
        return (
            <Root>
                <Container style={styles.containerInnerPd}>
                    <CustomHeader title={this.props.clientPrdNm} />

                    <View style={styles.contentWrap}>
                        <View>
                            <View style={[styles.fxDirRow, styles.mb20]}>
                                <View style={stylesReg.leftGuideTxtWrap}>
                                    <Text style={stylesReg.leftGuideTxt}>증상 및</Text>
                                    <Text style={stylesReg.leftGuideTxt}>상세정보를</Text>
                                    <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                                </View>
                                <View style={stylesReg.rightImgWrap}>
                                    <Image source={{ uri : this.state.data.prdTypeImg.fileUrl }} style={{width: 76, height: 76}}/>
                                </View>
                            </View>

                            <View style={{marginTop: 26}}>
                                <Item style={{
                                    borderTopWidth : 1, 
                                    borderLeftWidth  :1, 
                                    borderRightWidth : 1,  
                                    borderColor : color.inputBoGrey,
                                    height : 36,
                                    width: "100%",
                                    marginLeft: 0,
                                }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-dropdown" style={styles.selectBoxIcon}/>}
                                        style={styles.selectBoxWrap}
                                        textStyle={styles.selectBoxTxt}
                                        itemTextStyle={{fontSize: 13}}
                                        placeholderIconColor={color.defaultColor}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label=" == 증상 선택 == " value={ -1 } style={{fontSize: 13}} />
                                        {this.state.asCaseData.map((asCase, idx) => 
                                            <Picker.Item key={idx} label={asCase.asItemNm} value={asCase.asItemId} />
                                        )}
                                    </Picker>
                                </Item>

                                <Textarea
                                    value={this.state.bizDsc}
                                    onChangeText={(text) => this.setState({asRecvDsc : text})}
                                    rowSpan={5} 
                                    bordered placeholder="상세 AS 증상 및 출장 시 참고사항을 입력해 주세요." 
                                    style={[styles.textAreaDefault, {marginTop: 12}]} 
                                    placeholderTextColor="#c9cacb"
                                />
                            </View>

                            <View style={styles.mb20}>
                                <Text style={localStyles.boxDetailSubTitleTxt}>쿨리닉 제품분석</Text>
                                <View style={styles.fxDirRow}>
                                    <View style={styles.fx1}>
                                        <Text style={localStyles.boxDetailSubTxt}>용량 :</Text>
                                        <Text style={localStyles.boxDetailSubTxt}>전기 :</Text>
                                        <Text style={localStyles.boxDetailSubTxt}>압축기 :</Text>
                                    </View>
                                    <View style={styles.fx1}>
                                        <Text style={localStyles.boxDetailSubTxt}>응축기 :</Text>
                                        <Text style={localStyles.boxDetailSubTxt}>증발기 :</Text>
                                        <Text style={localStyles.boxDetailSubTxt}>제조사 :</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.footerBtnWrap, {flex: 0}]}>
                        <CustomButton 
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: this.state.cardData,
                                        cancelButtonIndex: this.state.cardData.length - 1,
                                        title: "결제카드"
                                    },
                                    buttonIndex => {
                                        const { cardData, selected } = this.state;
                                        //this.setState({ selectIndex : buttonIndex });
                                        SELECT_INDEX = buttonIndex;

                                        if(cardData[buttonIndex].billingKeyId > 0) {
                                            this.setState({ 
                                                buttonTitle: cardData[buttonIndex].text,
                                                disabledBtn : (selected !== -1) ? false : true
                                            });
                                            // this._paymentAfterService();
                                        } else if(cardData[buttonIndex].billingKeyId == -1) { // 카드 추가
                                            Actions.CardInputInfo({regAsCard : true, getListCard: this._getListCard});
                                        } else if(cardData[buttonIndex].billingKeyId == 0) { // cancle
                                            this.setState({
                                                disabledBtn : true,
                                                buttonTitle : '결제카드선택'
                                            })
                                        }
                                    })
                            }
                            DefaultLineBtn={true}
                            CustomBtnStyle={styles.mb12}
                        >
                            {this.state.buttonTitle}
                        </CustomButton>
                            
                        <CustomButton 
                            onPress={this._nextButton}
                            disabled={this.state.disabledBtn}
                        >
                            입력 완료
                        </CustomButton>
                    </View>

                    {/* alert 메세지 모달 */}
                    <CustomModal
                        modalType="ALERT"
                        isVisible={this.state.isAlertModal}
                        onPress={ () => this.setState({isAlertModal : false})}
                        infoText={this.state.resultMsg}
                        btnText="확인"
                    />

                </Container>
            </Root>
        )
    }
}


const localStyles = StyleSheet.create({
    boxDetailSubTitleTxt: {
      fontSize: 18,
      color: color.defaultColor,
      paddingBottom: 12,
      fontWeight: "bold",
      marginTop: 20
    },
    boxDetailSubTxt: {
      fontSize: 14,
      color: "#8e8e98",
      lineHeight: 20
    },
});

export default ApplyBusinessProduct;