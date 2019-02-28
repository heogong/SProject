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

class JoinEmail extends Component {
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
                <Text style={styles.leftGuideTxt}>이메일주소와</Text>
                <Text style={styles.leftGuideTxt}>비밀번호를</Text>
                <Text style={styles.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>01</Text>
              </View>
            </View>

            <View style={styles.procBarWrap}>
              <View style={styles.fx1}>
                <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={styles.procBarOff} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
              </View>
            </View>
            
          </View>

          <View style={[styles.fx3, styles.justiConCenter]}>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input placeholder="이메일주소" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input placeholder="비밀번호(영문+숫자+특수문자조합 8~16자리)" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={[styles.mb10, styles.inputWhBackGreyBo]}>
              <Input placeholder="비밀번호 확인" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
              <Icon name="ios-checkmark-circle" style={styles.inputIcon} />
            </Item>
            <Text style={{color: color.warningColor, fontSize: 12}}>비밀번호가 맞지 않습니다.</Text>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력완료</Text>
            </Button>
          </View>

        </View>

      </Container>
    );
  }
}

export default JoinEmail;
