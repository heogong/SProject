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

class JoinSuccess extends Component {
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
          <Left style={styles.headerLeftWrap}></Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>


        <View style={localStyles.contentWrap}>
          <View style={localStyles.contentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('./img/join-end.png')} style={{width: 48, height: 48}}/>
              </View>
              <View style={localStyles.topTxtWrap}>
                <Text style={localStyles.topTxt}>회원가입이</Text>
                <Text style={localStyles.topTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>귀하의 사업자정보를 등록하고</Text>
              <Text style={styles.greyFont}>쿨리닉 매칭 서비스를 이용해보세요</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <Button style={[styles.btnDefault, styles.btnDefaultFill]}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력완료</Text>
              </Button>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  contentWrap: {
    flex:1
  },
  contentTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTxtWrap: {
    alignItems: 'center'
  },
  topTxt: {
    fontSize: 26,
    color: "#1e1e32",
    letterSpacing: 0,
    lineHeight: 30,
    fontWeight: "bold"
  }
});

export default JoinSuccess;
