import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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

class SelectUserTypejs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : true
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>

        <View style={[styles.fx3, styles.alignItemsCenter, styles.alignItemsCenter]}>
          <Image source={require('./img/intro-logo.png')} resizeMode='contain' style={{width : 136, flex: 1}} />
        </View>

        <View style={[styles.fx2, styles.alignItemsCenter]}>

          <TouchableOpacity  style={[styles.mb15, localStyles.typeBox]} onPress={ () => alert("USER")}>
            <View style={styles.alignItemsCenter}>
              <Text style={localStyles.typetxt}>USER · 유저</Text>
              <Text style={localStyles.typeDetailTxt}>A/S 서비스를 이용하시겠어요?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  style={[styles.mb20, localStyles.typeBox]} onPress={ () => alert("PARTNER")}>
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

      </Container>
    );
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

export default SelectUserTypejs;