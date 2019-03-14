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


class MyProfileModPassword2 extends Component {
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
            <Title style={styles.headerTitleTxt}>비밀번호 설정</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={styles.fx1}>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>8자 이상의 비밀번호를 입력한 후 [설정완료] 버튼을누러주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>새 비밀번호 (8자 이상)</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="새로운 비밀번호를 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox} secureTextEntry={true}/>
            </Item>
            <Text style={styles.inputNbTitleTxt}>새 비밀번호 확인</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input placeholder="새로운 비밀번호를 다시 입력해주세요." placeholderTextColor={color.inputPlaceHodler} style={styles.inputNbDefaultBox} secureTextEntry={true}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>설정완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

export default MyProfileModPassword2; 
