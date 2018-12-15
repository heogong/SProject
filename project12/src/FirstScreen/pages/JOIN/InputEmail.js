import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw } from '../../../Redux/Actions';

import { Item, Input, Root, Spinner, Text, Toast } from "native-base";
import CustomBasicWrapper from '../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import SignUp from '../../Functions/SignUp';

const USER_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 1;
const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

class InputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrId: '',
      usrPw: '',
      usrPw2: '',
      btnDisabled: true,
      spinner: false
    };
  }

  // 이메일 next 버튼 활성화 여부
  _handleEmailChange = async (text)  => {
    await this.setState({usrId : text});

    if(this.state.usrPw !== '' && this.state.usrPw2 !== '') {
      this.setState({btnDisabled : (this.state.usrId.length > USER_EMAIL_LEN) ? false : true})
    }
  } 

  // 비밀번호 next 버튼 활성화 여부
  _handlePasswdChange = async (text) => {
    await this.setState({usrPw : text});

    if(this.state.usrId !== '' && this.state.usrPw2 !== '') {
        this.setState({btnDisabled : (this.state.usrPw.length > USR_PASSWD_LEN) ? false : true})
    }
  } 

  // 비밀번호 next 버튼 활성화 여부
  _handleChkPasswdChange = async (text) => {
    await this.setState({usrPw2 : text});

    if(this.state.usrId !== '' && this.state.usrPw !== '') {
        this.setState({btnDisabled : (this.state.usrPw2.length > USR_PASSWD_LEN) ? false : true})
    }
  } 

  //이메일 유효성 체크
  _checkUsrEmail = () => {
    if (!emailPattern.test(this.state.usrId)) {
      Toast.show({
        text: "유효하지 않은 이메일 입력입니다.",
        type: "danger",
        buttonText: '확인'
      })
      return true;
    } else {
      return false;
    }
  } 

  // 비밀번호 체크 여부
  _checkUsrPasswd = () => {
    if(this.state.usrPw !== this.state.usrPw2) {
      Toast.show({
        text: "비밀번호가 동일하지 않습니다.",
        type: "danger",
        buttonText: '확인'
      })
      return true;
    } else {
      return false;
    }
  }

  // 회원 가입 프로세스
  async _SignUsr() {
    //이메일 유효성 체크
    const emailVaild = await (this._checkUsrEmail()) ? true : false;
    const passwdVaild = await (this._checkUsrPasswd()) ? true : false;

    if (!emailVaild && !passwdVaild) {
      this.setState({ spinner : true }); // 로딩 start

      await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
      await this.props.onSetUsrPw(this.state.usrPw2);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

      //회원가입
      SignUp(this.props.value).then(async result => {
        const ResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인

        this.setState({ spinner : false }); // 로딩 end

        if (ResultBool) {
        // 메인 페이지 이동

        } else {
          Toast.show({
            text: result.resultMsg,
            type: "warning",
            buttonText: '확인'
          })
        }
      });
    }
  }
  
  
  render() {
    return (
      <Root>
        <CustomBasicWrapper>
          <Text>이메일 주소를 입력해 주세요</Text>
          <Item rounded>
            <Input 
              onChangeText={this._handleEmailChange}
              value={this.state.text}
              placeholder='sample@example.com'
              autoFocus={ true }
              onBlur={ this._checkUsrEmail }
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
          <Item rounded>
            <Input
              secureTextEntry={ true }
              onChangeText={ this._handleChkPasswdChange }
              value={ this.state.text }
              placeholder='비밀번호 확인'
              onBlur={ this._checkUsrPasswd }
            />
          </Item>
          <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            disabled={ this.state.btnDisabled }
            onPress={() => this._SignUsr()}>
            <Text>
              NEXT
            </Text>
          </CustomButton>

          <Spinner color='blue' style={(this.state.spinner) ? styles.show : styles.hide } />

        </CustomBasicWrapper>
      </Root>
    )
  }
}

const styles = StyleSheet.create({
  hide: {
      display: 'none'
  },
  show: {
      display: 'flex'
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
      onSetUsrPw: (value) => dispatch(setUsrPw(value))
  }
}

InputEmail = connect(mapStateToProps, mapDispatchToProps)(InputEmail);
export default InputEmail;
