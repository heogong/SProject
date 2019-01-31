import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class SuccessTermsService extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
    <CustomBlockWrapper
        title="이용약관 완료"
    >
        <Text>약관동의가 완료되었어요</Text>

        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={ Actions.ClientMain }>
            <Text>
                메인화면으로
            </Text>
        </CustomButton>
        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={ Actions.ListBusinessPlace }>
            <Text>
                제품등록하러가기
            </Text>
        </CustomButton>
    </CustomBlockWrapper>
    )
  }
}

export default SuccessTermsService;