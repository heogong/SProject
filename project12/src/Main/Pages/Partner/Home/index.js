import React, { Component } from 'react';
import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Container, H1, Text, Header, Left, Body, Right}  from "native-base";

import { SUCCESS_RETURN_CODE, APPLY, UN_APPROVED, APPROVED } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';

import GetPartnerInfo from '~/Main/Functions/GetPartnerInfo';
import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import GetAfterServiceIncompleteCnt from '~/Main/Functions/GetAfterServiceIncompleteCnt';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceStateCard from '~/Main/Components/AfterServiceStateCard';

import CustomButton from '~/Common/Components/CustomButton';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

let AS_PRGS_ID = null; // 
let AS_RECV_ID = null; // 
let CLIENT_PHONE_NUM = null; // 클라이언트 전화번호

// 가입신청승인대기
const PartnerWait = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>파트너</Text>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>가입신청승인</Text>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>대기중입니다</Text>
        </View>
    </View>
)

// A/S 요청 없음
const NoAfterService = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>현재</Text>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>A/S매칭</Text>
            <Text style={[stylesReg.leftGuideTxt, {color : color.whiteColor}]}>요청이 없습니다</Text>
        </View>
    </View>
)

// A/S 요청
const MatchingReq = ({toggleModal, data}) => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 16, paddingBottom: 15}}>
        <View style={{backgroundColor: color.whiteColor, height: 128, width: "100%"}}>
            <View style={styles.modalContent}>
                <View style={{justifyContent: "center"}}>
                    <Text style={[styles.modalTopTxt, {fontWeight: "bold", color: "#038dbd", fontSize: 15}]} numberOfLines={1}>
                        {
                            data.bplaceAddr == "" && data.bplaceAddr == null 
                            ? data.bplaceAddrRoad
                            : data.bplaceAddr
                        }
                    </Text>
                    <Text style={styles.modalTopTxt}>에서 A/S 요청이 있습니다.</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <CustomEtcButton 
                        onPress={() => { 
                            AS_PRGS_ID = data.asPrgsId, 
                            AS_RECV_ID = data.asRecvId
                            toggleModal()
                        }}
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
        <View style={{flex: 1, marginTop: 15}}>
            <View style={[styles.alignItemsCenter, styles.justiConEnd]}>
                <Badge info style={{
                    position : 'absolute', 
                    right : 18, 
                    top : -12, 
                    zIndex : 1, 
                    backgroundColor: color.warningColor,
                    elevation : 10
                }}>
                    <Text>{count}</Text>
                </Badge>
                <Image 
                    source={require("~/Common/Image/Report_illust.png")} 
                    resizeMode="contain" 
                    style={[{height : 79, width : 56}]}
                />
            </View>
        </View>

        <View style={[styles.alignItemsCenter, styles.fx2]}>
            <Text style={localStyles.reportTitleTxt} numberOfLines={1}>A/S 출장시 보고서 작성이 필요해요</Text>
            <Text style={localStyles.reportTxt} numberOfLines={1}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
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
                    source={require("~/Common/Image/Report_illust.png")} 
                    resizeMode="contain" 
                    style={[{height : 79, width : 56}]}
                />
            </View>
        </View>

        <View style={[styles.alignItemsCenter, styles.fx2, {height: 120}]}>
            <Text style={localStyles.reportTitleTxt} numberOfLines={1}>A/S 출장시 보고서 작성이 필요해요</Text>
            <Text style={localStyles.reportTxt} numberOfLines={1}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
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
        guideTxt3 : '진행가이드',
        link : 'PartnerGuide1'
    },
    {
        title: 'STEP.2',
        guide: true,
        guideTxt1 : 'A/S업체',
        guideTxt2 : '상세정보',
        guideTxt3 : '보는방법',
        link : 'PartnerGuide2'
    },
    {
        title: 'STEP.3',
        guide: true,
        guideTxt1 : 'A/S정산',
        guideTxt2 : '보고서',
        guideTxt3 : '작성방법',
        link : 'PartnerGuide3'
    }
];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : {
                asPrgsMst : []
            },
            displayData : [],
            afterServiceData : [],
            reportCount : 0,
            isModalVisible: false,
            isModalVisible1: false,
            slider1ActiveSlide: 0,
            wait : true, // test 
            isASreq : true, // test
            isAlertModal : false, // alert 용
            spinner : false
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });

    // 대기 중일 경우 가이드만 표시
    _renderItem ({item, index}) {
        return (
            <TouchableOpacity 
                key={index}
                onPress={() => Actions[item.link].call()}>
                <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 24, color: "#038dbd", fontWeight: "bold"}}>{item.title}</Text>
                    </View>
                    <View style={[styles.fx1, styles.justiConCenter]}>
                        <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt1}</Text>
                        <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt2}</Text>
                        <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt3}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
      }
    
      // 승인 후 AS 및 가이드 
      _renderItem2 = ({item, index}) => {
        return (
            (item.guide) ? (
                <TouchableOpacity 
                    key={index}
                    onPress={() => Actions[item.link].call()}>
                    <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                        <View style={{marginTop: 10}}>
                            <Text style={{fontSize: 24, color: "#038dbd", fontWeight: "bold"}}>{item.title}</Text>
                        </View>
                        <View style={[styles.fx1, styles.justiConCenter]}>
                            <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt1} 승인후</Text>
                            <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt2}</Text>
                            <Text style={localStyles.guideBoxTxt} numberOfLines={1}>{item.guideTxt3}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    key={index}
                    onPress={ this._selectAfterService(index) }>
                    <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                        <View style={{marginTop: 5, marginBottom: 5}}>
                            <Text style={{fontSize: 16, color: "#038dbd", fontWeight: "bold"}} numberOfLines={1}>
                                {
                                    item.bplaceAddr == "" && item.bplaceAddr == null 
                                    ? item.bplaceAddrRoad
                                    : item.bplaceAddr
                                }    
                            </Text>
                        </View>
                        <View style={[styles.fx4, styles.justiConCenter]}>
                            <Image 
                                source={{uri : item.prdTypeImgUrl}} 
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
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener

        BackgroundGeolocation.events.forEach(event =>
            BackgroundGeolocation.removeAllListeners(event)
        );
    }

    componentDidMount () {
        this.setState({spinner : true});
        
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed

        this._getPartnerInfo(); 
        this._getAfterServiceState();
        this._getAfterServiceIncompleteCnt();
    }

    handleBackPress = () => {
        return false;
    }

    // 1. 업체 정보를 조회(승인여부)
    _getPartnerInfo = () => {
        GetPartnerInfo().then(async result => {
            GetCommonData(result, this._getPartnerInfo).then(async resultData => {
                if(resultData !== undefined) {
                    console.log('_getPartnerInfo - ', resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                    if(ResultBool) {
                        // 가입 코드 필요
                        //this.setState({wait : false}); // test 승인
                        // if(resultData.data.partnerStatusCd !== APPROVED) {
                        //     this.setState({wait : true}); // 접수, 미승인
                        // } else {
                        //     this.setState({wait : false}); // 승인
                        // }
                        this.setState({wait : false}); // 승인
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
    
    // 2. 현재 나의(파트너) AS 진행 상태 체크
    _getAfterServiceState = () => {
        GetAfterServiceState().then(result => {
            GetCommonData(result, this._getAfterServiceState).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("현재 나의(파트너) AS 진행 상태 체크 : ", resultData);
                    if(ResultBool) {
                        // A/S 상태일 경우
                        if(resultData.data.asPrgsMst !== null) { 
                            AS_RECV_ID = resultData.data.asPrgsMst.asRecvId;
                            AS_PRGS_ID = resultData.data.asPrgsMst.asPrgsId;
                            CLIENT_PHONE_NUM = resultData.data.asPrgsMst.clientPhoneNum; 
                            
                            this._getAfterServiceDetail();
                            
                        // A/S 상태가 아닐경우 A/S 목록 조회
                        } else { 
                            this._getAfterService();
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

    // 3. 나의 AS 매칭 목록 조회
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
                    this.setState({spinner : false});
                    this._disPlayAfterService();
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
                    this.setState({spinner : false});
                }
            });
        });
    }


    // 업체 AS 매칭(진행) 수락
    _regAfterServiceMatch = () => {
        
        this.setState({ 
            spinner : true,
            isModalVisible : false,
            data : [],
            displayData : []
        });

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

                        this._getAfterService(); // 
                    }
                }
            });
        });
    }

    // 가이드 데이터 추가 : AS 호출 함수 interval로 인해 AS 표시 리스트는 가변적이지 않게 하기 위해 따로 함수로 지정
    _disPlayAfterService = () => {
        this.setState({displayData : this.state.data.concat(ENTRIES1)});
        console.log("data : ", this.state.data);
    }


    // 미작성 보고서 카운트 조회 : 미완성 보고서 박스 보임 여부
    _getAfterServiceIncompleteCnt = () => {
        GetAfterServiceIncompleteCnt().then(result => {
            GetCommonData(result, this._getAfterServiceIncompleteCnt).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("파트너 미작성 보고서 운트 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({ 
                            reportCount : resultData.data
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
            <Container style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'A/S 데이터를 불러오고 있습니다.'}
                    textStyle={styles.whiteFont}
                    style={{color: color.whiteColor}}
                    overlayColor={"rgba(40, 200, 245, 1)"}
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
                    {/* TEST - 가입대기 여부   */}
                    {(this.state.wait) ? (
                        <PartnerWait/>
                    ) : (
                        // AS 요청 여부
                        this.state.data.length > 0 ? (
                            <MatchingReq toggleModal={this._toggleModal} data={this.state.data[0]} /> 
                        ) : (
                            (this.state.afterServiceData.length !== 0) ? (
                                <View/>
                            ) : (
                                // A/S 요청 없음
                                <NoAfterService/> 
                            )
                        )
                    )}

                    <View>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            renderItem={ (this.state.wait) ? this._renderItem : this._renderItem2 }
                            sliderWidth={viewportWidth}
                            // activeSlideAlignment={'start'}
                            itemWidth={cardWidth}
                            data={ (this.state.wait) ?  ENTRIES1 : this.state.displayData }
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        />
                    </View>
                    <View style={[styles.alignItemsCenter, styles.justiConStart]}>
                        <Pagination
                            dotsLength={ (this.state.wait) ?  ENTRIES1.length : this.state.displayData.length }
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
                    {(this.state.afterServiceData.length !== 0) ? (
                        <AfterServiceStateCard
                            data={ this.state.afterServiceData }
                            asPrgsId={ AS_PRGS_ID }
                            clientPhoneNum={CLIENT_PHONE_NUM}
                            getAfterServiceDetail={this._getAfterServiceDetail}
                        />
                    ) : (
                        <View/>
                    )}
                        {/* 테스트
                        <AfterServiceStateCard
                            data={ this.state.afterServiceData }
                            asPrgsId={ AS_PRGS_ID }
                            getAfterServiceDetail={this._getAfterServiceDetail}
                        /> */}

                    <View style={{backgroundColor : color.whiteColor}}>
                        <View style={[styles.alignItemsCenter, {backgroundColor : color.whiteColor, paddingVertical : 10}]}>
                            <Text style={[{color: "#038dbd", fontSize : 14}]}>서울시 천호동에서 A/S 매칭이 완료되었습니다</Text>
                        </View>

                        {/* 미작성 보고서 여부 */}
                        {(this.state.reportCount > 0) ? (
                            <RequestReport action={ Actions.ListInCompleteReport } count={this.state.reportCount}/>
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
                    btnText1="취소"
                    btnText2="수락완료"
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
        marginHorizontal: 0,
        width: 12,
        height: 12,
        borderRadius: 5,
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
        marginTop: 7,
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
