import React, { Component } from 'react';
import { Alert, BackHandler, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE, ARRIVE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceStateCard from '~/Main/Components/AfterServiceStateCard';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import Swiper from 'react-native-animated-swiper';

let AS_PRGS_ID = null; // 
let AS_RECV_ID = null; // 

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            afterServiceData : null,
            reportCount : 0,
            latitude : null,
            longitude : null,
        };
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
            <View style={{ flex : 1, flexDirection: 'column'}}>
                <CustomHeader
                    title='메인'
                    backBtn={ false }
                    menuBtn={ true }
                />
                <View style={{ flex : 1, backgroundColor : 'powderblue'}}>
                    <Swiper
                        dots
                        dotsColor="rgba(97, 218, 251, 0.25)"
                        dotsColorActive="rgba(97, 218, 251, 1)"
                        style={styles.slides}>
                    
                        {this.state.data.map((AS, idx) =>
                            <View style={{alignItems: 'center'}} key={ idx }>
                                <Text>{AS.bplaceNm}</Text>
                                <Text>{AS.bplaceAddr}</Text>
                                <Text>{AS.prdTypeKoNm}</Text>
                                <TouchableOpacity
                                    onPress={ this._selectAfterServiceConfirm(idx) }
                                >
                                    <View style={styles.slide}>
                                        <Text style={styles.title}>A/S 접수</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Swiper>
                </View>
                <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
                    <Text>컨텐츠2</Text>
                    
                    {/* <CustomButton 
                        onPress={ () => this._moveAfterServiceBackground() }
                    >
                        <Text>TEST 출발</Text>
                    </CustomButton>
                    <CustomButton 
                        onPress={ () => this._departureAfterServiceBackgroundStop() }
                    >
                        <Text>TEST 도착</Text>
                    </CustomButton> */}
                </View>

                {/* A/S 접수 박스 */}
                {(this.state.afterServiceData !== null) ? (
                    <AfterServiceStateCard
                        data={ this.state.afterServiceData }
                        asPrgsId={ AS_PRGS_ID }
                        getAfterServiceDetail={this._getAfterServiceDetail}
                    />
                ) : (
                    <View></View>
                )}

                {/* 미완성 보고서 박스 */}
                <View style={ styles.reportBox }>
                    <View style={[(this.state.reportCount > 0) ? styles.show : styles.hide, 
                        {padding : 10, backgroundColor: 'steelblue'}]}>
                        <Text>작성되지 않은 보고서가 있어요!</Text>
                        <Text>지금 보고서를 완료하고 정산받으세요!</Text>
                        <CustomButton 
                            info={ true }
                            bordered={ true }
                            onPress={ Actions.PartnerReport }
                        >
                            <Text>{this.state.reportCount}개 지금작성하러 가기</Text>
                        </CustomButton>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slides: { backgroundColor: '#F5FCFF'},
    slide: { 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 100,
        width: 100,
        backgroundColor: 'pink'
      },
    title: { 
        color: 'black', 
        fontSize: 20 
    },
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
    }
});
