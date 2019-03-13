import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Button,
  Text,
  Item,
  Input,
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

const InvaildPasswd = (props) => {
  return (
    (props.status == 0) ? (
      <View style={localStyles.inputBoxWrap}>
        <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
          <Input placeholder="이메일 아이디" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
        </Item>
        <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
          <Input placeholder="이름" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
        </Item>
        <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
          <Input placeholder="핸드폰번호 (하이푼 - 제외하고 입력)" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
        </Item>

        <View style={[styles.fxDirRow, styles.mb12]}>
          <View style={[styles.fx3, styles.pr12]}>
            <Item regular style={styles.inputWhBackWhBo}>
              <Input placeholder="인증번호입력" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
            </Item>
          </View>
          <View style={styles.fx2}>
            <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 36}]}>
              <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 12}]}>인증번호 전송</Text>
            </Button>
          </View>
        </View>

        <View>
          <Text style={localStyles.infoTxt}>유효한 인증번호입니다.</Text>
        </View>
      </View>

    ) : (
      (props.status == 1) ? (
        <View style={localStyles.inputBoxWrap}>

          <View style={localStyles.txtWrap}>
            <Text style={localStyles.infoTxt1}>김성찬님은 이메일로 가입되어있으며</Text>
            <Text style={[localStyles.infoTxt1, styles.mb12]}>회원님의 아이디는 rastid@naver.com 입니다</Text>
            <Text style={localStyles.infoTxt1}>지금 바로 로그인하러 이동하세요</Text>
          </View>
          <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
            <Input placeholder="비밀번호(영문+숫자+특수문자조합 8~16자리)" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
          </Item>
          <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
            <Input placeholder="비밀번호 확인" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
          </Item>
        </View>

      ) : (
        <View style={localStyles.blankBoxWrap}>
          <Text style={localStyles.infoTxt}>김성찬님은 이메일로 가입되어있으며</Text>
          <Text style={[localStyles.infoTxt, styles.mb12]}>회원님의 아이디는 rastid@naver.com 입니다</Text>
          <Text style={localStyles.infoTxt}>지금 바로 로그인하러 이동하세요</Text>
        </View>
      )
      
    )
  );
}

const localStyles = StyleSheet.create({
  idPwFindTabWrap: {
    flex: 1,
    marginTop: 38
  },
  inputBoxWrap: {
    paddingTop : 30,
    paddingLeft : 20,
    paddingRight : 20,
    backgroundColor : color.defaultColor,
    height: 300
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center',
    height: 300
  },
  txtWrap: {
    paddingTop: 5,
    paddingBottom: 41
  },
  infoTxt: {
    color: color.whiteColor, fontSize: 13
  },
  infoTxt1: {
    color: color.whiteColor, fontSize: 13, textAlign: "center"
  }
});
export default InvaildPasswd;