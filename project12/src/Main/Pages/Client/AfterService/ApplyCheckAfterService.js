import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { Item, Input, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import RegAfterService from '~/Main/Functions/RegAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';
import { Actions } from "react-native-router-flux";

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
      };
    }

    componentWillMount() {
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
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 신청 API 호출
    _regAfterService = () => {
        RegAfterService(
            this.props.clientPrdId,
            this.props.asItemId,
            this.props.asRecvDsc, 
            this.props.etcComment).then(result => {
            GetCommonData(result, this._regAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //resultData.data.asRecvId
                        //this._paymentAfterService();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 결제 요청
    _paymentAfterService = () => {
        PaymentAfterService(billingKeyId, asRecvId).then(result => {
            GetCommonData(result, this._paymentAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });

    }

    // 입력 완료 버튼
    _submitAfterService = () => {
        Alert.alert(
            '',
            '입력하신 사항이 정확한가요?\\확정하신경우 출장비 결제',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '네', onPress: () => this._regAfterService() },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
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
                    onPress={this._submitAfterService}>
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
        )
    }
}

export default ApplyCheckAfterService;