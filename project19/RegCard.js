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
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
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
            <Item regular style={[styles.mb10, localStyles.inputStyle]}>
              <Input placeholder="카드번호 16자리" placeholderTextColor={color.inputPlaceHodler} style={{fontSize: 14}}/>
              <Icon name="ios-camera" style={localStyles.inputIcon} />
            </Item>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <Item regular style={[localStyles.inputStyle, styles.mr7]}>
                  <Input placeholder="MM" placeholderTextColor={color.inputPlaceHodler} style={{fontSize: 14, textAlign: "center"}}/>
                </Item>
              </View>
              <View style={styles.fx1}>
                <Item regular style={[localStyles.inputStyle, styles.mr7]}>
                  <Input placeholder="YY" placeholderTextColor={color.inputPlaceHodler} fontSize="14" style={{fontSize: 14, textAlign: "center"}}/>
                </Item>
              </View>
              <View style={styles.fx2}>
                <Item regular style={localStyles.inputStyle}>
                  <Input placeholder="비밀번호 앞2자리" placeholderTextColor={color.inputPlaceHodler} fontSize="14" style={{fontSize: 14, textAlign: "center"}}/>
                </Item>
              </View>
            </View>
            <View>
              <Item regular style={localStyles.inputStyle}>
                <Input placeholder="생년월일(YYMMDD)" placeholderTextColor={color.inputPlaceHodler} style={{fontSize: 14}}/>
              </Item>
            </View>

            <View style={localStyles.termsWrap}>
              <View style={[styles.fx2, styles.alignItemsStart, styles.justiConBetween]}>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
              </View>
              
              <View style={[styles.fx1, styles.fxDirRow]}>
                <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConBetween]}>
                  <View style={[styles.fxDirRow, styles.fx1]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>전체동의</Text>
                  </View>
                  <View style={[styles.fxDirRow, styles.fx1]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                  <View style={[styles.fxDirRow, styles.fx1]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={localStyles.inputBottomTxt}>동의</Text>
                  </View>
                  <View style={[styles.fxDirRow, styles.fx1]}>
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
  // 축약 Style
  inputStyle: {
    height : 48,
    borderColor : color.defaultColor
  },
  inputIcon: {
    color: color.defaultColor,
    fontSize: 32,
    marginRight: 5
  },
  inputWrap: {
    marginTop: 32
  },
  termsWrap: {
    marginTop: 27,
    flexDirection : "row"
  }
});

export default RegCard;
