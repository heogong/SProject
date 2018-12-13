import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../../Common/Components/Button';

import NaverLogin from '../../Components/NaverLogin';

export default class AccountType extends Component {
  render() {
    const loginYn = true; // 진입 경로(로그인/회원가입) 확인
    return (
      <View style={{margin: 128}}>
        <NaverLogin
          loginYn={ loginYn }
          name="NAVER 로그인"
        />
        <Button onPress={Actions.InitPage}>
          <Text>
              카카오톡 로그인
          </Text>
        </Button>
        <Button onPress={Actions.LoginInputAccount}>
          <Text>
           이메일 로그인
          </Text>
        </Button>
      </View>
    )
  }
}