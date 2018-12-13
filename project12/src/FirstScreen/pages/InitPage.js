import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../Common/Components/Button';

export default class PageOne extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Button onPress={Actions.LoginAccountType}>
          <Text>
              LOGIN
          </Text>
        </Button>
        <Button onPress={Actions.JoinCustomerType}>
          <Text>
            회원가입
          </Text>
        </Button>

        <Button onPress={Actions.tab_1}>
          <Text>
            테스트 drawer
          </Text>
        </Button>
      </View>
    )
  }
}