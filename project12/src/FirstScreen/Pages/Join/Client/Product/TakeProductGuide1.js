import React, { Component } from "react";
import { Image,  ScrollView, View } from 'react-native'
import { Container, H1, H2, Text } from "native-base";

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class TakeProductGuide1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.containerScroll}>
        <CustomHeader title="촬영가이드"/>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={[styles.fxDirRow, styles.pd20, styles.mb10, {backgroundColor : color.defaultColor}]}>
            <View style={[styles.fx5, styles.alignItemsEnd, styles.justiConCenter]}>
              <H1 style={{color : color.defaultBackColor}}>02</H1>
              <H2 style={{color : color.whiteColor}}>분리형타입</H2>
              <H2 style={{color : color.whiteColor}}>제품군</H2>
            </View>
            <View style={[styles.fx1, styles.alignItemsCenter, {marginTop : 5, marginBottom : 5}]}>
              <View style={[styles.fx1, {backgroundColor : color.whiteColor, width : '10%'}]} />
            </View>
            <View style={[styles.fx5, styles.justiConCenter]}>
              
              <Text style={styles.whiteFont}>쇼케이스</Text>
              <Text style={styles.whiteFont}>제빙기</Text>
              <Text style={styles.whiteFont}>항온항습기</Text>
              <Text style={styles.whiteFont}>냉각기</Text>
              <Text style={styles.whiteFont}>저온냉동기</Text>
              <Text style={styles.whiteFont}>냉풍건조기</Text>
              <Text style={styles.whiteFont}>초저온</Text>
            </View>
          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>1.제품의 전체사진</H2>
            <Text style={styles.greyFont}>예시처럼 화면에 꽉차게 전체사진을 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>

          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>2.기계실 사진</H2>
            <Text style={styles.greyFont}>가능하면 콤프레사 명판이 보이게 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>
          </View>

          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H2>3.제어부 사진</H2>
            <Text style={styles.greyFont}>온도 조절하는 부분을 모델명이 보이게 찍어주세요</Text>
          </View>

          <View style={[styles.mb15, {marginLeft : 25, marginRight : 25, height : guideCardSize, backgroundColor : color.defaultBackColor}]}>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderTopWidth : edgeSize}]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderRightWidth : edgeSize, borderTopWidth : edgeSize}]} />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:9}]}>
              <Image source={require("~/Common/Image/license-depart01.png")} resizeMode="contain" style={{height : '100%', width : '100%'}}  />
            </View>

            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, {borderColor : color.defaultColor, borderLeftWidth : edgeSize, borderBottomWidth : edgeSize }]} />
              <View style={{flex:9}} />
              <View style={[styles.fx1, {flex:1, borderColor : color.defaultColor, borderRightWidth : edgeSize, borderBottomWidth : edgeSize}]} />
            </View>
          </View>
          
        </ScrollView>

      </Container>
    );
  }
}

function hp (percentage, space) {
  const value = (percentage * (viewportHeight - space)) / 100;
  return Math.round(value);
}

const edgeSize = 3.5;
const guideCardSize = hp(42, 0)

export default TakeProductGuide1;

