import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId } from '../../../Redux/Actions';
import Button from '../../../Common/Components/Button';
import SignUp from '../../Functions/SignUp';

class InputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { usrId: '' };
  }

  async _SignUsr() {
    await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)

    //회원가입
    SignUp(this.props.value).then(result => {
      alert(result.msg);

      if (result.code == '0000') {
      // 페이지 이동

      } else {
        //Alert.alert(result.msg);
        //Actions.InitPage();
      }
    });
    
  }
  
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>이메일 주소가 어떻게 되십니까?</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({usrId: text})}
          value={this.state.text}
          placeholder='sample@example.com'
        />
       
        <Button onPress={() => this._SignUsr()}>
          <Text>
           가입
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
      onSetUsrId: (value) => dispatch(setUsrId(value))
  }
}

InputEmail = connect(mapStateToProps, mapDispatchToProps)(InputEmail);
export default InputEmail;
