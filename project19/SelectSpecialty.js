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

export const ENTRIES1 = [
  {
    title: '업소용냉장고1'
  },
  {
    title: '쇼케이스1'
  },
  {
    title: '업소용냉장고2'
  },
  {
    title: '쇼케이스2'
  },
  {
    title: '쇼케이스3'
  }
  ,
  {
    title: '정진씨'
  }
  ,
  {
    title: '정진형님'
  }
];

class SelectSpecialty extends Component {
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

        <View style={{marginBottom: 36}}>
          <View style={styles.fxDirRow}>
            <View style={styles.leftGuideTxtWrap}>
              <Text style={styles.leftGuideTxt}>전문분야를</Text>
              <Text style={styles.leftGuideTxt}>선택해주세요</Text>
              <Text style={styles.leftGuideTxt}>(복수선택가능)</Text>
            </View>
            <View style={styles.rightStepNumWrap}>
              <Text style={styles.rightStepNum}>03</Text>
            </View>
          </View>

          <View style={styles.procBarWrap}>
            <View style={styles.fx1}>
              <View style={styles.procBarOn} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOn} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOn} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOff} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOff} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOff} />
            </View>
            <View style={styles.fx1}>
              <View style={styles.procBarOff} />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>

          <View style={[styles.fxDirRow, styles.justiConBetween, styles.fxWraWra]}>

            {ENTRIES1.map((entry, index) => (
              <TouchableOpacity onPress={ () => alert("ddd")}  key={index}>
                <View 
                  style={[
                    styles.mb15, 
                    styles.pd10,
                    styles.alignItemsCenter,
                    styles.justiConCenter,
                    { 
                      backgroundColor : color.defaultColor, 
                      height : productCardSize, 
                      width : productCardSize
                }]}>
                  <Image source={require("./img/product/09_icon_white.png")} 
                    style={[styles.mb10, {
                      height : productCardSize - 60, 
                      width : productCardSize - 60
                    }]}/>
                  <Text style={localStyles.whiteFont}>{entry.title}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
          
        </ScrollView>

        <View style={styles.footerBtnWrap}>
          <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
            <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>등록완료</Text>
          </Button>
        </View>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const productCardSize = wp(47.5, 52);

const localStyles = StyleSheet.create({
  whiteFont: {
    color: color.whiteColor,
    fontSize: 16,
    fontWeight: "500"
  }
});

export default SelectSpecialty;

