import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrPhoneNum } from '../../../Redux/Actions';

import { Item, Input, Form, Root, Text, Toast } from "native-base";
import CustomWrapper from '../../../Common/Components/CustomWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import SendSmsCertNum from '../../Functions/SendSmsCertNum';

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrPhoneNum: '',
    };
  }

  _handleTextChange = event => {
    console.log(event.nativeEvent.text)
  };

  _getAuthNumber = () => {
    console.log("_getAuthNumber");
    //let phoneNumber = event.nativeEvent.text;
    this.props.onSetUsrPhoneNum(this.state.usrPhoneNum); // 리덕스 폰번호 입력

    SendSmsCertNum(this.state.usrPhoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == '0000') ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        // 인증페이지 이동
        Actions.JoinInputPhoneAuth({
          smsSendId: result.smsSendId, 
          certNum : result.certNum
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
          <Text>인증번호를 받을 휴대폰 번호</Text>
          <Form>
            <Item fixedLabel>
                <Input 
                  onChangeText={(text) => this.setState({usrPhoneNum : text})}
                  value={this.state.text}
                  placeholder='010.####.####'
                  keyboardType='numeric'
                  onSubmitEditing={this._getAuthNumber}
                />
            </Item>
          </Form>
          <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={this._getAuthNumber}>
            <Text>
              NEXT
            </Text>
          </CustomButton>
        </CustomWrapper>
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