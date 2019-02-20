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

class RegSuccessTerm extends Component {
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
          <View style={{flex:1, alignItems : 'center', justifyContent : 'center'}}>
            <View>
              <View style={{alignItems : 'center'}}>
                <Image source={require('./img/join-end.png')} resizeMode='center'/>
              </View>
              <View style={{alignItems : 'center'}}>
                <H1>약관동의가</H1>
                <H1>완료되었어요!</H1>
              </View>
            </View>
          </View>

          <View style={{flex:1}}>
            <View style={{flex:1, alignItems : 'center'}}>
              <Text style={styles.greyFont}>제품을 등록하면 빠른 서비스를 받을 수 있어요!</Text>
              <Text style={styles.greyFont}>지금 등록하러 가시겠어요?</Text>
            </View>

            <View style={{flex:1, justifyContent : 'center'}}>

              <Button block info bordered onPress={ () => alert("메인화면으로")}
                style={[styles.mb15, {elevation:0}]}
              >
                <Text>메인화면으로</Text>
              </Button>

              <Button block info onPress={ () => alert("약관동의하러가기")}
                style={{elevation:0}}
              >
                <Text>약관동의 하러가기</Text>
              </Button>
            </View>
          </View>
        </View>

      </Container>
    );
  }
}

export default RegSuccessTerm;
