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


class SelectWorkTime extends Component {
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
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={styles.mb10}>
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>일하실</Text>
                <Text style={styles.leftGuideTxt}>시간대를</Text>
                <Text style={styles.leftGuideTxt}>선택해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>04</Text>
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
               <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
              </View>
            </View>
          </View>

          <View style={localStyles.contentWrap}>
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
            
            <View style={{flex: 1}}>
              <View style={[styles.fx1, styles.fxDirRow, styles.alignItemsCenter]}>
                <TouchableOpacity onPress={ () => alert("Time1")} style={localStyles.timeTxtWrap}>
                  <Text style={localStyles.timeTxt}>09:30</Text>
                </TouchableOpacity>
                <Text style={[localStyles.timeTxtWrap, localStyles.timeTxt, {flex: 1}]}>~</Text>
                <TouchableOpacity onPress={ () => alert("Time1")} style={localStyles.timeTxtWrap}>
                  <Text style={localStyles.timeTxt}>09:30</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={localStyles.bottomTxtWrap}>
              <Text style={styles.greyFont}>취약시간에는 출장비가 상승합니다</Text>
              <Text style={styles.greyFont}>취약시간 기준 : 18시 ~ 09시, 일요일 및 공휴일 포함</Text>
            </View>

            <View style={[styles.fxDirRow, styles.fx1, styles.justiConCenter]}>
              <View style={[styles.fxDirRow, {marginRight: 8}]}>
                <CheckBox checked={this.state.checkbox}
                  onPress={() => this.toggleSwitch()}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
                <Text style={styles.greyFont}>풀타임</Text>
              </View>
              
              <View style={[styles.fxDirRow, {marginLeft: 8}]}>
                <CheckBox checked={this.state.checkbox}
                  onPress={() => this.toggleSwitch()}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
                <Text style={styles.greyFont}>공휴일</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>선택완료</Text>
            </Button>
          </View>
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
  contentWrap: {
    flex: 5,
    marginTop: 37
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
    marginTop: 35,
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
  }
});

export default SelectWorkTime;
