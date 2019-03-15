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
  ListItem,
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
  CheckBox
} from "native-base";
import Swiper from 'react-native-swiper';

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class PartnerIntroGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
        <Swiper 
          style={{height: "100%"}}
          paginationStyle={{
              bottom: 0
          }} 
          dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.2)'}]} />}
          activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.defaultColor}]} />}
        >
          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/partner_service_illust1.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>엔지니어가 만든 현장맞춤형 서비스</Text>
              
              <Text style={localStyles.guideInfoTxt}>쿨리닉은 하루만에 갑자기 만들어진 서비스가 아닙니다.</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>냉동공조 엔지니어가 의견을 모아 만들었습니다.</Text>

              <Text style={localStyles.guideInfoTxt}>엔지니어의 입장에서 파트너 여러분의 소리를 듣고</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>현장의 애로사항들을 개선해나가겠습니다.</Text>

              <Text style={localStyles.guideInfoTxt}>빠른 A/S매칭과 보장된 여러 서비스를 누리세요!</Text>
            </View>
          </View>

          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/partner_service_illust2.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>아직도 출장비 청구가 어려우신가요?</Text>

              <Text style={localStyles.guideInfoTxt}>쿨리닉은 출발과 동시에 출장비가 청구되어</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>고객과 출장비로 인한 분쟁을 방지합니다.</Text>

              <Text style={localStyles.guideInfoTxt}>출장비란 현장 도착까지의 이동시간과</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>기술력을 발휘하여 문제를 진단하는 비용입니다.</Text>

              <Text style={localStyles.guideInfoTxt}>이제 서비스와 수리하는데에 집중하셔도 됩니다!</Text>
            </View>
          </View>

          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/partner_service_illust3.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>엔지니어가 대접받는 그날까지!</Text>
              
              <Text style={localStyles.guideInfoTxt}>엔지니어‘답게’ 일하는 엔지니어와 함께 성장하겠습니다.</Text>
              <Text style={localStyles.guideInfoTxt}>엔지니어‘처럼’만 일하는 업체는 쿨리닉과 맞지 않습니다.</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>저희와 함께 성장하는 업체가 되어주세요.</Text>

              <Text style={localStyles.guideInfoTxt}>여러분의 서비스와 기술력, 그리고 철저한 A/S보고서는</Text>
              <Text style={localStyles.guideInfoTxt}>엔지니어의 대우를 한층 높에 끌어올릴 것입니다.</Text>
              <Text style={localStyles.guideInfoTxt}>쿨리닉의 파트너가 되어 주신다면 저희도 노력하겠습니다!</Text>
            </View>
          </View>
          
        </Swiper>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  swiperDot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  guideBoxWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40
  },
  guideImg: {
    height : 304,
    width: 304
  },
  guidTxtWrap: {
    
  },
  guideTitleTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a0f5",
    textAlign: "center",
    paddingBottom: 29,
    paddingTop: 70
  },
  guideInfoTxt: {
    fontSize: 13,
    color: "#8e8e98",
    textAlign: "center",
    lineHeight: 20
  }
});

export default PartnerIntroGuide;
