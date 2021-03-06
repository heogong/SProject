import React, { Component } from 'react';
import{ Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class Business extends Component {
  constructor(props) { 
    super(props); 
  }

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="가입완료"
      >
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ Actions.ListBusinessPlace }>
          <Text>
            제품등록 하러가기
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ Actions.ClientMain }>
          <Text>
            메인화면으로 이동
          </Text>
        </CustomButton>
        
      </CustomBasicWrapper>
    )
  }
}