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
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>결제카드 관리</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={[styles.contentWrap, styles.alignItemsCenter]}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 60}}>
            <View style={{marginTop: 26}}>
              <View style={localStyles.newCardStyle}>
                <Text style={localStyles.cardNameTxt}>카드 등록</Text>
                <View style={localStyles.cardAddWrap}>
                  <Image source={require('./img/join-end.png')} style={localStyles.cardAddImg}/>
                </View>
                <View style={localStyles.cardBottomWrap}>
                  <Text style={localStyles.coolinicTxt}>COOLINIC</Text>
                </View>
              </View>

              <View style={localStyles.regCardStyle}>
                <View style={localStyles.cardTopWrap}>
                  <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                  <TouchableOpacity style={localStyles.btnCloseIconWrap}
                    onPress={this._toggleModal}>
                    <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                  </TouchableOpacity>
                </View>
                <View style={localStyles.carMagWrap}>
                  <Image source={require('./img/join-end.png')} style={localStyles.cardMagImg}/>
                </View>
                <View style={localStyles.cardBottomWrap}>
                  <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  <Text style={localStyles.coolinicTxt}>COOLINIC</Text>
                </View>
              </View>

              <View style={localStyles.regCardStyle}>
                <View style={localStyles.cardTopWrap}>
                  <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                  <TouchableOpacity style={localStyles.btnCloseIconWrap}
                    onPress={this._toggleModal}>
                    <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                  </TouchableOpacity>
                </View>
                <View style={localStyles.carMagWrap}>
                  <Image source={require('./img/join-end.png')} style={localStyles.cardMagImg}/>
                </View>
                <View style={localStyles.cardBottomWrap}>
                  <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  <Text style={localStyles.coolinicTxt}>COOLINIC</Text>
                </View>
              </View>

              <View style={localStyles.regCardStyle}>
                <View style={localStyles.cardTopWrap}>
                  <Text style={localStyles.cardNameTxt}>국민 카드</Text>
                  <TouchableOpacity style={localStyles.btnCloseIconWrap}
                    onPress={this._toggleModal}>
                    <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                  </TouchableOpacity>
                </View>
                <View style={localStyles.carMagWrap}>
                  <Image source={require('./img/join-end.png')} style={localStyles.cardMagImg}/>
                </View>
                <View style={localStyles.cardBottomWrap}>
                  <Text style={localStyles.cardNumTxt}>****-*****-2046-****</Text>
                  <Text style={localStyles.coolinicTxt}>COOLINIC</Text>
                </View>
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
    backgroundColor : color.defaultBackColor,
    borderColor : color.defaultColor,
    borderWidth : 1,
    borderRadius : 6,
    marginBottom: 20,
    padding: 15,
    flex: 1
  },
  newCardStyle : {
    height : 160, 
    width : 298,
    borderColor : "#c9cacb",
    borderWidth : 1,
    borderRadius : 6,
    marginBottom: 20,
    padding: 15,
    flex: 1
  },
  cardTopWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  btnCloseIconWrap: {
    flex: 1,
    alignItems:'flex-end'
  },
  btnCloseIcon: {
    color: "#8e8e98"
  },
  cardNameTxt: {
    fontSize: 20,
    color: "#626270",
    fontWeight: "bold",
    paddingLeft: 10
  },
  cardMagImg: {
    height: 42,
    width: 66
  },
  carMagWrap: {
    flex: 3,
    justifyContent: 'center'
  },
  cardBottomWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  cardNumTxt: {
    fontSize: 15,
    color: "#626270"
  },
  coolinicTxt: {
    fontSize: 12,
    color: "#626270",
    marginTop: 8
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
