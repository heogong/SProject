import React, { Component } from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
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

import { connect } from 'react-redux';
import { setIntervalId, setIsAfterService } from '~/Redux/Actions';

import GetBizList from '~/Main/Functions/GetBizList';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ServiceRequestSwiper from '~/Main/Components/ServiceRequestSwiper';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';

let INTEVER_ID = 0;
class ClientHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      clinePrdInfo : {
        bplace : {
          bplaceNm : null,
          addr : {
            addressName : null
          },
          detail : {
            detailAddr1 : null
          }
        }
      },
      asPrgsYn : 'N',
      asPrgsStatCd : null,
      asPrgsStatNm : null,
      asPrgsStatDSC : null
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed

    this._getBizList();
    this._getClientAfterServiceState();

    // AS 신청 여부 확인
    console.log("AS 신청 여부 확인!!!! : ", this.props.afterService.isAfterService);
    if(this.props.afterService.isAfterService) {
      console.log("인터벌 확인")

      // A/S 상태 갱신
      const INTERVAL_ID = setInterval(() => {
        this._getClientAfterServiceState();
      }, 10000);
      
      this.props.onSetIntervalId(INTERVAL_ID);
    }
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener

    clearInterval(this.props.afterService.intervalId);
    console.log("componentWillUnmount :", this.props.afterService.intervalId);
  }

  handleBackPress = () => {
    return false;
  }

   // 사업장 목록 가져오기
  _getBizList = () => {
    GetBizList().then(async result => {
        GetCommonData(result, this._getBizList).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
                if(ResultBool) {
                  this.setState({data : resultData.data});
                }
            }
        });
    });
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
                    clinePrdInfo : resultData.data.clinePrdInfo
                  });
                } else {
                  this.props.onSetIsAfterService(false);
                  clearInterval(this.props.afterService.intervalId);
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
        <View style={{ flex : 1, flexDirection: 'column'}}>
            <CustomHeader
                title='메인'
                backBtn={ false }
                menuBtn={ true }
            />
            <View style={{ flex : 1}}>

              { (this.state.asPrgsYn == 'Y') ? (

                <View style={{alignItems: 'center'}}>
                  <Text>{this.state.clinePrdInfo.bplace.bplaceNm}</Text>
                  <Text>{this.state.clinePrdInfo.bplace.addr.addressName}</Text>
                  <Text>{this.state.clinePrdInfo.bplace.detail.detailAddr1}</Text>
                  <View style={styles.slide}>
                      <Text style={styles.title}>{this.state.asPrgsStatNm}</Text>
                  </View>
                </View>

              ):(
                <ServiceRequestSwiper
                  bizList={ this.state.data }
                  interverId={ INTEVER_ID }
                />
              ) }

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
        </View>
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


let mapStateToProps = (state) => {
  return {
      afterService: state.AFTERSERVICE
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetIntervalId: (value) => dispatch(setIntervalId(value)),
      onSetIsAfterService: (value) => dispatch(setIsAfterService(value))
  }
}

ClientHome = connect(mapStateToProps, mapDispatchToProps)(ClientHome);
export default ClientHome;