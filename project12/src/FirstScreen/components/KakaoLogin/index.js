import React, { Component } from 'react';
import { AsyncStorage, Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { KAKAO_CODE, SUCCESS_RETURN_CODE, CLIENT_USER, FAIL_RETURN_CODE_9043 } from '~/Common/Blend';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrNm, setSnsSignYn, setSnsToken, setSnsType } from '~/Redux/Actions';

import RNKakaoLogins  from 'react-native-kakao-logins';
import CertSnsLogInfo from '../../Functions/CertSnsLogInfo';
import SnsLogin from '../../Functions/SnsLogin';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class KakaoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKakaoLogging: false,
      theToken: 'token has not fetched',
      isModalVisible : false, // Modal On/Off 상태
    };
  }

  // 카카오 로그인 정보 - 시스템 회원가입 여부 확인
  _certSnsLogInfo = () => {
    CertSnsLogInfo(this.state.theToken, KAKAO_CODE).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
      if(ResultBool) {

        this.props.onSetSnsSignYn('Y');                 // 리덕스 SNS 가입여부 SET
        this.props.onSetSnsToken(this.state.theToken);  // 리덕스 SNS TOKEN SET
        this.props.onSetSnsType(KAKAO_CODE);            // 리덕스 SNS 타입 SET
        
        Actions.JoinInputName();
        
      } else {
        alert(result.resultMsg);
      }
    });
  }

  // 카카오 토큰값 - 시스템 (쿨비즈?) 로그인 하기
  _SystmeLogin() {
    SnsLogin(this.props.tokenObj, KAKAO_CODE).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
      if(ResultBool) {
        await AsyncStorage.setItem('AccessToken', result.data.access_token); // AsyncStorage 토큰 저장
        await AsyncStorage.setItem('RefreshToken', result.data.refresh_token); // AsyncStorage 갱신 토큰 저장

        // 사용자 정보 
        this._getUserInfo();

      } else {
        if(result.resultCode == FAIL_RETURN_CODE_9043){
        // 카카오 인증이 실패하면(서버측에서)
          // 카카오 로그아웃 요청
          this.kakaoLogout();
          // 카카오에서 재인증을 시도한다.
          this.kakaoLoginStart();
        } else {
          this.setState({
            isModalVisible : true,
            resultMsg : result.resultMsg
          })
        }
      }
    });
  }

  // 로그인(토큰값 가져온) 사용자 정보 가져오기
  _getUserInfo = () => {
    GetUserInfo().then(async result => {
      GetCommonData(result, this._getUserInfo).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

              if(ResultBool) {
                // 클라이언트 사용자
                if(resultData.data.usrTypeCd == CLIENT_USER) {
                  Actions.ClientMain();
                } else { // 파트너 사용자
                  Actions.PartnerMain();
                }
              }
          }
      });
    });
  }

  // SNS 회원가입 페이지로 이동
  _goSnsJoinFirst = () => {
    this._certSnsLogInfo();
  }

  // 카카오 로그인 시작.
  kakaoLoginStart() {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login(async (err, result) => {
      console.log(err,'/////',result);
      console.log(`\n\n  Token is fetched  :: ${result.token} \n\n`);

      // KAKAO Token 값 state 설정.
      await this.setState({ theToken: result.token });

      // 로그인 페이지에서 접근 시
      if(this.props.loginYn) {
        this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 로그인 여부 SET
        this.props.onSetSnsToken(result.token);    // 리덕스 SNS TOKEN SET
        
        // 시스템 로그인
        this._SystmeLogin();

      // 시스템 회원가입
      } else {
        this._certSnsLogInfo();

      }
      if (err){
        console.log(err);
        return;
      }
     
    });
  }
 
  kakaoLogout() {
    console.log('   kakaoLogout   ');
    RNKakaoLogins.logout((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
    });
  }
 
  // 로그인 후 내 프로필 가져오기.
  getProfile() {
    console.log('getKakaoProfile1111');
    RNKakaoLogins.getProfile((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
      //Alert.alert('result', result);
    });
  }

  render() {
    return (
        <TouchableOpacity onPress={ () => this.kakaoLoginStart()}>
          {(this.props.loginYn) ? (
              <Image source={require('~/Common/Image/kakao-button.png')} style={{height : 60, width : 60}}/>
          ) : (
            <View>
              <Image source={require('~/Common/Image/Kakao_button_2.png')} resizeMode='contain' style={localStyles.btnIcon} />
            </View>
          )}

          <CustomModal
          modalType="CONFIRM"
          isVisible={this.state.isModalVisible}
          onPress1={() => this.setState({isModalVisible : false})}
          onPress2={() => { this.setState({isModalVisible : false}), this._goSnsJoinFirst() } }
          infoText1={this.state.resultMsg}
          infoText2="회원가입 페이지로 이동하시겠습니까?"
          btnText1="아니요"
          btnText2="네"
        />
        </TouchableOpacity>
    );
  }
}

const localStyles = StyleSheet.create({
  bttBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    marginRight : 13,
    alignItems : 'center'
  },
  btnIcon: {
    height: 90,
    width: 90,
  },
  btnTxt: {
    fontSize: 14,
    marginTop : 10,
    color: color.whiteColor,
    paddingBottom: 14
  }
});

let mapStateToProps = (state) => {
  return {
      usrObj: state.USER,
      tokenObj: state.TOKEN
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetSnsSignYn: (value) => dispatch(setSnsSignYn(value)),
      onSetSnsToken: (value) => dispatch(setSnsToken(value)),
      onSetSnsType: (value) => dispatch(setSnsType(value)),
  }
}
KakaoLogin = connect(mapStateToProps, mapDispatchToProps)(KakaoLogin);
export default KakaoLogin;