import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrPhoneNum } from '../../../Redux/Actions';

import { Item, Input, Root, Text, Toast } from "native-base";
import CustomBasicWrapper from '../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import SendSmsCertNum from '../../Functions/SendSmsCertNum';

const USER_PHONE_LEN = 9; //최소 번호 길이
class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrPhoneNum: '',
      btnDisabled: true
    };
  }

  // 전화번호 next 버튼 활성화 여부
  _handleNumberChange = async (text)  => {
    await this.setState({usrPhoneNum : text})
    this.setState({btnDisabled : (this.state.usrPhoneNum.length > USER_PHONE_LEN) ? false : true})
  } 

  // 인증번호 API 호출
  _getAuthNumber = () => {
    //let phoneNumber = event.nativeEvent.text;
    this.props.onSetUsrPhoneNum(this.state.usrPhoneNum); // 리덕스 폰번호 입력

    SendSmsCertNum(this.state.usrPhoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        // 인증페이지 이동
        Actions.JoinInputPhoneAuth({
          smsSendId: result.data.smsSendId, 
          certNum : result.data.certNum
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
        <CustomBasicWrapper>
          <Text>인증번호를 받을 휴대폰 번호</Text>
            <Item rounded>
              <Input 
                onChangeText={ this._handleNumberChange }
                value={this.state.text}
                placeholder='010.####.####'
                keyboardType='numeric'
                onSubmitEditing={this._getAuthNumber}
              />
            </Item>
          <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            disabled={ this.state.btnDisabled }
            onPress={this._getAuthNumber}>
            <Text>
              NEXT
            </Text>
          </CustomButton>
        </CustomBasicWrapper>
      </Root>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrPhoneNum: (value) => dispatch(setUsrPhoneNum(value))
  }
}
InputPhone = connect(undefined, mapDispatchToProps)(InputPhone);
export default InputPhone;