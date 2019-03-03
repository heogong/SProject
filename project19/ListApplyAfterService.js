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
      <View style={localStyles.listFillBoxWrap}>
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
              <H3 style={[styles.mb12, {fontsize: 18, color : color.whiteColor}]}>업소용냉장고</H3>
              <Text style={localStyles.listDeTxt}>경기도 시흥시 산기대로</Text>
              <Text style={localStyles.listDeTxt}>한국산업기술대학교 305호</Text>
            </View>
          </TouchableOpacity>
  
          <View style={styles.fx1}>
            <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
          </View>
      </View>
    ) : (

      <View style={localStyles.listNoFillBoxWrap}>
        <View style={styles.alignItemsCenter}>
          <Text style={styles.modalTopTxt}>A/S 매칭을 수락하시겠습니까?</Text>
          <Text style={styles.modalTopTxt}>수락 후 1시간 30분 내에 도착하셔야 합니다</Text>
        </View>

        <View style={styles.fxDirRow}>
          <View style={[styles.fx1, styles.pd10]}>
            <Button style={styles.modalBtnNoFill} onPress={this._toggleModal1}>
                <Text style={styles.modalBtnNoFillTxt}>취소</Text>
            </Button>
          </View>
          <View style={[styles.fx1, styles.pd10]}>
            <Button style={styles.modalBtnFill} onPress={this._toggleModal1}>
                <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
            </Button>
          </View>
        </View>

      </View>

    )
    
  );

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

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.contentWrap}>

            <View>
              <View style={{marginBottom: 38}}>
                <View style={styles.leftGuideTxtWrap}>
                  <Text style={styles.leftGuideTxt}>A/S신청</Text>
                  <Text style={styles.leftGuideTxt}>목록을 보고</Text>
                  <Text style={styles.leftGuideTxt}>수락해주세요</Text>
                </View>
              </View>

              { this.product() }
              { this.product() }
              { this.product() }
              { this.product() }

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

const productImgSize = wp(24, 52);

const localStyles = StyleSheet.create({
  listDeTxt: {
    fontSize: 13,
    color: color.whiteColor
  },
  listFillBoxWrap: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    padding: 15, 
    backgroundColor : color.defaultColor,
    height: 108
  },
  listNoFillBoxWrap: {
    justifyContent: "center",
    marginBottom: 12,
    padding: 15, 
    backgroundColor : color.whiteColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    height: 108
  }
});

export default ListApplyAfterService;