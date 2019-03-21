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

import Carousel, { Pagination } from 'react-native-snap-carousel';
export const ENTRIES1 = [
    {
      title: '업소용냉장고'
    },
    {
      title: '쇼케이스'
    },
    {
      title: '업소용냉장고'
    },
    {
      title: '쇼케이스'
    }
];
const SLIDER_1_FIRST_ITEM = 0;

_cameraCard = () => (
  <TouchableOpacity onPress={ () => alert("사진 촬영")}>
    <View style={localStyles.prdCardOffPhotoWrap}>
      <Image source={require("./img/camera_icon.png")} resizeMode="contain" style={localStyles.prdCardCameraIcon} />
    </View>
  </TouchableOpacity>
);

_imgCard = () => (
  <View style={localStyles.prdCardOnPhotoWrap}>
    <ImageBackground 
      style={{width: '100%', height: '100%'}}
      source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}>
      <View style={[styles.pd10, styles.fx2]}>
        <TouchableOpacity onPress={ () => alert("사진 삭제")}>
          <Image source={require("./img/small_delete_button.png")} resizeMode="contain" style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={localStyles.prdCardPhotoBtnEn}
        onPress={ () => alert("사진조회")}>
        <Text style={localStyles.prdCardPhotoBtnTxt}>재등록하기</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);




class RegProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }


  _renderItem ({item, index}) {
    return (
        <View style={localStyles.prdCardWrap}>
            <View style={localStyles.prdCardTopWrap}>
                <Image source={require("./img/card_delete_icon.png")} style={localStyles.prdCardTopIconImg} />

                <View style={{flex:3, justifyContent : 'center', alignItems : 'center'}}>
                    <Text style={localStyles.prdCardTopNumTxt}>01</Text>
                    <Image source={require("./img/product/01_icon_white.png")} style={{height : imageSize, width : imageSize}} />
                </View>

                <View>
                  <Image source={require("./img/card_add_icon.png")} style={[localStyles.prdCardTopIconImg, styles.mb10]} />
                  <Image source={require("./img/card_copy_icon.png")} style={[localStyles.prdCardTopIconImg, styles.mb10]} />
                  <Image source={require("./img/card_mod_icon.png")} style={localStyles.prdCardTopIconImg} />
                </View>
            </View>

            <View style={localStyles.prdCardInputWrap}>
                <Text style={localStyles.prdCardInfoTxt}>제품 이름을 입력하세요</Text>
                <Item regular style={[localStyles.prdCardInputBox, {width: "70%"}]}>
                    <Input 
                        style={localStyles.prdCardNameInput}
                        placeholder="제품이름" 
                        placeholderTextColor="#8e8e98"
                        />
                </Item>
                <Text style={localStyles.prdCardInfoTxt}>제품의 간략한 설명을 입력하세요</Text>
                <Item regular style={localStyles.prdCardInputBox}>
                    <Input 
                        style={localStyles.prdCardDscInput}
                        placeholder="제품설명" 
                        placeholderTextColor="#8e8e98"
                    />
                </Item>
            </View>

            <View style={styles.alignItemsCenter}>
                <Text style={styles.whiteFont}>촬영가이드에 따라 제품의 사진을 찍어주세요</Text>

                <View style={localStyles.prdCardPhotoWrap}>
                    <View style={localStyles.prdCardPhoto}>

                      { this._cameraCard() }
                      { this._imgCard() }
                      { this._cameraCard() }
                      { this._cameraCard() }
                        
                    </View>
                </View>
            </View>
        </View>
    );
  }


  render() {
    return (
      <Container style={styles.containerRightSlide}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
            <View>
              
              <View style={styles.fxDirRow}>
                <View style={styles.leftGuideTxtWrap}>
                  <Text style={styles.leftGuideTxt}>제품의</Text>
                  <Text style={styles.leftGuideTxt}>상세정보를</Text>
                  <Text style={styles.leftGuideTxt}>입력해주세요</Text>
                </View>
                <View style={[styles.rightStepNumWrap, {paddingRight: 26}]}>
                  <Text style={styles.rightStepNum}>03</Text>
                </View>
              </View>

              <View style={[styles.procBarWrap, {paddingRight: 26, marginBottom: 47}]}>
                <View style={styles.fx1}>
                  <View style={styles.procBarOn} />
                </View>
                <View style={styles.fx1}>
                  <View style={styles.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={styles.procBarOn} />
                </View>
              </View>
              
            </View>
            <Carousel
                ref={c => this._slider1Ref = c}
                renderItem={this._renderItem}
                sliderWidth={viewportWidth}
                activeSlideAlignment={'start'}
                itemWidth={itemWidth}
                data={ENTRIES1}
                firstItem={this.state.slider1ActiveSlide}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
          </ScrollView>
        </View>

        <View style={[styles.footerBtnWrap, {flex: 0, paddingRight: 26, paddingBottom: 26}]}>
          <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
            <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>제품등록완료</Text>
          </Button>
        </View>
          
          
      </Container>
    );
  }
}


function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const imageSize = wp(40, 0);
const buttonSize1 = wp(8, 0);

// 메인 상품 카드 사이즈
const slideWidth = wp(85, 26);
const itemHorizontalMargin = wp(2, 0);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

// 사진 촬영박스 사이즈
const cameraSize = (39 * itemWidth) / 100;

const localStyles = StyleSheet.create({
  prdCardWrap: {
    padding: 17,
    backgroundColor : "#7be6fd",
    marginBottom: 26
  },
  prdCardTopWrap: {
    marginBottom: 10,
    flexDirection: "row"
  },
  prdCardTopIconImg: {
    width: 36,
    height: 36
  },
  prdCardTopNumTxt: {
    fontSize: 36,
    color: "#038dbd",
    fontWeight: "bold",
    marginBottom: 16
  },
  prdCardInfoTxt: {
    fontSize: 14,
    color: color.whiteColor,
    marginBottom: 8
  },
  prdCardInputWrap: {
    alignItems : 'center'
  },
  prdCardInputBox: {
    marginBottom: 20,
    backgroundColor: color.whiteColor,
    borderColor : color.whiteColor,
    height : 32
  },
  prdCardNameInput: {
    fontSize : 14,
    textAlign: "center",
    height : 38
  },
  prdCardDscInput: {
    fontSize : 13,
    textAlign: "center",
    height : 36
  },
  prdCardPhotoWrap: {
    flex: 1,
    justifyContent : 'center'
  },
  prdCardPhoto: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  prdCardOffPhotoWrap: {
    padding: 10,
    width : cameraSize,
    height : cameraSize,
    backgroundColor : color.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  prdCardOnPhotoWrap: {
    width : cameraSize,
    height : cameraSize,
    margin: 5
  },
  prdCardPhotoBtnEn: {
    height : 35,
    width : "100%",
    backgroundColor: 'rgba(40, 200, 245, 0.6)'
  },
  prdCardPhotoBtnTxt: {
    fontSize: 14,
    color: color.whiteColor,
    textAlign: "center",
    marginTop: 10
  },
  prdCardCameraIcon: {
    color: color.defaultColor,
    width: 36,
    height: 36
  }
});

export default RegProductDetail;
