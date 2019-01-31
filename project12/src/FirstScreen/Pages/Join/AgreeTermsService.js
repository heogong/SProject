import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input, Text } from "native-base";

import { PARTNER } from '~/Common/Blend';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class AgreeTermsService extends Component {
  constructor(props) {
    super(props);
  }


  // 고객 타입에 따른 페이지 이동
  _nextPage = () => {
    if(this.props.usrObj.usrCustomerType == PARTNER) {
        Actions.PartnerTermsService();
    } else {
        Actions.ClientTermsService();
    }
  }

  render() {
    return (
    <CustomBlockWrapper
        title="이용약관"
    >
        <Text>이용약관 동의</Text>

        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={ this._nextPage }>
            <Text>
                약관동의완료
            </Text>
        </CustomButton>
    </CustomBlockWrapper>
    )
  }
}

let mapStateToProps = (state) => {
    return {
        usrObj: state.USER
    };
}
  
AgreeTermsService = connect(mapStateToProps)(AgreeTermsService);
export default AgreeTermsService;