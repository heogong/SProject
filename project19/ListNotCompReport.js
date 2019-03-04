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

import Modal from "react-native-modal";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class ListNotCompReport extends Component {
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
      <View style={localStyles.listFillBoxWrap}>
        <View style={[styles.alignItemsStart, styles.justiConCenter, {height : 80, width : 80, marginTop: 4}]}>
          <Image 
            source={require("./img/license-depart01.png")} 
            resizeMode="contain" 
            style={{height : 80, width : 80, marginBottom: 5}} 
          />
          <Text style={{width: 80, textAlign: "center", fontSize: 12, color: color.whiteColor}}>육류 냉장고</Text>
        </View>
        <View style={[styles.justiConCenter, {paddingLeft: 20}]}>
          <H3 style={[styles.mb12, {fontWeight: "bold", fontsize: 18, color : color.whiteColor}]}>세나정육점</H3>
          <Text style={[localStyles.listDeTxt, styles.mb12]}>2019년 01월 26일</Text>
          <Text style={localStyles.listDeTxt}>경기도 시흥시 산기대로</Text>
          <View style={styles.fxDirRow}>
            <Text style={[localStyles.listDeTxt, {paddingTop: 3}]}>만족도</Text>
            <View style={[styles.fxDirRow, {marginLeft: 6}]}>
              <Icon style={localStyles.startIcon} name="star"/>
              <Icon style={localStyles.startIcon} name="star"/>
              <Icon style={localStyles.startIcon} name="star"/>
              <Icon style={localStyles.startIcon} name="star-outline"/>
              <Icon style={localStyles.startIcon} name="star-outline"/>
            </View>
          </View>
        </View>

        <View style={[styles.fx1, {alignItems: "flex-end", marginTop: -5}]}>
          <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
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

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.contentWrap}>

            <View>
              <View style={[styles.fxDirRow, {marginBottom: 38}]}>
                <View style={styles.leftGuideTxtWrap}>
                  <Text style={styles.leftGuideTxt}>미작성된</Text>
                  <Text style={styles.leftGuideTxt}>보고서작성을</Text>
                  <Text style={styles.leftGuideTxt}>완료해주세요</Text>
                </View>

                <View style={styles.rigthTxtWrap}>
                  <Text style={styles.rightTxt}>
                    04<Text style={styles.rightTxtSmall}>건</Text>
                  </Text>
                </View>
              </View>

              { this.product() }
              { this.product() }
              { this.product() }
              { this.product() }

            </View>
          </View>
        </ScrollView>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={[styles.modalWrap, {height: 128}]}>
            <View style={styles.modalContent}>
              <View style={[styles.modalTop2LTxtWrap]}>
                  <Text style={styles.modalTopTxt}>A/S 매칭을 수락하시겠습니까?</Text>
                  <Text style={styles.modalTopTxt}>수락 후 1시간 30분 내에 도착하셔야 합니다</Text>
              </View>
              <View style={styles.modalBtnTwinWrap}>
                <View style={{marginRight: 9}}>
                    <Button style={styles.modalBtnNoFill} onPress={this._toggleModal}>
                        <Text style={styles.modalBtnNoFillTxt}>매칭취소</Text>
                    </Button>
                </View>
                <View style={{marginLeft: 9}}>
                    <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                        <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
                    </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  listDeTxt: {
    fontSize: 13,
    color: color.whiteColor
  },
  listFillBoxWrap: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    padding: 14, 
    backgroundColor : color.defaultColor,
    height: 120
  },
  startIcon: {
    color: color.whiteColor,
    fontSize: 17,
    marginRight: 2
  }
});

export default ListNotCompReport;