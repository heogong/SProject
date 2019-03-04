import React, { Component } from 'react';
import { Alert, Animated, BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Container, H1, Button,  Text}  from "native-base";

import { SUCCESS_RETURN_CODE, ARRIVE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Modal from "react-native-modal";
import Swiper from 'react-native-animated-swiper';

import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceStateCard from '~/Main/Components/AfterServiceStateCard';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

let AS_PRGS_ID = null; // 
let AS_RECV_ID = null; // 



const PartnerWait = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>파트너</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>가입신청승인</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>대기중입니다</Text>
        </View>
    </View>
)

const PartnerNoWait = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
        <View>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>현재</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>A/S매칭</Text>
            <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>요청이 없습니다</Text>
        </View>
    </View>
)

const Matching = () => (
    <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 16, paddingBottom: 15}}>
        <View style={{backgroundColor: color.whiteColor, height: 104, widht: "100%"}}>
            <View style={styles.modalContent}>
                <View style={styles.modalTopTxtWrap}>
                    <Text style={styles.modalTopTxt}>시흥시 정왕동에서 A/S 요청이 있습니다</Text>
                </View>
                <View style={styles.modalBtnWrap}>
                    <CustomButton 
                        onPress={this._toggleModal}
                        edgeFill={true}
                        fillTxt={true}
                    >
                        매칭수락
                    </CustomButton>
                </View>
            </View>
        </View>
    </View>
)


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            afterServiceData : null,
            reportCount : 0,
            latitude : null,
            longitude : null,

            isModalVisible: false,
            isModalVisible1: false,
            wait : true
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });

    componentWillUnmount () {
        console.log("componentWillUnmount");
        
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener

        // BackgroundGeolocation.events.forEach(event =>
        //     BackgroundGeolocation.removeAllListeners(event)
        // );
    }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed
        this._getAfterService();
        this._getAfterServiceState();
        this._getAfterServiceIncomplete();
    }

    handleBackPress = () => {
        return false;
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
                        alert(resultData.resultMsg);
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
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 2. 업체 AS 매칭(진행) 수락
    _regAfterServiceMatch = () => {

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
                        alert(resultData.resultMsg);
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
                        alert(resultData.resultMsg);
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
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 선택
    _selectAfterServiceConfirm = (idx) => () => {
        // SELECT_INDEX = idx;
        const { data } = this.state;

        AS_PRGS_ID = data[idx].asPrgsId;
        AS_RECV_ID = data[idx].asRecvId;

        Alert.alert(
            '',
            'A/S 매칭을 수락하시겠습니까?// 수락 후 1시간 30분 내에 도착하셔야 합니다.',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._regAfterServiceMatch()},
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            // <View style={{ flex : 1, flexDirection: 'column'}}>
            //     <CustomHeader
            //         title='메인'
            //         backBtn={ false }
            //         menuBtn={ true }
            //     />
            //     <View style={{ flex : 1, backgroundColor : 'powderblue'}}>
            //         <Swiper
            //             dots
            //             dotsColor="rgba(97, 218, 251, 0.25)"
            //             dotsColorActive="rgba(97, 218, 251, 1)"
            //             style={styles.slides}>
                    
            //             {this.state.data.map((AS, idx) =>
            //                 <View style={{alignItems: 'center'}} key={ idx }>
            //                     <Text>{AS.bplaceNm}</Text>
            //                     <Text>{AS.bplaceAddr}</Text>
            //                     <Text>{AS.prdTypeKoNm}</Text>
            //                     <TouchableOpacity
            //                         onPress={ this._selectAfterServiceConfirm(idx) }
            //                     >
            //                         <View style={styles.slide}>
            //                             <Text style={styles.title}>A/S 접수</Text>
            //                         </View>
            //                     </TouchableOpacity>
            //                 </View>
            //             )}
            //         </Swiper>
            //     </View>
            //     <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
            //         <Text>컨텐츠2</Text>
            //     </View>

            //     {/* A/S 접수 박스 */}
            //     {(this.state.afterServiceData !== null) ? (
            //         <AfterServiceStateCard
            //             data={ this.state.afterServiceData }
            //             asPrgsId={ AS_PRGS_ID }
            //             getAfterServiceDetail={this._getAfterServiceDetail}
            //         />
            //     ) : (
            //         <View></View>
            //     )}

            //     {/* 미완성 보고서 박스 */}
            //     <View style={ styles.reportBox }>
            //         <View style={[(this.state.reportCount > 0) ? styles.show : styles.hide, 
            //             {padding : 10, backgroundColor: 'steelblue'}]}>
            //             <Text>작성되지 않은 보고서가 있어요!</Text>
            //             <Text>지금 보고서를 완료하고 정산받으세요!</Text>
            //             <CustomButton 
            //                 info={ true }
            //                 bordered={ true }
            //                 onPress={ Actions.PartnerReport }
            //             >
            //                 <Text>{this.state.reportCount}개 지금작성하러 가기</Text>
            //             </CustomButton>
            //         </View>
            //     </View>
            // </View>

            <Container style={{flex: 1, backgroundColor: color.defaultColor}}>
                <CustomHeader resetPage={true} title="쿨리닉"/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {(this.state.wait) ? (
                        <PartnerWait/>
                    ) : (
                        <PartnerNoWait/>
                    )}

                    {/* <Matching/> */}

                    {/* <View>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            renderItem={ (this.state.wait) ? this._renderItem : this._renderItem2 }
                            sliderWidth={viewportWidth}
                            // activeSlideAlignment={'start'}
                            itemWidth={cardWidth}
                            data={this.state.data}
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                        />
                    </View>
                    <View style={[styles.alignItemsCenter, styles.justiConStart]}>
                        <Pagination
                            dotsLength={this.state.data.length}
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
                    </View>  */}

                    <View style={localStyles.topAsYesWrap}>
                        <View style={[styles.justiConStart, styles.alignItemsCenter, styles.mb10]}>
                            <H1 style={localStyles.topTitleTxt}>세나정육점으로 A/S 출발중입니다</H1>
                            <Text style={localStyles.topTxt}>경기도 시흥시  정왕동 산기대학로 237</Text>
                            <Text style={localStyles.topTxt}>한국산업기술대학교 TIP 307호</Text>
                        </View>
                        <View style={[styles.justiConStart, styles.alignItemsCenter]}>
                            <View 
                                style={[
                                    styles.mb10,
                                    styles.alignItemsCenter,
                                    styles.justiConCenter]}>
                                <Image source={require("~/Common/Image/license-depart01.png")} 
                                    style={[styles.mb10, {
                                    height : 100, 
                                    width : 100
                                    }]}/>
                                <Text style={localStyles.topTxt}>업소용 냉장고</Text>
                                <Text style={localStyles.topTxt2}>증상1. 냉동온도가 올라가지 않음</Text>
                            </View>
                        </View>
                        <View style={styles.fxDirRow}>
                            <View style={{marginRight: 9}}>
                                <CustomButton 
                                    onPress={this._toggleModal1}
                                    edgeFill={true}
                                    fillTxt={true}
                                >
                                    매칭취소
                                </CustomButton>
                            </View>
                            <View style={{marginLeft: 9}}>
                                <Button style={styles.modalBtnFill} onPress={this._toggleModal1}>
                                    <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
                                </Button>
                            </View>
                        </View>
                    </View>

                    <View style={{backgroundColor : color.whiteColor}}>
                        <View style={[styles.alignItemsCenter, {backgroundColor : color.whiteColor, paddingVertical : 10}]}>
                            <Text style={[{color: "#038dbd", fontSize : 14}]}>서울시 천호동에서 A/S 매칭이 완료되었습니다</Text>
                        </View>

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
                                        <Text>2</Text>
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
                                    <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 36, width: "70%"}]}>
                                        <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 14}]}>지금 작성하러가기</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        
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

                <Modal isVisible={this.state.isModalVisible}>
                    <View style={[styles.modalWrap, {height: 128}]}>
                        <View style={styles.modalContent}>
                            <View style={[styles.modalTop2LTxtWrap]}>
                                <Text style={styles.modalTopTxt}>A/S 매칭을 수락하시겠습니까?</Text>
                                <Text style={styles.modalTopTxt}>수락 후 1시간 30분 내에 도착하셔야 합니다</Text>
                            </View>
                            <View style={styles.modalBtnTwinWrap}>
                                <View style={{marginRight: 9}}>
                                    <Button style={styles.modalBtnNoFill} onPress={this._toggleModal}>
                                        <Text style={styles.modalBtnNoFillTxt}>매칭취소</Text>
                                    </Button>
                                </View>
                                <View style={{marginLeft: 9}}>
                                    <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                                        <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={this.state.isModalVisible1}>
                    <View style={styles.modalWrap}>
                        <View style={styles.modalContent}>
                        <View style={styles.modalTopTxtWrap}>
                            <Text style={styles.modalTopTxt}>A/S 진행 또는 업체와 전화연결을 선택하세요</Text>
                        </View>
                        <View style={[styles.modalBtnTwinWrap, styles.fx1]}>
                                <View style={{marginRight: 9}}>
                                    <Button style={styles.modalBtnNoFill} onPress={this._toggleModal1}>
                                        <Text style={styles.modalBtnNoFillTxt}>A/S 진행</Text>
                                    </Button>
                                </View>
                                <View style={{marginLeft: 9}}>
                                    <Button style={styles.modalBtnFill} onPress={this._toggleModal1}>
                                        <Text style={styles.modalBtnFillTxt}>전화연결</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    topAsYesWrap: {
        borderBottomColor: color.defaultColor,
        borderBottomWidth: 10,
        backgroundColor: color.whiteColor,
        height: 358,
        paddingLeft: 27,
        paddingRight: 27,
        paddingTop: 23,
        flex: 1,
        alignItems: "center"
    },
    topTitleTxt: {
        marginBottom: 19,
        fontSize: 18,
        color: color.defaultColor,
        fontWeight: "bold",
        marginBottom: 16,
      },
      topTxt: {
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
