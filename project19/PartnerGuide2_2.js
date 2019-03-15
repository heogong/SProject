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
import Swiper from 'react-native-swiper';

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class PartnerGuide1 extends Component {
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

        <View style={styles.contentWrap}>
          <Swiper 
            style={localStyles.swiperWrap}
            pagingEnabled={true} 
            dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.4)'}]} />}
            activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.defaultColor}]} />}
          >
            <View style={localStyles.guideImgWrap}>
              <Image source={require('./img/partner_guide/A46.png')} resizeMode="cover" style={localStyles.guideImg}/>  
            </View>

            <View>
              <Image source={require('./img/partner_guide/A47.png')} resizeMode="cover" style={localStyles.guideImg}/>  
            </View>

            <View>
              <Image source={require('./img/partner_guide/A48.png')} resizeMode="cover" style={localStyles.guideImg}/>  
            </View>

          </Swiper>
          
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  guideImgWrap: {
    height: "100%",
    width: "100%",
  },
  guideImg: {
    height: "100%",
    width: "100%",
  },
  swiperWrap: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PartnerGuide1;
