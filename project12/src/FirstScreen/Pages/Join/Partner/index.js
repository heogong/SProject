import React, { Component } from 'react';
import{ Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class Partner extends Component {
  constructor(props) { 
    super(props); 
  }

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="쿨리닉 회원가입"
      >
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ Actions.JoinInputBizLicense }>
          <Text>
            사업자정보 등록하기
          </Text>
        </CustomButton>
        
      </CustomBasicWrapper>
    )
  }
}