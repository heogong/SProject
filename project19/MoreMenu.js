import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
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

class MoreMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft: 26, paddingRight: 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>더보기</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{flex: 1, backgroundColor: color.defaultColor}}>

          <View style={localStyles.profileWrap}>
            <View style={localStyles.profileTxtWrap}>
              <Text style={[localStyles.profileTitleTxt, styles.mb10]}>김성찬</Text>
              <Text style={localStyles.profileSubTxt}>rastid@naver.com</Text>
            </View>

            {/* Partner 일때만 표출 */}
            {/* 
            <View style={localStyles.btnProfileModWrap}>
              <Button 
                onPress={() => this._toggleModal()}
                style={[styles.btnDefaultSmall, styles.btnDefaultNoFill, {width: 100}]}>
                <Text style={[styles.btnDefaultSmallTxt, styles.btnDefaultNoFillTxt]}>내정보 수정</Text>
              </Button>
            </View>
            */}
          </View>

          <View style={localStyles.quickBtnWrap}>
             {/* Partner 일때만 표출 */}
              {/*              
              <TouchableOpacity 
                style={[localStyles.quickBtnBox, {borderRightColor: color.defaultColor, borderRightWidth: 1}]}
                onPress={ () => alert("사진조회")}>
                <Image source={require("./img/company_icon.png")} style={localStyles.quickBtnImg} />
              </TouchableOpacity>
              */}

              {/* Client 일때만 표출 */}
              <TouchableOpacity 
                style={[localStyles.quickBtnBox, {borderRightColor: color.defaultColor, borderRightWidth: 1}]}
                onPress={ () => alert("사진조회")}>
                <Image source={require("./img/myinfo_icon.png")} style={localStyles.quickBtnImg} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={localStyles.quickBtnBox}
                onPress={ () => alert("사진조회")}>
                <Image source={require("./img/card_manager_icon.png")} style={localStyles.quickBtnImg} />
              </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={ () => alert("사진조회")}>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>공지사항</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => alert("사진조회")} style={{marginBottom: 14}}>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>약관 및 정책</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => alert("사진조회")}>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>자주 묻는 질문</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => alert("사진조회")} style={{marginBottom: 14}}>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>앱 버전 </Text>
            </View>
          </TouchableOpacity>

        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  profileWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    padding: 26, 
    backgroundColor : color.whiteColor,
    height: 96,
    marginTop: 14,
    width: "100%"
  },
  profileTxtWrap: {
    justifyContent : "center",
    flex: 2
  },
  profileTitleTxt: {
    fontSize: 21,
    color: "#0b2024"
  },
  profileSubTxt: {
    fontSize: 14,
    color: "#8e8e98"
  },
  btnProfileModWrap: {
    alignItems: "flex-end"
  },
  quickBtnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 96,
    width: "100%",
    marginBottom: 14
  },
  quickBtnBox: {
    flex: 1,
    justifyContent : "center",
    alignItems: "center"
  },
  quickBtnImg: {
    width: 94,
    height: 74
  },
  listMenuWrap: {
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26
  },
  listMenuTxt: {
    fontSize: 16,
    color: "#8e8e98"
  },
});

export default MoreMenu;