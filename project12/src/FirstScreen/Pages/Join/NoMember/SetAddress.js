import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setNoMemberAddress, setNoMemberAddressDsc } from '~/Redux/Actions';

import RegNoMemberAfterService from '~/Main/Functions/RegNoMemberAfterService';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const ADDRESS_DETAIL_LEN = 1;

class SetAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressName : '',
            detailAddressName : '',
            makerYn : false,
            disSaveBtn : true,
            detailAddressInput : false,
            addressObj : [],
            region: {
                latitude: 37.566535,
                longitude: 126.97796919999996,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            marker: {
                latitude: 37.566535,
                longitude: 126.97796919999996
            },
            isAlertModal : false, // alert 용
            resultMsg : null // alert 용
        };
    }

    static defaultProps = {
        editAddress : false // 주소 수정 페이지 여부
    } 

    // 초기 데이터 1. 기본 state 데이터 2. 현재 위치 조회 
    componentDidMount() {
        
    }

    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.NoMemberSearchAddress({
            onResult : this.onResult, 
            addressName : this.state.addressName
        }) 
    )

    // 주소검색 후 결과 데이터
    onResult = (address) => {
        console.log("주소검색 후 결과 데이터 address :", address);
        this.setState({
            addressName : address.result.address_name,
            makerYn : true,
            addressObj : address.result,
            detailAddressInput : true
        });
    }

    // 주소 저장 버튼 활성화 여부
    _handleChange = (text) => {
        this.setState({
            detailAddressName : text,
            disSaveBtn :  (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true
        })
    }

    _saveButton = () => {
        // 비회원 AS 접수 처리
        this._regBusiness();
    }

    // 사업장 등록
    _regBusiness = async () => {
        await this.props.onSetNoMemberAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetNoMemberAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        RegNoMemberAfterService(this.props.value).then(async resultData => {
            if(resultData !== undefined) {
                console.log("비회원 AS 접수",resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                if(ResultBool) {
                    Actions.NoMemberSuccessAfterService();
                } else {
                    this.setState({
                        isAlertModal : true,
                        resultMsg : resultData.resultMsg
                    })
                }
            }
        });

    }

    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader />
        
                <View style={styles.contentWrap}>
                    <View>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>A/S위치</Text>
                                <Text style={stylesReg.leftGuideTxt}>주소정보를</Text>
                                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                            </View>
                            <View style={stylesReg.rightStepNumWrap}>
                                <Text style={stylesReg.rightStepNum}>03</Text>
                            </View>
                        </View>
                        <View style={stylesReg.procBarWrap}>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.fx3, styles.justiConCenter]}>
                        <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
                            <Icon active name="ios-search" style={[styles.inputIcon, {marginRight: 0, paddingRight: 0}]} />
                            <Input
                                onChangeText={ (text) => this.setState({addressName : text})}
                                placeholder="주소를 입력해 주세요." 
                                placeholderTextColor={color.inputPlaceHodler} 
                                style={styles.inputDefaultBox}
                            >
                                {this.state.addressName}
                            </Input>
                        </Item>

                        <Item regular style={styles.inputWhBackGreyBo}>
                            <Input
                                onChangeText={this._handleChange}
                                placeholder="상세주소를 입력해주세요."
                                placeholderTextColor={color.inputPlaceHodler}
                                style={styles.inputDefaultBox}>
                                {this.state.detailAddressName} 
                            </Input>
                        </Item>
                    </View>

                    <View style={styles.footerBtnWrap}>
                        <CustomButton
                            onPress={this._goSearchAddress}
                            DefaultLineBtn={true}
                            CustomBtnStyle={styles.mb5}
                        >
                            주소검색
                        </CustomButton>

                        <CustomButton
                            onPress={this._saveButton}
                            disabled={ this.state.disSaveBtn }
                        >
                            입력완료
                        </CustomButton>
                    </View>
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
        )
    }
}

const localStyles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});



let mapStateToProps = (state) => {
    return {
        value: state.NO_USER
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetNoMemberAddress: (value) => dispatch(setNoMemberAddress(value)),
        onSetNoMemberAddressDsc: (value) => dispatch(setNoMemberAddressDsc(value))
    }
}
  
SetAddress = connect(mapStateToProps, mapDispatchToProps)(SetAddress);
export default SetAddress;