import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import Button from '../../../COMMON/components/Button';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { setValue } from '../../../REDUX/actions';

/////////////////////////
const API_URL = 'http://52.79.226.14:8180/coolinic/sms/sendSmsCertNum?';
function SmsCertUrl(number) {
  return `${API_URL}usrPhoneNum=${number}`;
}

function sendSmsCertNum(number) {
  let smsSendId = '';
  let certNum = '';

  return fetch(SmsCertUrl(number), {method : 'post'})
      .then(response => response.json())
      .then(responseJSON => {
        smsSendId = (responseJSON.resultCode == '0000') ? responseJSON.data.smsSendId : '';
        certNum = (responseJSON.resultCode == '0000') ? responseJSON.data.certNum : '';
        return {
          smsSendId : smsSendId,
          certNum : certNum
        };
        
      })
      .catch(error => {
          console.error(error);
      })
}
/////////////////////////

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrPhoneNum: '',
      authValues: ''
    };
  }

  _handleTextChange = event => {
    console.log(event.nativeEvent.text)
  };

  _getAuthNumber = () => {
    //let phoneNumber = event.nativeEvent.text;
    this.props.onSetValue(this.state); // 리덕스 폰번호 입력
    
    sendSmsCertNum(this.state.usrPhoneNum).then(result => {
      this.setState({ authValues: result });
      // 인증페이지 이동
      Actions.JoinInputPhoneAuth({
        smsSendId: this.state.authValues.smsSendId, 
        certNum : this.state.authValues.certNum
      });
    })
  };

  
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>인증번호를 받을 휴대폰 번호</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({usrPhoneNum : text})}
          value={this.state.text}
          placeholder='010.####.####'
          keyboardType='numeric'
          onSubmitEditing={this._getAuthNumber}
        />
      </View>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetValue: (value) => dispatch(setValue(value))
  }
}
InputPhone = connect(undefined, mapDispatchToProps)(InputPhone);
export default InputPhone;