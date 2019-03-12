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

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>귀하의</Text>
                <Text style={styles.leftGuideTxt}>업체주소를</Text>
                <Text style={styles.leftGuideTxt}>입력해주세요</Text>
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

          <View style={[styles.fx3, styles.justiConCenter]}>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input value="경기도 시흥시 산기대학로 237 (한국산업기술대)" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
              <Icon active name="ios-search" style={styles.inputIcon} />
            </Item>

            <Item regular style={styles.inputWhBackGreyBo}>
              <Input placeholder="상세주소를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력완료</Text>
            </Button>
          </View>

        </View>

      </Container>
    );
  }
}

export default RegBusinessAddressDetail;
