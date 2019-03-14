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

class ClientIntroGuide extends Component {
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
          style={{flex: 1, height: "100%"}}
          paginationStyle={{
              bottom: 0
          }} 
          dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.2)'}]} />}
          activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.defaultColor}]} />}
        >
          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/user_service_illust1.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>냉동기 고장으로 고생하셨었나요?</Text>
              
              <Text style={localStyles.guideInfoTxt}>언제올 지 모를 AS업체를 하엽없이 기다리느라</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>답답한 가슴 졸이던 기억들.</Text>

              <Text style={localStyles.guideInfoTxt}>고장난 냉동기 안의 제품손상을 막기위해</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>제품을 이리 저리 옮기며 뛰어다녔었죠.</Text>

              <Text style={localStyles.guideInfoTxt}>쿨리닉과 함께라면 이제 잊으셔도 좋습니다!</Text>
            </View>
          </View>

          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/user_service_illust2.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>쿨리닉은 세가지 편의에 집중합니다</Text>
              
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>1. AS에 걸리는 시간단축</Text>

              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>2. 정확한 조치내용의 공유</Text>

              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>3. 냉동공조기의 지속적 관리</Text>

              <Text style={localStyles.guideInfoTxt}>쿨리닉에 가입해서 이 모든 헤택을 누리세요!</Text>
            </View>
          </View>

          <View style={localStyles.guideBoxWrap}>
            <Image source={require('./img/user_service_illust3.png')} resizeMode='contain' style={localStyles.guideImg} />
            <View style={localStyles.guidTxtWrap}>
              <Text style={localStyles.guideTitleTxt}>쿨리닉은 정직한 출장비를 청구합니다</Text>
              
              <Text style={localStyles.guideInfoTxt}>출장비는 제품의 이상을 진단을 하는 기술료입니다.</Text>
              <Text style={localStyles.guideInfoTxt}>정해지지 않은 출장비는 업체에서</Text>
              <Text style={[localStyles.guideInfoTxt, styles.mb10]}>수리비로 과청구되는 결과를 만듭니다.</Text>

              <Text style={localStyles.guideInfoTxt}>쿨리닉은 기본 3만원의 출장비가 결제됩니다.</Text>
              <Text style={localStyles.guideInfoTxt}>취약시간(18시~09시), 주말 및 공휴일 기준 5만원</Text>
              <Text style={localStyles.guideInfoTxt}>비용은 제품의 종류에 따라 변동될 수 있습니다.</Text>
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
    textAlign: "center"
  }
});

export default ClientIntroGuide;
