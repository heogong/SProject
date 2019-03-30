import React, { Component } from 'react';
import { BackHandler, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Text } from "native-base";

import { SUCCESS_RETURN_CODE, MATCH, DEPARTURE, ARRIVE, PROGRESS, ADD_AS, COMPLETE_MATCH, COMPLETE_AS} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setIntervalId, setIsAfterService } from '~/Redux/Actions';
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';

import GetBizList from '~/Main/Functions/GetBizList';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


let INTEVER_ID = 0;

const AfterServiceState = ({ asPrgsStatCd, status, statusOnImg, statusOffImg }) => (
  <View style={localStyles.asMatchIconWrap}>
    <Image
        source={(asPrgsStatCd == null) ? 
          (statusOffImg) : 
          (asPrgsStatCd == status.code1.VALUE || asPrgsStatCd == status.code2.VALUE) ? statusOnImg : statusOffImg 
        } 
        resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}}
      />
      <Text 
        style={[localStyles.asMatchStateTxt,
          (asPrgsStatCd !== status.code1.VALUE || asPrgsStatCd !== status.code2.VALUE) ? {color: "#1e1e32"} : {color: "#0397bd"}
        ]}
      >
          {status.code1.TEXT}
      </Text>
  </View>
);


class ClientHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      clientPrdInfo : {
        bplace : {
          bplaceNm : null,
          addr : {
            addressName : null
          },
          detail : {
            detailAddr1 : null
          }
        }, 
        prdTypeImg : {
          fileUrl : null
        }
      },
      asPrgsYn : 'N', // AS 여부
      asPrgsStatCd : null,
      asPrgsStatNm : null,
      asPrgsStatDSC : null,
      slider1ActiveSlide: 0,
      spinner : false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener
    
    console.log("componentWillUnmount :", this.props.afterService.intervalId);
    clearInterval(this.props.afterService.intervalId);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed

    clearInterval(this.props.afterService.intervalId);
    this.setState({spinner : true});
    this._startFn();
  }

  handleBackPress = () => {
    return false;
  }

  // 초기 시작 API
  _startFn = () => {
    this._getBizList();
    this._getClientAfterServiceState();
    this._chkIsAfterService(); 
  }

  // AS 신청 여부 확인
  _chkIsAfterService = () => {
    console.log("AS 신청 여부 확인  : ", this.props.afterService.isAfterService);
    if(this.props.afterService.isAfterService) {
      console.log("인터벌 확인")
      // A/S 상태 갱신
      const INTERVAL_ID = setInterval(() => {
        this._getClientAfterServiceState();
      }, 20000);

      this.props.onSetIntervalId(INTERVAL_ID);
    }
  }

   // 사업장 목록 가져오기
  _getBizList = () => {
    GetBizList().then(async result => {
        GetCommonData(result, this._getBizList).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log("클라이언트 : 사업장 목록 가져오기", resultData);
                if(ResultBool) {
                  this.setState({data : resultData.data});
                } else {
                  this.setState({
                    isAlertModal : true,
                    resultMsg : '사업장 목록 - ' + resultData.resultMsg
                  })
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
              console.log("클라이언트 : AS 진행 상태 체크 : ", resultData);
              
              if(ResultBool) {
                this.setState({ 
                  asPrgsYn : resultData.data.asPrgsYn
                });

                if(resultData.data.asPrgsMst !== null) {
                  this.setState({
                    asPrgsStatCd : resultData.data.asPrgsMst.asPrgsStatCd,
                    asPrgsStatNm : resultData.data.asPrgsMst.asPrgsStatNm,
                    asPrgsStatDSC : resultData.data.asPrgsMst.asPrgsStatDsc,
                    clientPrdInfo : resultData.data.clinePrdInfo
                  });
                } else {
                  this.setState({
                    asPrgsStatCd : null
                  })
                  this.props.onSetIsAfterService(false);
                  clearInterval(this.props.afterService.intervalId);
                }
              } else {
                this.setState({
                  isAlertModal : true,
                  resultMsg : '진행 상태 체크 - ' + resultData.resultMsg
                })
              }
              this.setState({spinner : false});
          }
      });
    });
  }

  unRegister = () => (
    <View style={localStyles.topBoxWrap}>
        <View style={styles.mb10}>
            <Text style={localStyles.topBoxNameTxt}>제품정보 미등록</Text>
            <Text style={localStyles.topBoxtAddrTxt}>사업장·제품정보를 등록해놓으면</Text>
            <Text style={localStyles.topBoxtAddrTxt}>편리하고 정확한 서비스가 제공됩니다</Text>
        </View>

        <View style={localStyles.bottomBoxWrap}>
            <View style={styles.fx1}>

                <CustomButton
                  onPress={ () => alert("정보등록하러 이동")}
                  WhiteLineBtn={true}
                  CustomBtnStyle={{height: 36, width: "100%"}}
                  CustomFontStyle={{fontSize: 14}}
                >
                  정보등록하러 이동
                </CustomButton>

                <View style={localStyles.noRegWrap}>
                    <Text style={localStyles.noRegTxt}>· 사업장 미등록</Text>
                    <Text style={localStyles.noRegTxt}>· 보유제품 미등록</Text>
                </View>
                <Text style={localStyles.percentTxt}>50%</Text>
            </View>
            <View style={localStyles.bottomBoxRightWrap}>
                <View style={localStyles.rightStateCircle}>
                    <Text style={localStyles.rightStateTxt}>정보 미등록</Text>
                </View>
            </View>
        </View>
    </View>
);

  maching = () => (
    <View style={localStyles.topBoxWrap}>
        <View style={styles.mb5}>
            <Text style={localStyles.topBoxNameTxt}>{this.state.clientPrdInfo.bplace.bplaceNm}</Text>
            <Text style={localStyles.topBoxtAddrTxt}>{this.state.clientPrdInfo.bplace.addr.addressName}</Text>
            <Text style={localStyles.topBoxtAddrTxt}>{this.state.clientPrdInfo.bplace.detail.detailAddr1}</Text>
        </View>

        <View style={localStyles.bottomBoxWrap}>

            <View style={localStyles.bottomBoxLeftWrap}>
                <Text style={localStyles.prdNameTxt}>[{this.state.clientPrdInfo.clientPrdNm}]</Text>
                <Image
                  source={{uri : this.state.clientPrdInfo.prdTypeImg.fileUrl}} 
                  style={[localStyles.leftImg, {alignSelf: "center", height: 90, width: 90}]}  
                />
            </View>

            <View style={localStyles.bottomBoxRightWrap}>
                <View style={[localStyles.rightStateCircle, {backgroundColor: "#0397bd"}]}>
                    <Text style={[localStyles.rightStateTxt, {color: color.whiteColor}]}>{this.state.asPrgsStatNm}</Text>
                </View>
            </View>
        </View>
    </View>
  );

  render() {
    return (
        <Container style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
          <Spinner
            visible={this.state.spinner}
            textContent={'데이터를 불러오고 있습니다.'}
            textStyle={styles.whiteFont}
            style={{color: color.whiteColor}}
            overlayCologr={"rgba(40, 200, 245, 1)"}
          />
          <Header style={[styles.headerM, styles.noPadding]}>
            <Left style={styles.headerLeftWrap}/>
            <Body style={styles.headerCenterWrap}>
              <View style={styles.headerTitleTxt}>
                  <Image source={require("~/Common/Image/Logo_main.png")} resizeMode="contain" style={styles.headerLogoImg} />
              </View>
            </Body>
            <Right style={styles.headerRightWrap}/>
          </Header>

          <ScrollView showsVerticalScrollIndicator={false}>

          { (this.state.asPrgsYn == 'Y') ? (
            this.maching()
          ) :(
            (this.state.data.length > 0) ? (
              <Swiper 
                style={localStyles.topBoxSwiperWrap}
                paginationStyle={{
                    bottom: 10
                }} 
                dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.4)'}]} />}
                activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.whiteColor}]} />}
            >
              {this.state.data.map((business, index) => (
                <View 
                  key={index}
                  style={localStyles.topBoxWrap}
                >
                  <View style={styles.mb10}>
                      <Text style={localStyles.topBoxNameTxt}>{(business.bplaceNm !== null) ? business.bplaceNm : '사업장 정보를 입력해주세요.'}</Text>
                      <Text style={localStyles.topBoxtAddrTxt}>{(business.addr !== null) ? business.addr.addressName : '사업장 정보를 입력해주세요.'}</Text>
                      <Text style={localStyles.topBoxtAddrTxt}>{(business.detail !== null) ? business.detail.detailAddr1 : '사업장 정보를 입력해주세요.'}</Text>
                  </View>
      
                  <View style={localStyles.bottomBoxWrap}>
      
                      <View style={localStyles.bottomBoxLeftWrap}>
                          <Image source={require("~/Common/Image/license-depart01.png")} style={localStyles.leftImg}  />
                      </View>

                        <View style={localStyles.bottomBoxRightWrap}>
                          <TouchableOpacity
                            onPress={() => {
                              Actions.AfterServiceProdTypeList({bizId : business.clientBplaceId});
                              clearInterval(INTEVER_ID);
                            }}
                          >
                            <View style={localStyles.rightStateCircle}>
                                <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                  </View>
                </View>
              ))}
            </Swiper>

            ) : (
              this.unRegister()
            )
          )}
             
              
              <View style={{backgroundColor : '#d6f1ff'}}>
                <View style={[styles.boxShadowTopNo, localStyles.secondBox]}>
                  <Text style={localStyles.asMatchStateDscTxt}>
                    { (this.state.asPrgsYn == 'Y') ? this.state.asPrgsStatDSC : "고장난 제품의 A/S 신청을 해 보세요" }
                  </Text>
                  <View style={styles.fxDirRow}>
                    <AfterServiceState
                      asPrgsStatCd={this.state.asPrgsStatCd}
                      status={{'code1' : MATCH, 'code2' : COMPLETE_MATCH}}
                      statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_wait_icon.png')}
                      statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_wait_icon.png')}
                    />
                    <AfterServiceState
                      asPrgsStatCd={this.state.asPrgsStatCd}
                      status={{'code1' : DEPARTURE, 'code2' : DEPARTURE}}
                      statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_start_icon.png')}
                      statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_start_icon.png')}
                    />
                    <AfterServiceState
                      asPrgsStatCd={this.state.asPrgsStatCd}
                      status={{'code1' : ARRIVE, 'code2' : ARRIVE}}
                      statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_arrive_icon.png')}
                      statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_arrive_icon.png')}
                    />
                    <AfterServiceState
                      asPrgsStatCd={this.state.asPrgsStatCd}
                      status={{'code1' : PROGRESS, 'code2' : ADD_AS}}
                      statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_progress_icon.png')}
                      statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_progress_icon.png')}
                    />
                    <AfterServiceState
                      asPrgsStatCd={this.state.asPrgsStatCd}
                      status={{'code1' : COMPLETE_AS, 'code2' : COMPLETE_AS}}
                      statusOnImg={require('~/Common/Image/user_as_step_icon/Step_on/as_complete_icon.png')}
                      statusOffImg={require('~/Common/Image/user_as_step_icon/Default/as_complete_icon.png')}
                    />
                  </View>
                </View>
              </View>
              
              <View style={localStyles.guideWrap}>
                  <Text style={localStyles.guideTitleTxt}>쿨리닉</Text>
                  <Text style={localStyles.guideTitleTxt}>사용자 가이드</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
                  <Text>aaaaaaaaaaaaaaa</Text>
              </View>
          </ScrollView>

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

