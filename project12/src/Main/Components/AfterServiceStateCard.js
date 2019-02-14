import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Body, Button, Card, CardItem, Icon, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE, COMPLETE_MATCH, DEPARTURE, MOVE, ARRIVE, COMPLETE_AS } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import ArriveAfterService from '~/Main/Functions/ArriveAfterService';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import CompleteAfterService from '~/Main/Functions/CompleteAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';

class AfterServiceStateCard extends Component {
    constructor(props) { 
        super(props); 

        this.state = {
            afterServiceData : this.props.data,
            latitude : null, 
            longitud : null
        };
    }

    componentDidMount() {
        if(this.state.afterServiceData.asPrgsStatCd == DEPARTURE.VALUE) {
            
            // BackgroundGeolocation.checkStatus(({ isRunning }) => {
            //     if(isRunning) {
            //         console.log("componentDidMount background start");
            //         BackgroundGeolocation.start();
            //     } 
            // });
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps: ", nextProps);

        this.setState({afterServiceData : nextProps.data});
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
            stopOnTerminate: false,
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
        const { latitude, longitude } = this.state;
        
        DepartureAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._departureAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this._moveAfterServiceBackground();
                        this.props.getAfterServiceDetail();
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
                        this.props.getAfterServiceDetail();
                    } else {
                        alert(resultData.resultMsg);
                    }

                    this._departureAfterServiceBackgroundStop();
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

    // A/S 도착 선택
    _arriveAfterServiceConfirm = () => {
        this._getLocation();

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
                { text: '지금 작성', onPress: () => Actions.RegAsBeforeReport({asPrgsId : this.props.asPrgsId}) },
            ],
            { cancelable: false }
        )
    }

    _departureAfterServiceBackgroundStop = () => {
        console.log("BackgroundGeolocation.stop");
        
        BackgroundGeolocation.events.forEach(event =>
            BackgroundGeolocation.removeAllListeners(event)
        );

        BackgroundGeolocation.stop();
    }

    render() {
        return (
            <View style={ styles.asBox }>
                <View style={[{padding : 10, backgroundColor: 'pink'}]}>
                    <Text>{this.state.afterServiceData.bplaceNm} {this.state.afterServiceData.asPrgsStatNm}</Text>
                    <Text>{this.state.afterServiceData.bplaceAddr}</Text>
                    <Text>{this.state.afterServiceData.bplaceAddrDtl}</Text>
                    <Thumbnail square soure={{uri: this.state.afterServiceData.prdTypeImgUrl}} />
                    <Text>{this.state.afterServiceData.prdTypeKoNm}</Text>
                    <Text>state test {this.state.afterServiceData.asPrgsStatCd}</Text>
                        <View>

                            <CustomButton
                                disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_MATCH.VALUE) ? false : true }
                                info={ true }
                                onPress={ Actions.PartnerReport }
                            >
                                <Text>상세정보</Text>
                            </CustomButton>

                            <CustomButton 
                                disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_MATCH.VALUE) ? false : true }
                                info={ true }
                                onPress={ this._departureAfterServiceConfirm }
                            >
                                <Text>A/S 출발</Text>
                            </CustomButton>

                            <CustomButton 
                                disabled={ (this.state.afterServiceData.asPrgsStatCd == DEPARTURE.VALUE) ? false : true }
                                info={ true }
                                onPress={ this._arriveAfterServiceConfirm }
                            >
                                <Text>도착완료</Text>
                            </CustomButton>

                            <CustomButton 
                                disabled={ (this.state.afterServiceData.asPrgsStatCd == ARRIVE.VALUE) ? false : true }
                                info={ true }
                                onPress={ this._completeAfterServiceConfirm }
                            >
                                <Text>A/S 완료</Text>
                            </CustomButton>

                            {/* <CustomButton 
                                disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_AS.VALUE) ? false : true }
                                info={ true }
                                onPress={ () => 
                                Actions.RegAsBeforeReport({asPrgsId : this.props.asPrgsId}) }>
                                <Text>A/S 보고서 진행</Text>
                            </CustomButton> */}
                        </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    asBox : {
        zIndex : 2, 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        width: '100%',
        height: 500
    }
});

export default AfterServiceStateCard;