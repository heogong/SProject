import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw } from '../../../Redux/Actions';
import Button from '../../../Common/Components/Button';
import login from '../../Functions/Login';


class InputAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { usrId: '', usrPw: '' };
  }

  async _Login() {
    await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
    await this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

    login(this.props.value, undefined).then(result => {
      console.log(result);
    });
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>이메일 로그인</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({usrId: text})}
          value={this.state.text}
          placeholder='sample@example.com'
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({usrPw: text})}
          value={this.state.text}
          placeholder='비밀번호'
        />
       

        <Button  onPress={() => this._Login()}>
          <Text>
           로그인
          </Text>
        </Button>

      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrPw: (value) => dispatch(setUsrPw(value)),
  }
}

InputAccount = connect(mapStateToProps, mapDispatchToProps)(InputAccount);
export default InputAccount;
