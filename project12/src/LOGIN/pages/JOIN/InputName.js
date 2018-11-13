import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Button from '../../../COMMON/components/Button';

class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
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

        <Button onPress={Actions.JoinInputPhone}>
          <Text>
           NEXT
          </Text>
        </Button>


      </View>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      value: state.USER.usrId
  };
}

InputName = connect(mapStateToProps)(InputName);

export default InputName;