const afterServiceBtnSize = wp(33, 30);
const stateImgSize = wp(15, 52);

const localStyles = StyleSheet.create({
  topBoxSwiperWrap: {
      height: 290,
  },
  swiperDot: {
      width: 12,
      height: 12,
      borderRadius: 5,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
  },
  topBoxWrap: {
      width: "100%",
      paddingLeft: 27,
      paddingRight: 27,
      paddingTop: 27,
      paddingBottom: 27
  },
  topBoxNameTxt: {
      marginBottom: 16,
      color : color.whiteColor,
      fontSize: 28,
      fontWeight: "bold"
  },
  topBoxtAddrTxt: {
      color : color.whiteColor,
      fontSize: 14        
  },
  bottomBoxWrap: {
      flexDirection: "row",
      marginTop: 10
  },
  bottomBoxLeftWrap: {
      
  },
  bottomBoxRightWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end"
  },
  rightStateCircle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100, 
      height: 110, 
      width: 110, 
      backgroundColor : color.whiteColor,
  },
  rightStateTxt: {
      color : color.defaultColor,
      fontSize: 15,
      fontWeight: "bold"
  },
  leftImg: {
      height : 110,
      width : 110
  },
  percentTxt: {
      fontSize: 40,
      fontWeight: "bold",
      color: color.whiteColor
  },
  noRegWrap: {
      marginTop: 0,
      marginBottom: 0
  },
  noRegTxt: {
      fontSize: 13
  },
  dotsStyle: {
      borderRadius: 12,
      height: 12,
      width: 12,
      marginHorizontal: 5,
      flexDirection: 'row',
      backgroundColor: "#000",

  },
  prdNameTxt: {
      marginBottom: 10,
      fontSize: 13, 
      color: color.whiteColor,
      textAlign: "center",
      fontWeight: "bold"
  },
  secondBox : {
      marginBottom : 24,
      marginLeft : 24, 
      marginRight : 24, 
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
  guideWrap: {
      padding: 22,
      backgroundColor : color.whiteColor
  },
  guideTitleTxt: {
      fontSize: 22,
      color: "#0397db",
      fontWeight: "bold",
  },
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