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
        <Text>축하합니다 파트너 신청이 완료되었습니다.</Text>

        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={ Actions.PartnerMain }>
            <Text>
                메인화면으로
            </Text>
        </CustomButton>
    </CustomBlockWrapper>
    )
  }
}

export default SuccessTermsService;