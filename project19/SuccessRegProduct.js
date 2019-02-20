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

class SuccessRegProduct extends Component {
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
          <View style={[styles.fx1, {alignItems : 'center', justifyContent : 'center'}]}>
            <View>
              <View style={{alignItems : 'center'}}>
                <Image source={require('./img/join-end.png')} resizeMode='center'/>
              </View>
              <View style={{alignItems : 'center'}}>
                <H1>제품등록이</H1>
                <H1>완료되었어요!</H1>
              </View>
            </View>
          </View>

          <View style={styles.fx1}>
            <View style={[styles.fx1, {alignItems : 'center'}]}>
              <Text style={styles.greyFont}>국내최초 냉동기기 A/S매칭서비스</Text>
              <Text style={styles.greyFont}>쿨리닉의 다양한 기능을 누려보세요!</Text>
            </View>

            <View style={[styles.fx1, {justifyContent : 'center'}]}>

              <Button block info bordered onPress={ () => alert("메인화면으로")}
                style={[styles.mb15, {elevation:0}]}
              >
                <Text>메인화면으로</Text>
              </Button>

              <Button block info onPress={ () => alert("A/S매칭신청")}
                style={{elevation:0}}
              >
                <Text>A/S매칭신청</Text>
              </Button>
            </View>
          </View>
        </View>

      </Container>
    );
  }
}

export default SuccessRegProduct;
