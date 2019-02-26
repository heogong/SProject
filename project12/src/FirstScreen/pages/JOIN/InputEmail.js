import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Container, Text, Item, Input, Icon } from "native-base";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw } from '~/Redux/Actions';

import SignUp from '../../Functions/SignUp';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const USER_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 1;
const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

let HISTORY_PAGE;

class InputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrId: '',
      usrPw: '',
      usrPw2: '',
      btnDisabled: true,
      errMsg : null
    };
  }

  // componentWillMount () {
  //   // 고객 구분에 따른 뒤로 가기 페이지 
  //   HISTORY_PAGE = (this.props.value.usrCustomerType == PARTNER) ? "JoinInputPhone" : "JoinInputName";

  // }

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
      this.setState({errMsg : '유효하지 않은 이메일 입력입니다.'});
    //   Alert.alert(
    //     '',
    //     "유효하지 않은 이메일 입력입니다.",
    //     [
    //       {text: '확인', onPress: () => console.log('OK Pressed')},
    //     ],
    //     { cancelable: false }
    //   )
    //   return false;
    // } else {
    //   return true;
    // }
    }
  } 

  // 비밀번호 체크 여부
  _checkUsrPasswd = () => {
    if(this.state.usrPw !== this.state.usrPw2) {
      this.setState({errMsg : '비밀번호가 맞지 않습니다.'});
    }

    //   Alert.alert(
    //     '',
    //     "비밀번호가 동일하지 않습니다.",
    //     [
    //       {text: '확인', onPress: () => console.log('OK Pressed')},
    //     ],
    //     { cancelable: false }
    //   )
    //   return false;
    // } else {
    //   return true;
    // }
  }

  // 회원 가입 프로세스
  async _SignUsr() {
    //이메일 유효성 체크
    const emailVaild = await (this._checkUsrEmail());
    const passwdVaild = await (this._checkUsrPasswd());

    if (emailVaild && passwdVaild) {

      await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
      await this.props.onSetUsrPw(this.state.usrPw2);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

      // 기획서에 따른 이름 입력
      Actions.JoinInputName();

      //회원가입
      // SignUp(this.props.value).then(async result => {
      //   const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      //   if (ResultBool) {
      //     console.log(result);

      //     // 고객 타입에 따른 페이지 이동
      //     if(this.props.value.usrCustomerType == PARTNER) {
      //       Actions.JoinInputBizLicense(); // 사업자 등록 페이지
            
      //     } else {
      //       //Actions.BusinessIndex(); // 사업장 제품 등록
      //       Actions.CardIndex();
      //     }

      //   } else {
      //     Alert.alert(
      //       '',
      //       result.resultMsg,
      //       [
      //         {text: '확인', onPress: () => console.log('OK Pressed')},
      //       ],
      //       { cancelable: false }
      //     )
      //   }
      // });
    }
  }
  
  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>이메일 주소와</Text>
                <Text style={stylesReg.leftGuideTxt}>비밀번호를</Text>
                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>01</Text>
              </View>
            </View>
            
            <View style={stylesReg.procBarWrap}>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
            </View>
          </View>
          <View style={[styles.fx2, styles.justiConCenter]}>
            <Item regular style={[styles.mb15, {height : 48}]}>
              <Input 
                placeholder="이메일" 
                onChangeText={this._handleEmailChange}
                value={this.state.text}
                autoFocus={ true }
              />
            </Item>

            <Item regular style={[styles.mb15, {height : 48}]}>
              <Input 
                secureTextEntry={ true }
                onChangeText={ this._handlePasswdChange }
                value={ this.state.text }
                placeholder="비밀번호(영문,숫자,특수문자8-15자)" 
              />
            </Item>

            <Item regular style={{height : 48}}>
              <Input 
                secureTextEntry={ true }
                onChangeText={ this._handleChkPasswdChange }
                value={ this.state.text }
                onBlur={ this._checkUsrPasswd }
                placeholder="비밀번호 확인" />
              <Icon name="ios-checkmark-circle" style={{color:color.defautlColor}}/>
            </Item>

            <Text style={[localStyles.redFont, {paddingLeft : 5}]}>{this.state.errMsg}</Text>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={() => this._SignUsr()}
              disabled={ this.state.btnDisabled }
              edgeFill={true}
              fillTxt={true}
            >
              다음단계로
            </CustomButton>
          </View>
        </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  redFont : {
    color : '#FF0000',
    fontSize : 15
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
