import React, { Component } from 'react';
import{ Alert } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Item, Input, Root, Text, Toast } from "native-base";
import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

import SnsSignUp from '../../Functions/SnsSignUp';
import CheckUsr from '../../Functions/CheckUsr';
import CheckSmsCertNum from '../../Functions/CheckSmsCertNum';

const CERT_LEN = 4
class InputPhoneAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      InpuCertNum: '',
      btnDisabled: true
    };
  }

  // 인증번호 next 버튼 활성화 여부
  _handleNumberChange = async (text)  => {
    await this.setState({InpuCertNum : text})
    this.setState({btnDisabled : (this.state.InpuCertNum.length > CERT_LEN) ? false : true})
  } 

  _checkSmsCertNum = () => {
    // SMS 인증 확인
    CheckSmsCertNum(this.props.smsSendId, this.state.InpuCertNum).then(async result => {
      const CertResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      // SMS 인증 정상 여부
      if(CertResultBool) {

        // 가입 여부 확인
        CheckUsr(this.props.usrObj.usrPhoneNum).then(async result => {
          const UsrResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

          if (UsrResultBool) {
            // SNS 가입 여부 확인
            if(this.props.usrObj.snsSignupYn == 'Y'){

              // 회원가입
              SnsSignUp(this.props.usrObj, this.props.tokenObj).then(async result => {
                const SignUpResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                if (SignUpResultBool) {
                
                  // 메인 페이지 이동

                } else {
                  Toast.show({
                    text: result.resultMsg,
                    type: "danger",
                    buttonText: '확인',
                    duration: 5000
                  })

                  //Actions.InitPage();
                }
              });
            } else {
              // SNS 가입 아닐경우 이메일 입력 이동
              Actions.JoinInputEmail();
            }
          } else {
            // Toast.show({
            //   text: result.resultMsg,
            //   type: "warning",
            //   buttonText: "이동",
            //   duration: 5000,
            //   onClose : this._closeMoveAccountType
            // })
            Alert.alert(
              '',
              `${result.resultMsg} - 로그인 페이지로 이동하시겠습니까?`,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '네', onPress: () => this._closeMoveAccountType},
              ],
              { cancelable: false }
            )
          }
        });
        
      } else {
        // Toast.show({
        //   text: result.resultMsg,
        //   type: "danger",
        //   buttonText: '확인'
        // })

        Alert.alert(
          '',
          result.resultMsg,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //{text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '네', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    })
  };

  // 이미 가입된 대상자 화면 이동
  _closeMoveAccountType = () => {
    Actions.LoginAccountType();
  }

  render() {
    return (
      <Root>
        <CustomBasicWrapper
          title="본인 인증"
        >
          <Text>인증번호 입력</Text>
          <Text>인증ID : {this.props.smsSendId} </Text>
          <Text>인증번호 : {this.props.certNum} </Text>
          
            <Item regular >
              <Input 
                onChangeText={this._handleNumberChange}
                value={this.state.text}
                keyboardType='numeric'
                onSubmitEditing={this._checkSmsCertNum}
                placeholder='######'
                maxLength={ CERT_LEN + 2 }
              />
            </Item>

            <CustomButton
              block={ true }
              info={ true }
              bordered={ true }
              disabled={ this.state.btnDisabled }
              onPress={this._checkSmsCertNum}>
              <Text>
                NEXT
              </Text>
            </CustomButton>
        </CustomBasicWrapper>
      </Root>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      usrObj: state.USER,
      tokenObj: state.TOKEN

  };
}

InputPhoneAuth = connect(mapStateToProps)(InputPhoneAuth);

export default InputPhoneAuth;