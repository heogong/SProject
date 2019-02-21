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

class TakeProductImage extends Component {
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
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={styles.mb10}>보유제품사진</H1>
            <Text style={styles.greyFont}>각 제품별 사진 촬영 가이드에 맞추어</Text>
            <Text style={styles.greyFont}>제품의 특징들이 잘 드러나게 촬영해주세요</Text>
          </View>

          <View style={[styles.fx3, {marginLeft : 45, marginRight : 45, marginBottom : 40}]}>
            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <TouchableOpacity 
              style={[{flex:9, marginLeft : 25, marginRight : 25, borderColor : color.defaultColor, borderWidth : 2, elevation: 2}]}
              onPress={ () => alert("사진 촬영")}>
              <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <H1 style={{color:color.defaultColor}}>촬영가이드</H1>
                <H1 style={{color:color.defaultColor}}>보러가기</H1>
              </View>
            </TouchableOpacity>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={{flex:1, borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }} />
              <View style={{flex:9}} />
              <View style={{flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}} />
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

const edgeSize = 3.5;

export default TakeProductImage;

