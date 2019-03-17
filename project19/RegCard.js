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
  ListItem,
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
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class RegCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }
  toggleSwitch() {
    this.setState({
      checkbox: !this.state.checkbox
    });
  }

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
                <Text style={styles.leftGuideTxt}>쿨리닉</Text>
                <Text style={styles.leftGuideTxt}>결제카드를</Text>
                <Text style={styles.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>02</Text>
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
               <View style={styles.procBarOff} />
              </View>
            </View>
            
          </View>

          <View style={localStyles.inputWrap}>
            <Item regular style={[styles.mb10, styles.inputWhBackBuBo]}>
              <Input placeholder="카드번호 16자리" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
              <Image source={require("./img/camera_icon.png")} resizeMode="contain" style={localStyles.cameraIcon} />
            </Item>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <Item regular style={[styles.inputWhBackBuBo, styles.mr7]}>
                  <Input placeholder="MM" placeholderTextColor={color.inputPlaceHodler} style={[styles.inputDefaultBox, {textAlign: "center"}]}/>
                </Item>
              </View>
              <View style={styles.fx1}>
                <Item regular style={[styles.inputWhBackBuBo, styles.mr7]}>
                  <Input placeholder="YY" placeholderTextColor={color.inputPlaceHodler} fontSize="14" style={[styles.inputDefaultBox, {textAlign: "center"}]}/>
                </Item>
              </View>
              <View style={styles.fx2}>
                <Item regular style={styles.inputWhBackBuBo}>
                  <Input placeholder="비밀번호 앞2자리" placeholderTextColor={color.inputPlaceHodler} fontSize="14" style={[styles.inputDefaultBox, {textAlign: "center"}]}/>
                </Item>
              </View>
            </View>
            <View>
              <Item regular style={styles.inputWhBackBuBo}>
                <Input placeholder="생년월일(YYMMDD)" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
              </Item>
            </View>

            <View style={localStyles.termsWrap}>
{/*             
              <View style={[styles.alignItemsStart, styles.fx3]}>
                <Text style={[localStyles.inputBottomTxt, styles.mb10]}>전자금융거래 이용약관</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb10]}>개인정보 수집 및 이용안내</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb10]}>전자금융거래 이용약관</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb10]}>개인정보 수집 및 이용안내</Text>
              </View>
               */}
              <View style={styles.fx5}>
                <View style={styles.alignItemsEnd}>
                  <View style={[styles.fxDirRow, styles.mb10]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>전체동의</Text>
                  </View>
                </View>
                <View style={[styles.fxDirRow, styles.justiConBetween]}>
                  <Text style={[localStyles.inputBottomTxt, styles.mb10]}>전자금융거래 이용약관</Text>
                  <View style={[styles.fxDirRow, styles.mb10]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                </View>
                <View style={[styles.fxDirRow, styles.justiConBetween]}>
                  <Text style={[localStyles.inputBottomTxt, styles.mb10]}>개인정보 수집 및 이용안내</Text>
                  <View style={[styles.fxDirRow, styles.mb10]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween]}>
                  <Text style={[localStyles.inputBottomTxt, styles.mb10]}>전자금융거래 이용약관</Text>
                  <View style={[styles.fxDirRow, styles.mb10]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween]}>
                  <Text style={[localStyles.inputBottomTxt, styles.mb10]}>개인정보 수집 및 이용안내</Text>
                  <View style={[styles.fxDirRow, styles.mb10]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                  </View>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>등록완료</Text>
            </Button>
          </View>

        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  inputWrap: {
    marginTop: 32,
    flex: 1
  },
  termsWrap: {
    marginTop: 20,
    flexDirection : "row",
    flex: 1,
    width: "100%"
  },
  inputBottomTxt: {
    color: "#8e8e98",
    fontSize: 13
  },
  cameraIcon: {
    width: 25,
    height: 25,
    marginRight: 15
  }
});

export default RegCard;
