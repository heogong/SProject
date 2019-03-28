import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrNm, setSnsSignYn } from '~/Redux/Actions';

import { Item, Input, Text } from "native-base";
import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

const USER_NM_LEN = 1;
class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrNm: '',
      btnDisabled: true
    };
  }

  // 이름 next 버튼 활성화 여부
  _handleChange = (text) => {
    this.setState({usrNm : text})

    if(this.state.usrNm !== '') {
        this.setState({btnDisabled : (this.state.usrNm.length > USER_NM_LEN) ? false : true})
    }
  } 

  _nextButton = () => {
    this.props.onSetUsrNm(this.state.usrNm);  // 리덕스 사용자 이름 SET
    Actions.NoneMemInputPhone();
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
        <CustomBasicWrapper
          title="고객 이름"
        >
          {/* <Text>고객명을 입력해주세요</Text> */}

          <Item regular>
              <Input
                onChangeText={ this._handleChange }
                value={ this.state.text }
                placeholder='이름을 입력해주세요.'
                autoFocus={ true }
              />
          </Item>

          <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            disabled={ this.state.btnDisabled }
            onPress={ this._nextButton }>
            <Text>
            다음 단계로 이동(1/9)
            </Text>
          </CustomButton>
        </CustomBasicWrapper>
      </KeyboardAvoidingView>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrNm: (value) => dispatch(setUsrNm(value))
  }
}

InputName = connect(undefined, mapDispatchToProps)(InputName);

export default InputName;