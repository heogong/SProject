import React, { Component } from "react";
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetSettlementDetail from '~/Main/Functions/GetSettlementDetail';
import GetSettlementDetailPage from '~/Main/Functions/GetSettlementDetailPage';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";


export const AccountHistory = ({account}) => (
  <View style={localStyles.moneyList}>
    <Text style={localStyles.dateTxt}>{account.asOrderNm}</Text>
    <Text style={localStyles.nameTxt}>{account.bplaceNm}</Text>
    <Text style={localStyles.momeyTxt}>{account.asAmount}원</Text>
  </View>
)

class MyCalcuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
        calcHist : []
      },
      refreshing: false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  componentDidMount() {
    this._getSettlementDetail();
  }

  // 업체 정산 내역 조회
  _getSettlementDetail = () => {
    GetSettlementDetail().then(result => {
      GetCommonData(result, this._getSettlementDetail).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log('업체 정산 내역 조회 - ', resultData);
              if(ResultBool) {
                this.setState({data : resultData.data});
              } else {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
              }
            }
        });
    });
  }

   // 업체 정산 내역 조회 - 페이지
   _getSettlementDetailPage = () => {
    GetSettlementDetailPage().then(result => {
      GetCommonData(result, this._getSettlementDetailPage).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log('업체 정산 내역 조회 - ', resultData);
              if(ResultBool) {

                this.setState({
                  data : {
                    ...this.state.data,
                    calcHist : resultData.data
                  }
                })
              } else {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
              }
              this.setState({refreshing: false});
            }
        });
    });
  }

  

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._getSettlementDetailPage();
  }


  render() {
    return (
      <Container style={styles.containerScroll}>
        <CustomHeader title="정산 예정금액"/>
        <View style={styles.contentWrap}>
              
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>이번달</Text>
                <Text style={stylesReg.leftGuideTxt}>총 <Text style={localStyles.moneyTxt}>{this.state.data.totalAmount}원</Text>이</Text>
                <Text style={stylesReg.leftGuideTxt}>입금될 예정입니다</Text>
              </View>
            </View>

            <View style={[styles.line, {marginTop: 16, marginBottom: 16}]}></View>

            <View style={{borderBottomColor: color.defaultColor, borderBottomWidth: 2, paddingBottom: 30}}>
              <Text style={{color: "#1e1e32", fontSize: 16, fontWeight: "bold", marginBottom: 5}}>내 계좌번호</Text>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={{fontSize: 14, color: color.defaultColor, fontWeight: "bold"}}>{this.state.data.backCdNm}</Text>
                <Text style={{fontSize: 13}}>{this.state.data.accountNum}</Text>
              </View>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >

              {this.state.data.calcHist.map((account, idx) => 
                <AccountHistory
                  key={idx}
                  account={account}
                />
              )}

            </ScrollView>

        </View>

        {/* alert 메세지 모달 */}
        <CustomModal
          modalType="ALERT"
          isVisible={this.state.isAlertModal}
          onPress={ () => this.setState({isAlertModal : false})}
          infoText={this.state.resultMsg}
          btnText="확인"
        />

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
