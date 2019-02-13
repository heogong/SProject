import React, { Component } from 'react';
import { Alert, BackHandler, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE, ARRIVE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceStateCard from '~/Main/Components/AfterServiceStateCard';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import Swiper from 'react-native-animated-swiper';

let SELECT_INDEX = null; // 선택된 A/S
let AS_PRGS_ID = null; // 
let AS_RECV_ID = null; // 

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            afterServiceData : null,
            asStateBtn : true, // A/S 도착완료 이후 버튼 변경을 위함
            reportCount : 0,
            latitude : null,
            longitude : null,
        };
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener

        BackgroundGeolocation.events.forEach(event =>
            BackgroundGeolocation.removeAllListeners(event)
        );
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

    // 백그라운드 세팅
    _moveAfterServiceBackground() {
        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 500,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 120000,
            fastestInterval: 120000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
            postTemplate: {
              lat: '@latitude',
              lon: '@longitude',
              foo: 'bar' // you can also add your own properties
            }
        });

        BackgroundGeolocation.on('location', (location) => {
            console.log(location);

            this.setState({
                latitude : location.latitude,
                longitude :location.longitude
            });

            var currentDate = new Date();
            var msg = "현재 시간:"+currentDate.getHours()+"시"
            msg += currentDate.getMinutes()+"분";
            msg += currentDate.getSeconds()+"초";
            console.log(msg);
      
            BackgroundGeolocation.startTask(taskKey => {
                // 백그라운드 좌표 전송 task
                // this._moveAfterService();

                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('activity', (Activity) => {
            console.log('[INFO] BackgroundGeolocation Activity', Activity);
            // this.setState({ isRunning: false });
        });

        BackgroundGeolocation.checkStatus(({ isRunning, locationServicesEnabled, authorization }) => {
            console.log("isRunning : ", isRunning);

            if (!locationServicesEnabled) {
                Alert.alert(
                  'Location services disabled',
                  'Would you like to open location settings?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => BackgroundGeolocation.showLocationSettings()
                    },
                    {
                      text: 'No',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel'
                    }
                  ]
                );
                return false;
            }

            if(!isRunning) {
                console.log("start");
                BackgroundGeolocation.start();
            } 
        });
    }

    // 나의 AS 매칭 목록 조회
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

    // 업체 AS 매칭(진행) 수락
    _regAfterServiceMatch = () => {
        const { data } = this.state;

        RegAfterServiceMatch(data[SELECT_INDEX].asPrgsId).then(result => {
            GetCommonData(result, this._regAfterServiceMatch).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //Actions.ViewAfterServiceMatch({asRecvId : data[SELECT_INDEX].asRecvId});
                        this._departureAfterServiceConfirm();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 출발
    _departureAfterService = () => {
        const {data, latitude, longitude} = this.state;
        
        DepartureAfterService(data[SELECT_INDEX].asPrgsId, latitude, longitude).then(result => {
        // DepartureAfterService(AS_PRGS_ID, latitude, longitude).then(result => {
            
            GetCommonData(result, this._departureAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        AS_RECV_ID = data[SELECT_INDEX].asRecvId;
                        this._getAfterServiceDetail();
                        this._moveAfterServiceBackground();
                        
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

     // 현재 나의(파트너) AS 진행 상태 체크
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

    // AS 접수 상세 내용 조회
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

    _departureAfterServiceBackgroundStop = () => {
        console.log("BackgroundGeolocation.stop");
        
        BackgroundGeolocation.events.forEach(event =>
            BackgroundGeolocation.removeAllListeners(event)
        );

        BackgroundGeolocation.stop();
    }

    // A/S 선택
    _selectAfterServiceConfirm = (idx) => () => {
        SELECT_INDEX = idx;

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

    // A/S 출발 선택
    _departureAfterServiceConfirm = () => {
        this._getLocation();

        Alert.alert(
            '',
            `A/S 출발하시겠습니까?`,
            [
                {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '예', onPress: () => this._departureAfterService()},
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
                    
                    <CustomButton 
                        onPress={ () => this._moveAfterServiceBackground() }
                    >
                        <Text>TEST 출발</Text>
                    </CustomButton>
                    <CustomButton 
                        onPress={ () => this._departureAfterServiceBackgroundStop() }
                    >
                        <Text>TEST 도착</Text>
                    </CustomButton>
                </View>

                {/* A/S 접수 박스 */}
                {(this.state.afterServiceData !== null) ? (
                    <AfterServiceStateCard
                        data={ this.state.afterServiceData }
                        asPrgsId={ AS_PRGS_ID }
                        asStateBtn={ this.state.asStateBtn }
                        arriveAction={ this._departureAfterServiceBackgroundStop }
                    />
                ) : (
                    <View></View>
                )}

                {/* 미완성 보고서 박스 */}
                {/* <View style={ styles.reportBox }>
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
                </View> */}
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
