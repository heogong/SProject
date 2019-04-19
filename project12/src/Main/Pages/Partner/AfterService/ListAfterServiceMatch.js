import React, { Component } from "react";
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Container, H3, Icon, Text}  from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterService from '~/Main/Functions/GetAfterService'
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';

let SELECT_INDEX = null; // 선택된 A/S

const Product = ({index, afterService, toggelAction}) => (
    <TouchableOpacity onPress={ () => { toggelAction(), SELECT_INDEX = index }}>
      <View style={[styles.listPrdBoxFillWrap, {height: 108}]}>
        <View style={styles.listPrdBoxImgWrap}>
          <Image 
            source={{ uri: (afterService.prdTypeImgUrl) ? afterService.prdTypeImgUrl : 'insert404' }} 
            resizeMode="contain" 
            style={styles.listPrdBoxImg} 
          />
        </View>
        <View style={styles.listPrdBoxRightTxtWrap}>
          <H3 style={[styles.listPrdBoxRightTitleTxt, {paddingRight: 110}]} numberOfLines={1}>{ afterService.prdTypeKoNm }</H3>
          <Text style={[styles.listPrdBoxDeTxt, {paddingRight: 73}]}>
            {
                afterService.bplaceAddrRoad == "" && afterService.bplaceAddrRoad == null 
                ? afterService.bplaceAddr
                : afterService.bplaceAddrRoad
            } { afterService.bplaceAddrDtl }  
        </Text>
          {/* <Text style={styles.listPrdBoxDeTxt}>{ afterService.bplaceAddrDtl }</Text> */}
        </View>

        <View style={[styles.listPrdBoxNextIconWrap, {marginTop: 10}]}>
            <TouchableOpacity>
                <Image source={require("~/Common/Image/Next_icon_white.png")} resizeMode="contain" style={{width: 26, height: 26}} />
            </TouchableOpacity>
        </View>
        {/* 삭제 기능 필요 없음(매칭 되면 자동 사라짐)         
        <View style={styles.listPrdBoxNextIconWrap}>
          <TouchableOpacity>
            <Image source={require("~/Common/Image/card_delete_2.png")} resizeMode="contain" style={{width: 22, height: 22}}/>
          </TouchableOpacity>
        </View>
         */}
      </View>
    </TouchableOpacity>
);
class ListAfterServiceMatch extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [],
        isModalVisible: false,
        isAlertModal : false, // alert 용
      };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    componentDidMount() {
        this._getAfterService();
    }

    // 나의 AS 매칭 목록 조회
    _getAfterService = () => {
        GetAfterService().then(result => {
            GetCommonData(result, this._getAfterService).then(async resultData => {
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

    // 업체 AS 매칭(진행) 수락
    _regAfterServiceMatch = () => {
        const { data } = this.state;

        RegAfterServiceMatch(data[SELECT_INDEX].asPrgsId).then(result => {
            GetCommonData(result, this._regAfterServiceMatch).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.ViewAfterServiceState({
                            asRecvId : data[SELECT_INDEX].asRecvId,
                            asPrgsId : data[SELECT_INDEX].asPrgsId
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

    // 메인페이지 이동 - 그냥 pop 하면 index페이지로 이동 함
    _goToMain = () => {
        Actions.PartnerMain();
    }

    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader
                    customAction={this._goToMain}
                />

                <View style={{marginBottom: 36}}>
                    <View style={styles.fxDirRow}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                        <Text style={stylesReg.leftGuideTxt}>A/S신청</Text>
                        <Text style={stylesReg.leftGuideTxt}>목록을 보고</Text>
                        <Text style={stylesReg.leftGuideTxt}>수락해주세요</Text>
                        </View>
                    </View>
                </View>
                { (this.state.data.length > 0) ?
                (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.data.map((AS, idx) => 
                            <Product
                                key={idx}
                                index={idx}
                                afterService={AS}
                                toggelAction={this._toggleModal}
                            />
                        )}
                    </ScrollView>
                ) : (
                    <View style={styles.listPrdBoxEmptyImgWrap}>
                        <Image 
                            source={require("~/Common/Image/No_alram_icon.png")} 
                            style={{height: 219, width: 219, marginTop: -36}} 
                        />
                    </View>
                )}
                
                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={this._toggleModal}
                    onPress2={this._regAfterServiceMatch}
                    infoText1="A/S 매칭을 수락하시겠습니까?"
                    infoText2="수락 후 1시간 30분 내에 도착하셔야 합니다"
                    btnText1="취소"
                    btnText2="수락완료"
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


export default ListAfterServiceMatch;