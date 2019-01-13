import React, { Component } from 'react';
import { AsyncStorage, Alert, KeyboardAvoidingView } from "react-native"
import { Item, Input, Root, Text } from "native-base";

import { SUCCESS_RETURN_CODE, CLIENT_USER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw, setAccessToken, setRefreshToken } from '~/Redux/Actions';

import Login from '../../Functions/Login';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

const USR_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 1;

class InputAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrId: '', 
      usrPw: '',
      btnDisabled: true 
    };
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
  async _Login() {
    await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
    await this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

    Login(this.props.value, undefined).then(async result => {
      console.log(result);
      const ResultBool = await (result.error) ? false : true; // API 결과 여부 확인

      // 로그인 성공
      if(ResultBool) {
        // 메인 페이지 이동

        this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET 
        this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET

        this.props.onSetAccessToken(result.access_token); // 리덕스 액세스 토큰 SET
        this.props.onSetRefreshToken(result.refresh_token); // 리덕스 갱신 토큰 SET

        await AsyncStorage.setItem('AccessToken', result.access_token); // AsyncStorage 토큰 저장
        await AsyncStorage.setItem('RefreshToken', result.refresh_token); // AsyncStorage 갱신 토큰 저장

        this._getUserInfo();

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
  
  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
        <CustomBasicWrapper
          title="이메일 로그인"
        >
          <Item regular>
            <Input
              onChangeText={ this._handleEmailChange }
              value={ this.state.text }
              placeholder='sample@example.com'
              autoFocus={ true }
            />
          </Item>
          <Item regular>
            <Input
              secureTextEntry={ true }
              onChangeText={ this._handlePasswdChange }
              value={ this.state.text }
              placeholder='비밀번호'
            />
          </Item>
          <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            disabled={ this.state.btnDisabled }
            onPress={() => this._Login()} >
            <Text>
              로그인
            </Text>
          </CustomButton>
        </CustomBasicWrapper>
      </KeyboardAvoidingView>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrPw: (value) => dispatch(setUsrPw(value)),
      onSetAccessToken: (value) => dispatch(setAccessToken(value)),
      onSetRefreshToken: (value) => dispatch(setRefreshToken(value))
  }
}

InputAccount = connect(mapStateToProps, mapDispatchToProps)(InputAccount);
export default InputAccount;
