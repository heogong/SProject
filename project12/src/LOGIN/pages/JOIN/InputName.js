import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrNm } from '../../../REDUX/actions';
import Button from '../../../COMMON/components/Button';

class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  _NextButton = () => {
    this.props.onSetUsrNm(this.state.name);  // 리덕스 사용자 이름 SET
    Actions.JoinInputPhone();
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>고객명을 입력해주세요</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='홍길동'
        />

        <Text>VALUE: { this.props.value }</Text>

        <Button onPress={this._NextButton}>
          <Text>
           NEXT
          </Text>
        </Button>
      </View>
    )
  }
}

// 나중에 제거하기
let mapStateToProps = (state) => {
  return {
      value: state.USER.usrId
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrNm: (value) => dispatch(setUsrNm(value))
  }
}

InputName = connect(mapStateToProps, mapDispatchToProps)(InputName);

export default InputName;