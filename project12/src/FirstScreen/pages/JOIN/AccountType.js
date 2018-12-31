import React, { Component } from 'react';

import { CLIENT } from '~/Common/Blend';
import { connect } from 'react-redux';
import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

class AccountType extends Component {

  // 고객 타입 선택에 따른 페이지 이동
  _selectCustomerTypeAndGoPage = () => {
    if(this.props.value.usrCustomerType == CLIENT) {
      Actions.JoinInputName();
    } else {
      Actions.JoinInputPhone();
    }
  }

  render() {
    const loginYn = false; // 진입 경로(로그인/회원가입) 확인

    return (
      <CustomBasicWrapper
        title="가입 구분"
      >
        <NaverLogin
          loginYn={ loginYn }
          name="NAVER 회원가입"
        />
        <KakaoLogin
          loginYn={ loginYn }
          name="카카오톡으로 가입하기"
        />
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={this._selectCustomerTypeAndGoPage}>
          <Text>
            이메일로 가입하기
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

AccountType = connect(mapStateToProps, undefined)(AccountType);
export default AccountType;