import React, { Component } from 'react';
import{ Alert, KeyboardAvoidingView } from 'react-native';
import { Item, Input, Root, Text, Toast } from "native-base";

import { SUCCESS_RETURN_CODE, CLIENT_USER, PARTNER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import CheckSmsCertNum from '~/FirstScreen/Functions/CheckSmsCertNum';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

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
        // 사업장 이름 입력 페이지 이동
        
      } else {
        Alert.alert(
          '',
          result.resultMsg,
          [
            {text: '네', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    })
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
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
                autoFocus={ true }
              />
            </Item>

            <CustomButton
              block={ true }
              info={ true }
              bordered={ true }
              disabled={ this.state.btnDisabled }
              onPress={this._checkSmsCertNum}>
              <Text>
              다음 단계로 이동(3/9)
              </Text>
            </CustomButton>
        </CustomBasicWrapper>
      </KeyboardAvoidingView>
    )
  }
}
export default InputPhoneAuth;