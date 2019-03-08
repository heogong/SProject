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

        <View style={styles.contentWrap}>

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>사업장</Text>
                <Text style={styles.leftGuideTxt}>정보등록이</Text>
                <Text style={styles.leftGuideTxt}>완료되었어요</Text>
              </View>
              <View style={styles.rightImgWrap}>
                <Image source={require('./img/input-able.png')} />
              </View>
            </View>

            <View style={{marginTop: 22, marginBottom: 23}}>
              <Text style={localStyles.topTxt}>사업장 정보가 제대로 입력되었나요?</Text>
              <Text style={localStyles.topTxt}>이제A/S 받을 제품의 정보를 등록해주세요.</Text>
            </View>
          </View>

          <View style={{flex:2}}>

            <View style={localStyles.placeBoxWrap}>
              <View style={localStyles.btnPlusWrap}>
                <TouchableOpacity onPress={ () => alert("사업장 등록")}>
                  <Image source={require('./img/license-depart02.png')} style={localStyles.btnPlus} />
                </TouchableOpacity>
              </View>
              <View style={localStyles.txtWrap}>
                <Text style={localStyles.placeNameTxt}>세나정육점</Text>
                <View style={localStyles.infoTxtWrap}>
                  <Text style={localStyles.infoTxt}>경기도 시흥시 산기대학로 237</Text>
                  <Text style={localStyles.infoTxt}>한국산업기술대학교  TIP 308호</Text>
                </View>
              </View>

            </View>

            <View style={styles.footerBtnWrap}>
              <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>제품 등록하러가기</Text>
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

const imageSize = wp(50);

const localStyles = StyleSheet.create({
  topTxt: {
    fontSize: 14,
    color: "#8e8e98"
  },
  placeBoxWrap: {
    width : '100%',
    backgroundColor : color.defaultColor,
    flex: 3
  },
  btnPlusWrap: {
    flex: 3,
    alignItems : 'center',
    justifyContent:'center'
  },
  btnPlus: {
    width: imageSize,
    height: imageSize
  },
  txtWrap: {
    flex: 2,
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 22
  },
  infoTxtWrap: {
    flex: 1,
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 15,
    color: color.whiteColor
  }
});

export default SuccessBusinessPlace;
