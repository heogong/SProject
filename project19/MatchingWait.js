import React, { Component } from "react";
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Picker,
  Body,
  Text,
  Textarea,
  Thumbnail,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class MatchingWait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerDefault}>
        <ImageBackground 
        style={[styles.succContentWrap, {backgroundColor: "rgba(40, 200, 245, 0.3)"}]}
        source={require('./img/Matching_effect.gif')}>
          
          <Image source={require("./img/GPS_match_icon.png")} resizeMode="contain" style={{width: 17, alignSelf: "center", top: "50%", position: "absolute", marginTop: -40}} />

          <View style={localStyles.topTxtWrap}>
            <Text style={localStyles.topTxt}>쿨리닉 A/S업체</Text>
            <Text style={localStyles.topTxt}>매칭을</Text>
            <Text style={localStyles.topTxt}>시작합니다</Text>
          </View>

          <View style={localStyles.bottomTxtWrap}>
            <Text style={localStyles.bottomTxt}>주변지역 A/S업체에게</Text>
            <Text style={localStyles.bottomTxt}>매칭연락을 보내는 중입니다.</Text>
            <Text style={localStyles.bottomTxt}>매칭 성공시 문자로 알려드립니다.</Text>
          </View>
          
        </ImageBackground>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  topTxtWrap: {
    marginTop: 117,
    marginLeft: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1
  },
  topTxt: {
    fontSize: 26,
    fontWeight: "bold",
    color: color.whiteColor
  },
  bottomTxtWrap: {
    marginBottom: 117,
    marginLeft: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "flex-end",
    flex: 1
  },
  bottomTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.whiteColor,
    lineHeight: 30,
    letterSpacing: 0.5
  },
});

export default MatchingWait;
