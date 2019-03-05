import React, { Component } from 'react';
import { Alert, Animated, BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Container, H1, Button,  Text}  from "native-base";

import { SUCCESS_RETURN_CODE, ARRIVE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceStateCard from '~/Main/Components/AfterServiceStateCard';

import CustomButton from '~/Common/Components/CustomButton';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomModal from '~/Common/Components/CustomModal';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

let AS_PRGS_ID = null; // 
let AS_RECV_ID = null; // 


// 가입신청승인대기
const PartnerWait = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>파트너</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>가입신청승인</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>대기중입니다</Text>
        </View>
    </View>
)

// A/S 요청 없음
const PartnerNoWait = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>현재</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>A/S매칭</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>요청이 없습니다</Text>
        </View>
    </View>
)

// A/S 요청
const MatchingReq = ({toggleModal}) => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 16, paddingBottom: 15}}>
        <View style={{backgroundColor: color.whiteColor, height: 104, widht: "100%"}}>
            <View style={styles.modalContent}>
                <View style={styles.modalTopTxtWrap}>
                    <Text style={styles.modalTopTxt}>시흥시 정왕동에서 A/S 요청이 있습니다</Text>
                </View>
                <View style={styles.modalBtnWrap}>
                    <CustomEtcButton 
                        onPress={toggleModal}
                    >
                        매칭수락
                    </CustomEtcButton>
                </View>
            </View>
        </View>
    </View>
)

// A/S 보고서
const RequestReport = ({action, count}) => (
    <View style={[styles.mb10, styles.pd10, styles.fxDirRow, {backgroundColor : color.defaultColor}]}>
        <View style={{flex: 1, marginTop: 25}}>
            <View style={[styles.alignItemsCenter, styles.justiConEnd]}>
                <Badge info style={{
                    position : 'absolute', 
                    right : 12, 
                    top : -12, 
                    zIndex : 1, 
                    color : color.defaultColor, 
                    elevation : 10
                }}>
                    <Text>{count}</Text>
                </Badge>
                <Image 
                    source={require("~/Common/Image/license-bg02.png")} 
                    resizeMode="contain" 
                    style={[{height : 79, width : 56}]}
                />
            </View>
        </View>

        <View style={[styles.alignItemsCenter, styles.fx2, {height: 120}]}>
            <Text style={localStyles.reportTitleTxt}>A/S 출장시 보고서 작성이 필요해요</Text>
            <Text style={localStyles.reportTxt}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
            <View style={styles.alignItemsCenter}>
                <CustomButton
                    onPress={action}
                    WhiteLineBtn={true}
                    CustomBtnStyle={{height: 36, width: "70%"}}
                    CustomFontStyle={{fontSize: 14}}
                >
                    지금 작성하러가기
                </CustomButton>
            </View>
        </View>
    </View>
)

// A/S 보고서 가이드
const GuideReport = () => (
    <View style={[styles.mb10, styles.pd10, styles.fxDirRow, {backgroundColor : color.defaultColor}]}>
        <View style={{flex: 1, marginTop: 25}}>
            <View style={[styles.alignItemsCenter, styles.justiConEnd]}>
                <Image 
                    source={require("~/Common/Image/license-bg02.png")} 
                    resizeMode="contain" 
                    style={[{height : 79, width : 56}]}
                />
            </View>
        </View>

        <View style={[styles.alignItemsCenter, styles.fx2, {height: 120}]}>
            <Text style={localStyles.reportTitleTxt}>A/S 출장시 보고서 작성이 필요해요</Text>
            <Text style={localStyles.reportTxt}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
            <View style={styles.alignItemsCenter}>
                <CustomButton
                    WhiteLineBtn={true}
                    CustomBtnStyle={{height: 36, width: "70%"}}
                    CustomFontStyle={{fontSize: 14}}
                >
                    보고서 작성가이드
                </CustomButton>
            </View>
        </View>
    </View>
)

export const ENTRIES1 = [
    {
        title: 'STEP.1',
        guide: true, 
        guideTxt1 : 'A/S 출발에서',
        guideTxt2 : 'A/S 완료까지',
        guideTxt3 : '진행가이드'
    },
    {
        title: 'STEP.2',
        guide: true,
        guideTxt1 : 'A/S 출발에서',
        guideTxt2 : 'A/S 완료까지',
        guideTxt3 : '진행가이드'
    },
    {
        title: 'STEP.3',
        guide: true,
        guideTxt1 : 'A/S 출발에서',
        guideTxt2 : 'A/S 완료까지',
        guideTxt3 : '진행가이드'
    }
];

