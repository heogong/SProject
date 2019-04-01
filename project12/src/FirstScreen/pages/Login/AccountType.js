import React, { Component } from 'react';
import { AsyncStorage, Alert, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  Icon,
  Text,
  Item,
  Input,
  CheckBox
} from "native-base";
 
import { SUCCESS_RETURN_CODE, CLIENT_USER, CLIENT } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw, setUsrNm, setUsrPhoneNum, setAccessToken, setRefreshToken } from '~/Redux/Actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';

import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

import Login from '~/FirstScreen/Functions/Login';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportHeight } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

const USR_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 1;

const ERROR_MSG = {
  invaildIdOrPaswwd : 'invalid_grant',
  emptyAccount :'unauthorized'
}

class AccountType extends Component {
  constructor(props) {
    super(props);

    this.secondTextInput = null;
    
    this.state = {
      usrId: '', 
      usrPw: '',
      btnDisabled: true,
      checkBox : false,
      logImg : require('~/Common/Image/logo-partner.png'),
      spinner : false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  componentWillMount() {
    if(this.props.value.usrCustomerType == CLIENT) {
      this.setState({logImg : require('~/Common/Image/logo-user.png')})
    }
  }

  // 아아디(이메일) next 버튼 활성화 여부
  _handleEmailChange = async (text) => {
    await this.setState({usrId : text})

    if(this.state.usrPw !== '') {
        this.setState({btnDisabled : (this.state.usrId.length > USR_EMAIL_LEN) ? false : true})
    }
  } 

  // 비밀번호 next 버튼 활성화 여부
  _handlePasswdChange = async (text) => {
    await this.setState({usrPw : text})

    if(this.state.usrId !== '') {
        this.setState({btnDisabled : (this.state.usrPw.length > USR_PASSWD_LEN) ? false : true})
    }
  }

  // 이메일 로그인 프로세스
  async _login() {
    this.setState({spinner : true}); // 로딩 모달 시작

    await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
    await this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

    Login(this.props.value, undefined).then(async result => {
      console.log(result);

      if(result.error == ERROR_MSG.emptyAccount) {
        this.setState({
          isAlertModal : true,
          resultMsg : "등록된 아이디가 없습니다.",
          spinner : false
        })
      } else if(result.error == ERROR_MSG.invaildIdOrPaswwd) {
        this.setState({
          isAlertModal : true,
          resultMsg : "아이디 또는 비밀번호 올바르지 않습니다.",
          spinner : false
        })
      } else { // 로그인 성공
        this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET 
        this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET

        this.props.onSetAccessToken(result.access_token); // 리덕스 액세스 토큰 SET
        this.props.onSetRefreshToken(result.refresh_token); // 리덕스 갱신 토큰 SET

        await AsyncStorage.setItem('AccessToken', result.access_token); // AsyncStorage 토큰 저장
        await AsyncStorage.setItem('RefreshToken', result.refresh_token); // AsyncStorage 갱신 토큰 저장

        this._getUserInfo();
      }
    });
  }

  // 로그인(토큰값 가져온) 사용자 정보 가져오기
  _getUserInfo = () => {
    GetUserInfo().then(async result => {
      GetCommonData(result, this._getUserInfo).then(async resultData => {
        console.log(result);
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

              if(ResultBool) {

                this.props.onSetUsrNm(resultData.data.usrNm);  // 리덕스 사용자 이름 SET
                this.props.onSetUsrPhoneNum(resultData.data.usrPhoneNum); // 리덕스 사용자 번호 SET

                // 클라이언트 사용자
                if(resultData.data.usrTypeCd == CLIENT_USER) {
                  Actions.ClientMain();
                } else { // 파트너 사용자
                  Actions.PartnerMain();
                }
              } else {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
              }
              this.setState({spinner : false}); // 로딩 모달 종료
          }
      });
    });
  }

  _goToAccountType = () => {
    Actions.popTo("InitPage");
  }

  render() {
    const loginYn = true; // 진입 경로(로그인/회원가입) 확인

    return (
      // <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
      <KeyboardAwareScrollView enableOnAndroid={true} style={styles.containerInnerPd}>
        <Spinner
            visible={this.state.spinner}
            textContent={'로그인중입니다.'}
            textStyle={styles.whiteFont}
            style={{color: color.whiteColor}}
        />
        <CustomHeader  customAction={this._goToAccountType}/>

        <View style={styles.fx1}>

          <View style={localStyles.logoImgWrap}>
            <Image source={this.state.logImg} resizeMode='contain' style={localStyles.logoImg} />
          </View>

          <View style={styles.fx1}>
            <Text style={[styles.mb10, {textAlign: "center", fontSize: 13, color: "#8e8e98"}]}>쿨리닉의 회원이 되시면 다양한 혜택을 누리실 수 있습니다</Text>
            <View style={localStyles.inputBoxWrap}>
              <Item regular style={[styles.mb12, styles.inputWhBackWhBo]}>
                <Icon active name="mail" style={localStyles.inputIcon}/>
                <Input 
                  onChangeText={ this._handleEmailChange }
                  value={ this.state.text }
                  placeholder="이메일" 
                  style={styles.inputBox} 
                  placeholderTextColor={color.inputPlaceHodler}
                  onSubmitEditing={() => { this.secondTextInput._root.focus(); }}
                />
              </Item>

              <Item regular style={[styles.mb20, styles.inputWhBackWhBo]}>
                <Icon active name="lock" style={localStyles.inputIcon}/>
                <Input 
                  ref={(input) => { this.secondTextInput = input; }}
                  onChangeText={ this._handlePasswdChange }
                  value={ this.state.text }
                  placeholder="비밀번호(영문, 숫자, 특수문자 8~15자)" 
                  style={styles.inputBox} 
                  placeholderTextColor={color.inputPlaceHodler}
                  secureTextEntry={true}
                  onSubmitEditing={() => this._login()}
                />
              </Item>

              {/* <View style={[styles.justiConBetween, styles.fxDirRow, styles.mb20]}> 
                <View style={styles.fxDirRow}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={styles.checkboxReset}
                  />
                  <Text style={localStyles.inputBottomTxt}>자동로그인</Text>
                </View> */}
              <View style={[styles.alignItemsEnd, styles.mb20]}>
                <View>
                  <TouchableOpacity onPress={Actions.InvaildId}>
                    <Text style={[localStyles.inputBottomTxt, {textDecorationLine: 'underline'}]}>아이디와 비밀번호를 잊으셨나요?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.fxDirRow, styles.mb20]}>
                <View style={styles.fx1}>
                  <CustomButton 
                    onPress={Actions.JoinAccountType}
                    WhiteLineBtn={true}
                  >
                    회원가입
                  </CustomButton>
                </View>
                <View style={{paddingLeft: 6, paddingRight: 6}}></View>
                <View style={styles.fx1}>
                  <CustomButton 
                    onPress={() => this._login()}
                    WhiteBackBtn={true}
                  >
                    로그인
                  </CustomButton>
                </View>
              </View>

              <View style={styles.alignItemsCenter}>
                <Text style={{fontWeight: 'bold', color:'#fff', fontSize: 16, letterSpacing: 0, marginBottom : 14}}>SNS LOGIN</Text>

                <View style={styles.fxDirRow}>
                  <View style={[localStyles.snsIcon, {marginRight: 16}]}>
                    <NaverLogin loginYn={ loginYn }/>
                  </View>
                  <View style={[localStyles.snsIcon]}>
                    <KakaoLogin loginYn={ loginYn }/>
                  </View>
                </View>
              </View>
          </View>
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
      </KeyboardAwareScrollView>
    )
  }
}

const localStyles = StyleSheet.create({
  inputIcon: {
    color: color.inputPlaceHodler,
    fontSize: 20,
    paddingLeft: 9,
    paddingRight: 7
  },
  inputBoxWrap: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 35,
    paddingBottom: 25,
    marginBottom: 26,
    backgroundColor : color.defaultColor
  },
  checkBox: {
    borderColor: color.defaultColor,
    backgroundColor: color.defaultColor
  },
  inputBottomTxt: {
    fontSize: 13,
    color: color.whiteColor,
    marginTop: 2
  },
  snsIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    height: 60,
    width: 60
  },
  logoImgWrap: {
    paddingTop: 30, paddingBottom: 30, alignItems: "center"
  },
  logoImg: {
    width: 128,
    height: 128
  }
});


let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrPw: (value) => dispatch(setUsrPw(value)),
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetUsrPhoneNum: (value) => dispatch(setUsrPhoneNum(value)),
      onSetAccessToken: (value) => dispatch(setAccessToken(value)),
      onSetRefreshToken: (value) => dispatch(setRefreshToken(value))
  }
}

AccountType = connect(mapStateToProps, mapDispatchToProps)(AccountType);
export default AccountType;
