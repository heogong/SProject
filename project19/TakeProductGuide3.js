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

class TakeProductGuide1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        paddingLeft: 26,
        paddingRight: 26
      }}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>촬영가이드</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={[styles.fxDirRow, styles.pd20, styles.mb10, {backgroundColor : color.defaultColor}]}>
            <View style={[styles.fx5, styles.alignItemsEnd, styles.justiConCenter]}>
              <H1 style={{color : color.defaultBackColor}}>01</H1>
              <H2 style={{color : color.whiteColor}}>일체형타입</H2>
              <H2 style={{color : color.whiteColor}}>제품군</H2>
            </View>
            <View style={[styles.fx1, styles.alignItemsCenter, {marginTop : 5, marginBottom : 5}]}>
              <View style={[styles.fx1, {backgroundColor : color.whiteColor, width : '10%'}]} />
            </View>
            <View style={[styles.fx5, styles.justiConCenter]}>
              <Text style={styles.whiteFont}>업소용냉장고</Text>
              <Text style={styles.whiteFont}>쇼케이스</Text>
              <Text style={styles.whiteFont}>제빙기</Text>
              <Text style={styles.whiteFont}>항온항습기</Text>
              <Text style={styles.whiteFont}>냉각기</Text>
              <Text style={styles.whiteFont}>초저온 냉동기</Text>
            </View>
          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>1.제품의 전체사진</H2>
            <Text style={styles.greyFont}>예시처럼 화면에 꽉차게 전체사진을 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("./img/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>

          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>2.기계실 사진</H2>
            <Text style={styles.greyFont}>가능하면 콤프레사 명판이 보이게 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("./img/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>
          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>3.제어부 사진</H2>
            <Text style={styles.greyFont}>온도 조절하는 부분을 모델명이 보이게 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("./img/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>
          </View>
          
        </ScrollView>

      </Container>
    );
  }
}

function hp (percentage, space) {
  const value = (percentage * (viewportHeight - space)) / 100;
  return Math.round(value);
}

const edgeSize = 3.5;
const guideCardSize = hp(42, 0)

export default TakeProductGuide1;

