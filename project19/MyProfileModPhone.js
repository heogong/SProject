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
import Modal from "react-native-modal";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';


class MyProfileModPassword1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false,
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
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>휴대폰 번호 설정</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={styles.fx1}>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>휴대폰 번호를 입력하신 후 [인증번호 받기] 버튼을 눌러주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>휴대폰번호 (’-’ 제외)</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="휴대폰 번호를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
              <TouchableOpacity>
                <Image source={require("./img/Delete_button_gray.png")} resizeMode="contain" style={localStyles.clearIconImg} />
              </TouchableOpacity>
            </Item>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mt13]}
              onPress={this._toggleModal}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>인증번호 받기</Text>
            </Button>

            <Text style={styles.inputNbTitleTxt}>인증번호</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="인증번호를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            {/* ON 
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>설정완료</Text>
            </Button>
             */}
             {/* Off */}
             <Button style={[styles.btnDefault, styles.btnDefaultFillOff, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillOffTxt]}>설정완료</Text>
            </Button>
          </View>
        </View>
        
        <Modal isVisible={this.state.isModalVisible}>
          <View style={[styles.modalWrap, {height: 128}]}>
            <View style={styles.modalContent}>
              <View style={[styles.modalTop2LTxtWrap]}>
                  <Text style={styles.modalTopTxt}>01050093815로 6자리 인증번호를</Text>
                  <Text style={styles.modalTopTxt}>보내드렸습니다. 5분 내 인증번호를 입력해주세요!</Text>
              </View>
              <View style={styles.modalBtnOneWrap}>
                <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                <Text style={styles.modalBtnFillTxt}>확인</Text>
              </Button>
              </View>
            </View>
          </View>
        </Modal>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  inputIcon: {
    paddingLeft: 0,
    marginRight: 6,
    width: 24,
    height: 24
  },
  clearIconImg: {
    width: 20,
    height: 20
  }
});

export default MyProfileModPassword1; 
