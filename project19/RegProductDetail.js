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
  <View style={[styles.pd10, styles.mg5, {width : cameraSize, height : cameraSize, backgroundColor : color.whiteColor}]}>
    <View style={styles.fx1} />
    <View style={[styles.fx1, {alignItems : 'center', justifyContent:'center'}]}>
        <TouchableOpacity onPress={ () => alert("사진 촬영")}>
          <Image source={require("./img/ico-camera.png")} resizeMode="center"/>
        </TouchableOpacity>
    </View>
    <View style={styles.fx1} />
  </View>
);

_imgCard = () => (
  <View style={[styles.mg5, {width : cameraSize, height : cameraSize}]}>
    <View>
      <ImageBackground 
        style={{width: '100%', height: '100%'}}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}
      >
        <View style={[styles.pd10, styles.fx2]}>
          <TouchableOpacity onPress={ () => alert("사진 삭제")}>
            <Image source={require("./img/check-on2.png")} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter, {backgroundColor : 'rgba(40, 200, 245, 0.6)'}]}
          onPress={ () => alert("재등록하기")}>
          <View>
            <Text style={[styles.whiteFont, {fontWeight : '500'}]}>재등록하기</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
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
        <View style={[styles.pd10, {backgroundColor : color.defaultBackColor}]}>
            <View style={[styles.mb10, styles.fxDirRow]}>
                <View style={styles.fx1}>
                    <View style={[styles.fx1, {backgroundColor : 'pink', justifyContent : 'center'}]}>
                        <Image source={require("./img/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                    </View>
                    <View style={styles.fx2} />
                </View>

                <View style={{flex:3, justifyContent : 'center', alignItems : 'center'}}>
                    <H2 style={[styles.mb5, {color:color.whiteColor}]}>01</H2>
                    <Image source={require("./img/license-depart01.png")} style={{height : imageSize, width : imageSize}} />
                </View>

                <View style={styles.fx1}>
                    <View style={[styles.fx1, {backgroundColor : 'pink', justifyContent : 'center', alignItems : 'flex-end'}]}>
                        <Image source={require("./img/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                        <Image source={require("./img/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                    </View>
                    <View style={styles.fx2} />
                </View>
            </View>

            <View style={[styles.mb10, {alignItems : 'center'}]}>
                <Text style={[styles.mb5, styles.whiteFont]}>제품 이름을 입력하세요</Text>
                <Item regular style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}>
                    <Input 
                        style={{fontSize : 12}}
                        placeholder="제품이름" 
                        placeholderTextColor={color.deepGreyColor}
                        />
                </Item>
                <Text style={[styles.mb5, styles.whiteFont]}>제품의 간략한 설명을 입력하세요</Text>
                <Item regular style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}>
                    <Input 
                        style={{fontSize : 12}}
                        placeholder="제품설명" 
                        placeholderTextColor={color.deepGreyColor}
                    />
                </Item>
            </View>

            <View style={{alignItems : 'center'}}>
                <Text style={styles.whiteFont}>촬영가이드에 따라 제품의 사진을 찍어주세요</Text>

                <View style={[styles.pd10, styles.fx1, {justifyContent : 'center'}]}>
                    <View style={[styles.fxDirRow, {flexWrap : 'wrap', justifyContent : 'center'}]}>

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
      <Container style={{ 
          flex: 1,
          backgroundColor: color.whiteColor,
          paddingLeft: 26
      }}>
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

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={[styles.mb15, {paddingRight : 26}]}>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <H1>제품의</H1>
                <H1>상세정보를</H1>
                <H1>입력해주세요</H1>
              </View>
              <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                <H1 style={{color:color.defaultColor}}>03</H1>
              </View>
            </View>
            <View style={{height : 10, backgroundColor : color.defaultColor }} />
          </View>

          {/* <View style={[styles.pd10, {backgroundColor : color.defaultBackColor}]}> */}
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
          {/* </View> */}
            
        </ScrollView>

        <Footer style={{paddingRight : 26, elevation: 0}}>
          <FooterTab>
            <Button 
              style={[styles.btnDefault, {marginTop : 5}]}
              block info bordered onPress={ () => alert("결제카드등록")}>
              <Text>제품등록완료</Text>
            </Button>
          </FooterTab>
        </Footer>
          
      </Container>
    );
  }
}


function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const imageSize = wp(35, 0);
const buttonSize1 = wp(8, 0);

// 메인 상품 카드 사이즈
const slideWidth = wp(85, 26);
const itemHorizontalMargin = wp(2, 0);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

// 사진 촬영박스 사이즈
const cameraSize = (39 * itemWidth) / 100;


export default RegProductDetail;
