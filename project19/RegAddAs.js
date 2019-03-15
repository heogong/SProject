import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
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
  Tab,
  Tabs,
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

class RegAddAs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      checkBox : false,
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
                <Text style={styles.leftGuideTxt}>추가된</Text>
                <Text style={styles.leftGuideTxt}>A/S 내역을</Text>
                <Text style={styles.leftGuideTxt}>작성해주세요</Text>
              </View>
            </View>
          </View>

          <View style={localStyles.addAsInputWrap}>
            <View style={localStyles.inputBoxWrap}>
              <Text style={localStyles.inputTitleTxt}>추가 A/S 내역</Text>
              <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                <Input placeholder="A/S 내역을 작성해주세요" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 비용</Text>
              <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                <Input placeholder="추가비용을 입력해주세요" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 사유</Text>
              <Item regular style={[styles.mb14, styles.textInputWhBackWhBo]}>
                <TextInput
                  placeholder="추가 A/S가 필요한 이유를 적어주세요"
                  placeholderTextColor={color.inputPlaceHodler}
                  numberOfLines={10}
                  multiline={true}
                  style={styles.textInputBox}
                />
              </Item>
            </View>
          </View>
          <View style={styles.footerBtnWrap}>
            <Button 
              onPress={() => this._toggleModal()}
              style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>등록완료</Text>
            </Button>
          </View>

        </View>

        <Modal isVisible={this.state.isModalVisible}>
            <View style={[styles.modalWrap, {height: 128}]}>
                <View style={styles.modalContent}>
                    <View style={[styles.modalTop2LTxtWrap]}>
                        <Text style={styles.modalTopTxt}>추가 A/S에 대한 내역을 청구합니다.</Text>
                        <Text style={styles.modalTopTxt}>추가비용 : 100,00원</Text>
                    </View>
                    <View style={styles.modalBtnTwinWrap}>
                        <View style={{marginRight: 9}}>
                            <Button style={styles.modalBtnNoFill} onPress={this._toggleModal}>
                                <Text style={styles.modalBtnNoFillTxt}>취소</Text>
                            </Button>
                        </View>
                        <View style={{marginLeft: 9}}>
                            <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                                <Text style={styles.modalBtnFillTxt}>전송</Text>
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
  addAsInputWrap: {
    flex: 2,
    marginTop: 20
  },
  inputBoxWrap: {
    paddingTop : 28,
    paddingLeft : 20,
    paddingRight : 20,
    height: 350,
    backgroundColor : color.defaultColor
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center'
  },
  inputTitleTxt: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6
  }
});

export default RegAddAs;
