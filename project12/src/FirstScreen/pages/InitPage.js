import React, { Component } from 'react';
import { AsyncStorage } from "react-native"

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../Common/Components/CustomButton';

export default class PageOne extends Component {

  // 테스트 AsyncStorage 토큰값 체크
  async componentDidMount() {
    try {
      const AccessToken = await AsyncStorage.getItem('AccessToken');
      const RefreshToken = await AsyncStorage.getItem('RefreshToken');
      if (AccessToken !== null) {
        // We have data!!
        console.log(AccessToken);
        console.log(RefreshToken);

        Actions.ListBusinessPlace();
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  render() {
    return (
      <CustomBasicWrapper>
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
          onPress={Actions.tab_1}>
          <Text>
            drawer
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}