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

class MyCalcuList extends Component {
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
            <Title style={styles.headerTitleTxt}>정산 예정금액</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>
          <View>
              
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>이번달</Text>
                <Text style={styles.leftGuideTxt}>총 <Text style={localStyles.moneyTxt}>200,000원</Text>이</Text>
                <Text style={styles.leftGuideTxt}>입금될 예정입니다</Text>
              </View>
            </View>

            <View style={[styles.line, {marginTop: 16, marginBottom: 16}]}></View>

            <View style={{borderBottomColor: color.defaultColor, borderBottomWidth: 2, paddingBottom: 30}}>
              <Text style={{color: "#1e1e32", fontSize: 16, fontWeight: "bold", marginBottom: 5}}>내 계좌번호</Text>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={{fontSize: 14, color: color.defaultColor, fontWeight: "bold"}}>카카오뱅크(정진씨)</Text>
                <Text style={{fontSize: 13}}>000-0000-0000-0000-0000</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={localStyles.moneyListWrap}>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
                <View style={localStyles.moneyList}>
                  <Text style={localStyles.dateTxt}>01.16</Text>
                  <Text style={localStyles.nameTxt}>세나정육점</Text>
                  <Text style={localStyles.momeyTxt}>50,000원</Text>
                </View>
              </View>
            </ScrollView>
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
  moneyTxt: {
    fontSize: 26,
    letterSpacing: 0,
    lineHeight: 30,
    color: color.defaultColor,
    fontWeight: "bold"
  },
  moneyList: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c9cacb",
    height: 60
  },
  dateTxt: {
    fontSize: 14,
    color: "#8e8e98",
    width: 50,
  },
  nameTxt: {
    fontSize: 16,
    color: "#1e1e32",
    flex: 1
  },
  momeyTxt: {
    fontSize: 18,
    color: color.defaultColor,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right"
  }
});

export default MyCalcuList; 
