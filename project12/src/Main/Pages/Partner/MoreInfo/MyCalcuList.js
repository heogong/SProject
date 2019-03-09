import React, { Component } from "react";
import { Keyboard, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, Container, CheckBox, Text, Item, Input } from "native-base";


import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";


export const AccountHistory = ({account}) => (
  <View style={localStyles.moneyList}>
    <Text style={localStyles.dateTxt}>{account.date}</Text>
    <Text style={localStyles.nameTxt}>{account.bplaceNm}</Text>
    <Text style={localStyles.momeyTxt}>{account.money}원</Text>
  </View>
)

class MyCalcuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          date: '01.16',
          bplaceNm: '세나정육점1',
          money: '50,000'
        },
        {
          date: '01.17',
          bplaceNm: '세나정육점2',
          money: '60,000'
        },
        {
          date: '01.18',
          bplaceNm: '세나정육점3',
          money: '70,000'
        },
        {
          date: '01.19',
          bplaceNm: '세나정육점4',
          money: '80,000'
        },
        {
          date: '01.20',
          bplaceNm: '세나정육점5',
          money: '90,000'
        },
        {
          date: '01.21',
          bplaceNm: '세나정육점6',
          money: '20,000'
        },
        {
          date: '01.22',
          bplaceNm: '세나정육점7',
          money: '30,000'
        },
        {
          date: '01.22',
          bplaceNm: '세나정육점8',
          money: '30,000'
        },
        {
          date: '01.22',
          bplaceNm: '세나정육점8',
          money: '30,000'
        },
        {
          date: '01.22',
          bplaceNm: '세나정육점8',
          money: '30,000'
        }
      ]
    };
  }

  componentDidMount() {
    // 계좌 정보 조회
  }

  render() {
    return (
      <Container style={styles.containerScroll}>
        <CustomHeader title="정산 예정금액"/>
        <View style={styles.contentWrap}>
              
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>이번달</Text>
                <Text style={stylesReg.leftGuideTxt}>총 <Text style={localStyles.moneyTxt}>200,000원</Text>이</Text>
                <Text style={stylesReg.leftGuideTxt}>입금될 예정입니다</Text>
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

              {this.state.data.map((account, idx) => 
                <AccountHistory
                  key={idx}
                  account={account}
                />
              )}

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
