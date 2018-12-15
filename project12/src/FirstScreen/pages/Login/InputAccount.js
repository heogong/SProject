import React, { Component } from 'react';
import { AsyncStorage } from "react-native"

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw, setAccessToken, setRefreshToken } from '../../../Redux/Actions';

import { Item, Input, Root, Toast, Text } from "native-base";
import CustomBasicWrapper from '../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import Login from '../../Functions/Login';

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

        Actions.ListBusinessPlace();

      } else {
        Toast.show({
          text: '사용자 정보가 올바르지 않습니다.',
          type: "danger",
          buttonText: '확인'
        })
      }
    });
  }
  
  render() {
    return (
      <Root>
        <CustomBasicWrapper>
          <Item rounded>
            <Input
              onChangeText={ this._handleEmailChange }
              value={ this.state.text }
              placeholder='sample@example.com'
              autoFocus={ true }
            />
          </Item>
          <Item rounded>
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
      </Root>
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
