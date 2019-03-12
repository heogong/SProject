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

export const ENTRIES1 = [
  {
    title: '업소용냉장고'
  },
  {
    title: '쇼케이스'
  },
  {
    title: '업소용냉장고'
  },
  {
    title: '업소용냉장고'
  },
  {
    title: '업소용냉장고'
  },
  {
    title: '업소용냉장고'
  },
  {
    title: '업소용냉장고'
  },
  {
    title: '쇼케이스'
  }];

class RegProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={{marginBottom: 36}}>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>등록할</Text>
                <Text style={styles.leftGuideTxt}>제품종류를</Text>
                <Text style={styles.leftGuideTxt}>선택해주세요</Text>
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
            </View>
            
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

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
                        backgroundColor : color.prdTypeBackColor, 
                        height : productCardSize, 
                        width : productCardSize
                  }]}>
                    <Image source={require("./img/license-depart01.png")} 
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

export default RegProductInfo;
