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
  }];

const SLIDER_1_FIRST_ITEM = 0;

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class RegProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem ({item, index}) {
    return (
      <View style={[styles.pd15, {backgroundColor : color.defaultColor, height : '100%'}]}>
        <View style={styles.fx1}>
          <H1 style={{color : color.whiteColor}}>{ item.title }</H1>
        </View>
        <View style={[styles.fx2, styles.fxDirRow]}>

          <View style={[styles.fx1, styles.justiConEnd]}>
            <H1 style={{color : color.whiteColor}}>
              { pad(++index, 2) }
            </H1>
          </View>
          <View style={[styles.fx2, styles.justiConEnd, styles.alignItemsEnd]}>
            <Image source={require("./img/license-depart02.png")} style={{height : itemWidth/2, width : itemWidth/2}} />
          </View>

        </View>
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>

          <View style={styles.fx1}>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <H1>등록할</H1>
                <H1>제품정보를</H1>
                <H1>선택해주세요</H1>
              </View>
              <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                <H1 style={{color:color.defaultColor}}>03</H1>
              </View>
            </View>
            <View style={{height : 10, backgroundColor : color.defaultColor }} />
          </View>

          <View style={styles.fx2}>
            <View style={[styles.fx1, styles.alignItemsStart, {justifyContent : 'flex-start'}]}>
              <Pagination
                dotsLength={ENTRIES1.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                containerStyle={localStyles.paginationContainer}
                dotColor={color.defaultColor}
                dotStyle={localStyles.paginationDot}
                inactiveDotColor={color.defaultColor}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
            </View>

            <View style={{flex:5}}>
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
            </View>

          </View>
            
        </View>
          
      </Container>
    );
  }
}

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(65);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;


const localStyles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 0
  },
  paginationDot: {
    borderRadius: 4,
    marginHorizontal: 0,
    height: 10,
    width: 10
  }
});

export default RegProductInfo;
