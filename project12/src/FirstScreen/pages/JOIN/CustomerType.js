import React, { Component } from 'react';

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomWrapper from '../../../Common/Components/CustomWrapper';
import CustomButton from '../../../Common/Components/CustomButton';

export default class CustomerType extends Component {
  render() {
    return (
      <CustomWrapper>
        <Text>고객 구분을 선택해 주세요.</Text>
        <CustomButton 
          block={ true } 
          info={ true }
          bordered={ true } 
          onPress={Actions.JoinAccountType}>
          <Text>
              일반 사업장
          </Text>
        </CustomButton>
        <CustomButton 
          block={ true } 
          info={ true }
          bordered={ true } 
          onPress={Actions.JoinAccountType}>
          <Text>
            서비스파트너
          </Text>
        </CustomButton>
      </CustomWrapper>
    )
  }
}