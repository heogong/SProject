import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../Common/Components/Button';

export default class CustomerType extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>고객 구분을 선택해 주세요.</Text>
        <Button onPress={Actions.JoinAccountType}>
          <Text>
              일반 사업장
          </Text>
        </Button>
        <Button onPress={Actions.JoinAccountType}>
          <Text>
            서비스파트너
          </Text>
        </Button>
      </View>
    )
  }
}