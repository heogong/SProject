import React, { Component } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';

import Button from '../../../COMMON/components/Button';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SignUp from '../../components/SignUp';

//////////////sms 인증///////////
const API_URL = 'http://52.79.226.14:8180/coolinic/sms/checkSmsCertNum?';

function SmsCertUrl(sendId, number) {
  return `${API_URL}smsSendId=${sendId}&certNum=${number}`;
}

function sendSmsCertNum(sendId, number) {
  return fetch(SmsCertUrl(sendId, number), {method : 'post'})
      .then(response => response.json())
      .then(responseJSON => {
        return {
          code: responseJSON.resultCode,
          msg : responseJSON.resultMsg
        };
        
      })
      .catch(error => {
          console.error(error);
      })
}
//////////////sms 인증///////////

class InputPhoneAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      InpuCertNum: ''
    };
  }

  _checkSmsCertNum = () => {
    sendSmsCertNum(this.props.smsSendId, this.state.InpuCertNum).then(result => {
      //console.log(result);

      alert(result.msg);
      
      if(result.code == '0000') {
        // 회원가입
        //console.log("value  :",this.props.value)
        SignUp(this.props.value).then(result => {
          if (result.code == '0000') {
          // 페이지 이동

          } else {
            Alert.alert(result.msg);
            Actions.InitPage();
          }
        });
      }
    })
  };

  render() {
    return (
      <View style={{margin: 128}}>
        <Text>인증번호 입력</Text>
        <Text>인증ID : {this.props.smsSendId} </Text>
        <Text>인증번호 : {this.props.certNum} </Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({InpuCertNum: text})}
          value={this.state.text}
          placeholder=''
          keyboardType='numeric'
          onSubmitEditing={this._checkSmsCertNum}
        />
      </View>
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