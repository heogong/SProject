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

class PartnerGuide1_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Container style={[styles.containerInnerPd, {backgroundColor: color.defaultColor}]}>
        <Header style={[styles.header, styles.noPadding, {backgroundColor: color.defaultColor}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/Back_icon_white.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={[styles.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>쿨리닉</Text>
                <Text style={[styles.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>A/S 업체</Text>
                <Text style={[styles.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>상세정보 가이드</Text>
              </View>
            </View>
            
          </View>

          <View>
            <TouchableOpacity>
              <Image source={require('./img/partner_guide/A35.png')} resizeMode="center" style={localStyles.guideImg}/>  
            </TouchableOpacity>
          </View>
          
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  guideImg: {
    height: "100%",
    width: "100%",
  }
});

export default PartnerGuide1_1;
