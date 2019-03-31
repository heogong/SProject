import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Container, H1, Text } from "native-base";

import { CLIENT, PARTNER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setCustomerType } from '~/Redux/Actions';

import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class InitPage extends Component {
  
   // 고객 타입 선택 및 페이지 이동
   _selectCustomerTypeAndGoPage = (customer) => () => {
      this.props.onSetCustomerType(customer);  // 리덕스 고객타입 SET
      
      // 앱 처음 실행자 인지 체크 후 안내페이 혹은 로그인 페이지 이동
      if(true) {
        Actions.ServiceIntroduce();
      } else {
        Actions.LoginAccountType();
      }
    }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <View style={styles.fx1}>

          <View style={[styles.fx3, styles.alignItemsCenter, styles.alignItemsCenter]}>
            <Image source={require('~/Common/Image/intro-logo.png')} resizeMode='contain' style={{width : 136, flex: 1}} />
          </View>

          <View style={[styles.fx2, styles.alignItemsCenter]}>

            <TouchableOpacity  style={[styles.mb15, localStyles.typeBox]} onPress={this._selectCustomerTypeAndGoPage(CLIENT)}>
              <View style={styles.alignItemsCenter}>
                <Text style={localStyles.typetxt}>USER · 유저</Text>
                <Text style={localStyles.typeDetailTxt}>A/S 서비스를 이용하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.mb20, localStyles.typeBox]} onPress={this._selectCustomerTypeAndGoPage(PARTNER)}>
              <View style={styles.alignItemsCenter}>
                <Text style={localStyles.typetxt}>PARTNER · 파트너</Text>
                <Text style={localStyles.typeDetailTxt}>제품을 수리 하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={ () => alert("비회원으로 A/S 신청하기")}>
                <Text style={localStyles.outsidelTxt}>비회원으로 A/S 신청하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>

      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  typetxt: {
    color: color.whiteColor,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5
  },
  typeBox: {
    justifyContent : 'center', 
    height : 72, 
    width : '100%', 
    backgroundColor : color.defaultColor
  },
  typeDetailTxt: {
    color: color.whiteColor,
    fontSize : 14
  },
  outsidelTxt: {
    color: color.defaultColor,
    fontSize : 14
  }
});

let mapDispatchToProps = (dispatch) => {
  return {
      onSetCustomerType: (value) => dispatch(setCustomerType(value)),
  }
}

InitPage = connect(undefined, mapDispatchToProps)(InitPage);
export default InitPage;