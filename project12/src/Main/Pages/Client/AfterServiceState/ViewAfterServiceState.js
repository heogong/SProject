import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView } from 'react-native';
import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";

import { 
  SUCCESS_RETURN_CODE, 
  MATCH,
  UN_MATCH,
  COMPLETE_MATCH,
  FAIL_MATCH,
  DEPARTUR,
  ARRIVE,
  ADD_AS,
  COMPLETE_AS,
  MOVE
} from '~/Common/Blend';

import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ServiceRequestSwiper from '~/Main/Components/ServiceRequestSwiper';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';

let INTEVER_ID = 0;
export default class ViewAfterServiceState extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      asPrgsYn : 'N',
      asPrgsStatCd : null,
      asPrgsStatNm : null,
      asPrgsStatDSC : null
    };
  }

  componentDidMount () {
    this._getClientAfterServiceState();

    // A/S 상태 갱신
    INTEVER_ID = setInterval(() => {
      this._getClientAfterServiceState();
    }, 60000);

  }

  // 현재 나의(고객) AS 진행 상태 체크
  _getClientAfterServiceState = () => {
    GetClientAfterServiceState().then(async result => {
      GetCommonData(result, this._getClientAfterServiceState).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              
              if(ResultBool) {
                this.setState({ 
                  asPrgsYn : resultData.data.asPrgsYn
                });

                if(resultData.data.asPrgsMst !== null) {
                  this.setState({
                    asPrgsStatCd : resultData.data.asPrgsMst.asPrgsStatCd,
                    asPrgsStatNm : resultData.data.asPrgsMst.asPrgsStatNm,
                    asPrgsStatDSC : resultData.data.asPrgsMst.asPrgsStatDSC,
                  });
                }
              } else {
                alert(resultData.resultMsg);
              }
          }
      });
    });
  }

  render() {
    return (
            <ScrollView style={{flex: 1}} contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <CustomHeader
                    title='메인'
                    backBtn={ false }
                    menuBtn={ true }
                />
                <View style={{ flex : 1 }}>
                    <Text>MAP</Text>
                </View>
                <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
                    <View style={ styles.reportBox }>
                        <View style={[{padding : 10, backgroundColor: 'steelblue'}]}>
                            { (this.state.asPrgsYn == 'Y') ? (
                            <Text>{ this.state.asPrgsStatDSC }</Text>
                            ):(
                            <Text>진행중인 A/S 가 없습니다.</Text>
                            ) }
                        </View>
                    </View>
                </View>
                <View style={{ flex : 1 }}>
                    <CustomButton onPress={ () => alert("이전 A/S 내역") }>
                        <Text>이전 A/S 내역</Text>
                    </CustomButton>
                    <CustomButton onPress={ () => alert("서비스평가") }>
                        <Text>서비스평가</Text>
                    </CustomButton>
                    <CustomButton onPress={ () => alert("최근 보고서") }>
                        <Text>최근 보고서</Text>
                    </CustomButton>
                </View>
            </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  reportBox : {
      zIndex : 1, 
      position: 'absolute', 
      left:0, 
      bottom:0, 
      width: '100%',
      height: 150
  },
  hide: {
      display: 'none'
  },
  show: {
      display: 'flex'
  },
  slide: { 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 100,
    width: 100,
    backgroundColor: 'pink'
  },
  title: { color: 'black', fontSize: 20 }
});
