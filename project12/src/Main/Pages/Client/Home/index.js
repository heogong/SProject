import React, { Component } from 'react';
import { BackHandler, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Button, H1, H2, Text } from "native-base";

import { SUCCESS_RETURN_CODE, MATCH, DEPARTURE, ARRIVE, ADD_AS, COMPLETE_AS} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setIntervalId, setIsAfterService } from '~/Redux/Actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import GetBizList from '~/Main/Functions/GetBizList';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';


import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


export const ENTRIES1 = [
  {
    bplaceNm: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
    bplaceNm: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    bplaceNm: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  },
  {
    bplaceNm: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
  },
  {
    bplaceNm: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
    bplaceNm: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.imgur.com/lceHsT6l.jpg'
  }
];


let INTEVER_ID = 0;

const AfterServiceState = ({ asPrgsStatCd, status }) => (
  <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
    <Image 
        source={(asPrgsStatCd !== status.VALUE) ? 
          require("~/Common/Image/input-able.png") : require("~/Common/Image/join-end.png")} 
        style={{height : stateImgSize, width : stateImgSize}} 
      />
      <Text 
        style={[(asPrgsStatCd == status.VALUE) ? {color : color.defaultColor} : styles.greyFont
          ,{fontSize : 12}
        ]}>
          {status.TEXT}
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
        }
      },
      asPrgsYn : 'N', // AS 여부
      asPrgsStatCd : null,
      asPrgsStatNm : null,
      asPrgsStatDSC : null,
      slider1ActiveSlide: 0
    };
  }

  // _renderItem = ({item, index}) => {
  //   return (
  //     <View key={index} style={[styles.pd20, {backgroundColor:color.defaultColor}]}>
  //       <View style={styles.mb10}>
  //           <H1 style={[styles.mb10, {color : color.whiteColor}]}>{item.bplaceNm}</H1>
  //           <Text style={styles.whiteFont}>{item.addr.addressName}</Text>
  //           <Text style={styles.whiteFont}>{item.detail.detailAddr1}</Text>
  //       </View>
  
  //       <View style={styles.fxDirRow}>
  
  //           <View style={styles.fx1}>
  //               <Image source={require("~/Common/Image/license-depart01.png")} style={{height : afterServiceBtnSize, width : afterServiceBtnSize}}  />
  //           </View>
  
  //           <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsEnd]}>
  //             <TouchableOpacity
  //                 onPress={() => {
  //                     Actions.AfterServiceProdTypeList({bizId : item.clientBplaceId});
  //                     clearInterval(INTEVER_ID);
  //                   } 
  //                 }
  //             >
  //               <View style={[styles.justiConCenter, styles.alignItemsCenter, {
  //                   borderRadius: 100, 
  //                   height: afterServiceBtnSize, 
  //                   width: afterServiceBtnSize, 
  //                   backgroundColor : color.whiteColor,
  //               }]}>
  //                   <H2 style={{color : color.defaultColor}}>A/S 신청</H2>
  //               </View>
  //               </TouchableOpacity>
  //           </View>
  //       </View>
  //   </View>
  //   );
  // }

  _renderItem = ({item, index}) => {
    return (
      <View key={index} style={[styles.pd20, {backgroundColor:color.defaultColor}]}>
        <View style={styles.mb10}>
            <H1 style={[styles.mb10, {color : color.whiteColor}]}>{item.bplaceNm}</H1>
            <Text style={styles.whiteFont}>{item.bplaceNm}</Text>
            <Text style={styles.whiteFont}>{item.bplaceNm}</Text>
        </View>
  
        <View style={styles.fxDirRow}>
  
            <View style={styles.fx1}>
                <Image source={require("~/Common/Image/license-depart01.png")} style={{height : afterServiceBtnSize, width : afterServiceBtnSize}}  />
            </View>
  
            <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsEnd]}>
              <TouchableOpacity
                  onPress={() => {
                      Actions.AfterServiceProdTypeList({bizId : item.bplaceNm});
                      clearInterval(INTEVER_ID);
                    } 
                  }
              >
                <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                    borderRadius: 100, 
                    height: afterServiceBtnSize, 
                    width: afterServiceBtnSize, 
                    backgroundColor : color.whiteColor,
                }]}>
                    <H2 style={{color : color.defaultColor}}>A/S 신청</H2>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
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
                console.log("클라이언트 : 사업장 목록 가져오기", resultData);
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
              console.log("클라이언트 : AS 진행 상태 체크 : ", resultData);
              
              if(ResultBool) {
                this.setState({ 
                  asPrgsYn : resultData.data.asPrgsYn
                });

                if(resultData.data.asPrgsMst !== null) {
                  this.setState({
                    asPrgsStatCd : resultData.data.asPrgsMst.asPrgsStatCd,
                    asPrgsStatNm : resultData.data.asPrgsMst.asPrgsStatNm,
                    asPrgsStatDSC : resultData.data.asPrgsMst.asPrgsStatDSC,
                    clientPrdInfo : resultData.data.clientPrdInfo
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

  unRegister = () => (
      <View style={[styles.pd20, {backgroundColor : color.defaultColor, elevation: 5}]}>
          <View style={[styles.fx2, styles.mb10]}>
              <H1 style={[styles.mb10, {color : color.whiteColor}]}>제품정보 미등록</H1>
              <Text style={styles.whiteFont}>사업장·제품정보를 등록해놓으면</Text>
              <Text style={styles.whiteFont}>편리하고 정확한 서비스가 제공됩니다</Text>
          </View>

          <View style={[styles.fx3, styles.fxDirRow]}>
              <View style={styles.fx1}>
                  <Button style={[styles.mb5,{
                      height: 48,
                      borderRadius: 0,
                      elevation: 0,
                      width: "80%",
                      backgroundColor: color.defaultColor,
                      borderWidth: 1,
                      borderColor: color.whiteColor,
                      elevation: 0,
                      shadowOpacity: 0,
                  }]}>
                      <Text style={[styles.btnDefaultFillTxt, {
                          fontSize: 12,
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "500"
                      }]}>정보등록하러 이동</Text>
                  </Button>

                  <Text style={styles.greyFont}>·사업장 미등록</Text>
                  <Text style={styles.greyFont}>·보유제품 미등록</Text>
                  <H1>50%</H1>
              </View>
              <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                  <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                      borderRadius: 100, 
                      height: afterServiceBtnSize, 
                      width: afterServiceBtnSize, 
                      backgroundColor : color.whiteColor,
                  }]}>
                      <H2 style={{color : color.defaultColor}}>A/S 신청</H2>
                  </View>
                  
              </View>
          </View>
      </View>
  );

  maching = () => (
      <View style={[styles.pd20, {backgroundColor : color.defaultColor, elevation: 5}]}>
          <View style={[styles.fx2, styles.mb10]}>
              <H1 style={[styles.mb10, {color : color.whiteColor}]}>세나정육점1</H1>
              <Text style={styles.whiteFont}>서울시 동작구 대방동</Text>
              <Text style={styles.whiteFont}>대방동 392-45 넥서스힐</Text>
          </View>

          <View style={[styles.fx3, styles.fxDirRow]}>
              <View style={styles.fx1}>
                  <Text style={[styles.whiteFont, styles.mb10]}>[야채보관냉장고]</Text>
                  <Image source={require("~/Common/Image/license-depart01.png")} style={{height : afterServiceBtnSize, width : afterServiceBtnSize}}  />
              </View>

              <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                  <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                      borderRadius: 100, 
                      height: afterServiceBtnSize, 
                      width: afterServiceBtnSize, 
                      backgroundColor : '#0397BD',
                  }]}>
                      <H2 style={{color : color.whiteColor}}>매칭 중</H2>
                  </View>
                  
              </View>
          </View>
      </View>
  );

  render() {
    return (

        //       { (this.state.asPrgsYn == 'Y') ? (
        //         <View style={{alignItems: 'center'}}>
        //           <Text>{this.state.clientPrdInfo.bplace.bplaceNm}</Text>
        //           <Text>{this.state.clientPrdInfo.bplace.addr.addressName}</Text>
        //           <Text>{this.state.clientPrdInfo.bplace.detail.detailAddr1}</Text>
        //           <View style={styles.slide}>
        //               <Text style={styles.title}>{this.state.asPrgsStatNm}</Text>
        //           </View>
        //         </View>

        //       ):(
        //         <ServiceRequestSwiper
        //           bizList={ this.state.data }
        //           interverId={ INTEVER_ID }
        //         />
        //       ) }

        <Container style={styles.container}>
          <CustomHeader 
            resetPage={true}
            title="쿨리닉"
          />
          <ScrollView>

          { (this.state.asPrgsYn == 'Y') ? (
            this.maching()
          ) :(
            // <Swiper
            //     dots
            //     dotsStyle={localStyles.dotsStyle}
            //     dotsColor="rgba(97, 218, 251, 0.5)"
            //     dotsColorActive="#FFF"
            //     customContainer={localStyles.customSwiperContainer}
            //     customDotsContainerStyle={localStyles.dotsContainerStyle}
            //     customSlideWidth={viewportWidth}
            // >
            //   {this.state.data.map((business, index) => (
            //     <Slide 
            //       key={index}
            //       index={index}
            //       biz={business}
            //     />
            //   ))}
            // </Swiper>
            <View>
              <View style={[styles.fx1, styles.alignItemsStart, styles.justiConCenter]}>
                <Pagination
                    // dotsLength={this.state.data.length}
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={localStyles.paginationContainer}
                    dotColor={color.defaultColor}
                    dotStyle={localStyles.paginationDot}
                    inactiveDotColor={color.defaultColor}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
              </View>

              <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    renderItem={this._renderItem}
                    sliderWidth={viewportWidth}
                    activeSlideAlignment={'start'}
                    itemWidth={viewportWidth}
                    // data={this.state.data}
                    data={ENTRIES1}
                    firstItem={this.state.slider1ActiveSlide}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
              </View>

            </View>
           
          )}
              {/* {this.unRegister()} */}
              
              <View style={{backgroundColor : '#EAEAEA'}}>
                  <View style={localStyles.secondBox}>
                      <Text style={[styles.mb10, {textAlign:'center', color: color.defaultColor}]}>
                        { (this.state.asPrgsYn == 'Y') ? this.state.asPrgsStatNm : "고장난 제품의 A/S 신청을 해 보세요" }
                      </Text>
                      <View style={styles.fxDirRow}>

                        <AfterServiceState
                          asPrgsStatCd={this.state.asPrgsStatCd}
                          status={MATCH}
                        />
                        <AfterServiceState
                          asPrgsStatCd={this.state.asPrgsStatCd}
                          status={DEPARTURE}
                        />
                        <AfterServiceState
                          asPrgsStatCd={this.state.asPrgsStatCd}
                          status={ARRIVE}
                        />
                        <AfterServiceState
                          asPrgsStatCd={this.state.asPrgsStatCd}
                          status={ADD_AS}
                        />
                        <AfterServiceState
                          asPrgsStatCd={this.state.asPrgsStatCd}
                          status={COMPLETE_AS}
                        />
                      </View>
                  </View>
              </View>
              
              <View style={[styles.pd20, {backgroundColor : color.whiteColor}]}>
                  <H1 style={{color : color.defaultColor}}>쿨리닉</H1>
                  <H1 style={{color : color.defaultColor}}>사용자 가이드</H1>
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
      </Container>
    )
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const afterServiceBtnSize = wp(33, 30);
const stateImgSize = wp(10, 52);


const localStyles = StyleSheet.create({
  customSwiperContainer : {
    flex:1,
    backgroundColor : color.defaultColor, 
    elevation: 5
  },
  secondBox : {
      marginBottom : 20,
      marginLeft : 20, 
      marginRight : 20, 
      paddingTop : 15,
      paddingBottom : 15,
      borderBottomLeftRadius : 5, 
      borderBottomRightRadius : 5, 
      backgroundColor : color.whiteColor,
      elevation: 10
  },
  paginationContainer: {
    paddingVertical: 0
  },
  paginationDot: {
      borderRadius: 4,
      marginHorizontal: 0,
      height: 10,
      width: 10
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

ClientHome = connect(mapStateToProps, mapDispatchToProps)(ClientHome);
export default ClientHome;