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

class RegSuccessCard extends Component {
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
          <Left style={styles.headerLeftWrap}></Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>


        <View style={styles.succContentWrap}>
          <View style={styles.succContentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('./img/Next_icon.png')} style={{width: 48, height: 48}}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>카드등록이</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>등록하신 카드를 이용하여</Text>
              <Text style={styles.greyFont}>빠르고 간편하게 A/S를 신청할 수 있어요!</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <Button style={[styles.btnDefault, styles.btnDefaultFill]}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>약관동의 하러가기</Text>
              </Button>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

export default RegSuccessCard;
