import React, { Component } from 'react';
import { AsyncStorage } from "react-native"

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class PageOne extends Component {

  // 테스트 AsyncStorage 토큰값 체크
  async componentDidMount() {
    try {
      const AccessToken = await AsyncStorage.getItem('AccessToken');
      const RefreshToken = await AsyncStorage.getItem('RefreshToken');

      console.log(AccessToken);
      // if (AccessToken !== null) {
      //   // We have data!!
      //   console.log(AccessToken);
      //   console.log(RefreshToken);

      //   Actions.ListBusinessPlace();
      // }
     } catch (error) {
       // Error retrieving data
     }
  }

  render() {
    return (
      <CustomBasicWrapper
        title="회원가입/로그인"
        resetPage={ true }
      >
        <CustomButton 
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.LoginAccountType}>
          <Text>
              LOGIN
          </Text>
        </CustomButton>
        <CustomButton 
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.JoinCustomerType}>
          <Text>
            회원가입
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.ClientMain}>
          <Text>
            메인_테스트 (클라이언트)
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.PartnerMain}>
          <Text>
            메인_테스트 (파트너)
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={Actions.NonMemberNoticeInfoService}>
          <Text>
            비회원으로 A/S 신청하기
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}