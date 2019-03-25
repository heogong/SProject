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
        isModalVisible : false
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
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        });
    }

    // 회원 AS 접수
    // _regAfterService = () => {
    //     this.setState({isModalVisible : false})

    //     RegAfterService(
    //         this.props.clientPrdId,
    //         this.props.asItemId,
    //         this.props.asRecvDsc, 
    //         this.props.etcComment).then(result => {
    //         GetCommonData(result, this._regAfterService).then(async resultData => {
    //             if(resultData !== undefined) {
    //                 const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
    //                 console.log(resultData);
    //                 if(ResultBool) {
    //                     // // 증상내역 text
    //                     // asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm;
    //                     // 신청 내역 확인 페이지 이동
    //                     this._paymentAfterService(resultData.data.asRecvId);
    //                 } else {
    //                     this.setState({
    //                         isAlertModal : true,
    //                         resultMsg : resultData.resultMsg
    //                     })
    //                 }
    //             }
    //         });
    //     });
    // }

    // AS 결제 요청
    _paymentAfterService = () => {

        this.setState({isModalVisible : false})

        PaymentAfterService(this.props.billingKeyId, this.props.asRecvId).then(result => {
            GetCommonData(result, this._paymentAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.AfterServiceApplyProductComplete({
                            asRecvId : this.props.asRecvId
                        })
                    } else {
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        })
    }

    render() {
        return (
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
                                        <Text style={styles.greyFont}>{this.state.data.bplace.detail.detailAddr1}</Text>
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
                            onPress={ ()=> this.setState({isModalVisible : true}) }
                            disabled={this.state.disabledBtn}
                            edgeFill={true}
                            fillTxt={true}
                        >
                            매칭시작
                        </CustomButton>
                    </View>
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

export default ApplyCheckAfterService;