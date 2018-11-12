import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../COMMON/components/Button';

export default class PageOne extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>인증번호를 받을 휴대폰 번호</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='010.####.####'
        />
      </View>
    )
  }
}