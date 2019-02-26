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

import { styles, viewportHeight, viewportWidth } from './css/common';
import { stylesReg } from './css/stylesReg';
import { color } from './css/color';

class UserLogin extends Component {
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

        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.mb13, styles.alignItemsCenter, styles.justiConCenter]}>
            <Image source={require('./img/bank-bg02.png')} resizeMode='center' style={{height: logoHeight}} />
          </View>
          <View style={[styles.fx5, styles.justiConEnd]}>
            <Text style={[styles.mb13, {textAlign: "center", fontSize: 13, color: "#8e8e98"}]}>쿨리닉의 회원이 되시면 다양한 혜택을 누리실 수 있습니다</Text>
            <View style={localStyles.inputBoxWrap}>
              <Item regular style={[styles.mb12, localStyles.inputStyle]}>
                <Icon active name="mail" style={localStyles.inputIcon}/>
                <Input placeholder="이메일" style={localStyles.inputBox} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>

              <Item regular style={[styles.mb20, localStyles.inputStyle]}>
                <Icon active name="lock" style={localStyles.inputIcon}/>
                <Input placeholder="비밀번호(영문, 숫자, 특수문자 8~15자)" style={localStyles.inputBox} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>


              <View style={[styles.justiConBetween, styles.fxDirRow, styles.mb20]}> 
                <View style={styles.fxDirRow}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={styles.checkboxReset}
                  />
                  <Text style={localStyles.inputBottomTxt}>자동로그인</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={ () => alert("아이디와 비밀번호를 잊으셨나요?")}>
                    <Text style={[localStyles.inputBottomTxt, {textDecorationLine: 'underline'}]}>아이디와 비밀번호를 잊으셨나요?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.fxDirRow, styles.mb20]}>
                <View style={styles.fx1}>
                  <Button style={[styles.btnDefault, styles.btnWhBoder]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt]}>회원가입</Text>
                  </Button>
                </View>
                <View style={{paddingLeft: 6, paddingRight: 6}}></View>
                <View style={styles.fx1}>
                  <Button style={[styles.btnDefault, styles.btnWhBack]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnWhBackTxt]}>로그인</Text>
                  </Button>
                </View>
              </View>

              <View style={styles.alignItemsCenter}>
                <Text style={{fontWeight: 'bold', color:'#fff', fontSize: 16, letterSpacing: 0, marginBottom : 14}}>SNS LOGIN</Text>

                <View style={styles.fxDirRow}>
                  <View style={[localStyles.snsIcon]}>
                    <Image source={require('./img/ico-naver.png')} style={{height : 32, width : 32}}/>
                  </View>
                  <View style={{paddingLeft: 8, paddingRight: 8}}></View>
                  <View style={[localStyles.snsIcon]}>
                    <Image source={require('./img/ico-kakao.png')} style={{height : 32, width : 32}}/>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        
      </Container>
    );
  }
}

const layoutCount = 5; // 화면 분할 개수 사이즈
const logoHeight = (viewportHeight / layoutCount);

const localStyles = StyleSheet.create({
  inputStyle: {
    backgroundColor: color.whiteColor,
    borderColor : color.whiteColor,
    height : 40
  },
  inputIcon: {
    color: color.inputPlaceHodler,
    fontSize: 20,
    paddingLeft: 17,
    paddingRight: 7
  },
  inputBox: {
    paddingLeft: 0,
    fontSize: 14,
    height : 40
  },
  inputBoxWrap: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 35,
    paddingBottom: 25,
    backgroundColor : color.defaultColor
  },
  checkBox: {
    borderColor: color.defaultColor,
    backgroundColor: color.defaultColor
  },
  inputBottomTxt: {
    fontSize: 14,
    color: color.whiteColor
  },
  snsIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : '#fff',
    borderBottomWidth : 1, 
    borderTopWidth : 1,
    borderLeftWidth : 1,
    borderRightWidth : 1,
    height: 60,
    width: 60,
    borderRadius : 5
  },
});

export default UserLogin;
