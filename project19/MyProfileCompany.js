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

export const ENTRIES1 = [
  {
    title: '월'
  },
  {
    title: '화'
  },
  {
    title: '수'
  },
  {
    title: '목'
  },
  {
    title: '금'
  },
  {
    title: '토'
  },
  {
    title: '일'
  }
];

class MyProfileCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPdNoBottom}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>사업자정보 수정</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fx1}>
              <View style={styles.tooltipWrap}>
                <Text style={styles.tooltipTxt}>개인정보를 안전하게 보호하기 위해 비밀번호를 입력해주세요.</Text>
              </View>

              <Text style={[styles.inputNbTitleTxt, styles.mb12]}>냉동기 전문분야</Text>
              <View style={[styles.fxDirRow, styles.fxWraWra]}>
                <Button style={localStyles.prdBtnOn}>
                  <Text style={localStyles.prdBtnOnTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOff}>
                  <Text style={localStyles.prdBtnOffTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOn}>
                  <Text style={localStyles.prdBtnOnTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOff}>
                  <Text style={localStyles.prdBtnOffTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOn}>
                  <Text style={localStyles.prdBtnOnTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOff}>
                  <Text style={localStyles.prdBtnOffTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOn}>
                  <Text style={localStyles.prdBtnOnTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOff}>
                  <Text style={localStyles.prdBtnOffTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOn}>
                  <Text style={localStyles.prdBtnOnTxt}>업소용냉장고</Text>
                </Button>
                <Button style={localStyles.prdBtnOff}>
                  <Text style={localStyles.prdBtnOffTxt}>업소용냉장고</Text>
                </Button>
              </View>
              <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mt13]}
                onPress={this._toggleModal}>
                <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>수정완료</Text>
              </Button>

              <Text style={[styles.inputNbTitleTxt, styles.mb12]}>출장 가능시간</Text>
              <View>
                <View style={localStyles.weekWrap}>
                  {ENTRIES1.map((entry, index) => (

                    <TouchableOpacity onPress={ () => alert(entry.title)}  key={index}>
                      <View style={localStyles.btnWeekOn}>
                      {/* <View style={localStyles.btnWeekOff}> */}
                      <Text style={localStyles.btnWeekOnTxt}>{entry.title}</Text>
                        {/* <Text style={{color : color.defaultColor}}>{entry.title}</Text> */}
                      </View>
                    </TouchableOpacity>
                    
                  ))}
                </View>
                
                <View>
                  <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                    <TouchableOpacity onPress={ () => alert("Time1")} style={localStyles.timeTxtWrap}>
                      <Text style={localStyles.timeTxt}>09:30</Text>
                    </TouchableOpacity>
                    <Text style={localStyles.timeCenterTxt}>~</Text>
                    <TouchableOpacity onPress={ () => alert("Time1")} style={localStyles.timeTxtWrap}>
                      <Text style={localStyles.timeTxt}>09:30</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={localStyles.bottomTxtWrap}>
                  <Text style={styles.greyFont}>취약시간에는 출장비가 상승합니다</Text>
                  <Text style={styles.greyFont}>취약시간 기준 : 18시 ~ 09시, 일요일 및 공휴일 포함</Text>
                </View>

                <View style={[styles.fxDirRow, styles.justiConCenter]}>
                  <View style={[styles.checkBoxWrap, {marginRight: 8}]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={styles.greyFont}>풀타임</Text>
                  </View>
                  
                  <View style={[styles.checkBoxWrap, {marginLeft: 8}]}>
                    <CheckBox checked={this.state.checkbox}
                      onPress={() => this.toggleSwitch()}
                      style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                    />
                    <Text style={styles.greyFont}>공휴일</Text>
                  </View>
                </View>
                <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mt13, {marginBottom: 26}]}
                  onPress={this._toggleModal}>
                  <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>수정완료</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}
const weekCardSize = wp(12, 52);

const localStyles = StyleSheet.create({
  prdBtnOn: {
    backgroundColor: color.defaultColor,
    borderRadius: 0,
    elevation: 0,
    width: "50%",
    shadowOpacity: 0,
    height: 34,
    justifyContent: "center"
  },
  prdBtnOnTxt: {
    fontSize: 14,
    color: color.whiteColor
  },
  prdBtnOff: {
    backgroundColor: "#d6f1ff",
    borderRadius: 0,
    elevation: 0,
    width: "50%",
    shadowOpacity: 0,
    height: 34,
    justifyContent: "center"
  },
  prdBtnOffTxt: {
    fontSize: 14,
    color: color.defaultColor
  },
  weekWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35
  },
  btnWeekOff: {
    alignItems: "center",
    justifyContent: "center",
    height : weekCardSize, 
    width : weekCardSize,
    borderColor : color.defaultColor, 
    borderWidth : 1
  },
  btnWeekOffTxt: {
    fontSize: 15,
    color: color.defaultColor
  },
  btnWeekOn: {
    alignItems: "center",
    justifyContent: "center",
    height : weekCardSize, 
    width : weekCardSize,
    borderColor : color.defaultColor, 
    borderWidth : 1,
    backgroundColor: color.defaultColor
  },
  btnWeekOnTxt: {
    fontSize: 15,
    color: color.whiteColor
  },
  bottomTxtWrap: {
    alignItems: "center",
    marginTop: 17,
    marginBottom: 17
  },
  timeTxtWrap: {
    flex: 3,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: color.defaultColor
  },
  timeTxt: {
    fontSize: 30,
    color: color.whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  timeCenterTxt: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: color.defaultColor,
    fontSize: 30,
    color: color.whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default MyProfileCompany; 
