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


class SuccessBusinessPlace extends Component {
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

          <View style={[{flex:1}]}>
            <View style={[styles.mb10, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H1>사업장</H1>
                <H1>정보등록이</H1>
                <H1>완료되었어요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                <Image source={require('./img/input-able.png')} />
              </View>
            </View>

            <View>
              <Text style={styles.greyFont}>사업장 정보가 제대로 입력되었나요?</Text>
              <Text style={styles.greyFont}>이제A/S 받을 제품의 정보를 등록해주세요.</Text>
            </View>
          </View>

          <View style={{flex:2}}>

            <View style={[styles.pd10, {flex:4, backgroundColor : color.defaultColor}]}>
              <View style={{flex:3, alignItems : 'center', justifyContent : 'center'}}>
                <Image source={require('./img/license-depart02.png')} style={{height : imageSize, width : imageSize}} />
              </View>
              <View style={{flex:2, alignItems:'center'}}>
                <H2 style={[styles.mb10, {color : color.whiteColor}]}>세나정육점</H2>
                <Text style={styles.whiteFont}>경기도 시흥시 경기대로</Text>
                <Text style={styles.whiteFont}>aaaaaaaaaaaaaaaaaaa</Text>
              </View>
            </View>

            <View style={{flex:1, justifyContent : 'center'}}>
              <Button block info bordered style={{elevation:0}}>
                <Text>제품등록하러가기</Text>
              </Button>
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

const imageSize = wp(37);

export default SuccessBusinessPlace;
