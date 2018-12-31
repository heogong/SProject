import React, { Component } from 'react';

import { CLIENT, PARTNER } from '~/Common/Blend';
import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { setCustomerType } from '~/Redux/Actions';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class CustomerType extends Component {

  // 고객 타입 선택 및 페이지 이동
  _selectCustomerTypeAndGoPage = (customer) => () => {
    this.props.onSetCustomerType(customer);  // 리덕스 고객타입 SET
    Actions.JoinAccountType();
  }

  render() {
    return (
      <CustomBasicWrapper
        title="고객 구분"
        backAction={ true }
        actionName="InitPage"
      >
        <Text>고객 구분을 선택해 주세요.</Text>
        <CustomButton 
          block={ true } 
          info={ true }
          bordered={ true } 
          onPress={this._selectCustomerTypeAndGoPage(CLIENT)}>
          <Text>
              일반 사업장
          </Text>
        </CustomButton>
        <CustomButton 
          block={ true } 
          info={ true }
          bordered={ true } 
          onPress={this._selectCustomerTypeAndGoPage(PARTNER)}>
          <Text>
            서비스파트너
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetCustomerType: (value) => dispatch(setCustomerType(value)),
  }
}

CustomerType = connect(undefined, mapDispatchToProps)(CustomerType);

export default CustomerType;