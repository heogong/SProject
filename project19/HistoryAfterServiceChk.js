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

class HistoryAfterServiceChk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      beforeMatch : true
    }
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  product = () => (
    <TouchableOpacity onPress={ () => this._toggleModal()}>
      <View style={[styles.listPrdBoxFillWrap, {height: 120}]}>
        <View style={[styles.listPrdBoxImgWrap ,{marginTop: 4}]}>
          <Image 
            source={require("./img/license-depart01.png")} 
            resizeMode="contain" 
            style={styles.listPrdBoxImg} 
          />
          <Text style={styles.listPrdBoxImgTxt}>육류 냉장고</Text>
        </View>
        <View style={styles.listPrdBoxRightTxtWrap}>
          <H3 style={styles.listPrdBoxRightTitleTxt}>세나정육점</H3>
          <Text style={[styles.listPrdBoxDeTxt, styles.mb12, {fontWeight: "500"}]}>2019년 01월 26일</Text>
          <Text style={styles.listPrdBoxDeTxt}>경기도 시흥시 산기대로</Text>
          <View style={styles.fxDirRow}>
            <Text style={[styles.listPrdBoxDeTxt, {paddingTop: 3}]}>만족도</Text>
            <View style={[styles.fxDirRow, {marginLeft: 6}]}>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star-outline"/>
              <Icon style={styles.listPrdBoxStartIcon} name="star-outline"/>
            </View>
          </View>
        </View>

        <View style={styles.listPrdBoxNextIconWrap}>
          <Icon style={styles.listPrdBoxNextIcon} name="arrow-round-forward"/>
        </View>
      </View>
    </TouchableOpacity>
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

        <View style={{marginBottom: 36}}>
          <View style={styles.fxDirRow}>
            <View style={styles.leftGuideTxtWrap}>
              <Text style={styles.leftGuideTxt}>A/S 받으신</Text>
              <Text style={styles.leftGuideTxt}>내역에 대해</Text>
              <Text style={styles.leftGuideTxt}>확인해보세요</Text>
            </View>

            <View style={styles.rigthTxtWrap}>
              <Text style={[styles.rightTxt, {fontWeight: "bold"}]}>
                00<Text style={styles.rightTxtSmall}>건</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.listPrdBoxEmptyImgWrap}>
          <Image 
            source={require("./img/license-depart01.png")} 
            style={{height: 219, width: 219, marginTop: -36}} 
          />
        </View>

      </Container>
    );
  }
}

export default HistoryAfterServiceChk;