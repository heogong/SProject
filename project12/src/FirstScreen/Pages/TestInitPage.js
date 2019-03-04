import React, { Component } from 'react';
import { AsyncStorage, View } from "react-native"

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
      <View style={{flex:1}}>

        <CustomButton 
          onPress={Actions.LoginAccountType}
          DefaultBtn={true}
        >
          LOGIN
        </CustomButton>

        <CustomButton 
          onPress={Actions.JoinCustomerType}
          DefaultLineBtn={true}
        >
            회원가입
        </CustomButton>

        <CustomButton 
          onPress={Actions.ClientMain}
          WhiteLineBtn={true}
          >
            메인_테스트 (클라이언트)
        </CustomButton>

        <CustomButton 
          onPress={Actions.PartnerMain}
          WhiteBackBtn={true}
        >
            메인_테스트 (파트너)
        </CustomButton>

        <CustomButton 
          onPress={Actions.NonMemberNoticeInfoService}
          disabled={true}
          bordered={true}
        >
            비회원으로 A/S 신청하기
        </CustomButton>
      </View>
    )
  }
}