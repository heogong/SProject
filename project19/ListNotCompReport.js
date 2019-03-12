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
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
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
              <Text style={styles.leftGuideTxt}>미작성된</Text>
              <Text style={styles.leftGuideTxt}>보고서작성을</Text>
              <Text style={styles.leftGuideTxt}>완료해주세요</Text>
            </View>

            <View style={styles.rigthTxtWrap}>
              <Text style={[styles.rightTxt, {fontWeight: "bold"}]}>
                04<Text style={styles.rightTxtSmall}>건</Text>
              </Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
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

export default ListNotCompReport;