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


class MyProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

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
            <Title style={styles.headerTitleTxt}>내정보 수정</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            <Text style={styles.inputNbTitleTxt}>이메일</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Image source={require('./img/intro-logo.png')} style={localStyles.inputIcon} />
              <Input placeholder="이메일을 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
            </Item>

            <Text style={styles.inputNbTitleTxt}>비밀번호</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="비밀번호를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
              <Button 
                onPress={() => this._toggleModal()}
                style={[styles.btnDefaultSmall, styles.btnDefaultNoFill, {width: 80, marginTop: 10}]}>
                <Text style={[styles.btnDefaultSmallTxt, styles.btnDefaultNoFillTxt]}>변경</Text>
              </Button>
            </Item>

            <Text style={styles.inputNbTitleTxt}>이름</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="이름을 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
              <Button 
                onPress={() => this._toggleModal()}
                style={[styles.btnDefaultSmall, styles.btnDefaultNoFill, {width: 80, marginTop: 10}]}>
                <Text style={[styles.btnDefaultSmallTxt, styles.btnDefaultNoFillTxt]}>변경</Text>
              </Button>
            </Item>

            <Text style={styles.inputNbTitleTxt}>핸드폰번호 (2019.02.14 인증됨)</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="핸드폰번호를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox}/>
              <Button 
                onPress={() => this._toggleModal()}
                style={[styles.btnDefaultSmall, styles.btnDefaultNoFill, {width: 80, marginTop: 10}]}>
                <Text style={[styles.btnDefaultSmallTxt, styles.btnDefaultNoFillTxt]}>변경</Text>
              </Button>
            </Item>
            
            <View style={styles.fxDirRow}>
              <Text style={[styles.inputNbTitleTxt, {color: "#626270"}]}>회원 탈퇴하시려면 </Text>
              <TouchableOpacity 
                  onPress={ () => alert("사진조회")}>
                  <Text style={[styles.inputNbTitleTxt, {color: "#626270", textDecorationLine: 'underline'}]}>여기</Text>
                </TouchableOpacity>
              <Text style={[styles.inputNbTitleTxt, {color: "#626270"}]}>를 눌려주세요.</Text>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>로그아웃</Text>
            </Button>
          </View>
        </View>

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
});

export default MyProfileInfo; 
