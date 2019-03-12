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
import { color } from './css/color';

class DetailApplyAfterService extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

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
            <Title style={styles.headerTitleTxt}>매칭상세정보</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.mb15}>
            <View style={styles.boxShadow}>
              <View style={{height : mapSize, backgroundColor : 'skyblue'}}>
                <Text>MAP</Text>
              </View>

              <View style={[
                styles.fxDirRow, 
                styles.justiConCenter, 
                styles.pd15, 
                {backgroundColor : color.whiteColor}]}>
                <View style={[styles.fx3, styles.alignItemsStart, styles.justiConCenter]}>
                  <Image 
                    source={require("./img/license-depart01.png")} 
                    resizeMode="contain" 
                    style={{height : productImgSize, width : productImgSize}} 
                  />
                </View>
                <View style={[styles.justiConCenter, {flex:6}]}>
                  <H3 style={[styles.mb15, localStyles.topBoxTxt]}>세나정육점</H3>
                  <Text style={localStyles.topBoxDeTxt}>경기도 시흥시 산기대로</Text>
                  <Text style={localStyles.topBoxDeTxt}>한국산업기술대학교 305호</Text>
                </View>
        
                <View style={styles.fx1}>
                  <Icon  name="arrow-round-forward"/>
                </View>
              </View>
            </View>
            
            <View style={{marginTop: 16}}>
              <View style={[styles.boxShadow, localStyles.bottomBoxWrap]}>
                <View style={localStyles.boxDetailTitleWrap}>
                  <Text style={localStyles.boxDetailTitleTxt}>A/S 신청내역</Text>
                </View>

                <View style={styles.mb20}>
                  <Text style={localStyles.boxDetailSubTitleTxt}>업소용냉장고</Text>
                  <Text style={localStyles.boxDetailSubTxt}>증상1. 냉동 온도가 올라가지 않음</Text>
                </View>

                <View style={styles.mb20}>
                  <Text style={localStyles.boxDetailSubTitleTxt}>참고사항</Text>
                  <Text style={localStyles.boxDetailSubTxt}>
                    주차공간이 협소하니 어쩌구저저구
                    주차공간이 협소하니 어쩌구저저구
                    주차공간이 협소하니 어쩌구저저구
                  </Text>
                </View>

                <View style={styles.mb20}>
                   <Text style={localStyles.boxDetailSubTitleTxt}>쿨리닉 제품분석</Text>
                  <View style={styles.fxDirRow}>
                    <View style={styles.fx1}>
                      <Text style={localStyles.boxDetailSubTxt}>용량 :</Text>
                      <Text style={localStyles.boxDetailSubTxt}>전기 :</Text>
                      <Text style={localStyles.boxDetailSubTxt}>압축기 :</Text>
                    </View>
                    <View style={styles.fx1}>
                      <Text style={localStyles.boxDetailSubTxt}>응축기 :</Text>
                      <Text style={localStyles.boxDetailSubTxt}>증발기 :</Text>
                      <Text style={localStyles.boxDetailSubTxt}>제조사 :</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={localStyles.boxDetailSubTitleTxt}>제품상세사진</Text>

                  <View style={localStyles.prdPhotoWrap}>
                    { this.asImage() }
                    { this.asImage() }
                    { this.asImage() }
                    { this.asImage() }
                  </View>
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
const asCardSize = wp(48, 96);
const mapSize = hp(26);

const localStyles = StyleSheet.create({
  topBoxTxt: {
    fontSize: 21,
    color: "#1e1e32",
    fontWeight: "bold"
  },
  topBoxDeTxt: {
    fontSize: 13,
    color: "#8e8e98"
  },
  bottomBoxWrap: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    backgroundColor: "#fff"
  },
  boxDetailTitleWrap: {
    marginBottom: 24,
    borderColor: color.defaultColor,
    borderBottomWidth : 1
  },
  boxDetailTitleTxt: {
    fontSize: 18,
    color : color.defaultColor,
    paddingTop : 26,
    paddingBottom : 26,
    fontWeight: "bold"
  },
  boxDetailSubTitleTxt: {
    fontSize: 14,
    color: "#1e1e32",
    paddingBottom: 10
  },
  boxDetailSubTxt: {
    fontSize: 13,
    color: "#8e8e98"
  },
  prdPhotoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap : 'wrap'
  },
  prdPhoto: {
    marginBottom : 10,
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
  }
});

export default DetailApplyAfterService;