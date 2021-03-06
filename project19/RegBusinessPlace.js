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

class RegBusinessPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem ({item, index}) {
    return (
      <View style={localStyles.slide}>
        <View style={[localStyles.slideInnerContainer, {backgroundColor: color.defaultColor}] } >
          <Text>{ item.title }</Text>
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
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>귀하의</Text>
                <Text style={styles.leftGuideTxt}>사업장정보를</Text>
                <Text style={styles.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>04</Text>
              </View>
            </View>

            <View style={styles.procBarWrap}>
              <View style={styles.fx1}>
                <View style={styles.procBarOn} />
              </View>
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

          <View style={{flex:2, justifyContent : 'center'}}>
            {/* <Carousel
              ref={c => this._slider1Ref = c}
              renderItem={this._renderItem}
              sliderWidth={viewportWidth}
              containerCustomStyle={localStyles.slider}
              activeSlideAlignment={'start'}
              itemWidth={itemWidth}
              data={ENTRIES1}
              firstItem={this.state.slider1ActiveSlide}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            /> */}

            <View style={localStyles.placeBoxWrap}>
              <View style={localStyles.btnPlusWrap}>
                <TouchableOpacity onPress={ () => alert("사업장 등록")}>
                  <Image source={require('./img/campany_add_icon.png')} style={localStyles.btnPlus}/>
                </TouchableOpacity>
              </View>
              <View style={localStyles.txtWrap}>
                <Text style={localStyles.placeNameTxt}>사업장명칭</Text>
                <View style={localStyles.infoTxtWrap}>
                  <Text style={localStyles.infoTxt}>새로운 사업장을 추가하려면</Text>
                  <Text style={localStyles.infoTxt}>위의 아이콘을 클릭하세요</Text>
                </View>
              </View>

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

const horizontalMargin = wp(2);
const itemHeight = viewportHeight * 0.47;
const slideWidth = wp(65);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const localStyles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  },
  slideInnerContainer: {
      width: slideWidth,
      flex: 1,
      // other styles for the inner container
  },
  slider: {
    marginTop: 0,
    marginLeft : 20,
    overflow: 'visible' // for custom animations
  },
  placeBoxWrap: {
    width : '100%',
    height : itemHeight, 
    backgroundColor : color.defaultColor
  },
  btnPlusWrap: {
    flex: 3,
    alignItems : 'center',
    justifyContent:'center'
  },
  btnPlus: {
    width: 120,
    height: 120
  },
  txtWrap: {
    flex: 2,
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 22
  },
  infoTxtWrap: {
    flex: 1,
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 15,
    color: color.whiteColor
  }
});

export default RegBusinessPlace;
