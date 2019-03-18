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


class MyProfileExit2 extends Component {
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
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>회원탈퇴</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={localStyles.topTxtWrap}>
            <Text style={localStyles.topTxt}>회원 탈퇴 시 이용 정보 및</Text>
            <Text style={localStyles.topTxt}>모든 혜택이 즉시 소멸됩니다</Text>
          </View>

          <View style={styles.fx1}>
            <View style={localStyles.reasonWrap}>
              <Text style={localStyles.subTitleTxt}>탈퇴 사유</Text>
              <Item regular style={styles.inputWhBackGreyBo}>
                <Input placeholder="탈퇴 사유를 입력해주세요." placeholderTextColor="#626270" style={styles.inputDefaultBox}/>
              </Item>
            </View>

            <View style={localStyles.reasonWrap}>
              <Text style={localStyles.subTitleTxt}>탈퇴 전 꼭 확인 하세요!</Text>

              <View style={localStyles.infoWrap}>
                <Text style={localStyles.dotTxt}>·</Text>
                <Text style={localStyles.infoTxt}>쿨리닉 회원 탈퇴 시, 즉시 탈퇴 처리되며 서비스 이용이 불가합니다.</Text>
              </View>

              <View style={localStyles.infoWrap}>
                <Text style={localStyles.dotTxt}>·</Text>
                <Text style={localStyles.infoTxt}>회원정보는 회원 탈퇴 시 즉시 삭제됩니다. 다만, 부정 이용·거래 방지 및 전자상거래법 등 관련 법령에 따라 보관이 필요한 경우 해당 기간동안 회원정보가 보관됩니다.</Text>
              </View>

              <View style={localStyles.infoWrap}>
                <Text style={localStyles.dotTxt}>·</Text>
                <Text style={localStyles.infoTxt}>동일한 이메일 주소로 회원 탈퇴 후 5일 동안 가입이 불가합니다. (다른 이메일 주소로는 가입이 가능합니다.)</Text>
              </View>

              <View style={localStyles.infoWrap}>
                <Text style={localStyles.dotTxt}>·</Text>
                <Text style={localStyles.infoTxt}>자세한 사항은 개인정보처리방침을 확인하시기 바랍니다.</Text>
              </View>
              
              <View style={[styles.checkBoxWrap, {marginLeft: 3}]}>
                <CheckBox checked={this.state.checkbox}
                  onPress={() => this.toggleSwitch()}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
                <Text style={{fontSize: 14, color: "#1e1e32"}}>동의합니다.</Text>
              </View>

            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            {/* ON 
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>탈퇴하기</Text>
            </Button>
             */}
             {/* Off */}
             <Button style={[styles.btnDefault, styles.btnDefaultFillOff, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillOffTxt]}>탈퇴하기</Text>
            </Button>
          </View>

        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  topTxtWrap: {
    marginTop: 26,
    marginBottom: 39
  },
  topTxt: {
    fontSize: 21,
    color: color.defaultColor
  },
  reasonWrap: {
    marginBottom: 30
  },
  subTitleTxt: {
    fontSize: 14,
    color: "#8e8e98",
    marginBottom: 10,
    fontWeight: "bold"
  },
  dotTxt: {
    marginRight: 6,
    fontSize: 16,
    color: "#626270",
    fontWeight: "bold"
  },
  infoTxt: {
    fontSize: 14,
    color: "#626270"
  },
  infoWrap: {
    flexDirection: "row",
    marginBottom: 12,
    paddingLeft: 3
  }
});

export default MyProfileExit2; 
