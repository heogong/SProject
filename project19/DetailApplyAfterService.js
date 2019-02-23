import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
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
import { stylesReg } from './css/stylesReg';
import { color } from './css/color';

class DetailApplyAfterService extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  asImage = () => (
    <View 
      style={[
        styles.mb15, 
        styles.alignItemsCenter,
        styles.justiConCenter,
        { 
          backgroundColor : color.defaultColor, 
          height : asCardSize, 
          width : asCardSize
    }]}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}
      >
        <TouchableOpacity 
          style={[{height : '25%', width : '25%', backgroundColor : 'rgba(0, 0, 0, 0.6)'}]}
          onPress={ () => alert("사진조회")}>
        </TouchableOpacity>
      </ImageBackground>
    
    </View>
  )

  render() {
    return (
      <Container style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        paddingLeft : 26,
        paddingRight : 26,
      }}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")}/>
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>매칭상세정보</Title>
          </Body>
          <Right style={styles.headerRightWrap}/>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.mb15}>
            <View style={{height : mapSize, backgroundColor : 'skyblue'}}>
              <Text>MAP</Text>
            </View>

            <View style={[
              styles.fxDirRow, 
              styles.justiConCenter, 
              styles.mb15, 
              styles.pd15, 
              {backgroundColor : color.whiteColor, elevation : 2}
            ]}>
                <View style={[styles.fx3, styles.alignItemsStart, styles.justiConCenter]}>
                  <Image 
                    source={require("./img/license-depart01.png")} 
                    resizeMode="contain" 
                    style={{height : productImgSize, width : productImgSize}} 
                  />
                </View>
                <View style={[styles.justiConCenter, {flex:6}]}>
                  <H3 style={styles.mb10}>세나정육점</H3>
                  <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                  <Text style={styles.greyFont}>한국산업기술대학교 305호</Text>
                </View>
        
                <View style={styles.fx1}>
                  <Icon  name="arrow-round-forward"/>
                </View>
            </View>

            <View style={[styles.mb15, styles.pd10, {elevation : 10}]}>

              <View style={[styles.mb10, {borderColor : color.defaultColor, borderBottomWidth : 1}]}>
                <H2 style={{color : color.defaultColor, paddingTop : 30, paddingBottom : 30}}>A/S 신청내역</H2>
              </View>

              <View style={styles.mb10}>
                <Text>업소용냉장고</Text>
                <Text style={{color : color.greyColor}}>증상1. 냉동 온도가 올라가지 않음</Text>
              </View>

              <View style={styles.mb10}>
                <Text>참고사항</Text>
                <Text style={{color : color.greyColor}}>
                  주차공간이 협소하니 어쩌구저저구
                  주차공간이 협소하니 어쩌구저저구
                  주차공간이 협소하니 어쩌구저저구
                </Text>
              </View>

              <View style={styles.mb10}>
                <Text>쿨리닉 제품분석</Text>
                <View style={styles.fxDirRow}>
                  <View style={styles.fx1}>
                    <Text style={{color : color.greyColor}}>용량 :</Text>
                    <Text style={{color : color.greyColor}}>전기 :</Text>
                    <Text style={{color : color.greyColor}}>압축기 :</Text>
                  </View>
                  <View style={styles.fx1}>
                    <Text style={{color : color.greyColor}}>응축기 :</Text>
                    <Text style={{color : color.greyColor}}>증발기 :</Text>
                    <Text style={{color : color.greyColor}}>제조사 :</Text>
                  </View>
                </View>
              </View>

              <View>
                <Text>제품상세사진</Text>

                <View style={[styles.fxDirRow, styles.justiConBetween, {flexWrap : 'wrap'}]}>
                  { this.asImage() }
                  { this.asImage() }
                  { this.asImage() }
                  { this.asImage() }
               
                </View>
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

const productImgSize = wp(24, 52);
const asCardSize = wp(48, 72);
const mapSize = hp(26);

export default DetailApplyAfterService;