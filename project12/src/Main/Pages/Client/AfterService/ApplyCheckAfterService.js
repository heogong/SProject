import React, { Component } from "react";
import { Alert, View } from 'react-native'
import { Card, CardItem, Container, H2, H3,Text,Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import RegAfterService from '~/Main/Functions/RegAfterService';
import PaymentAfterService from '~/Main/Functions/PaymentAfterService';


import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
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
        //this._getListCard();
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
                        // // 증상내역 text
                        // asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm;
                        // 신청 내역 확인 페이지 이동
                        this._paymentAfterService(resultData.data.asRecvId);
                    } else {
                        alert("AS 신청 API 호출 - "+resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 결제 요청
    _paymentAfterService = (asRecvId) => {
        PaymentAfterService(this.props.billingKeyId, asRecvId).then(result => {
            GetCommonData(result, this._paymentAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.AfterServiceApplyProductComplete({
                            asRecvId : asRecvId
                        })
                    } else {
                        alert("AS 결제 요청 - " +resultData.resultMsg);
                    }
                }
            });
        })
    }

    // 입력완료 확인
    _matchConfirm = () => {
        Alert.alert(
            '',
            '입력하신 사항이 정확한가요?\n확정하신경우 출장비 결제',
            [
                {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: '네', onPress: () => (
                        this._regAfterService()
                    ) 
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            // <Root>
            //     <CustomBlockWrapper
            //         title="A/S 신청내역 확인"
            //     >
            //         <View>
            //             <Text>사업장 : {this.state.data.bplace.bplaceNm}</Text>
            //             <Text>주소 : {this.state.data.bplace.addr.addressName}</Text>
            //         </View>

            //         <ProductShowCase
            //             defaultImg={ this.state.data.prdTypeImg.fileUrl }
            //             data={ this.state.data.images }
            //             clientPrdId={ this.state.data.clientPrdId }
            //             clientPrdNm={ this.state.data.clientPrdNm } 
            //             index={ 0 }
            //             copyBtn={ false }
            //             viewProduct={ true }
            //         />

            //         <Item regular>
            //             <Input
            //                 value={ this.props.asItemNm }
            //                 disabled
            //             />
            //         </Item>

            //         <Textarea 
            //             value={ this.props.asRecvDsc }
            //             rowSpan={2} 
            //             bordered 
            //             disabled
            //         />

            //         <CustomButton
            //             styleWidth={ false }
            //             block={ true }
            //             info={ true }
            //             bordered={ true }
            //             onPress={() =>
            //                 ActionSheet.show(
            //                     {
            //                         options: this.state.cardData,
            //                         cancelButtonIndex: this.state.cardData.length - 1,
            //                         title: "결제카드"
            //                     },
            //                     buttonIndex => {
            //                         this.setState({ buttonTitle: this.state.cardData[buttonIndex].text });
            //                         //this.setState({ selectIndex : buttonIndex });
            //                         SELECT_INDEX = buttonIndex;
                                    
            //                         if(this.state.cardData[buttonIndex].billingKeyId > 0) {
            //                             this._paymentAfterService();
            //                         } else if(this.state.cardData[buttonIndex].billingKeyId == -1) {
            //                             Actions.CardInputInfo({regAsCard : true, getListCard: this._getListCard});
            //                         }
            //                     })
            //             }>
            //             <Text>
            //                 예
            //             </Text>
            //         </CustomButton>
            //         <CustomButton
            //             styleWidth={ false }
            //             block={ true }
            //             info={ true }
            //             bordered={ true }
            //             onPress={Actions.pop}>
            //             <Text>
            //                 아니오
            //             </Text>
            //         </CustomButton>
            //     </CustomBlockWrapper>
            // </Root>
            <Container style={styles.containerInnerPd}>
                <CustomHeader title="A/S신청내역"/>

                <View style={styles.fx1}>
                    <View style={[styles.fx3, styles.justiConCenter]}>
                        <Card>
                            <CardItem bordered style={styles.mg10}>
                                <View style={[styles.fxDirRow, styles.mg10]}>

                                    <View style={styles.fx1}>
                                        <Thumbnail square large source={{uri : this.state.data.prdTypeImg.fileUrl}} />
                                    </View>

                                    <View style={styles.fx2}>
                                        <H2 style={{color : color.defaultColor}}>{this.state.data.bplace.bplaceNm}</H2>
                                        <Text>{this.state.data.clientPrdNm}</Text>
                                        <Text style={styles.greyFont}>{this.state.data.bplace.addr.addressName}</Text>
                                        <Text style={styles.greyFont}>bbbbbbbbbbb</Text>
                                    </View>
                                </View>
                            </CardItem>
                            <CardItem style={styles.mg10}>

                                <View style={styles.mg10}>
                                    <H2 style={[styles.mb20, {color:color.defaultColor}]}>A/S 신청내역</H2>
                                    <H3>{this.state.data.clientPrdNm}</H3>
                                    <Text style={styles.greyFont}>{ this.props.asItemNm }</Text>
                                    <View style={styles.mb20}></View>

                                    <H3>참고사항</H3>
                                    <Text style={styles.greyFont}>
                                        { this.props.asRecvDsc }
                                    </Text>
                                    <View style={styles.mb20}></View>

                                    <H3>출장비 결제</H3>
                                    <Text style={styles.greyFont}>aaaaaaaaaaaaaaaaaaaaa</Text>
                                    <View style={styles.mb20}></View>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                   

                    <View style={styles.footerBtnWrap}>
                        <View style={[styles.mb20, {alignItems : 'center'}]}>
                            <Text style={styles.greyFont}>입력하신 사항이 정확한가요?</Text>
                            <Text style={styles.greyFont}>매칭이 시작되면 출장비가 결제되니 꼼꼼하게 살펴주세요</Text>
                        </View>
                        <CustomButton 
                            onPress={this._matchConfirm}
                            disabled={this.state.disabledBtn}
                            edgeFill={true}
                            fillTxt={true}
                        >
                            매칭시작
                        </CustomButton>
                    </View>
                </View>

            </Container>
        )
    }
}

export default ApplyCheckAfterService;