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

class TakeProductImage extends Component {
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

        <View style={styles.fx1}>
          <View style={[styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={localStyles.topTitleTxt}>보유제품사진</H1>
            <Text style={localStyles.topTxt}>사업자등록번호와 기업명, 대표이름 등</Text>
            <Text style={localStyles.topTxt}>글씨가 잘 보이도록 촬영 또는 스캔해주세요</Text>
          </View>

          <TouchableOpacity style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
            <Image source={require("./img/Photo_guide.png")} resizeMode="contain" style={localStyles.photoGuideImg} />
          </TouchableOpacity>
          

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb12]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>앨범에서 선택하기</Text>
            </Button>
            <Button style={[styles.btnDefault, styles.btnDefaultFill]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>사진 촬영하기</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  topTitleTxt: {
    marginBottom: 19,
    fontSize: 26,
    color: "#0b2024",
    fontWeight: "bold"
  },
  topTxt: {
    fontSize: 14,
    color: "#8e8e98"
  },
  guideGoTxt: {
    fontSize: 22,
    color: color.defaultColor,
    fontWeight: "bold"
  },
  photoGuideImg: {
    width: "80%",
    height: "80%"
  }
});

export default TakeProductImage;

