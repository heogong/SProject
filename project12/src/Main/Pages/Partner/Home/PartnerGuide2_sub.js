import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body
} from "native-base";

import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class PartnerGuide2Sub extends Component {
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
            <Button style={styles.noPadding}  transparent onPress={Actions.pop}>
              <Image source={require("~/Common/Image/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
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
              <Image source={require('~/Common/Image/partner_guide/A42.png')} resizeMode="cover" style={localStyles.guideImg}/>  
            </View>

            <View>
              <Image source={require('~/Common/Image/partner_guide/A43.png')} resizeMode="cover" style={localStyles.guideImg}/>  
            </View>

            <View>
              <Image source={require('~/Common/Image/partner_guide/A44.png')} resizeMode="cover" style={localStyles.guideImg}/>  
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

export default PartnerGuide2Sub;
