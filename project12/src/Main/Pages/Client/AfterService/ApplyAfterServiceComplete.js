import React, { Component } from "react";
import { Alert, Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setIsAfterService } from '~/Redux/Actions';

import DrawMap from '~/Main/Components/DrawMap';
import FindAfterServicePartner from '~/Main/Functions/FindAfterServicePartner'
import CancleAfterServicePartner from '~/Main/Functions/CancleAfterServicePartner'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let AS_PRGS_ID = null;

class ApplyAfterServiceComplete extends Component {
    constructor(props) {
      super(props);

      this.state = {
        result : "매칭 중",
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
          resultMsg : null
      };
    }

    componentWillMount() {
        this._findAfterServicePartner();
        this._getLocation();
    }

    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            (positon) => {
                this.setState({
                    latitude : positon.coords.latitude,
                    longitude : positon.coords.longitude
                })
            },
            (error) => 
            {console.log(error.message)},
            {enableHighAccuracy: false, timeout: 10000}
        );
    }
   
    // AS 가능 업체 찾기(AS 진행 시작)
    _findAfterServicePartner = () => {
        FindAfterServicePartner(this.props.asRecvId).then(result => {
            GetCommonData(result, this._findAfterServicePartner).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log('AS 가능 업체 찾기(AS 진행 시작)')
                    console.log(resultData);

                    if(ResultBool) {
                        AS_PRGS_ID = result.data.asPrgsId;
                        this.props.onSetIsAfterService(true); // A/S 신청 확인 - interval 최소화 하기위함

                        // 타임아웃 clear 필요할듯
                        setTimeout(() => {
                            Actions.ClientMain();
                            // Actions.ClientHome({type : 'reset'}); 어디서 A/S 2번 넣는지 확인 이 필요
                        }, 5000);
                        
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

    // 고객 AS 매칭(진행)중 취소
    _cancleAfterServicePartner = () => {
        CancleAfterServicePartner(AS_PRGS_ID).then(result => {
            GetCommonData(result, this._cancleAfterServicePartner).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);

                    if(ResultBool) {
                        alert(resultData.resultMsg);
                        
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }


    // 고객 AS 매칭(진행)중 취소 선택
    _cancleAfterServicePartnerConfirm = () => {
        Alert.alert(
            '',
            'A/S 매칭을 취소??',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._cancleAfterServicePartner()},
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            //     <CustomButton
            //         block={ true }
            //         info={ true }
            //         bordered={ true }
            //         onPress={ this._cancleAfterServicePartnerConfirm }>
            //         <Text>
            //             매칭 취소
            //         </Text>
            <Container style={styles.containerDefault}>
                <DrawMap
                    region={ this.state.region }
                    makerYn={ false }
                    marker={ this.state.marker }
                    showMap={ true }
                />
                <ImageBackground 
                    style={[styles.succContentWrap, {backgroundColor: "rgba(40, 200, 245, 0.3)"}]}
                    source={require('~/Common/Image/Matching_effect.gif')}>
                
                <Image source={require("~/Common/Image/GPS_match_icon.png")} resizeMode="contain" style={{width: 17, alignSelf: "center", top: "50%", position: "absolute", marginTop: -40}} />

                <View style={localStyles.topTxtWrap}>
                    <Text style={localStyles.topTxt}>쿨리닉 A/S업체</Text>
                    <Text style={localStyles.topTxt}>매칭을</Text>
                    <Text style={localStyles.topTxt}>시작합니다</Text>
                </View>

                <View style={localStyles.bottomTxtWrap}>
                    <Text style={localStyles.bottomTxt}>주변지역 A/S업체에게</Text>
                    <Text style={localStyles.bottomTxt}>매칭연락을 보내는 중입니다.</Text>
                    <Text style={localStyles.bottomTxt}>매칭 성공시 문자로 알려드립니다.</Text>
                </View>
                
                </ImageBackground>

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
    topTxtWrap: {
      marginTop: 117,
      marginLeft: 26,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      flex: 1
    },
    topTxt: {
      fontSize: 26,
      fontWeight: "bold",
      color: color.whiteColor
    },
    bottomTxtWrap: {
      marginBottom: 117,
      marginLeft: 26,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: "flex-end",
      flex: 1
    },
    bottomTxt: {
      fontSize: 15,
      fontWeight: "bold",
      color: color.whiteColor,
      lineHeight: 30,
      letterSpacing: 0.5
    },
});


let mapDispatchToProps = (dispatch) => {
    return {
        onSetIsAfterService: (value) => dispatch(setIsAfterService(value)),
    }
}
  
ApplyAfterServiceComplete = connect(undefined, mapDispatchToProps)(ApplyAfterServiceComplete);
export default ApplyAfterServiceComplete;
