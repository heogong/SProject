import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId, setBizAddress, setBizAddressDsc } from '~/Redux/Actions';

import RegBizPlace from '~/Main/Functions/RegBizPlace';
import EditBizPlace from '~/Main/Functions/EditBizPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

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
            addressName : null,
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
        // 주소 수정 페이지 접근 시
        if (this.props.editAddress) {
            this.setState({
                addressName : this.props.address,
                detailAddressName : this.props.detailAddress,
                makerYn : true,
                disSaveBtn : false
            })
        } 
    }

    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.SearchAddress({
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

    // 사업장 저장 버튼 클릭
    _saveButton = () => {
        // 주소 수정 페이지 접근 시
        if (this.props.editAddress) {
            this._editBusiness();

        } else { // 주소 등록 페이지 접근 시
            this._regBusiness();
        }
    }

    // 사업장 등록
    _regBusiness = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        RegBizPlace(this.props.value).then(async result => {
            GetCommonData(result, this._regBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    console.log("사업장 등록 시",resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        Actions.SetBusinessPlace();
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

     // 사업장 주소 수정
     _editBusiness = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        EditBizPlace(this.props.value).then(async result => {
            GetCommonData(result, this._editBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        Actions.popTo("ViewBusinessPlace");
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
                <CustomHeader />
        
                <View style={styles.contentWrap}>
                    <View>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                                <Text style={stylesReg.leftGuideTxt}>업체주소를</Text>
                                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                            </View>
                            <View style={stylesReg.rightStepNumWrap}>
                                <Text style={stylesReg.rightStepNum}>04</Text>
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
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.fx3, styles.justiConCenter]}>
                        <Item regular style={[styles.mb10, {height : 50}]}
                            // onPress={this._goSearchAddress}
                        >
                            <Icon active name="ios-search" style={[styles.inputIcon, {marginRight: 0, paddingRight: 0}]} />
                            <Input
                                onChangeText={ (text) => this.setState({addressName : text})}
                                placeholder="주소를 입력해 주세요" 
                                placeholderTextColor={color.inputPlaceHodler} 
                                style={styles.inputDefaultBox}
                            >
                                {this.state.addressName}
                            </Input>
                        </Item>

                        <Item regular style={[
                            (this.state.detailAddressInput) ? localStyles.show : localStyles.hide, 
                            {height : 50}]
                        }>
                            <Input 
                                onChangeText={this._handleChange}
                                placeholder="상세주소입력">
                                    {this.state.detailAddressName} 
                                </Input>
                        </Item>
                    </View>

                    <View style={styles.footerBtnWrap}>
                        <CustomButton
                            onPress={this._goSearchAddress}
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
        value: state.BIZ
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizId: (value) => dispatch(setBizId(value)),
        onSetBizAddress: (value) => dispatch(setBizAddress(value)),
        onSetBizAddressDsc: (value) => dispatch(setBizAddressDsc(value))
    }
}
  
SetAddress = connect(mapStateToProps, mapDispatchToProps)(SetAddress);
export default SetAddress;