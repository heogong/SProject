import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text } from "native-base";

import { KAKAO_CODE, SUCCESS_RETURN_CODE } from '../../../Common/Blend';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrNm, setSnsSignYn, setSnsToken, setSnsType } from '../../../Redux/Actions';

import RNKakaoLogins  from 'react-native-kakao-logins';
import CertSnsLogInfo from '../../Functions/CertSnsLogInfo';
import SnsLogin from '../../Functions/SnsLogin';
import CustomButton from '../../../Common/Components/CustomButton';

class KakaoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKakaoLogging: false,
      theToken: 'token has not fetched',
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
        alert("성공");
        console.log(result);
      } else {
        console.log(result);
        Alert.alert(
          '',
          `${result.resultMsg} - 회원가입 페이지로 이동하시겠습니까?`,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '네', onPress: () => Actions.JoinCustomerType()},
          ],
          { cancelable: false }
        )
      }
    });
  }

  // 카카오 로그인 시작.
  kakaoLogin() {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login(async (err, result) => {
      // 로그인 페이지에서 접근 시
      if(this.props.loginYn) {
        this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 로그인 여부 SET
        this.props.onSetSnsToken(result);    // 리덕스 SNS TOKEN SET
        
        // 시스템 로그인
        this._SystmeLogin();

      // 시스템 회원가입
      } else {
        //Alert.alert('result', result);
        console.log(result);
        await this.setState({ theToken: result });
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
        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={() => this.kakaoLogin()}>
            <Text>{this.props.name}</Text>
        </CustomButton>
    );
  }
}

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