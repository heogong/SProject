import React, { Component } from 'react';
import { Alert, StyleSheet, Image, Linking, View } from 'react-native';
import { Badge, Container, H1, Button,  Text}  from "native-base";

import { SUCCESS_RETURN_CODE, COMPLETE_MATCH, DEPARTURE, MOVE, ARRIVE, COMPLETE_AS } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import ArriveAfterService from '~/Main/Functions/ArriveAfterService';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import ProgressAfterService from '~/Main/Functions/ProgressAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomEtcButton from '~/Common/Components/CustomEtcButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class AfterServiceStateCard extends Component {
    constructor(props) { 
        super(props); 

        this.state = {
            latitude : null, 
            longitude : null,

            isArriveModal : false,
            isAlertModal : false, //alert 용
            resultMsg : null // alert 결과 메세지
        };
    }

    componentDidMount() {
        this._getLocation();

        if(this.props.data.asPrgsStatCd == DEPARTURE.VALUE) {
            
            // BackgroundGeolocation.checkStatus(({ isRunning }) => {
            //     if(isRunning) {
            //         console.log("componentDidMount background start");
            //         BackgroundGeolocation.start();
            //     } 
            // });
        }
    }

    // componentWillReceiveProps(nextProps){
    //     // console.log("componentWillReceiveProps: ", nextProps);

    //     this.setState({afterServiceData : nextProps.data});
    // }

    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            (positon) => {
                this.setState({
                    latitude : positon.coords.latitude,
                    longitude : positon.coords.longitude
                })
            },
            (error) => 
            {console.log(error.message)},
            {enableHighAccuracy: false, timeout: 10000}
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
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 도착
    _arriveAfterService = async () => {
        await this._getLocation();

        const {latitude, longitude} = await this.state;

        ArriveAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._arriveAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    
                    if(ResultBool) {
                        this.setState({isArriveModal : true});
                        this._departureAfterServiceBackgroundStop();
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

    // 업체 AS 매칭(진행) 진행
    _progressAfterService = async () => {
        this.setState({isArriveModal : false});
        ProgressAfterService(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._progressAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    
                    if(ResultBool) {
                        //Actions.TakeBeforeAfterService({asPrgsId : this.props.asPrgsId});
                        Actions.RegReportAfterService({asPrgsId : this.props.asPrgsId});
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

    _departureAfterServiceBackgroundStop = () => {
        console.log("BackgroundGeolocation.stop");
        
        BackgroundGeolocation.events.forEach(event =>
            BackgroundGeolocation.removeAllListeners(event)
        );

        BackgroundGeolocation.stop();
    }

    render() {
        return (
            <View style={localStyles.topAsYesWrap}>
                <View style={[styles.justiConStart, styles.alignItemsCenter, styles.mb10]}>
                    <H1 style={localStyles.topTitleTxt}>{this.props.data.asPrgsStatDsc}</H1>
                    <Text style={localStyles.topTxt}>{this.props.data.bplaceAddr}</Text>
                    <Text style={localStyles.topTxt}>{this.props.data.bplaceAddrDtl}</Text>
                </View>
                <View style={[styles.justiConStart, styles.alignItemsCenter]}>
                    <View 
                        style={[
                            styles.mb10,
                            styles.alignItemsCenter,
                            styles.justiConCenter]}>
                        <Image 
                            source={ {uri: this.props.data.prdTypeImgUrl} } 
                            resizeMode="contain"
                            style={[styles.mb10, {
                            height : 100, 
                            width : 100,
                            }]}/>
                        <Text style={localStyles.topTxt}>{this.props.data.prdTypeKoNm}</Text>
                        <Text style={localStyles.topTxt2}>{this.props.data.asItemNm}</Text>
                    </View>
                </View>
                <View style={styles.fxDirRow}>

                    <View style={{marginRight: 9}}>
                        <CustomEtcButton 
                            onPress={() => Actions.ViewAfterServiceMatch({asRecvId : this.props.data.asRecvId})}
                            WhiteBackBtn={true}
                        >
                            상세정보
                        </CustomEtcButton>
                    </View>

                    <View style={{marginLeft: 9}}>
                        {(this.props.data.asPrgsStatCd == COMPLETE_MATCH.VALUE) ? (
                            <CustomEtcButton 
                                onPress={this._departureAfterService}
                            >
                                A/S 출발
                            </CustomEtcButton>

                        ) : (
                            (this.props.data.asPrgsStatCd == DEPARTURE.VALUE) ? (
                                <CustomEtcButton 
                                    onPress={this._arriveAfterService}
                                >
                                    도착완료
                                </CustomEtcButton>
                            ) : (
                                (this.props.data.asPrgsStatCd == ARRIVE.VALUE) ? (
                                <CustomEtcButton 
                                    onPress={this._progressAfterService}
                                >
                                    A/S 진행
                                </CustomEtcButton>
                                ) : (
                                    <CustomEtcButton 
                                        onPress={() => Actions.RegReportAfterService({asPrgsId : this.props.asPrgsId})}
                                    >
                                        보고서등록
                                    </CustomEtcButton>
                                )
                            )
                        )}
                        
                    </View>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isArriveModal}
                    onPress1={this._progressAfterService}
                    onPress2={() => Linking.openURL(`tel:01000000000`)}
                    infoText1="A/S 진행 또는 업체와 전화연결을 선택하세요"
                    btnText1="A/S 진행"
                    btnText2="전화연결"
                />

                {/* alert 메세지 모달 */}
                <CustomModal
                    modalType="ALERT"
                    isVisible={this.state.isAlertModal}
                    onPress={ () => this.setState({isAlertModal : false})}
                    infoText={this.state.resultMsg}
                    btnText="확인"
                />
            </View>
            
        );
    }
}


const localStyles = StyleSheet.create({
    topAsYesWrap: {
        borderBottomColor: color.defaultColor,
        borderBottomWidth: 10,
        backgroundColor: color.whiteColor,
        paddingLeft: 27,
        paddingRight: 27,
        paddingTop: 23,
        paddingBottom: 23,
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

export default AfterServiceStateCard;