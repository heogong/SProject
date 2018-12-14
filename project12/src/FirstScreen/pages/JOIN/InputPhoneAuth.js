import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { Item, Input, Form, Root, Text, Toast } from "native-base";
import CustomWrapper from '../../../Common/Components/CustomWrapper';
import CustomButton from '../../../Common/Components/CustomButton';

import SignUp from '../../Functions/SignUp';
import CheckUsr from '../../Functions/CheckUsr';
import CheckSmsCertNum from '../../Functions/CheckSmsCertNum';

class InputPhoneAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      InpuCertNum: '',
      SmsResultMsg: ''
    };
  }

  _checkSmsCertNum = () => {
    // SMS 인증 확인
    CheckSmsCertNum(this.props.smsSendId, this.state.InpuCertNum).then(async result => {
      const CertResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인

      // SMS 인증 정상 여부
      if(CertResultBool) {

        // 가입 여부 확인
        CheckUsr(this.props.value.usrPhoneNum).then(async result => {
          const UsrResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인

          if (UsrResultBool) {
            // SNS 가입 여부 확인
            if(this.props.value.snsSignupYn == 'Y'){

              // 회원가입
              SignUp(this.props.value).then(async result => {
                const SignUpResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인
                if (SignUpResultBool) {
                
                  // 페이지 이동

                } else {
                  await Toast.show({
                    text: result.resultMsg,
                    type: "danger",
                    buttonText: '확인'
                  })

                  Actions.InitPage();
                }
              });
            } else {
              Actions.JoinInputEmail();
            }
          } else {
            await Toast.show({
              text: result.resultMsg,
              type: "danger",
              buttonText: '확인'
            })
            //Actions.popTo('JoinInputName'); // 뒤로가면서 기존페이지로 이동하는 듯;;
            Actions.pageOne();
          }
        });
        
      } else {
        Toast.show({
          text: result.resultMsg,
          type: "danger",
          buttonText: '확인'
        })
      }
    })
  };

  render() {
    return (
      <Root>
        <CustomWrapper>
          {/* <Text>인증번호 입력</Text>
          <Text>인증ID : {this.props.smsSendId} </Text>
          <Text>인증번호 : {this.props.certNum} </Text> */}
          
          
            <Item rounded >
              <Input 
                onChangeText={(text) => this.setState({InpuCertNum: text})}
                value={this.state.text}
                keyboardType='numeric'
                onSubmitEditing={this._checkSmsCertNum}
                placeholder='Rounded Textbox'
              />
            </Item>

          <Text>{this.state.SmsResultMsg}</Text>
        </CustomWrapper>
      </Root>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

InputPhoneAuth = connect(mapStateToProps)(InputPhoneAuth);

export default InputPhoneAuth;