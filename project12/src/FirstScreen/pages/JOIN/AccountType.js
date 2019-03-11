import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { CLIENT } from '~/Common/Blend';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const LOGIN_YN = false; // 진입 경로(로그인/회원가입) 확인
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
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.contentWrap}>
          <View style={styles.fxDirRow}>
            <View style={stylesReg.leftGuideTxtWrap}>
              <Text style={stylesReg.leftGuideTxt}>회원가입할</Text>
              <Text style={stylesReg.leftGuideTxt}>방법을</Text>
              <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
            </View>
            <View style={stylesReg.rightImgWrap}>
            <Image source={require('~/Common/Image/join-ico01.png')} style={{height : 84, width : 84}} />
            </View>
          </View>

          <View style={localStyles.txtWrap}>
            <Text style={{color: color.greyColor, fontSize: 14}}>클리닉의 회원이 되시면</Text>
            <Text style={{color: color.greyColor, fontSize: 14}}>다양한 A/S 관련 서비스를 누릴 수 있습니다</Text>
          </View>

           <View style={localStyles.btnBottomWrap}>

            <TouchableOpacity style={localStyles.bttBoxWrap} onPress={this._selectCustomerTypeAndGoPage}>
              <View >
                <Image 
                  source={require('~/Common/Image/join-email.png')} 
                  resizeMode='contain' 
                  style={localStyles.btnIcon} 
                />
                <Text style={localStyles.btnTxt}>이메일</Text>
              </View>
            </TouchableOpacity>

            <View style={localStyles.bttBoxWrap}>
              <NaverLogin loginYn={ LOGIN_YN } />
            </View>

            <View style={localStyles.bttBoxWrap}>
              <KakaoLogin loginYn={ LOGIN_YN } />
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


const localStyles = StyleSheet.create({
  txtWrap: {
    marginTop: 21
  },
  btnBottomWrap: {
    flex:2,
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  bttBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    marginRight : 5,
    paddingTop : 15,
    alignItems : 'center'
  },
  btnIcon: {
    height: 28,
    width: 40,
    paddingTop: 19
  },
  btnTxt: {
    fontSize: 14,
    marginTop : 10,
    color: color.whiteColor,
    paddingBottom: 14
  }
});

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

AccountType = connect(mapStateToProps, undefined)(AccountType);
export default AccountType;