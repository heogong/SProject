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
        <ScrollView style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter]}>
            <Image source={require('./img/intro-logo.png')} resizeMode='contain' style={{width : logoImageSize}} />
          </View>

          <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>

            <TouchableOpacity  style={[styles.mb10, localStyles.typeBox]} onPress={ () => alert("USER")}>
              <View style={styles.alignItemsCenter}>
                <H1 style={{color:color.whiteColor, fontWeight:'900'}}>USER</H1>
                <Text style={{color:color.whiteColor, fontSize : 15}}>A/S 서비스를 이용하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.mb20, localStyles.typeBox]} onPress={ () => alert("PARTNER")}>
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
          
        </ScrollView>

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

export default SelectUserTypejs;