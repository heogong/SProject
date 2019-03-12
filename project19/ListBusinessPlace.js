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

class ListBusinessPlace extends Component {
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

          <View style={styles.fx1}>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>귀하의</Text>
                <Text style={styles.leftGuideTxt}>사업장정보를</Text>
                <Text style={styles.leftGuideTxt}>추가해주세요</Text>
              </View>
            </View>

          </View>

          <ScrollView
            horizontal={true}
            pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
            showsHorizontalScrollIndicator={false}>

            <View style={localStyles.placeBoxWrap}>
              <TouchableOpacity onPress={this._toggleModal} style={localStyles.closeIconWrap}>
                <Icon name="close-circle" style={localStyles.closeIcon} style={{color: "#d6f1ff"}} />
              </TouchableOpacity>
              <View style={localStyles.prdImgWrap}>
                <Image source={require('./img/ico-naver.png')} style={localStyles.prdImg}/>
              </View>
              <TouchableOpacity onPress={ () => alert("사업장 등록")}>
              <View style={localStyles.txtWrap}>
                <Text style={localStyles.placeNameTxt}>사업장명칭</Text>
                <View style={localStyles.infoTxtWrap}>
                  <Text style={localStyles.infoTxt}>새로운 사업장을 추가하려면</Text>
                  <Text style={localStyles.infoTxt}>위의 아이콘을 클릭하세요</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            
            <View style={localStyles.placeBoxWrap}>
              <TouchableOpacity onPress={ () => alert("사업장 등록")} style={localStyles.closeIconWrap}>
                <Icon name="close-circle" style={localStyles.closeIcon} style={{color: "#d6f1ff"}} />
              </TouchableOpacity>
              <View style={localStyles.prdImgWrap}>
                <Image source={require('./img/ico-naver.png')} style={localStyles.prdImg}/>
              </View>
              <TouchableOpacity onPress={ () => alert("사업장 등록")}>
              <View style={localStyles.txtWrap}>
                <Text style={localStyles.placeNameTxt}>사업장명칭</Text>
                <View style={localStyles.infoTxtWrap}>
                  <Text style={localStyles.infoTxt}>새로운 사업장을 추가하려면</Text>
                  <Text style={localStyles.infoTxt}>위의 아이콘을 클릭하세요</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            <View style={localStyles.placeBoxWrap}>
              <TouchableOpacity onPress={ () => alert("사업장 등록")} style={localStyles.closeIconWrap}>
                <Icon name="close-circle" style={localStyles.closeIcon} style={{color: "#d6f1ff"}} />
              </TouchableOpacity>
              <View style={localStyles.prdImgWrap}>
                <Image source={require('./img/ico-naver.png')} style={localStyles.prdImg}/>
              </View>
              <TouchableOpacity onPress={ () => alert("사업장 등록")}>
              <View style={localStyles.txtWrap}>
                <Text style={localStyles.placeNameTxt}>사업장명칭</Text>
                <View style={localStyles.infoTxtWrap}>
                  <Text style={localStyles.infoTxt}>새로운 사업장을 추가하려면</Text>
                  <Text style={localStyles.infoTxt}>위의 아이콘을 클릭하세요</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            
          </ScrollView>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>사업장 추가하기</Text>
            </Button>
          </View>

        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>등록하신 사업장 정보를 삭제할까요?</Text>
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

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const itemHeight = viewportHeight * 0.47;

const localStyles = StyleSheet.create({
  placeBoxWrap: {
    backgroundColor : color.defaultColor,
    width: 280,
    height: 284,
    marginRight: 12
  },
  prdImgWrap: {
    alignItems : 'center',
    justifyContent:'center',
    marginBottom: 23
  },
  prdImg: {
    width: 120,
    height: 120
  },
  txtWrap: {
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },
  infoTxtWrap: {
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 14,
    color: color.whiteColor
  },
  closeIcon: {
    marginTop: 14
  },
  closeIconWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginTop: 10
  }
});

export default ListBusinessPlace;
