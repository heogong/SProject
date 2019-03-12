import React, { Component } from "react";
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
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

class JoinPhoneAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

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
                <Text style={styles.leftGuideTxt}>도착한</Text>
                <Text style={styles.leftGuideTxt}>인증번호를</Text>
                <Text style={styles.leftGuideTxt}>입력해주세요</Text>
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

          <View style={[styles.fxDirRow, styles.fx3]}>
            <View style={[styles.fx3, styles.pr12, styles.justiConCenter]}>
              <Item regular style={styles.inputWhBackGreyBo}>
                <Input placeholder="인증번호 입력" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
              </Item>
            </View>
            <View style={[styles.fx2, styles.justiConCenter]}>
              <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 48}]}
                onPress={this._toggleModal}>
                <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 14}]}>인증번호 확인</Text>
              </Button>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}
              onPress={this._toggleModal}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력완료</Text>
            </Button>
          </View>
          
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>입력한 인증번호가 잘못되었어요!</Text>
              </View>
              <View style={styles.modalBtnWrap}>
                <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                <Text style={styles.modalBtnFillTxt}>인증번호 재발송</Text>
              </Button>
              </View>
            </View>
          </View>
        </Modal>

      </Container>
    );
  }
}

export default JoinPhoneAuth;
