import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
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

class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft: 26, paddingRight: 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>약관 및 정책</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{flex: 1, backgroundColor: color.defaultColor}}>
          <View style={{marginTop: 16}}>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>이용약관</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>개인정보 처리방침</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>위치정보 이용약관</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => alert("사진조회")}>
              <View style={localStyles.listMenuWrap}>
                <Text style={localStyles.listMenuTxt}>오픈소스 라이센스</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  listMenuWrap: {
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26
  },
  listMenuTxt: {
    fontSize: 16,
    color: "#8e8e98"
  },
});

export default NoticeList;