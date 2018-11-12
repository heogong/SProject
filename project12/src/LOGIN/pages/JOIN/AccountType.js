import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../COMMON/components/Button';

import NaverLogin from '../../components/NaverLogin';

export default class PageTwo extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <NaverLogin/>
        <Button onPress={Actions.InitPage}>
          <Text>
              카카오톡으로 가입하기
          </Text>
        </Button>
        <Button onPress={Actions.JoinInputEmail}>
          <Text>
           이메일로 가입하기
          </Text>
        </Button>
      </View>
    )
  }
}