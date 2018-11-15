import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../COMMON/components/Button';

export default class CustomerType extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>결제카드 등록</Text>
        <Button onPress={Actions.CardInputInfo}>
          <Text>
              카드 등록
          </Text>
        </Button>
      </View>
    )
  }
}