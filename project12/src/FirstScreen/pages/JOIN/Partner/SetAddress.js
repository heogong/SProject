import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId, setBizAddress, setBizAddressDsc } from '~/Redux/Actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DrawMap from '~/Main/Components/DrawMap';
import RegPartnerPlace from '~/FirstScreen/Functions/RegPartnerPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class SetAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressName : '',
            makerYn : false,
            disSaveBtn : true,
            addressObj : [],
            region: {
                latitude: 37.566535,
                longitude: 126.97796919999996,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            marker:{
                latitude: 37.566535,
                longitude: 126.97796919999996
            },
            isAlertModal : false, // alert 용
            resultMsg : null // alert 용
        };
    }

    componentDidMount() {
        this._getLocation();
    }

    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
          (positon) => {
            this.setState({
              region : {
                ...this.state.region,
                latitude : positon.coords.latitude,
                longitude : positon.coords.longitude
              }
            })
          },
          (error) => 
          {console.log(error.message)},
          {enableHighAccuracy: false, timeout: 10000}
        );
    }

    // 맵 이동 후 좌표 값
    _onRegionChangeComplete = (region) => {
        this.setState({region});
    }


    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.JoinSearchPartnerAddress({
            onResult : this.onResult, 
            addressName : this.state.addressName
        }) 
    )

    // 주소검색 후 결과 데이터 
    onResult = (address) => {
        this.setState({
            region : {
                ...this.state.region,
                latitude : Number(address.result.y),
                longitude : Number(address.result.x)
            },
            marker : {
                latitude : Number(address.result.y),
                longitude : Number(address.result.x)
            },
            addressName : address.result.address.address_name,
            makerYn : true,
            addressObj : address.result,
            disSaveBtn : false
        });
    }

    // 사업장 등록
    _regPartnerPlace = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        //await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        console.log(this.props.value);

        RegPartnerPlace(this.props.value).then(async result => {
            GetCommonData(result, this._regPartnerPlace).then(async resultData => {
                if(resultData !== undefined) {
                    console.log(resultData.data);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.bizPlaceId); // 사업장 ID 리덕스 SET
                         Actions.JoinInputProdType();
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

    _onRegionChangeComplete = (region) => {
        this.setState({region});
    }

    render() {
        return (
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <Container style={styles.containerInnerPd}>
                    <CustomHeader resetPage={true}/>
            
                    <View style={styles.contentWrap}>
                        <View>
                            <View style={styles.fxDirRow}>
                                <View style={stylesReg.leftGuideTxtWrap}>
                                    <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                                    <Text style={stylesReg.leftGuideTxt}>사업장주소를</Text>
                                    <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                                </View>
                                <View style={stylesReg.rightStepNumWrap}>
                                    <Text style={stylesReg.rightStepNum}>06</Text>
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
                                <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                                </View>
                                <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                                </View>
                                <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.fx3, styles.justiConCenter]}>
                            <Item regular style={[styles.mb10, {height : 50}]}
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
                        </View>

                        <View style={styles.footerBtnWrap}>
                            <CustomButton
                                onPress={this._goSearchAddress}
                            >
                                주소검색
                            </CustomButton>

                            <CustomButton
                                onPress={ this._regPartnerPlace }
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
            </KeyboardAwareScrollView>
        )
    }
}

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