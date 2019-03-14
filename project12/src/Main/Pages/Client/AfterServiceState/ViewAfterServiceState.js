import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE, MATCH, DEPARTURE, ARRIVE, ADD_AS, COMPLETE_AS} from '~/Common/Blend';

import { connect } from 'react-redux';
import { setIntervalId, setIsAfterService } from '~/Redux/Actions';
import Modal from "react-native-modal";

import DrawMap from '~/Main/Components/DrawMap';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import RegEvalPoint from '~/Main/Functions/RegEvalPoint';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

const AfterServiceState = ({ asPrgsStatCd, status, statusOnImg, statusOffImg }) => (
  <View style={localStyles.asMatchIconWrap}>
    <Image 
        source={(asPrgsStatCd !== status.VALUE) ? statusOffImg : statusOnImg } 
        resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}}
      />
      <Text 
        style={[localStyles.asMatchStateTxt,
          (asPrgsStatCd !== status.VALUE) ? {color: "#1e1e32"} : {color: "#0397bd"}
        ]}
      >
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
      makerYn : true,
      star1 : false,
      star2 : false,
      star3 : false,
      star4 : false,
      star5 : false,
      evalPoint : 0,
      disableBtn : true,
      isModalVisible: false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  componentDidMount () {
    // this._getClientAfterServiceState();

    // // AS 신청 여부 확인
    // if(this.props.afterService.isAfterService) {
    //   console.log("인터벌 확인")

    //   // A/S 상태 갱신
    //   const INTERVAL_ID = setInterval(() => {
    //     this._getClientAfterServiceState();
    //   }, 60000);

    //   this.props.onSetIntervalId(INTERVAL_ID);
    // }
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
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
              }
          }
      });
    });
  }
 
  //  AS 평가 정보 등록 - 테스트 asPrgsId 필요 
  _regEvalPoint = () => {
    const { data, evalPoint } = this.state;

    RegEvalPoint(data.asPrgsId, evalPoint).then(async result => {
      GetCommonData(result, this._regEvalPoint).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              
              if(ResultBool) {
                this.setState({
                  isModalVisible : false,
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                });

              } else {
                this.setState({
                  isModalVisible : false,
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg,
                  star1 : false,
                  star2 : false,
                  star3 : false, 
                  star4 : false, 
                  star5 : false
                });
              }
          }
      });
    });
  }

  // 평가 여부
  _checkGrade = () => {
    this._toggleModal();
    // if(this.state.data.asPrgsMst.asPrgsStatCd == COMPLETE_AS.VALUE) {
    //   this._toggleModal();
    // } else {
    //   this.setState({
    //     isAlertModal : true,
    //     resultMsg : "A/S완료 후 평가 하실 수 있습니다."
    //   })
    // }
  }

  // 별점 클릭 호출
  _clickStar = (clickStar) => {
    switch (clickStar) {
      case 'star1' : 
        this.setState({
          star1 : true,
          star2 : false,
          star3 : false, 
          star4 : false, 
          star5 : false,
          evalPoint : 1,
          disableBtn : false
        }); 
      break;
      case 'star2' : 
        this.setState({
          star1 : true,
          star2 : true,
          star3 : false, 
          star4 : false, 
          star5 : false,
          evalPoint : 2,
          disableBtn : false
        }); 
      break;
      case 'star3' : 
        this.setState({
          star1 : true,
          star2 : true,
          star3 : true, 
          star4 : false, 
          star5 : false,
          evalPoint : 3,
          disableBtn : false
        }); 
      break;
      case 'star4' : 
        this.setState({
          star1 : true,
          star2 : true,
          star3 : true, 
          star4 : true, 
          star5 : false,
          evalPoint : 4,
          disableBtn : false
        }); 
      break;
      default : 
        this.setState({
          star1 : true,
          star2 : true,
          star3 : true, 
          star4 : true, 
          star5 : true,
          evalPoint : 5,
          disableBtn : false
        }); 
      break;
    }
  }

  render() {
    return (
          <Container style={[styles.fx1, {   
            backgroundColor: color.defaultColor
          }]}>
              <CustomHeader title="A/S현황"/>
      
              <View style={styles.fx1}>
      
                  { (this.state.showMap) ? (
                      <View style={{height : mapSize}}>
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
                          <View style={localStyles.topTxtWrap}>
                              <View style={styles.fx2}>
                                  <Text style={localStyles.topTilteTxt}>
                                    {this.state.data.clinePrdInfo.bplace.bplaceNm} A/S
                                  </Text>
                                  <Text style={localStyles.topSubTitleTxt}>
                                    {this.state.data.clinePrdInfo.clientPrdNm}
                                  </Text>
                                  <Text style={localStyles.topInfoTxt}>
                                    {this.state.data.clinePrdInfo.bplace.addr.addressName}
                                  </Text>
                                  <Text style={localStyles.topInfoTxt}>
                                    {this.state.data.clinePrdInfo.bplace.detail.detailAddr1}
                                  </Text>
                              </View>
                              <View style={localStyles.topboxImgWrap}>
                                  <Image 
                                    source={{uri : this.state.data.clinePrdInfo.prdTypeImg.fileUrl}} 
                                    style={localStyles.topBoxImg}
                                    resizeMode="contain" 
                                  />
                              </View>
                          </View>
                          <View>
                            <Text style={[localStyles.topSubTitleTxt, {marginTop: 20, marginBottom: 10}]}>참고사항</Text>
                            <Text style={localStyles.topInfoTxt}>{ this.state.data.asPrgsMst.asPrgsStatDSC }</Text>
                          </View>
                      </View>
                  )}
                  <View>
                      <View style={localStyles.secondBox}>
                      <Text style={localStyles.asMatchStateDscTxt}>
                        { (this.state.asPrgsYn == 'Y') ? this.state.asPrgsStatNm : "매칭된 A/S 업체가 출발했어요." }
                      </Text>
                      <View style={styles.fxDirRow}>
                          <AfterServiceState
                            asPrgsStatCd={this.state.asPrgsStatCd}
                            status={MATCH}
                            statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_wait_icon.png')}
                            statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_wait_icon.png')}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.asPrgsStatCd}
                            status={DEPARTURE}
                            statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_start_icon.png')}
                            statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_start_icon.png')}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.asPrgsStatCd}
                            status={ARRIVE}
                            statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_arrive_icon.png')}
                            statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_arrive_icon.png')}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.asPrgsStatCd}
                            status={ADD_AS}
                            statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_progress_icon.png')}
                            statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_progress_icon.png')}
                          />
                          <AfterServiceState
                            asPrgsStatCd={this.state.asPrgsStatCd}
                            status={COMPLETE_AS}
                            statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_complete_icon.png')}
                            statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_complete_icon.png')}
                          />
                        </View>
                     </View>
                  </View>
      
                  <View style={localStyles.serviceBoxWrap}>
                    <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                        <TouchableOpacity onPress={this._checkGrade}>
                            <Image source={require("~/Common/Image/service_rating.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                        <TouchableOpacity>
                            <Image source={require("~/Common/Image/recent_report.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={[localStyles.serviceBox]}>
                        <TouchableOpacity>
                            <Image source={require("~/Common/Image/previous_as.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                        </TouchableOpacity>
                    </View>
                </View>
              </View>

              <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })}>
                <View style={[styles.modalWrap, {height: 150}]}>
                    <View style={styles.modalContent}>
                        <View style={[styles.modalTop2LTxtWrap, {flex: 2}]}>
                            <Text style={styles.modalTopTxt}>A/S업체의 서비스를 평가해주세요!</Text>
                            <View style={[styles.fxDirRow, styles.justiConCenter]}>
                                <TouchableOpacity onPress={ () => this._clickStar("star1") }>
                                    <Image source={(this.state.star1) ? require("~/Common/Image/Big_bluestar_icon.png") : require("~/Common/Image/Big_graystar_icon.png")} 
                                      resizeMode="contain" 
                                      style={localStyles.starIconImg} 
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this._clickStar("star2") }>
                                    <Image source={(this.state.star2) ? require("~/Common/Image/Big_bluestar_icon.png") : require("~/Common/Image/Big_graystar_icon.png")} 
                                      resizeMode="contain" 
                                      style={localStyles.starIconImg} 
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this._clickStar("star3") }>
                                    <Image source={(this.state.star3) ? require("~/Common/Image/Big_bluestar_icon.png") : require("~/Common/Image/Big_graystar_icon.png")} 
                                      resizeMode="contain" 
                                      style={localStyles.starIconImg} 
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this._clickStar("star4") }>
                                    <Image source={(this.state.star4) ? require("~/Common/Image/Big_bluestar_icon.png") : require("~/Common/Image/Big_graystar_icon.png")} 
                                      resizeMode="contain" 
                                      style={localStyles.starIconImg} 
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this._clickStar("star5") }>
                                    <Image source={(this.state.star5) ? require("~/Common/Image/Big_bluestar_icon.png") : require("~/Common/Image/Big_graystar_icon.png")} 
                                      resizeMode="contain" 
                                      style={localStyles.starIconImg} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.modalBtnWrap, styles.mb5]}>
                            <CustomEtcButton
                              disabled={this.state.disableBtn}
                              onPress={this._regEvalPoint}
                            >
                              평가완료!
                            </CustomEtcButton>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* alert 메세지 모달 */}
            <CustomModal
              modalType="ALERT"
              isVisible={this.state.isAlertModal}
              onPress={ () => this.setState({isAlertModal : false})}
              infoText={this.state.resultMsg}
              btnText="확인"
            />
        </Container>
    )
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

