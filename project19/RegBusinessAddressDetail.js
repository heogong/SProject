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

class RegBusinessAddressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
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

        <View style={[styles.mg10, {flex:1}]}>

          <View style={{flex:1}}>
            <View style={[styles.mb10, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H1>귀하의</H1>
                <H1>업체주소를</H1>
                <H1>입력해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                <H1 style={{color : color.defaultColor}}>03</H1>
              </View>
            </View>
            <View style={{height : 10, backgroundColor : color.defaultColor}} />
          </View>

          <View style={{flex:2, justifyContent:'center'}}>
            <Item regular style={[styles.mb10, {height : 50}]}>
              <Icon name="ios-search" style={{color : color.defaultColor}}/>
              <Input placeholder="주소입력" />
            </Item>
            <Item regular style={{height : 50}}>
              <Input placeholder="상세주소입력" />
            </Item>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <Button block info style={{elevation:0}}>
              <Text>입력완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

export default RegBusinessAddressDetail;
