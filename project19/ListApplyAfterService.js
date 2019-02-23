import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
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

class ListApplyAfterService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beforeMatch : true
    }
  }

  product = () => (
    (this.state.beforeMatch) ? (
      <View style={[
        styles.fxDirRow, 
        styles.justiConCenter, 
        styles.mb10, 
        styles.pd15, 
        {backgroundColor : color.defaultColor}
      ]}>
          <View style={[styles.fx3, styles.alignItemsStart, styles.justiConCenter]}>
            <Image 
              source={require("./img/license-depart01.png")} 
              resizeMode="contain" 
              style={{height : productImgSize, width : productImgSize}} 
            />
          </View>
          <TouchableOpacity 
            onPress={ () => this.setState({beforeMatch : false})} 
            style={[styles.justiConCenter, {flex:6}]
          }>
            <View>
              <H3 style={[styles.mb10, {color : color.whiteColor}]}>업소용냉장고</H3>
              <Text style={styles.whiteFont}>경기도 시흥시 산기대로</Text>
              <Text style={styles.whiteFont}>한국산업기술대학교 305호</Text>
            </View>
          </TouchableOpacity>
  
          <View style={styles.fx1}>
            <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
          </View>
      </View>
    ) : (

      <View style={[
        styles.justiConCenter, 
        styles.mb10, 
        styles.pd15, 
        {
          backgroundColor : color.whiteColor,
          borderColor : color.greyColor,
          borderWidth : 1,
          elevation : 1
        }
      ]}>
        <View style={styles.alignItemsCenter}>
          <Text style={{fontSize : 14}}>A/S 매칭을 수락하시겠습니까?</Text>
          <Text style={{fontSize : 14}}>수락 후 1시간 30분 내에 도착하셔야 합니다</Text>
        </View>

        <View style={styles.fxDirRow}>
          <View style={[styles.fx1, styles.pd10]}>
            <Button 
              onPress={ () => this.setState({beforeMatch : true}) }
              style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>매칭취소</Text>
            </Button>
          </View>
          <View style={[styles.fx1, styles.pd10]}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>A/S출발</Text>
            </Button>
          </View>
        </View>

      </View>

    )
    
  );

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
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}/>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.mb15}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>A/S신청</Text>
                <Text style={stylesReg.leftGuideTxt}>목록을 보고</Text>
                <Text style={stylesReg.leftGuideTxt}>수락해주세요</Text>
              </View>
              </View>
          </View>

          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }

        </ScrollView>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const productImgSize = wp(24, 52);

export default ListApplyAfterService;