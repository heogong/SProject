import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
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

class RegProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  drawPrdouct = () => (
    <View style={localStyles.myPrdBoxWrap}>
      <TouchableOpacity onPress={this._toggleModal} style={localStyles.closeIconWrap}>
        <Icon name="close-circle" style={localStyles.closeIcon} style={{color: "#d6f1ff"}} />
      </TouchableOpacity>

      <Text style={localStyles.myPrdNumTxt}>01</Text>

      <View style={localStyles.myPrdImgWrap}>
        <Image source={require("./img/license-depart01.png")} style={localStyles.myPrdImg} />
      </View>

      <View style={localStyles.myPrdInfoTxtWrap}>
        <Text style={localStyles.myPrdNameTxt}>육류용냉장고</Text>
        <Text style={localStyles.myPrdDscTxt}>짧은 설명에 대해 짧은 설명에 대해 짧은 설명에 대해</Text>
      </View>
      
    </View>
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

        <View style={styles.contentWrap}>

          <View style={{marginBottom: 36}}>
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>제품을</Text>
                <Text style={styles.leftGuideTxt}>추가로</Text>
                <Text style={styles.leftGuideTxt}>등록해주세요</Text>
              </View>
            </View>
          </View>


          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 60}}>
            <View style={localStyles.myPrdListWrap}>
              
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
              
            </View>
          </ScrollView>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>제품 추가하기</Text>
            </Button>
          </View>

        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>등록하신 제품 정보를 삭제할까요?</Text>
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

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const productCardSize = wp(48, 52);

const localStyles = StyleSheet.create({
  myPrdBoxWrap: {
    alignItems: "center",
    backgroundColor : color.defaultColor,
    width : productCardSize,
    height: 280,
    marginBottom: 10
  },
  myPrdNumTxt: {
    color : color.whiteColor,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 14
  },
  myPrdImgWrap: {
    marginBottom: 14
  },
  myPrdImg: {
    height: 100,
    width: 100
  },
  myPrdInfoTxtWrap: {
    justifyContent: "center",
    alignItems: "center"
  },
  myPrdNameTxt: {
    marginBottom: 10,
    color : color.whiteColor,
    fontSize: 16,
    fontWeight: "bold"
  },
  myPrdDscTxt: {
    color: color.whiteColor,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    height: 45
  },
  myPrdListWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  closeIcon: {
    marginTop: 14
  },
  closeIconWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 5
  }
});

export default RegProduct;