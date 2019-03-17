import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class TermsMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={{
          paddingLeft : styles.containerInnerPd.paddingLeft, 
          paddingRight : styles.containerInnerPd.paddingRight}}
        >
          <CustomHeader title="약관 및 정책"/>
        </View>

        <View style={[styles.fx1, { backgroundColor: color.defaultColor}]}>
          <View style={{marginTop: 16}}>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>이용약관</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>개인정보 처리방침</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>위치정보 이용약관</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>오픈소스 라이센스</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  listMenuWrap: {
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26
  },
  listMenuTxt: {
    fontSize: 16,
    color: "#8e8e98"
  },
});

export default TermsMenu;