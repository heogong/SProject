import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Text } from "native-base";

import { NaverLogin, getProfile } from 'react-native-naver-login';

import { NAVER_CODE, SUCCESS_RETURN_CODE, CLIENT_USER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrNm, setSnsSignYn, setSnsToken, setSnsType } from '../../../Redux/Actions';
import SnsLogin from '../../Functions/SnsLogin';
import CertSnsLogInfo from '../../Functions/CertSnsLogInfo';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';

const initials = {
  kConsumerKey: 'HEZ2CaOwmSPvw18HCB4c',
  kConsumerSecret: 'hVQH0djpGH',
  kServiceAppName: 'espresso',
  kServiceAppUrlScheme: 'dooboolaburlscheme', // only for iOS
};
const naverInit = {
  kConsumerKey: 'jyvqXeaVOVmV',
  kConsumerSecret: '527300A0_COq1_XV33cf',
  kServiceAppName: '네이버 아이디로 로그인하기',
  kServiceAppUrlScheme: 'thirdparty20samplegame', // only for iOS
};

class Page extends Component {
  static defaultProps = {
    name: 'NAVER LOGIN'
  }

  constructor(props) {
    super(props);

    this.state = {
      isNaverLoggingin: false,
      theToken: 'token has not fetched',
      usrId: '',
      usrNm: ''
    };
  }

  // 네이버 프로필 가져오기 - 사용안함
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theToken);
  }

  // 네이버 토큰값 - 시스템 (쿨비즈?) 로그인 하기
  async _SystmeLogin() {
    SnsLogin(this.props.tokenObj, NAVER_CODE).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
      console.log(result);
      if(ResultBool) {
        await AsyncStorage.setItem('AccessToken', result.data.access_token); // AsyncStorage 토큰 저장
        await AsyncStorage.setItem('RefreshToken', result.data.refresh_token); // AsyncStorage 갱신 토큰 저장

        // 사용자 정보 가져오기
        this._getUserInfo()
      } else {
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

  // 네이버 로그인 정보 - 시스템 회원가입 여부 확인
  _certSnsLogInfo = () => {
    CertSnsLogInfo(this.state.theToken, NAVER_CODE).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
      if(ResultBool) {

        await this.props.onSetSnsSignYn('Y');                 // 리덕스 SNS 가입여부 SET
        await this.props.onSetSnsToken(this.state.theToken);  // 리덕스 SNS TOKEN SET
        await this.props.onSetSnsType(NAVER_CODE);            // 리덕스 SNS 타입 SET
        
        Actions.JoinInputName();
        
      } else {
        alert(result.resultMsg);
      }
    });
  }

  // 네이버 로그인 시작 - 시스템 회원가입 / 시스템 로그인 로직
  async naverLoginStart() {
    NaverLogin.login(initials, async (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`);

      // 로그인 페이지에서 접근 시
      if(this.props.loginYn) {
        this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 로그인 여부 SET
        this.props.onSetSnsToken(token);    // 리덕스 SNS TOKEN SET
        
        // 시스템 로그인
        this._SystmeLogin();
      
      // 시스템 회원가입
      } else {
        await this.setState({ theToken: token });
        this._certSnsLogInfo();
      }

      if (err) {
        console.log(err);
        return;
      }
    });
  }

  render() {
    const { theToken } = this.state;
    return (
      // <View style={ styles.container }>
      //   <View>
      //     <NativeButton
      //       isLoading={this.state.isNaverLoggingin}
      //       onPress={() => this.naverLoginStart()}
      //       >
      //       {this.props.name}
      //     </NativeButton>
      //   </View>
      // </View>
      <CustomButton
        block={ true }
        info={ true }
        bordered={ true }
        onPress={() => this.naverLoginStart()}
      ><Text>{this.props.name}</Text>
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
Page = connect(mapStateToProps, mapDispatchToProps)(Page);
export default Page;