function hp (percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const stateImgSize = wp(13, 52);
const mapSize = hp(26);


const localStyles = StyleSheet.create({
  descBox : {
      backgroundColor : color.whiteColor, 
      borderColor : "#ddd",
      borderBottomWidth : 1,
      marginLeft : 26, 
      marginRight : 26,
      paddingTop : 30,
      paddingBottom : 30,
      paddingLeft : 10,
      paddingRight : 10,
      borderTopWidth: 1,
      borderColor: "#ddd",
      paddingLeft: 26,
      paddingRight: 26
  },
  secondBox : {
      marginLeft : 26, 
      marginRight : 26, 
      paddingTop : 18,
      paddingBottom : 18,
      paddingLeft : 24,
      paddingRight: 24,
      borderBottomLeftRadius : 5, 
      borderBottomRightRadius : 5, 
      backgroundColor : color.whiteColor
  },
  asMatchStateDscTxt: {
      marginBottom: 15,
      textAlign:'center',
      color: "#0397bd",
      fontWeight: "bold",
      fontSize: 16
  },
  asMatchIconWrap: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  },
  asMatchStateTxt: {
      fontSize : 12,
      color: "#1e1e32",
      fontWeight: "bold",
      marginTop: 10
  },
  serviceBox: {
      flex : 1,
      justifyContent : 'center',
      alignItems : "center",
      marginTop: 22
  },
  serviceBoxImg: {
      height : 96,
      width : 96
  },
  serviceBoxWrap: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft : 26, 
      marginRight : 26, 
  },
  topTxtWrap: {
      flexDirection: "row"
  },
  topTilteTxt: {
      fontSize: 18,
      fontWeight: "bold",
      color: color.defaultColor,
      marginBottom: 24
  },
  topBoxImg: {
      height : 80,
      width : 80
  },
  topboxImgWrap: {
      flex: 1,
      alignItems: "center"
  },
  topSubTitleTxt: {
      alignItems: "center",
      fontSize: 15,
      color: "#1e1e32",
      fontWeight: "bold",
      marginBottom: 10
  },
  topInfoTxt: {
      fontSize: 13,
      color: "#8e8e98"
  },
  starIconImg: {
      width: 32,
      height: 32,
      marginLeft: 2,
      marginRight: 2
  },
  starIconWrap: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10
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
