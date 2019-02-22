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

class RegPassBook2 extends Component {
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
              <Image source={require("./images/btn_back_arrow.png")}/>
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={styles.mb10}>정산계좌 통장사진</H1>
            <Text style={styles.greyFont}>계좌번호 및 예금주 등 기본 계좌정보의</Text>
            <Text style={styles.greyFont}>글씨가 잘 보이도록 촬영 또는 스캔핸주세요</Text>
          </View>

          <View style={[styles.fx3, {marginLeft : 50, marginRight : 50, marginBottom : 50}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[{flex:9, marginLeft : 30, marginRight : 30, backgroundColor : color.defaultBackColor, borderRadius : 5, elevation: 2}]}>
              <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <Image source={require("./img/bank-bg02.png")} resizeMode="contain" style={{height:'100%', width : '100%'}} />
              </View>
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>
          </View>
          

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>앨범에서선택하기</Text>
            </Button>
            <Button style={[styles.btnDefault, styles.btnDefaultFill]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>사진촬영하기</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const edgeSize = 3.5; // 테두리 두께

export default RegPassBook2;

