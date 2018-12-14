import React, { Component } from 'react';

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomWrapper from '../../Common/Components/CustomWrapper';
import CustomButton from '../../Common/Components/CustomButton';

export default class PageOne extends Component {
  render() {
    return (
      <CustomWrapper>
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
            테스트 drawer
          </Text>
        </CustomButton>
      </CustomWrapper>
    )
  }
}