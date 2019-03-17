import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View, TextInput} from 'react-native'
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

class HistoryAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      beforeMatch : true
    }
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  asImage = () => (
    <View style={localStyles.prdPhoto}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}>
        <TouchableOpacity 
          style={localStyles.prdPhotoBtnEn}
          onPress={ () => alert("사진조회")}>
          <Image source={require("./img/Zoomup_button.png")} resizeMode="contain" style={localStyles.prdPhotoBtnEnIcon}/>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )

  asNoImage = () => (
    <TouchableOpacity style={localStyles.photoNoBoxWrap}>
      <View style={localStyles.photoNoBox}>
        <Image source={require("./img/camera_icon.png")} resizeMode="contain" style={localStyles.prdCardCameraIcon} />
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <Container style={styles.container}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft: 26, paddingRight: 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>A/S 신청 확인</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
        
          <View style={localStyles.contentWrap}>
            <View style={localStyles.titleWrap}>
              <Image source={require('./img/product/01_icon_white.png')} style={localStyles.titleImg}/>
              <Text style={localStyles.titleNameTxt}>세나정육점</Text>
              <Text style={localStyles.subNameTxt}>육류용냉장고</Text>
            </View>

            <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
              <Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>육류용 냉장고</Text>
              <Text style={localStyles.histBoxInfoTxt}>경기도 시흥시 산기대로</Text>
              <Text style={localStyles.histBoxInfoTxt}>bbbbbbbbbbb</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>A/S 증상</Text>
              <Text style={localStyles.histBoxInfoTxt}>증상1. 냉동온도가 올라가지 않음</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
              <Text style={localStyles.histBoxInfoTxt}>12312312312312312312312312321</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>A/S 출장 비용</Text>
              <Text style={localStyles.histBoxInfoTxt}>120,000원</Text>
            </View>

          </View>
        </ScrollView>

        <View style={[styles.footerBtnWrap, {paddingLeft: 26, paddingRight: 26, paddingBottom: 26, paddingTop: 10}]}>
            <View style={styles.mb10}>
              <Text style={localStyles.bottomTxt}>입력하신 사항이 정확한가요?</Text>
              <Text style={localStyles.bottomTxt}>매칭이 시작되면 출장비가 결제되니 꼼꼼하게 살펴주세요.</Text>
            </View>
            <Button style={[styles.btnDefault, styles.btnDefaultFill]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>매칭 시작하기</Text>
            </Button>
          </View>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

function hp (percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const asCardSize = wp(48, 72);

const layCount = 3;

const localStyles = StyleSheet.create({
  titleWrap: {
    alignItems : 'center'
  },
  titleImg: {
    width: 80,
    height: 80,
    marginTop: -40
  },
  boxTitleWrap: {
    marginBottom: 20,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  boxTitleTxt: {
    flex: 1,
    fontSize: 18,
    color : color.whiteColor,
    fontWeight: "bold"
  },
  contentWrap: {
    paddingLeft: 26,
    paddingRight: 26,
    marginTop: 40,
    paddingBottom: 26,
    backgroundColor: color.defaultColor,
  },
  titleNameTxt: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "bold",
    color: color.whiteColor
  },
  subNameTxt: {
    marginTop: 7,
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: color.whiteColor
  },
  histBoxWrap: {
    backgroundColor: color.whiteColor,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 24,
    paddingRight: 24
  },
  histBoxTitleTxt: {
    color:'#28c8f5',
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6
  },
  histBoxSubTitleTxt: {
    fontSize: 15,
    color: "#1e1e32",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20
  },
  histBoxInfoTxt: {
    fontSize: 13,
    color: "#8e8e98",
    lineHeight: 20
  },
  bottomTxt: {
    fontSize: 14, color: "#8e8e98", textAlign: "center"
  }
});

export default HistoryAfterService;