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
import { stylesReg } from './css/stylesReg';
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
      <Container style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        paddingLeft: 26,
        paddingRight: 26
      }}>
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

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.mb20}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>냉동기기</Text>
                <Text style={stylesReg.leftGuideTxt}>전문분야를</Text>
                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
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

          <View style={[styles.fxDirRow, styles.justiConBetween, {flexWrap : 'wrap'}]}>

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
                  <Image source={require("./img/license-depart01.png")} 
                    style={[styles.mb10, {
                      height : productCardSize - 60, 
                      width : productCardSize - 60
                    }]}/>
                  <Text style={styles.whiteFont}>{entry.title}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
          
        </ScrollView>

        <Footer style={{elevation: 0}}>
          <FooterTab>
            <Button 
              style={[styles.btnDefault, {marginTop : 5}]}
              block info bordered onPress={ () => alert("등록완료")}>
              <Text>등록완료</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const productCardSize = wp(47.5, 52);

export default SelectSpecialty;

