import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import { Actions } from 'react-native-router-flux';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

const slides = [
  {
    key: 'somethun',
    title: '엔지니어가 만든 현장맞춤형 서비스',
    text: '쿨리닉은 하루만에 갑자기 만들어진 서비스가 아닙니다\n' +
    '냉동공조 엔지니어가 의견을 모아 만들었습니다.\n\n' +
    '엔지니어의 입장에서 파트너 여러분의 소리를 듣고\n' +
    '현장의 애로사항들을 개선해나가겠습니다.\n\n' +
    '빠른 A/S매칭과 보장된 여러 서비스를 누리세요!\n',
    image: require('~/Common/Image/partner_service_illust1.png'),
    imageStyle: styles.image,
  },
  {
    key: 'somethun-dos',
    title: '아직도 출장비 청구가 어려우신가요?',
    text: '쿨리닉은 출발과 동시에 출장비가 청구되어\n' +
    '고객과 출장비로 인한 분쟁을 방지합니다.\n\n' +
    '출장비란 현장 도착까지의 이동시간과\n' +
    '기술력을 발휘하여 문제를 진단하는 비용입니다.\n\n' +
    '이제 서비스와 수리하는데에 집중하셔도 됩니다!',
    image: require('~/Common/Image/partner_service_illust2.png'),
    imageStyle: styles.image,
  },
  {
    key: 'somethun1',
    title: '엔지니어가 대접받는 그날까지!',
    text: '엔지니어‘답게’ 일하는 엔지니어와 함께 성장하겠습니다.\n' +
    '엔지니어‘처럼’만 일하는 업체는 쿨리닉과 맞지 않습니다.\n' +
    '저희와 함께 성장하는 업체가 되어주세요.\n\n' +
    '여러분의 서비스와 기술력, 그리고 철저한 A/S보고서는\n' +
    '엔지니어의 대우를 한층 높에 끌어올릴 것입니다.\n' +
    '쿨리닉의 파트너가 되어 주신다면 저희도 노력하겠습니다!\n',
    image: require('~/Common/Image/partner_service_illust3.png'),
    imageStyle: styles.image,
  }
];

export default class ServiceIntroduce extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = (item) => {
    return (
      <View style={[styles.fx1, styles.alignItemsCenter, {width : viewportWidth, backgroundColor : color.whiteColor}]}>
        <View style={[styles.fx1, styles.justiConEnd]}>
          <Image style={localStyles.image} source={item.image} />
        </View>
        <View style={[styles.fx1, styles.justiConCenter]}>
          <Text style={{fontSize : 18, fontWeight: "bold", color : '#28a0f5', textAlign : 'center', marginBottom : 29 }}>{item.title}</Text>
          <Text style={{textAlign : 'center', color: '#8e8e98', fontSize : 12}}>{item.text}</Text>
        </View>
      </View>
    );
  }
  
  render() {
    return (
      <AppIntroSlider 
        renderItem={this._renderItem} 
        slides={slides} 
        onDone={Actions.LoginAccountType} 
        onSkip={Actions.LoginAccountType}
        showSkipButton={true}
        // showNextButton={false}
        nextLabel="다음"
        doneLabel="쿨리닉의세계로"
        buttonTextStyle={{color:'#28c8f5'}}
        activeDotStyle={{backgroundColor: 'rgba(40, 200, 245, 1)'}}
        dotStyle={{backgroundColor: 'rgba(214, 241, 255, 1)'}}
      />
    )
  }
}

const localStyles = StyleSheet.create({
  image: {
    width: 272,
    height: 290,
  }
});
