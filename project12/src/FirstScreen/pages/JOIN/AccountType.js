import React, { Component } from 'react';

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
import NaverLogin from '../../Components/NaverLogin';

export default class AccountType extends Component {
  render() {
    const loginYn = false; // 진입 경로(로그인/회원가입) 확인

    return (
      <CustomBasicWrapper>
        <NaverLogin
          loginYn={ loginYn }
          name="NAVER 회원가입"
        />
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.InitPage}>
          <Text>
            카카오톡으로 가입하기
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.JoinInputName}>
          <Text>
            이메일로 가입하기
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}