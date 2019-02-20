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
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  },
  {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
  },
  {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/lceHsT6l.jpg'
  }
];

const SLIDER_1_FIRST_ITEM = 0;

class RegProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem ({item, index}) {
    return (
      <View style={[styles.pd10, {backgroundColor : color.defaultColor, height : '100%'}]}>
        <Text>{ item.title }</Text>
      </View>
    );
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:1, alignItems: 'center'}}>
            <Title></Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={[styles.mg20, {flex:1}]}>

          <View style={{flex:1}}>
            <View style={[styles.mb10, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H1>등록할</H1>
                <H1>제품정보를</H1>
                <H1>선택해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                <H1 style={{color:'#28c8f5'}}>03</H1>
              </View>
            </View>

            <View style={{height : 10, backgroundColor : color.defaultColor }} />

          </View>

          <View style={{flex:2}}>
          
            <View style={{flex:1, justifyContent : 'flex-start', alignItems : 'flex-start'}}>
              {/* <View style={{height : 3, backgroundColor : color.defaultColor}} /> */}
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
                activeSlideAlignment={'start'}
              />
            </View>

            <View style={ {flex:5}}>
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
