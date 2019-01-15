import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { ActionSheet, Item, Input, Root, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import ListCard from '~/Card/Functions/ListCard';
import PaymentAfterService from '~/Main/Functions/PaymentAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';

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
                }
            },
            prdTypeImg : {
                fileUrl : null
            },
            images : [] // 제품 이미지 데이터
        }, // 제품 데이터
        asRecvDsc : null,
        cardData : ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"],
      };
    }

    componentWillMount() {
        this._getProduct();
        this._getListCard();
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
                        alert(resultData.resultMsg);
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
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 결제 요청
    _paymentAfterService = () => {
        const {cardData} = this.state;
        Alert.alert(
            '',
            '입력하신 사항이 정확한가요?\\확정하신경우 출장비 결제',
            [
                {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: '네', onPress: () => (
                        PaymentAfterService(cardData[SELECT_INDEX].billingKeyId, this.props.asRecvId).then(result => {
                            GetCommonData(result, this._paymentAfterService).then(async resultData => {
                                if(resultData !== undefined) {
                                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                                    console.log(resultData);
                                    if(ResultBool) {
                                        Actions.AfterServiceApplyProductComplete({asRecvId : this.props.asRecvId})
                                    } else {
                                        alert(resultData.resultMsg);
                                    }
                                }
                            });
                        })
                        
                    ) 
                },
            ],
            { cancelable: false }
        )

    }

    render() {
        return (
            <Root>
                <CustomBlockWrapper
                    title="A/S 신청내역 확인"
                >
                    <View>
                        <Text>사업장 : {this.state.data.bplace.bplaceNm}</Text>
                        <Text>주소 : {this.state.data.bplace.addr.addressName}</Text>
                    </View>

                    <ProductShowCase
                        defaultImg={ this.state.data.prdTypeImg.fileUrl }
                        data={ this.state.data.images }
                        clientPrdId={ this.state.data.clientPrdId }
                        clientPrdNm={ this.state.data.clientPrdNm } 
                        index={ 0 }
                        copyBtn={ false }
                        viewProduct={ true }
                    />

                    <Item regular>
                        <Input
                            value={ this.props.asItemNm }
                            disabled
                        />
                    </Item>

                    <Textarea 
                        value={ this.props.asRecvDsc }
                        rowSpan={2} 
                        bordered 
                        disabled
                    />

                    <CustomButton
                        styleWidth={ false }
                        block={ true }
                        info={ true }
                        bordered={ true }
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: this.state.cardData,
                                    cancelButtonIndex: this.state.cardData.length - 1,
                                    title: "결제카드"
                                },
                                buttonIndex => {
                                    this.setState({ buttonTitle: this.state.cardData[buttonIndex].text });
                                    //this.setState({ selectIndex : buttonIndex });
                                    SELECT_INDEX = buttonIndex;
                                    
                                    if(this.state.cardData[buttonIndex].billingKeyId > 0) {
                                        this._paymentAfterService();
                                    } else if(this.state.cardData[buttonIndex].billingKeyId == -1) {
                                        Actions.CardInputInfo({regAsCard : true, getListCard: this._getListCard});
                                    }
                                })
                        }>
                        <Text>
                            예
                        </Text>
                    </CustomButton>
                    <CustomButton
                        styleWidth={ false }
                        block={ true }
                        info={ true }
                        bordered={ true }
                        onPress={Actions.pop}>
                        <Text>
                            아니오
                        </Text>
                    </CustomButton>
                </CustomBlockWrapper>
            </Root>
        )
    }
}

export default ApplyCheckAfterService;