const SLIDER_1_FIRST_ITEM = 0;
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    prdTypeKoNm: 'product ',
                    bplaceAddr : '시흥시 정왕동',
                    asPrgsId : 10,
                    asRecvId : 20
                }
            ],
            afterServiceData : [],
            reportCount : 0,
            latitude : null,
            longitude : null,

            isModalVisible: false,
            isModalVisible1: false,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            wait : false, // test 
            isASreq : true, // test
            isAlertModal : false // alert 용
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });

    // 대기 중일 경우 가이드만 표시
    _renderItem ({item, index}) {
        return (
            <TouchableOpacity onPress={ () => alert("dddd")}>
                <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                    <View style={{marginTop: 30}}>
                        <Text style={{fontSize: 24, color: "#038dbd", fontWeight: "bold"}}>{item.title}</Text>
                    </View>
                    <View style={[styles.fx1, styles.justiConCenter]}>
                        <Text style={localStyles.guideBoxTxt}>{item.guideTxt1}</Text>
                        <Text style={localStyles.guideBoxTxt}>{item.guideTxt2}</Text>
                        <Text style={localStyles.guideBoxTxt}>{item.guideTxt3}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
      }
    
      // 승인 후 AS 및 가이드 
      _renderItem2 = ({item, index}) => {
        return (
            (item.guide) ? (
                <TouchableOpacity onPress={ () => alert("dddd")}>
                    <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                        <View style={{marginTop: 30}}>
                            <Text style={{fontSize: 24, color: "#038dbd", fontWeight: "bold"}}>{item.title}</Text>
                        </View>
                        <View style={[styles.fx1, styles.justiConCenter]}>
                            <Text style={localStyles.guideBoxTxt}>A/S 출발에서</Text>
                            <Text style={localStyles.guideBoxTxt}>A/S 완료까지</Text>
                            <Text style={localStyles.guideBoxTxt}>진행가이드</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={ this._selectAfterService(index) }>
                    <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 16, color: "#038dbd", fontWeight: "bold"}}>{item.bplaceAddr}</Text>
                        </View>
                        <View style={[styles.fx4, styles.justiConCenter]}>
                            <Image 
                                source={require("~/Common/Image/license-depart02.png")} 
                                resizeMode="contain" 
                                style={{height : 80, width : 80}} />
                        </View>
                        <View style={[styles.fx1, styles.justiConCenter]}>
                            <Text style={styles.greyFont}>{item.prdTypeKoNm}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        );
      }

    componentWillUnmount () {
        console.log("componentWillUnmount");
        
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener

        // BackgroundGeolocation.events.forEach(event =>
        //     BackgroundGeolocation.removeAllListeners(event)
        // );

    }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed

        this._getUserInfo(); //사용자 정보 조회 - 가입 승인 대기 여부 확인
        // this._getAfterService();
        // this._getAfterServiceState();
        // this._getAfterServiceIncomplete();

        // 가이드값 추가 TEST
        this.setState({data : this.state.data.concat(ENTRIES1) });
    }

    handleBackPress = () => {
        return false;
    }

    // 로그인(토큰값 가져온) 사용자 정보 가져오기
    _getUserInfo = () => {
        GetUserInfo().then(async result => {
            GetCommonData(result, this._getUserInfo).then(async resultData => {
                if(resultData !== undefined) {
                    console.log(resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                    if(ResultBool) {
                        // 가입 코드 필요
                        this.setState({wait : true}); // test 승인
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
    
    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
        (positon) => {
            this.setState({
                latitude : positon.coords.latitude,
                longitude : positon.coords.longitude
            })
        },
        // (error) => {console.log(error.message)},
        // {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
        );
    }

    // 1. 현재 나의(파트너) AS 진행 상태 체크
    _getAfterServiceState = () => {
        GetAfterServiceState().then(result => {
            GetCommonData(result, this._getAfterServiceState).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("현재 나의(파트너) AS 진행 상태 체크 : ", resultData);
                    if(ResultBool) {
                        if(resultData.data.asPrgsMst !== null) {
                            AS_RECV_ID = resultData.data.asPrgsMst.asRecvId;
                            AS_PRGS_ID = resultData.data.asPrgsMst.asPrgsId;

                            // A/S 도착 
                            if(resultData.data.asPrgsMst.asPrgsStatCd == ARRIVE.VALUE) {
                                this.setState({asStateBtn : false});
                            }

                            this._getAfterServiceDetail();
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

    // 1. 나의 AS 매칭 목록 조회
    _getAfterService = () => {
        GetAfterService().then(result => {
            GetCommonData(result, this._getAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("나의 AS 매칭 목록 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({ data: resultData.data });
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

    // 2. 업체 AS 매칭(진행) 수락
    _regAfterServiceMatch = () => {
        this.setState({ isModalVisible : false });

        RegAfterServiceMatch(AS_PRGS_ID).then(result => {
            GetCommonData(result, this._regAfterServiceMatch).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //Actions.ViewAfterServiceMatch({asRecvId : data[SELECT_INDEX].asRecvId});
                        // this._departureAfterServiceConfirm();
                        this._getAfterServiceDetail();

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

    // 3. AS 접수 상세 내용 조회
    _getAfterServiceDetail = () => {
        GetAfterServiceDetail(AS_RECV_ID).then(result => {
            GetCommonData(result, this._getAfterServiceDetail).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 접수 상세 내용 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({ 
                            afterServiceData: resultData.data
                        });

                        AS_PRGS_ID = resultData.data.asPrgsId;
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


    // 파트너 미작성 보고서 목록 조회 : 미완성 보고서 박스 보임 여부
    _getAfterServiceIncomplete = () => {
        GetAfterServiceIncomplete().then(result => {
            GetCommonData(result, this._getAfterServiceIncomplete).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("파트너 미작성 보고서 목록 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({ 
                            reportCount : resultData.data.length
                            // reportCount : 3 // test
                        });
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

    _selectAfterService = (idx) => () => {
        const { data } = this.state;

        this.setState({ isModalVisible : true });
        
        AS_PRGS_ID = data[idx].asPrgsId;
        AS_RECV_ID = data[idx].asRecvId;
    }

    render() {
        return (
            <Container style={{flex: 1, backgroundColor: color.defaultColor}}>
                <CustomHeader resetPage={true} title="쿨리닉"/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* TEST - 가입대기 여부   */}
                    {(this.state.wait) ? (
                        <PartnerWait/>
                    ) : (
                        // AS 요청 여부
                        this.state.isASreq ? <MatchingReq toggleModal={this._toggleModal}/> : <PartnerNoWait/>
                    )}

                    <View>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            renderItem={ (this.state.wait) ? this._renderItem : this._renderItem2 }
                            sliderWidth={viewportWidth}
                            // activeSlideAlignment={'start'}
                            itemWidth={cardWidth}
                            data={ (this.state.wait) ?  ENTRIES1 : this.state.data }
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        />
                    </View>
                    <View style={[styles.alignItemsCenter, styles.justiConStart]}>
                        <Pagination
                            dotsLength={ (this.state.wait) ?  ENTRIES1.length : this.state.data.length }
                            activeDotIndex={this.state.slider1ActiveSlide}
                            containerStyle={localStyles.paginationContainer}
                            dotColor={color.whiteColor}
                            dotStyle={localStyles.paginationDot}
                            inactiveDotColor={color.whiteColor}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                        />
                    </View> 

                    {/* A/S 접수 박스 */}
                    {/* {(this.state.afterServiceData !== null) ? (
                        <AfterServiceStateCard
                            data={ this.state.afterServiceData }
                            asPrgsId={ AS_PRGS_ID }
                            getAfterServiceDetail={this._getAfterServiceDetail}
                        />
                    ) : (
                        <View></View>
                    )} */}

                        <AfterServiceStateCard
                            data={ this.state.afterServiceData }
                            asPrgsId={ AS_PRGS_ID }
                            getAfterServiceDetail={this._getAfterServiceDetail}
                        />

                    <View style={{backgroundColor : color.whiteColor}}>
                        <View style={[styles.alignItemsCenter, {backgroundColor : color.whiteColor, paddingVertical : 10}]}>
                            <Text style={[{color: "#038dbd", fontSize : 14}]}>서울시 천호동에서 A/S 매칭이 완료되었습니다</Text>
                        </View>

                        {/* 미작성 보고서 여부 */}
                        {(this.state.reportCount > 0) ? (
                            <RequestReport action={ Actions.PartnerReport } count={this.state.reportCount}/>
                        ) : (
                            <GuideReport/>
                        )}
                        
                        
                        <View style={[styles.pd20, {backgroundColor : color.defaultColor}]}>
                            <H1 style={{color : color.whiteColor}}>쿨리닉</H1>
                            <H1 style={{color : color.whiteColor}}>사용자 가이드</H1>
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
                    </View>
                </ScrollView>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={this._toggleModal}
                    onPress2={this._regAfterServiceMatch}
                    infoText1="A/S 매칭을 수락하시겠습니까?"
                    infoText2="수락 후 1시간 30분 내에 도착하셔야 합니다"
                    btnText1="매칭취소"
                    btnText2="A/S 출발"
                />

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

function hp (percentage) {
    const value = (percentage * (viewportHeight)) / 100;
    return Math.round(value);
}
  
const productCardSize = wp(47.5, 52);
  
const cardWidth = wp(40, 0);
const cardHeight = hp(24);
const reportSize = wp(25, 0)

const localStyles = StyleSheet.create({
    paginationContainer: {
        paddingVertical: 14
    },
    paginationDot: {
        borderRadius: 4,
        marginHorizontal: 0,
        height: 10,
        width: 10
    },
    secondBox : {
        marginBottom : 20,
        marginLeft : 20, 
        marginRight : 20, 
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 20,
        borderBottomLeftRadius : 5, 
        borderBottomRightRadius : 5, 
        backgroundColor : color.whiteColor,
        elevation: 10
    },
    guideBoxTxt: {
        fontSize: 16,
        color: "#1e1e32",
        textAlign: "center"
    },
    reportTitleTxt: {
        marginTop: 17,
        marginBottom: 7,
        fontSize: 16,
        color: "#038dbd",
        fontWeight: "bold"
    },
    reportTxt: {
        marginBottom: 13,
        color : color.whiteColor,
        fontSize : 12
    },
    topTxttopTxt: {
        fontSize: 14,
        color: "#8e8e98"
    },
    topTxt2: {
        fontSize: 14,
        color: "#1e1e32",
        marginTop: 10,
        marginBottom: 13
    }
});
