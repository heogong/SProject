import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../COMMON/components/Button';

export default class InputEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>이메일 주소가 어떻게 되십니까?</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='sample@example.com'
        />

        <Button onPress={Actions.JoinInputName}>
          <Text>
           NEXT
          </Text>
        </Button>


      </View>
    )
  }
}