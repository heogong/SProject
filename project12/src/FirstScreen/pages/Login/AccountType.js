import React, { Component } from 'react';
import { BackHandler } from 'react-native';

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

export default class AccountType extends Component {
  
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.InitPage()) // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => Actions.InitPage()) // Remove listener
  }

  render() {
    const loginYn = true; // 진입 경로(로그인/회원가입) 확인
    return (
      <CustomBasicWrapper
        title="로그인 구분"
      >
        <NaverLogin
          loginYn={ loginYn }
          name="NAVER 로그인"
        />
        <KakaoLogin
         loginYn={ loginYn }
         name="카카오톡 로그인"
        />
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.LoginInputAccount}>
          <Text>
          이메일 로그인
          </Text>
        </CustomButton>

      </CustomBasicWrapper>
    )
  }
}