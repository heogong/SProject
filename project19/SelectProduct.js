import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";
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

class SelectProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.slide}>
          <View style={[styles.slideInnerContainer, {backgroundColor:'#28c8f5'}] } >
            <Text>{ item.title }</Text>
          </View>
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          </Body>
        </Header>
        <View style={{flex:1}}>

          <View style={[styles.mg10, {flex:1, backgroundColor: 'pink'}]}>
            <Text>신청할</Text>
            <Text>제품종류를</Text>
            <Text>선택해주세요.</Text>
          </View>

          <View style={{flex:2, justifyContent : 'center'}}>
            <View style={{alignItems : 'baseline'}}>
              <Pagination
                dotsLength={ENTRIES1.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'#28c8f5'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={'#28c8f5'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
                activeSlideAlignment={'start'}
              />
            </View>
              <Carousel
                ref={c => this._slider1Ref = c}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                containerCustomStyle={styles.slider}
                activeSlideAlignment={'start'}
                itemWidth={itemWidth}
                data={ENTRIES1}
                firstItem={this.state.slider1ActiveSlide}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
              />
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

const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;
const horizontalMargin = wp(2);
const itemHeight = viewportHeight * 0.36;
const slideWidth = wp(65);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb15: {
    marginBottom: 20
  },
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
  paginationContainer: {
    paddingVertical: 30
  },
  paginationDot: {
    borderRadius: 4,
    marginHorizontal: 0,
    height: 10,
    width: 10
  },
  slider: {
    marginTop: 0,
    marginLeft : 20,
    overflow: 'visible' // for custom animations
},
});

export default SelectProduct;