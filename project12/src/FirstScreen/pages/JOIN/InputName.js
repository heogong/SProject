import React, { Component } from 'react';

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
  
  // componentDidMount () {
  //   this.props.onSetSnsSignYn('N');  // 리덕스 SNS 가입여부 SET
  // }

  // 이름 next 버튼 활성화 여부
  _handleChange = (text) => {
    this.setState({usrNm : text})

    if(this.state.usrNm !== '') {
        this.setState({btnDisabled : (this.state.usrNm.length > USER_NM_LEN) ? false : true})
    }
  } 

  _NextButton = () => {
    this.props.onSetUsrNm(this.state.usrNm);  // 리덕스 사용자 이름 SET
    Actions.JoinInputPhone();
  }
  
  render() {
    return (
      <CustomBasicWrapper
        title="고객 이름"
      >
        {/* <Text>고객명을 입력해주세요</Text> */}

        <Item rounded>
            <Input
              onChangeText={ this._handleChange }
              value={ this.state.text }
              placeholder='홍길동'
              autoFocus={ true }
            />
        </Item>

        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          disabled={ this.state.btnDisabled }
          onPress={ this._NextButton }>
          <Text>
            NEXT
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetSnsSignYn: (value) => dispatch(setSnsSignYn(value))
  }
}

InputName = connect(undefined, mapDispatchToProps)(InputName);

export default InputName;