import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import Swiper from 'react-native-swiper';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class TakeProductGuide1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="촬영가이드" customStyle={{paddingLeft: 26, paddingRight: 26}}/>

        <Swiper 
          paginationStyle={{     
              bottom: 10
          }} 
          pagingEnabled={true} 
          dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.2)'}]} />}
          activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.defaultColor}]} />}
        >
        
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={localStyles.takeGuideCateWrap}>
            <Text style={localStyles.takeGuideCateNumTxt}>01</Text>
            <Text style={localStyles.takeGuideCateTxt}>일체형타입 촬영가이드</Text>
            <Text style={localStyles.takeGuideInfoTxt}>쿨리닉의 제품사진은 총 4장이 등록가능합니다.</Text>

            <View style={localStyles.takeGuideTypeWrap}>
              <Text style={localStyles.takeGuideTypeTxt}>[해당제품]</Text>
              <Text style={localStyles.takeGuideTypeTxt}>업소용냉장고 · 쇼케이스 · 제빙기</Text>
              <Text style={localStyles.takeGuideTypeTxt}>항온항습기 · 냉각기 · 초저온냉동고</Text>
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>첫번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>제품의 전체사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>다음 예시처럼 제품의 외부모습 전체사진을</Text>
            <Text style={localStyles.takeGuideDscTxt}>화면에 꽉차게 하여 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide1_1.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>두번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>기계실 사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>가능하다면 콤프레셔(Compressor)의</Text>
            <Text style={localStyles.takeGuideDscTxt}>명판이 식별 가능하게 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide1_2.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

          <View style={localStyles.takeGuideContentWrap}>
            <Text style={localStyles.takeGuideTitleTxt}>세번째,</Text>
            <Text style={localStyles.takeGuideTitleTxt1}>제어부 사진</Text>
            <Text style={localStyles.takeGuideDscTxt}>제어부의 온도조절하는 부분 및</Text>
            <Text style={localStyles.takeGuideDscTxt}>모델명이 나온 부분을 식별 가능하게 찍어주세요.</Text>

            <View style={localStyles.takeGuideImgWrap}>
              <Image source={require("~/Common/Image/photoGuide/guide1_3.png")} resizeMode="cover" style={localStyles.takeGuideImg}  />
            </View>
          </View>

        </ScrollView>

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
        </Swiper>
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
  },
  swiperDot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  takeGuideContentWrap: {
    paddingLeft: 26,
    paddingRight: 26
  }
});

export default TakeProductGuide1;

