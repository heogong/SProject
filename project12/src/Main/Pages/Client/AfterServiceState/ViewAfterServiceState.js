import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, H2, Text } from "native-base";

import { SUCCESS_RETURN_CODE, MATCH, DEPARTURE, ARRIVE, ADD_AS, COMPLETE_AS} from '~/Common/Blend';

import { connect } from 'react-redux';
import { setIntervalId, setIsAfterService } from '~/Redux/Actions';

import DrawMap from '~/Main/Components/DrawMap';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


const AfterServiceState = ({ asPrgsStatCd, status }) => (
  <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
    <Image 
        source={(asPrgsStatCd !== status.VALUE) ? 
          require("~/Common/Image/input-able.png") : require("~/Common/Image/join-end.png")} 
        style={{height : stateImgSize, width : stateImgSize}} 
        resizeMode="contain"
      />
      <Text 
        style={[(asPrgsStatCd == status.VALUE) ? {color : color.defaultColor} : styles.greyFont
          ,{fontSize : 12}
        ]}>
          {status.TEXT}
      </Text>
  </View>
);

class ViewAfterServiceState extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        asPrgsMst : {
          asPrgsStatCd : null,
          asPrgsStatNm : null,
          asPrgsStatDSC : null
        },
        clinePrdInfo : {
          bplace : {
            bplaceNm : null,
            addr : {
              addressName : null
            },
            detail : {
              detailAddr1 : null
            }
          },
          clientPrdNm : null,
          prdTypeImg : {
            fileUrl : null
          }
        }
      },
      asPrgsYn : 'N',
     
      showMap : false,
      region: {
        latitude: 37.566535,
        longitude: 126.97796919999996,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
      },
      marker: {
        latitude: 37.566535,
        longitude: 126.97796919999996
      },
      makerYn : true
    };
  }

  componentDidMount () {
    this._getClientAfterServiceState();

    // AS 신청 여부 확인
    if(this.props.afterService.isAfterService) {
      console.log("인터벌 확인")

      // A/S 상태 갱신
      const INTERVAL_ID = setInterval(() => {
        this._getClientAfterServiceState();
      }, 60000);

      this.props.onSetIntervalId(INTERVAL_ID);
    }
  }

  // 맵 이동 후 좌표 값
  _onRegionChangeComplete = (region) => {
    this.setState({region});
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
                    data : resultData.data
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

  _checkGrade = () => {
    if(this.state.data.asPrgsMst.asPrgsStatCd == COMPLETE_AS.VALUE) {
      alert("서비스 평가 하기");
    } else {
      alert("A/S 완료 후 평가 하실 수 있습니다.");
    }
  }

  render() {
    return (
            // <ScrollView style={{flex: 1}} contentContainerStyle={{
            //     flex: 1,
            //     justifyContent: 'space-between'
            // }}>
            //     <CustomHeader
            //         title='메인'
            //         backBtn={ false }
            //         menuBtn={ true }
            //     />
            //     <View style={{ flex : 1 }}>
            //         <Text>MAP</Text>
            //     </View>
            //     <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
            //         <View style={ styles.reportBox }>
            //             <View style={[{padding : 10, backgroundColor: 'steelblue'}]}>
            //                 { (this.state.asPrgsYn == 'Y') ? (
            //                 <Text>{ this.state.asPrgsStatDSC }</Text>
            //                 ):(
            //                 <Text>진행중인 A/S 가 없습니다.</Text>
            //                 ) }
            //             </View>
            //         </View>
            //     </View>
   
          <Container style={[styles.fx1, {   
            backgroundColor: color.defaultColor
          }]}>
              <CustomHeader title="A/S현황"/>
      
              <View style={styles.fx1}>
      
                  { (this.state.showMap) ? (
                      <View style={[styles.fx3]}>
                        <DrawMap
                          region={ this.state.region }
                          onRegionChangeComplete={ this._onRegionChangeComplete }
                          makerYn={ this.state.makerYn }
                          marker={ this.state.marker }
                          showMap={ this.state.showMap }
                        />
                      </View>
                  ) : (
                      <View style={localStyles.descBox}>
                          <View style={[styles.fx2, styles.mb15, styles.fxDirRow]}>
                              <View style={styles.fx2}>
                                  <H2 style={[styles.mb10, {color : color.defaultColor}]}>
                                    {this.state.data.clinePrdInfo.bplace.bplaceNm} A/S
                                  </H2>
                                  <Text>
                                    {this.state.data.clinePrdInfo.clientPrdNm}
                                  </Text>
                                  <Text style={styles.greyFont}>
                                    {this.state.data.clinePrdInfo.bplace.addr.addressName}
                                  </Text>
                                  <Text style={styles.greyFont}>
                                    {this.state.data.clinePrdInfo.bplace.detail.detailAddr1}
                                  </Text>
                              </View>
                              <View style={[styles.fx1, styles.alignItemsCenter]}>
                                  <Image 
                                    source={{uri : this.state.data.clinePrdInfo.prdTypeImg.fileUrl}} 
                                    resizeMode="contain" 
                                    style={{height : productImgSize, width : productImgSize}}
                                  />
                              </View>
                          </View>
                          <View style={styles.fx3}>
                              <Text>참고사항</Text>
                              <Text style={styles.greyFont}>
                                { this.state.data.asPrgsMst.asPrgsStatDSC }
                              </Text> 
                          </View>
                      </View>
                  )}
      
                  <View style={[styles.fx2, styles.basicBackgroundColor, {paddingLeft : 26, paddingRight : 26}]}>
                      <View style={localStyles.secondBox}>
                        <Text style={[styles.mb10, {textAlign:'center', color: color.defaultColor}]}>
                          { this.state.data.asPrgsMst.asPrgsStatNm }
                        </Text>
                        <View style={styles.fxDirRow}>

                          <AfterServiceState
                            asPrgsStatCd={this.state.data.asPrgsMst.asPrgsStatCd}
                            status={MATCH}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.data.asPrgsMst.asPrgsStatCd}
                            status={DEPARTURE}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.data.asPrgsMst.asPrgsStatCd}
                            status={ARRIVE}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.data.asPrgsMst.asPrgsStatCd}
                            status={ADD_AS}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.data.asPrgsMst.asPrgsStatCd}
                            status={COMPLETE_AS}
                          />

                        </View>
                     </View>
                  </View>
      
                  <View style={[
                      styles.fx2, 
                      styles.fxDirRow, 
                      styles.alignItemsCenter, 
                      {paddingLeft : 26, paddingRight : 26}
                  ]}>
                      <TouchableOpacity 
                        onPress={this._checkGrade}
                        style={[localStyles.serviceBox, {marginRight : 20}]}
                      >
                          <Image source={require("~/Common/Image/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                          <Text style={{color : color.defaultColor, fontSize : 14}}>서비스평가</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[localStyles.serviceBox, {marginRight : 20}]}>
                          <Image source={require("~/Common/Image/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                          <Text style={{color : color.defaultColor, fontSize : 14}}>최근보고서</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={localStyles.serviceBox}>
                          <Image source={require("~/Common/Image/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                          <Text style={{color : color.defaultColor, fontSize : 14}}>이전 A/S 내역</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </Container>
    )
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

function hp (percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const productImgSize = wp(25,52);
const stateImgSize = wp(10, 52);
const serviceImgSize = wp(17, 52);
const serviceHeightBoxSize = hp(15);


const localStyles = StyleSheet.create({
  descBox : {
      flex: 3.5,
      backgroundColor : color.whiteColor, 
      borderColor : color.defaultColor,
      borderBottomWidth : 1,
      marginLeft : 26, 
      marginRight : 26,
      paddingTop : 10,
      paddingLeft : 10,
      paddingRight : 10
  },
  secondBox : {
      paddingTop : 15,
      paddingBottom : 15,
      borderBottomLeftRadius : 5, 
      borderBottomRightRadius : 5, 
      backgroundColor : color.whiteColor,
      elevation: 10
  },
  serviceBox: {
      flex : 1,
      justifyContent : 'center',
      alignItems : "center",
      backgroundColor : color.whiteColor,
      height : serviceHeightBoxSize, 
      borderRadius : 5, 
      elevation: 10
  }
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

ViewAfterServiceState = connect(mapStateToProps, mapDispatchToProps)(ViewAfterServiceState);
export default ViewAfterServiceState;
