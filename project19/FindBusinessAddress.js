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

class FindBusinessAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={[styles.container, {backgroundColor : 'pink'}]}>
        <Header style={[styles.header, styles.noPadding, {backgroundColor: "transparent", paddingLeft: 26, paddingRight: 26, borderBottomWidth: 0}]}>
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

        <View style={{flex:1, paddingLeft: 26, paddingRight: 26, borderWidth: 0}}>
          <Item regular style={[styles.inputWhBackGreyBo, {backgroundColor: color.whiteColor, marginLeft: 0}]}>
            <Input placeholder="주소를 입력해 주세요" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            <Icon active name="ios-search" style={[styles.inputIcon, {marginRight: 0, paddingRight: 0}]}/>
            <Icon name="ios-close" style={[styles.inputIcon, {color: "#8e8e98"}]}/>
          </Item>
        </View>

        <View style={[styles.footerBtnWrap, {paddingLeft: 26, paddingRight: 26, paddingBottom: 26}]}>
          <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
            <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>확인</Text>
          </Button>
        </View>

      </Container>
    );
  }
}

export default FindBusinessAddress;
