import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../COMMON/components/Button';

import NaverLogin from '../../components/NaverLogin';

export default class AccountType extends Component {
  render() {
    const loginYn = false; // 진입 경로(로그인/회원가입) 확인
    return (
      <View style={{margin: 128}}>
        <NaverLogin
          loginYn={ loginYn }
          name="NAVER 회원가입"
        />
        <Button onPress={Actions.InitPage}>
          <Text>
              카카오톡으로 가입하기
          </Text>
        </Button>
        <Button onPress={Actions.JoinInputName}>
          <Text>
           이메일로 가입하기
          </Text>
        </Button>
      </View>
    )
  }
}