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

class RegProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:1, alignItems: 'center'}}>
            <Title></Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={[styles.mg20, {flex:1}]}>

          <View style={{flex:1}}>
            <View style={{flex:1}}>
              <H1>제품을</H1>
              <H1>추가로</H1>
              <H1>등록해주세요</H1>
            </View>
          </View>

          <View style={{flex:2}}>
          
            <View style={{flex:1, justifyContent : 'flex-start'}}>
              <View style={{height : 3, backgroundColor : color.defaultColor}} />
            </View>

            <View style={[styles.pd10, {flex:5, backgroundColor : color.defaultColor}]}>
              <View style={{flex:1, alignItems : 'center'}}>
                <H1 style={{color : color.whiteColor}}>01</H1>
              </View>

              <View style={{flex:3, alignItems  : 'center', justifyContent : 'center'}}>
                <Image source={require('./img/license-depart02.png')} style={{height : imageSize, width : imageSize}} />
              </View>

              <View style={{flex:2, alignItems : 'center', justifyContent : 'center'}}>
                <H3 style={[styles.mb10, {color : color.whiteColor}]}>제품추가</H3>
                <Text style={styles.whiteFont}>짧은설명에 대해</Text>
                <Text style={styles.whiteFont}>20자내로 작성</Text>
              </View>
            </View>

          </View>
            
        </View>
          
      </Container>
    );
  }
}

function wp (percentage) {
  const value = (percentage * (viewportWidth - 60)) / 100;
  return Math.round(value);
}

const imageSize = wp(35);

export default RegProduct;
