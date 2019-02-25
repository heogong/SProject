import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { CLIENT } from '~/Common/Blend';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class AccountType extends Component {

  // 고객 타입 선택에 따른 페이지 이동
  _selectCustomerTypeAndGoPage = () => {
    // if(this.props.value.usrCustomerType == CLIENT) {
    //   Actions.JoinInputName();
    // } else {
    //   Actions.JoinInputPhone();
    // }

    // 기획서에 따른 이메일 입력 우선
    Actions.JoinInputEmail();
  }

  render() {
    const loginYn = false; // 진입 경로(로그인/회원가입) 확인

    return (
      // <CustomBasicWrapper
      //   title="가입 구분"
      // >
      //   <NaverLogin
      //     loginYn={ loginYn }
      //     name="NAVER 회원가입"
      //   />

      //   <KakaoLogin
      //     loginYn={ loginYn }
      //     name="카카오톡으로 가입하기"
      //   />
      //   <CustomButton
      //     block={ true }
      //     info={ true }
      //     bordered={ true }
      //     onPress={this._selectCustomerTypeAndGoPage}>
      //     <Text>
      //       이메일로 가입하기
      //     </Text>
      //   </CustomButton>
      // </CustomBasicWrapper>

      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.fx1}>
          <View style={styles.fx1}>
            <View style={[styles.mb20, {flexDirection : 'row'}]}>
              <View style={[styles.fx1, styles.justiConCenter]}>
                <H1>회원가입할</H1>
                <H1>방법을</H1>
                <H1>선택해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end'}}>
                  <Image source={require('~/Common/Image/join-ico01.png')} style={{height : 100, width : 100}} />
              </View>
            </View>
            <View>
              <Text style={styles.greyFont}>클리닉의 회원이 되시면</Text>
              <Text style={styles.greyFont}>다양한 A/S 관련 서비스를 누릴 수 있습니다</Text>
            </View>
          </View>

          <View style={[styles.fx2, styles.fxDirRow, styles.alignItemsCenter, styles.justiConCenter]}>
            <TouchableOpacity onPress={ this._selectCustomerTypeAndGoPage }>
              <View style={{height : itemSize, width : itemSize, backgroundColor : color.defaultColor, marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
                <Image source={require('~/Common/Image/join-email.png')} resizeMode='contain' style={{height : itemSize - 60, width : itemSize - 60}} />
                <Text style={[styles.whiteFont, {marginTop : 10}]}>이메일</Text>
              </View>
            </TouchableOpacity>
            <View style={{height : itemSize, width : itemSize, backgroundColor : color.defaultColor, marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
              <NaverLogin loginYn={ loginYn } />
            </View>
            <View style={{height : itemSize, width : itemSize, backgroundColor : color.defaultColor, marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
              <KakaoLogin loginYn={ loginYn } />
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const itemSize = wp(28);

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

AccountType = connect(mapStateToProps, undefined)(AccountType);
export default AccountType;