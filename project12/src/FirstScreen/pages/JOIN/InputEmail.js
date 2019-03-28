import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Container, Text, Item, Input, Icon } from "native-base";

import { SUCCESS_RETURN_CODE, OVER_LAP_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw } from '~/Redux/Actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CheckUsrEmail from '~/FirstScreen/Functions/CheckUsrEmail';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const USER_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 8;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;
const PASSWD_PATTERN = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

class InputEmail extends Component {
  constructor(props) {
    super(props);

    this.secondTextInput = null;
    this.thirdTextInput = null;
    
    this.state = { 
      usrId: '',
      usrPw: '',
      usrPw2: '',
      btnDisabled: true,
      patternPw : false,
      errMsg : null,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  // componentWillMount () {
  //   // 고객 구분에 따른 뒤로 가기 페이지 
  //   HISTORY_PAGE = (this.props.value.usrCustomerType == PARTNER) ? "JoinInputPhone" : "JoinInputName";

  // }

  _ChkOverLapUsrEmail = () => {
    CheckUsrEmail(this.state.usrId).then(async result => {
      const resultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
      if(resultBool) {
        if(result.resultCode !== OVER_LAP_RETURN_CODE) {
          await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
          await this.props.onSetUsrPw(this.state.usrPw2);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

          // 기획서에 따른 이름 입력
          Actions.JoinInputName();
        } else {
          this.setState({
            isAlertModal : true,
            resultMsg : result.resultMsg
          })
        }
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg
        })
      }
    });
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

    if(!PASSWD_PATTERN.test(text)) {
      this.setState({
        patternPw : false,
        btnDisabled : true
      });
      
    } else {
      this.setState({patternPw : true});

      if(this.state.usrId !== '' && this.state.usrPw2 !== '') {
        this.setState({btnDisabled : (this.state.usrPw.length > USR_PASSWD_LEN) ? false : true})
      }

    }
  } 

  // 비밀번호 next 버튼 활성화 여부
  _handleChkPasswdChange = async (text) => {
    await this.setState({usrPw2 : text});

    if(!PASSWD_PATTERN.test(text)) {
      this.setState({
        btnDisabled : true
      });
    } else {
      if(this.state.usrId !== '' && this.state.usrPw !== '') {
        this.setState({btnDisabled : (this.state.usrPw2.length > USR_PASSWD_LEN) ? false : true})
      }
    }
  } 

  //이메일 유효성 체크
  _checkUsrEmail = () => {
    if (!EMAIL_PATTERN.test(this.state.usrId)) {
      this.setState({errMsg : '유효하지 않은 이메일 입력입니다.'});
      return false;
    } else {
      this.setState({errMsg : ''});
      return true;
    }
  } 

  // 비밀번호 체크 여부
  _checkUsrPasswd = () => {
    if(this.state.usrPw !== this.state.usrPw2) {
      this.setState({errMsg : '비밀번호가 맞지 않습니다.'});
      return false;
    } else {
      this.setState({errMsg : ''});
      return true;
    }
  }

  // 회원 가입 프로세스
  async _SignUsr() {
    //이메일 유효성 체크
    const emailVaild = await (this._checkUsrEmail());
    const passwdVaild = await (this._checkUsrPasswd());

    if (emailVaild && passwdVaild) {

      this._ChkOverLapUsrEmail();

    }
  }
  
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Container style={styles.containerInnerPd}>
          <CustomHeader />
          <View style={styles.contentWrap}>
            <View>
              <View style={styles.fxDirRow}>
                <View style={stylesReg.leftGuideTxtWrap}>
                  <Text style={stylesReg.leftGuideTxt}>이메일주소와</Text>
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
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOff} />
                </View>
              </View>
            </View>
            <View style={[styles.fx3, styles.justiConCenter]}>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
                <Input 
                  placeholder="이메일주소" 
                  placeholderTextColor={color.inputPlaceHodler} 
                  style={styles.inputDefaultBox}
                  onChangeText={this._handleEmailChange}
                  value={this.state.text}
                  autoFocus={ true }
                  onSubmitEditing={() => { this.secondTextInput._root.focus(); }}
                />
              </Item>

              <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
                <Input
                  placeholder="비밀번호(영문+숫자+특수문자조합 8~16자리)"
                  placeholderTextColor={color.inputPlaceHodler}
                  style={styles.inputDefaultBox}
                  ref={(input) => { this.secondTextInput = input; }}
                  secureTextEntry={ true }
                  onChangeText={ this._handlePasswdChange }
                  value={ this.state.text }
                  placeholder="비밀번호(영문,숫자,특수문자8-15자)" 
                  onSubmitEditing={() => { this.thirdTextInput._root.focus(); }}
                  />
                  <Icon name={this.state.patternPw ? "ios-checkmark-circle" : "ios-close-circle"} style={[styles.inputIcon, {color: color.defaultColor}]} />
              </Item>

              <Item regular style={[styles.mb10, styles.inputWhBackGreyBo]}>
                <Input
                    placeholder="비밀번호 확인"
                    placeholderTextColor={color.inputPlaceHodler}
                    style={styles.inputDefaultBox}
                    ref={(input) => { this.thirdTextInput = input; }}
                    secureTextEntry={ true }
                    onChangeText={ this._handleChkPasswdChange }
                    value={ this.state.text }
                    onBlur={ this._checkUsrPasswd }
                />
              </Item>

              <Text style={{color: color.warningColor, fontSize: 13}}>{this.state.errMsg}</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={() => this._SignUsr()}
                disabled={ this.state.btnDisabled }
              >
                다음단계로
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
