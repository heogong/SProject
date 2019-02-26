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
import { stylesReg } from './css/stylesReg';
import { color } from './css/color';


class BusinessRegistration1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={styles.mb10}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                <Text style={stylesReg.leftGuideTxt}>사업자등록증을</Text>
                <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>02</Text>
              </View>
            </View>

            <View style={stylesReg.procBarWrap}>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={stylesReg.procBarOff} />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={ () => alert("dddd")}
            style={[styles.fx5, {borderColor : color.greyColor, borderWidth : 1}]}
          >
            <View style={[styles.alignItemsEnd, styles.pd20]}>
              <Image source={require("./images/btn_back_arrow.png")} />
              <Image source={require("./images/btn_back_arrow.png")} />
            </View>
          </TouchableOpacity>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>등록완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}


export default BusinessRegistration1;