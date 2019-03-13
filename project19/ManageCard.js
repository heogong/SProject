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

class ManageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      checkBox : false
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
            <Title style={styles.headerTitleTxt}>결제카드 관리</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={[styles.contentWrap, styles.alignItemsCenter]}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
            <View style={{marginTop: 26}}>
              <View style={localStyles.regCardStyle}>
                <ImageBackground
                  source={require("./img/credit_card_layout2.png")} 
                  resizeMode="contain"
                  style={localStyles.newCardStyle}> 
                  <Image source={require('./img/credit_card_regist.png')} style={localStyles.cardAddImg}/>
                </ImageBackground>
              </View>

              <View style={localStyles.regCardStyle}>
                <ImageBackground
                  source={require("./img/credit_card_layout.png")} 
                  resizeMode="contain"
                  style={localStyles.newCardStyle}> 
                  <View style={localStyles.cardTopWrap}>
                    <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                    <TouchableOpacity style={localStyles.btnCloseIconWrap}
                      onPress={this._toggleModal}>
                      <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={localStyles.cardBottomWrap}>
                    <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={localStyles.regCardStyle}>
                <ImageBackground
                  source={require("./img/credit_card_layout.png")} 
                  resizeMode="contain"
                  style={localStyles.newCardStyle}> 
                  <View style={localStyles.cardTopWrap}>
                    <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                    <TouchableOpacity style={localStyles.btnCloseIconWrap}
                      onPress={this._toggleModal}>
                      <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={localStyles.cardBottomWrap}>
                    <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={localStyles.regCardStyle}>
                <ImageBackground
                  source={require("./img/credit_card_layout.png")} 
                  resizeMode="contain"
                  style={localStyles.newCardStyle}> 
                  <View style={localStyles.cardTopWrap}>
                    <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                    <TouchableOpacity style={localStyles.btnCloseIconWrap}
                      onPress={this._toggleModal}>
                      <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={localStyles.cardBottomWrap}>
                    <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={localStyles.regCardStyle}>
                <ImageBackground
                  source={require("./img/credit_card_layout.png")} 
                  resizeMode="contain"
                  style={localStyles.newCardStyle}> 
                  <View style={localStyles.cardTopWrap}>
                    <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                    <TouchableOpacity style={localStyles.btnCloseIconWrap}
                      onPress={this._toggleModal}>
                      <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={localStyles.cardBottomWrap}>
                    <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  </View>
                </ImageBackground>
              </View>

            </View>
          </ScrollView>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>등록완료</Text>
            </Button>
          </View>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>등록된 결제카드를 삭제하겠어요?</Text>
              </View>
              <View style={[styles.modalBtnTwinWrap, styles.fx1]}>
                    <View style={{marginRight: 9}}>
                        <Button style={styles.modalBtnNoFill} onPress={this._toggleModal}>
                            <Text style={styles.modalBtnNoFillTxt}>취소</Text>
                        </Button>
                    </View>
                    <View style={{marginLeft: 9}}>
                        <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                            <Text style={styles.modalBtnFillTxt}>삭제</Text>
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
  regCardStyle : {
    height : 160, 
    width : 298,
    marginBottom: 20,
    flex: 1
  },
  newCardStyle : {
    height : 160, 
    width : 298,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  cardTopWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  btnCloseIconWrap: {
    flex: 1,
    alignItems:'flex-end',
    marginRight: 20
  },
  btnCloseIcon: {
    width: 17,
    height: "auto"
  },
  cardNameTxt: {
    fontSize: 18,
    color: "#626270",
    fontWeight: "bold",
    paddingLeft: 30
  },
  cardBottomWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: "100%"
  },
  cardNumTxt: {
    fontSize: 15,
    color: "#626270",
    marginBottom: 37,
    marginRight: 20
  },
  cardAddWrap: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardAddImg: {
    width: 56,
    height: 56
  },
});

export default ManageCard;
