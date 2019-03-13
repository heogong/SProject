import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class TakeProductGuide2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.containerScroll}>
        <CustomHeader title="촬영가이드"/>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={localStyles.takeGuideCateWrap}>
            <View style={localStyles.takeGuideCateTxtWrap}>
              <Text style={localStyles.takeGuideCateNumTxt}>02</Text>
              <Text style={localStyles.takeGuideCateTxt}>분리형타입</Text>
              <Text style={localStyles.takeGuideCateTxt}>제품군</Text>
            </View>
            <View style={localStyles.takeGuideBarWrap}>
              <View style={localStyles.takeGuideBar}/>
            </View>
            <View style={localStyles.takeGuideTypeWrap}>
              <Text style={localStyles.takeGuideTypeTxt}>쇼케이스</Text>
              <Text style={localStyles.takeGuideTypeTxt}>제빙기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>항온항습기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>냉각기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>저온냉동기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>냉풍건조기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>초저온</Text>
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>1.제품의 전체사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>예시처럼 화면에 꽉차게 전체사진을 찍어주세요</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>2. 기계실 사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>가능하면 콤프레샤 명판이 보이게 찍어주세요</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>3. 제어부 사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>온도 조절하는 부분을 모델명이 보이게 찍어주세요</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={localStyles.takeGuideImg}  />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  takeGuideCateWrap: {
    flexDirection: "row",
    padding: 20,
    backgroundColor : color.defaultColor,
    flex: 1,
    marginBottom: 26
  },
  takeGuideCateTxtWrap: {
    flex: 5,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  takeGuideCateNumTxt: {
    fontSize: 48,
    color: color.whiteColor,
    fontWeight: "bold"
  },
  takeGuideCateTxt: {
    fontSize: 21,
    color: color.whiteColor
  },
  takeGuideBarWrap: {
    flex: 1,
    alignItems: "center",
    marginTop : 5,
    marginBottom : 5
  },
  takeGuideBar: {
    flex: 1,
    backgroundColor : color.whiteColor,
    width : '10%'
  },
  takeGuideTypeWrap: {
    flex: 5,
    justifyContent: "center"
  },
  takeGuideTypeTxt: {
    fontSize: 14,
    color: color.whiteColor,
    lineHeight: 18
  },
  takeGuideTitleTxt: {
    fontSize: 16,
    color: "#1e1e32",
    marginBottom: 7,
    textAlign: "center",
    fontWeight: "bold"
  },
  takeGuideDscTxt: {
    fontSize: 14,
    color: "#8e8e98",
    marginBottom: 15,
    textAlign: "center"
  },
  takeGuideImg: {
    height: 270,
    width: 270
  },
  takeGuideImgWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28
  }
});

export default TakeProductGuide2;

