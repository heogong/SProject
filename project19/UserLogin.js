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
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>
        
        <View style={styles.fx1}>

          <View style={localStyles.logoImgWrap}>
            {/* <Image source={require('./img/logo-user.png')} resizeMode='contain' style={localStyles.logoImg} /> */}
            <Image source={require('./img/logo-partner.png')} resizeMode='contain' style={localStyles.logoImg} />
          </View>
          <View style={styles.fx1}>
            <Text style={[styles.mb10, {textAlign: "center", fontSize: 13, color: "#8e8e98"}]}>쿨리닉의 회원이 되시면 다양한 혜택을 누리실 수 있습니다</Text>
            <View style={localStyles.inputBoxWrap}>
              <Item regular style={[styles.mb12, styles.inputWhBackWhBo]}>
                <Icon active name="mail" style={localStyles.inputIcon}/>
                <Input placeholder="이메일" style={styles.inputBox} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>

              <Item regular style={[styles.mb20, styles.inputWhBackWhBo]}>
                <Icon active name="lock" style={localStyles.inputIcon}/>
                <Input placeholder="비밀번호(영문, 숫자, 특수문자 8~15자)" style={styles.inputBox} placeholderTextColor={color.inputPlaceHodler} secureTextEntry={true}/>
              </Item>


              {/*                 
              <View style={[styles.justiConBetween, styles.fxDirRow, styles.mb20]}>
                
                <View style={styles.fxDirRow}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={[styles.checkboxReset]}
                  />
                  <Text style={localStyles.inputBottomTxt}>자동로그인</Text>
                </View> 
                */}
              <View style={[styles.alignItemsEnd, styles.mb20]}>
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
                  <TouchableOpacity style={[localStyles.snsIcon, {marginRight: 16}]}>
                    <Image source={require('./img/naver-button.png')} style={{height : 60, width : 60}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={[localStyles.snsIcon]}>
                    <Image source={require('./img/kakao-button.png')} style={{height : 60, width : 60}}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  inputIcon: {
    color: color.inputPlaceHodler,
    fontSize: 20,
    paddingLeft: 9,
    paddingRight: 7
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
    fontSize: 13,
    color: color.whiteColor,
    marginTop: 2
  },
  snsIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    height: 60,
    width: 60
  },
  logoImgWrap: {
    paddingTop: 30, paddingBottom: 30, alignItems: "center"
  },
  logoImg: {
    width: 128,
    height: 128
  }
});

export default UserLogin;
