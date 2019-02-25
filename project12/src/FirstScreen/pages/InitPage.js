import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Container, H1, Text } from "native-base";

import { CLIENT, PARTNER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setCustomerType } from '~/Redux/Actions';

import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class InitPage extends Component {
  
   // 고객 타입 선택 및 페이지 이동
   _selectCustomerTypeAndGoPage = (customer) => () => {
      this.props.onSetCustomerType(customer);  // 리덕스 고객타입 SET
      Actions.LoginAccountType();
    }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter]}>
            <Image source={require('~/Common/Image/intro-logo.png')} resizeMode='contain' style={{width : logoImageSize}} />
          </View>

          <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>

            <TouchableOpacity  style={[styles.mb10, localStyles.typeBox]} onPress={this._selectCustomerTypeAndGoPage(CLIENT)}>
              <View style={styles.alignItemsCenter}>
                <H1 style={{color:color.whiteColor, fontWeight:'900'}}>USER</H1>
                <Text style={{color:color.whiteColor, fontSize : 15}}>A/S 서비스를 이용하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.mb20, localStyles.typeBox]} onPress={this._selectCustomerTypeAndGoPage(PARTNER)}>
              <View style={styles.alignItemsCenter}>
                <H1 style={{color: color.whiteColor, fontWeight:'900'}}>PARTNER</H1>
                <Text style={{color:color.whiteColor, fontSize : 15}}>제품을 수리 하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={ () => alert("비 회원으로 A/S 신청하기")}>
                <Text style={{color : color.defaultColor, fontSize : 15}}>비 회원으로 A/S 신청하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>

      </Container>
    )
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

function hp (percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const itemHeight = hp(13);
const logoImageSize = wp(30, (styles.containerInnerPd.paddingLeft * 2));

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  
  typeBox : {
    justifyContent : 'center', 
    height : itemHeight, 
    width : '100%', 
    backgroundColor : color.defaultColor
  }
});

let mapDispatchToProps = (dispatch) => {
  return {
      onSetCustomerType: (value) => dispatch(setCustomerType(value)),
  }
}

InitPage = connect(undefined, mapDispatchToProps)(InitPage);
export default InitPage;