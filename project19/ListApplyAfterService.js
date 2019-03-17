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

class ListApplyAfterService extends Component {
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
      <View style={[styles.listPrdBoxFillWrap, {height: 108}]}>
        <View style={styles.listPrdBoxImgWrap}>
          <Image 
            source={require("./img/product/09_icon_white.png")} 
            resizeMode="contain" 
            style={styles.listPrdBoxImg} 
          />
        </View>
        <View style={styles.listPrdBoxRightTxtWrap}>
          <H3 style={styles.listPrdBoxRightTitleTxt}>업소용냉장고</H3>
          <Text style={styles.listPrdBoxDeTxt}>경기도 시흥시 산기대로</Text>
          <Text style={styles.listPrdBoxDeTxt}>한국산업기술대학교 305호</Text>
        </View>

        <View style={styles.listPrdBoxNextIconWrap}>
          <TouchableOpacity>
            <Image source={require("./img/card_delete_2.png")} resizeMode="contain" style={{width: 22, height: 22}}/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <Container style={styles.containerInnerPdNoBottom}>
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
              <Text style={styles.leftGuideTxt}>A/S신청</Text>
              <Text style={styles.leftGuideTxt}>목록을 보고</Text>
              <Text style={styles.leftGuideTxt}>수락해주세요</Text>
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

export default ListApplyAfterService;