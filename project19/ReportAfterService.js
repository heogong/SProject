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

class ReportAfterService extends Component {
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
          <Icon active={this.state.tab1} name="expand" style={localStyles.prdPhotoBtnEnIcon}/>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )

  asNoImage = () => (
    <TouchableOpacity style={localStyles.photoNoBoxWrap}>
      <View style={localStyles.photoNoBox}>
        <Icon name="ios-camera" style={localStyles.phototNoIcon} />
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
            <Title style={styles.headerTitleTxt}>출장보고서</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
        
          <View style={localStyles.contentWrap}>
            <View style={localStyles.titleWrap}>
              <Image source={require('./img/license-depart01.png')} style={localStyles.titleImg}/>
              <Text style={localStyles.titleNameTxt}>세나정육점</Text>
              <Text style={localStyles.subNameTxt}>육류용냉장고</Text>
            </View>

            <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
              <Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>육류용 냉장고</Text>
              <Text style={localStyles.histBoxInfoTxt}>경기도 시흥시 산기대로</Text>
              <Text style={localStyles.histBoxInfoTxt}>bbbbbbbbbbb</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
              <Text style={localStyles.histBoxInfoTxt}>12312312312312312312312312321</Text>

              <Text style={localStyles.histBoxSubTitleTxt}>쿨리닉데이터</Text>
              <View style={styles.fxDirRow}>
                <View style={styles.fx1}>
                  <Text style={localStyles.histBoxInfoTxt}>용량 :</Text>
                  <Text style={localStyles.histBoxInfoTxt}>전기 :</Text>
                  <Text style={localStyles.histBoxInfoTxt}>압축기 :</Text>
                </View>
                <View style={styles.fx1}>
                  <Text style={localStyles.histBoxInfoTxt}>응축기 :</Text>
                  <Text style={localStyles.histBoxInfoTxt}>증발기 :</Text>
                  <Text style={localStyles.histBoxInfoTxt}>제조사 :</Text>
                </View>
              </View>
            </View>

            <View>
              <View>
                <View style={[localStyles.boxTitleWrap]}>
                  <Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
                  <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                </View>

                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                  <View style={localStyles.prdPhotoWrap}>
                    { this.asImage() }
                    { this.asImage() }
                    { this.asNoImage() }
                    { this.asNoImage() }
                  </View>
                  <View style={localStyles.prdPhotoTxtWrap}>
                    <Text style={localStyles.histBoxSubTitleTxt}>출장 전 상태</Text>
                    <Text style={localStyles.histBoxInfoTxt}>ㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹ</Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={[localStyles.boxTitleWrap]}>
                  <Text style={localStyles.boxTitleTxt}>A/S 조치 후</Text>
                  <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                </View>

                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                  <View style={localStyles.prdPhotoWrap}>
                    { this.asImage() }
                    { this.asImage() }
                    { this.asNoImage() }
                    { this.asNoImage() }
                  </View>
                  <View style={localStyles.prdPhotoTxtWrap}>
                    <Text style={localStyles.histBoxSubTitleTxt}>A/S 조치내역</Text>
                    <Text style={localStyles.histBoxInfoTxt}>ㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹ</Text>
                  </View>
                </View>
                

              </View>
            </View>
            
            <View>
              <View style={[localStyles.boxTitleWrap]}>
                <Text style={localStyles.boxTitleTxt}>추가 A/S</Text>
                <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
              </View>
              <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                <Text style={localStyles.histBoxTitleTxt}>청구비용</Text>

                <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 비용</Text>
                <Text style={localStyles.histBoxInfoTxt}>120,000원</Text>

                <Text style={localStyles.histBoxSubTitleTxt}>추가A/S내역</Text>
                <Text style={localStyles.histBoxInfoTxt}>1231231231231231231231231232112312312312312312312312312321</Text>

                <Text style={localStyles.histBoxSubTitleTxt}>추가A/S사유</Text>
                <Text style={localStyles.histBoxInfoTxt}>12312312312312312312312312321123123123123123123123123123211231231231231231231231231232112312312312312312312312312321</Text>
              </View>
            </View>

          </View>
        </ScrollView>

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
const imageSize = viewportWidth / layCount;

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
  prdPhotoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap : 'wrap',
    backgroundColor: color.whiteColor,
    width: "100%"
  },
  prdPhoto: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : color.defaultColor, 
    height : asCardSize, 
    width : asCardSize
  },
  prdPhotoBtnEn: {
    height : 32,
    width : 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  prdPhotoBtnEnIcon: {
    textAlign: "center",
    color: color.whiteColor
  },
  photoNoBoxWrap: {
    flex: 5,
    borderColor : "#c9cacb",
    borderWidth : 1,
    margin: 5,
    height : asCardSize, 
    width : asCardSize
  },
  photoNoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.whiteColor
  },
  phototNoIcon: {
    color: color.defaultColor,
    fontSize: 50
  },
  contentWrap: {
    paddingLeft: 26,
    paddingRight: 26,
    marginTop: 40,
    paddingBottom: 26,
    backgroundColor: color.defaultColor
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
  prdPhotoTxtWrap: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: "#c9cacb"
  },
});

export default ReportAfterService;