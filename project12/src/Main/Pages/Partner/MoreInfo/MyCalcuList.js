import React, { Component } from "react";
import { FlatList, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import GetSettlementDetail from '~/Main/Functions/GetSettlementDetail';
import GetSettlementDetailPage from '~/Main/Functions/GetSettlementDetailPage';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const FIRST_PAGE_NUM = 2;

class MyCalcuList extends Component {
  constructor(props) {
    super(props);
    
    this.initPageNum = FIRST_PAGE_NUM;

    this.state = {
      data : {
        calcHist : []
      },
      refreshing: false,
      isAlertModal : false, // alert 용
      resultMsg : null, // alert 용
      spinner: false
    };
  }

  componentDidMount() {
    this._getSettlementDetail();
  }

  // 업체 정산 내역 조회
  _getSettlementDetail = () => {

    this.setState({ spinner: true });

    GetSettlementDetail().then(result => {
      GetCommonData(result, this._getSettlementDetail).then(async resultData => {

        this.setState({ spinner: false });

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
    GetSettlementDetailPage(this.initPageNum).then(result => {
      GetCommonData(result, this._getSettlementDetailPage).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log('업체 정산 내역 조회 - ', resultData);
              if(ResultBool) {

                if(result.data.calcHist.length > 0) {
                  this.setState({
                    data : {
                      ...this.state.data,
                      calcHist : this.state.data.calcHist.concat(resultData.data.calcHist)
                    }
                  })
                  this.initPageNum++;
                }

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

  _renderItem = ({item}) => (
    <View style={localStyles.moneyList}>
      <Text style={localStyles.dateTxt}>{item.asPrgsDt}</Text>
      <View style={localStyles.nameTxtWrap}>
        <Text style={localStyles.nameTxt} numberOfLines={1}>{item.bplaceNm}</Text>
        <Text style={localStyles.name1Txt} numberOfLines={1}>{item.asOrderNm}</Text>
      </View>
      <Text style={localStyles.momeyTxt}>{item.asAmount}원</Text>
    </View>
  )

  render() {
    return (
      <Container style={styles.containerScroll}>
        <Spinner
					visible={this.state.spinner}
					textContent={'정산내역을 불러오고 있습니다.'}
					textStyle={styles.whiteFont}
					style={{ color: color.whiteColor }}
				/>
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

            <View style={{borderBottomColor: color.defaultColor, borderBottomWidth: 2, paddingBottom: 20}}>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={{color: "#1e1e32", fontSize: 16, fontWeight: "bold", marginBottom: 5}}>내 계좌번호</Text>
                <Text style={{fontSize: 13, color: color.greyColor}}>{this.state.data.accountHolder}</Text>
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={{fontSize: 14, color: color.defaultColor}}>{this.state.data.backCdNm}</Text>
                <Text style={{fontSize: 13}}>{this.state.data.accountNum}</Text>
              </View>
            </View>

            <FlatList 
              data={this.state.data.calcHist} 
              renderItem={this._renderItem} 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              onEndReached={this._getSettlementDetailPage}
            />
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
  nameTxtWrap: {
    flex: 2
  },
  nameTxt: {
    fontSize: 16,
    color: "#1e1e32"
  },
  name1Txt: {
    fontSize: 13,
    color: color.greyColor
  },
  momeyTxt: {
    fontSize: 16,
    color: color.defaultColor,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right"
  }
});

export default MyCalcuList; 
