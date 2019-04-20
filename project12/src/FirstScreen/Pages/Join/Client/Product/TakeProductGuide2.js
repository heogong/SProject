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
            <Text style={localStyles.takeGuideCateNumTxt}>02</Text>
            <Text style={localStyles.takeGuideCateTxt}>분리형타입 촬영가이드</Text>
            <Text style={localStyles.takeGuideInfoTxt}>쿨리닉의 제품사진은 총 4장이 등록가능합니다.</Text>

            <View style={localStyles.takeGuideTypeWrap}>
              <Text style={localStyles.takeGuideTypeTxt}>[해당제품]</Text>
              <Text style={localStyles.takeGuideTypeTxt}>쇼케이스 · 제빙기 · 항온항습기 · 냉각기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>저온저장고 · 냉풍건조기 · 초저온냉동고</Text>
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>첫번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>제품의 전체사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>다음 예시처럼 제품의 외부모습 전체사진을</Text>
            <Text style={localStyles.takeGuideDscTxt}>화면에 꽉차게 하여 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide2_1.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>두번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>실외기 전체사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>다음 예시처럼 실외기의 전체모습을</Text>
            <Text style={localStyles.takeGuideDscTxt}>화면에 꽉차게 하여 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide2_2.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>세번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>실내기 전체사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>다음 예시처럼 실내기 전체모습을</Text>
            <Text style={localStyles.takeGuideDscTxt}>화면에 꽉차게 하여 찍어주세요. (많을수록 좋아요!)</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide2_3.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>네번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>제어부 외관사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>제어부의 콘트롤박스를</Text>
            <Text style={localStyles.takeGuideDscTxt}>화면에 꽉차게 하여 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide2_4.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

        </ScrollView>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  takeGuideCateWrap: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor : color.defaultColor,
    marginBottom: 26,
    textAlign: "center",
    alignItems: "center"
  },
  takeGuideCateNumTxt: {
    fontSize: 45,
    color: color.whiteColor,
    fontWeight: "bold"
  },
  takeGuideCateTxt: {
    fontSize: 21,
    color: color.whiteColor,
    fontWeight: "500"
  },
  takeGuideInfoTxt: {
    fontSize: 12,
    color: color.whiteColor,
    paddingTop: 5,
    paddingBottom: 15
  },
  takeGuideTypeWrap: {
    
  },
  takeGuideTypeTxt: {
    fontSize: 13,
    color: "#1e1e1e",
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "500"
  },
  takeGuideTitleTxt: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    color: color.defaultColor
  },
  takeGuideTitleTxt1: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 15
  },
  takeGuideDscTxt: {
    fontSize: 13,
    color: "#626270",
  },
  takeGuideImg: {
    height: 387,
    width: 196
  },
  takeGuideImgWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    marginTop: 25
  }
});

export default TakeProductGuide2;

