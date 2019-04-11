import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Body, Button, Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ReactTimeout from 'react-timeout'
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import MoveAfterService from '~/Main/Functions/MoveAfterService';
import ArriveAfterService from '~/Main/Functions/ArriveAfterService';
import CompleteAfterService from '~/Main/Functions/CompleteAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ViewAfterServiceState extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            clientPrdImgs : [], // 제품 이미지 데이터
            latitude : null,
            longitude : null
        }
      };
    }

    static defaultProps = {
        defaultImg : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png',
        isProcess : true // true : A/S 매칭 후 조회 화면 호출 시, false : A/S진행 중일 경우 A/S 매칭 탭 클릭 시 조회
    }

    componentWillMount() {
        this._getLocation();
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        BackgroundGeolocation.events.forEach(event =>
          BackgroundGeolocation.removeAllListeners(event)
        );
    }

    componentDidMount() {
        // if(this.props.isProcess) {
        //     this.props.setTimeout(this._departureAfterService, 500);
        // }
        // this._getAfterServiceDetail();
        this._moveAfterServiceBackground();
    }

    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition (
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

    // 업체 AS 매칭(진행) 출발
    _departureAfterService = () => {
        const {latitude, longitude} = this.state;

        DepartureAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._departureAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 접수 상세 내용 조회
    _getAfterServiceDetail = () => {
        // GetAfterServiceDetail(96).then(result => {
        GetAfterServiceDetail(this.props.asRecvId).then(result => {
            GetCommonData(result, this._getAfterServiceDetail).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data
                        });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 이동
    _moveAfterService = () => {
        const {latitude, longitude} = this.state;

        MoveAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._moveAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        alert(resultData.resultMsg);
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 도착
    _arriveAfterService = () => {
        const {latitude, longitude} = this.state;

        ArriveAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._arriveAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        alert(resultData.resultMsg);

                        // ===== 백그라운드 종료 =====
                        BackgroundGeolocation.events.forEach(event =>
                            BackgroundGeolocation.removeAllListeners(event)
                        );
                        BackgroundGeolocation.stop();
                        // ===== 백그라운드 종료 =====

                    } else {
                        alert(resultData.resultMsg);

                         // ===== 백그라운드 종료 (test)=====
                         BackgroundGeolocation.events.forEach(event =>
                            BackgroundGeolocation.removeAllListeners(event)
                         );
                         BackgroundGeolocation.stop();
                         // ===== 백그라운드 종료 =====
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 완료
    _completeAfterService = () => {
        const {latitude, longitude} = this.state;

        CompleteAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._completeAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this._regReportAfterServiceConfirm();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 도착 선택
    _arriveAfterServiceConfirm = () => {
        Alert.alert(
            '',
            '도착??',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._arriveAfterService()},
            ],
            { cancelable: false }
        )
    }

    // A/S 완료 선택
    _completeAfterServiceConfirm = () => {
        Alert.alert(
            '',
            '완료??',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._completeAfterService()},
            ],
            { cancelable: false }
        )
    }

    // 보고서 작성 선택
    _regReportAfterServiceConfirm = () => {
        Alert.alert(
            '',
            `A/S 완료??\n 보고서 작성 고고`,
            [
                { text: '나중에 작성', onPress: () =>  Actions.reset('tabbar2') },
                { text: '지금 작성', onPress: () => Actions.RegReportBeforePic({asPrgsId : this.props.asPrgsId}) },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 출발중"
                resetPage={true}
            >
                <View>
                    <Thumbnail large source={{ uri: this.state.data.prdTypeImgUrl }} />
                    <Text>사업장 : {this.state.data.bplaceNm}</Text>
                    <Text>주소 : {
                                    this.state.data.bplaceAddr == "" && this.state.data.bplaceAddr == null 
                                    ? this.state.data.bplaceAddrRoad
                                    : this.state.data.bplaceAddr
                                } {this.state.data.bplaceAddrDtl}
                    </Text>
                </View>

                <CustomButton onPress={ this._arriveAfterServiceConfirm }>
                    <Text>도착 완료</Text>
                </CustomButton>
                <Text> {this.state.latitude}</Text>
                <Text> {this.state.longitude}</Text>

                <CustomButton onPress={ Actions.RegAfterServiceAdd }>
                    <Text>추가 A/S 진행</Text>
                </CustomButton>

                <CustomButton onPress={ this._completeAfterServiceConfirm }>
                    <Text>A/S 완료</Text>
                </CustomButton>

                {/* <CustomButton onPress={ () => Actions.AfterServiceReport({asPrgsId : this.props.asPrgsId}) }>
                    <Text>보고서 작성</Text>
                </CustomButton> */}
            </CustomBlockWrapper>
        )
    }
}

const styles = StyleSheet.create({
    boxLayout : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 5
    }
});

export default ReactTimeout(ViewAfterServiceState)
// export default ViewAfterServiceState;