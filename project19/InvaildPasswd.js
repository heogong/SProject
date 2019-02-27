import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Button,
  Text,
  Item,
  Input,
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { stylesReg } from './css/stylesReg';
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
          <Text style={{color: color.whiteColor}}>유효한 인증번호입니다.</Text>
        </View>
      </View>

    ) : (
      (props.status == 1) ? (
        <View style={localStyles.inputBoxWrap}>

          <View style={localStyles.txtWrap}>
            <Text style={{textAlign: 'center', color: color.whiteColor}}>김성찬님은 이메일로 가입되어있으며</Text>
            <Text style={[{textAlign: 'center', color: color.whiteColor}, styles.mb12]}>회원님의 아이디는 rastid@naver.com 입니다</Text>
            <Text style={{textAlign: 'center', color: color.whiteColor}}>지금 바로 로그인하러 이동하세요</Text>
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
          <Text style={{color: color.whiteColor}}>김성찬님은 이메일로 가입되어있으며</Text>
          <Text style={[{color: color.whiteColor}, styles.mb12]}>회원님의 아이디는 rastid@naver.com 입니다</Text>
          <Text style={{color: color.whiteColor}}>지금 바로 로그인하러 이동하세요</Text>
        </View>
      )
      
    )
  );
}

const localStyles = StyleSheet.create({
  idPwFindTabWrap: {
    flex: 2,
    marginTop: 38
  },
  inputBoxWrap: {
    paddingTop : 52,
    paddingLeft : 20,
    paddingRight : 20,
    flex: 1,
    backgroundColor : color.defaultColor
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center'
  },
  txtWrap: {
    paddingTop: 5,
    paddingBottom: 41
  }
});
export default InvaildPasswd;