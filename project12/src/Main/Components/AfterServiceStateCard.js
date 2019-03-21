import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Badge, Container, H1, Button,  Text}  from "native-base";

import { SUCCESS_RETURN_CODE, COMPLETE_MATCH, DEPARTURE, MOVE, ARRIVE, COMPLETE_AS } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import ArriveAfterService from '~/Main/Functions/ArriveAfterService';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import CompleteAfterService from '~/Main/Functions/CompleteAfterService';
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
            longitud : null,

            isArriveModal : false,
            isAlertModal : false, //alert 용
            resultMsg : null // alert 결과 메세지
        };
    }

    componentDidMount() {
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
    _arriveAfterService = async () => {
        await this._getLocation();

        const {latitude, longitude} = this.state;

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
            // <View style={ styles.asBox }>
            //     <View style={[{padding : 10, backgroundColor: 'pink'}]}>
            //         <Text>{this.state.afterServiceData.bplaceNm} {this.state.afterServiceData.asPrgsStatNm}</Text>
            //         <Text>{this.state.afterServiceData.bplaceAddr}</Text>
            //         <Text>{this.state.afterServiceData.bplaceAddrDtl}</Text>
            //         <Thumbnail square soure={{uri: this.state.afterServiceData.prdTypeImgUrl}} />
            //         <Text>{this.state.afterServiceData.prdTypeKoNm}</Text>
            //         <Text>state test {this.state.afterServiceData.asPrgsStatCd}</Text>
            //             <View>

            //                 <CustomButton
            //                     disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_MATCH.VALUE) ? false : true }
            //                     info={ true }
            //                     onPress={ Actions.PartnerReport }
            //                 >
            //                     <Text>상세정보</Text>
            //                 </CustomButton>

            //                 <CustomButton 
            //                     disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_MATCH.VALUE) ? false : true }
            //                     info={ true }
            //                     onPress={ this._departureAfterServiceConfirm }
            //                 >
            //                     <Text>A/S 출발</Text>
            //                 </CustomButton>

            //                 <CustomButton 
            //                     disabled={ (this.state.afterServiceData.asPrgsStatCd == DEPARTURE.VALUE) ? false : true }
            //                     info={ true }
            //                     onPress={ this._arriveAfterServiceConfirm }
            //                 >
            //                     <Text>도착완료</Text>
            //                 </CustomButton>

            //                 <CustomButton 
            //                     disabled={ (this.state.afterServiceData.asPrgsStatCd == ARRIVE.VALUE) ? false : true }
            //                     info={ true }
            //                     onPress={ this._completeAfterServiceConfirm }
            //                 >
            //                     <Text>A/S 완료</Text>
            //                 </CustomButton>

            //                 {/* <CustomButton 
            //                     disabled={ (this.state.afterServiceData.asPrgsStatCd == COMPLETE_AS.VALUE) ? false : true }
            //                     info={ true }
            //                     onPress={ () => 
            //                     Actions.RegAsBeforeReport({asPrgsId : this.props.asPrgsId}) }>
            //                     <Text>A/S 보고서 진행</Text>
            //                 </CustomButton> */}
            //             </View>

            //     </View>
            // </View>
            <View style={localStyles.topAsYesWrap}>
                <View style={[styles.justiConStart, styles.alignItemsCenter, styles.mb10]}>
                    <H1 style={localStyles.topTitleTxt}>{this.props.data.asPrgsStatNm}</H1>
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
                            soure={ {uri: this.props.data.prdTypeImgUrl} } 
                            resizeMode="contain"
                            style={[styles.mb10, {
                            height : 100, 
                            width : 100,
                            }]}/>
                        <Text style={localStyles.topTxt}>{this.props.data.prdTypeKoNm}</Text>
                        <Text style={localStyles.topTxt2}>증상1. 냉동온도가 올라가지 않음 - 코드화 필요</Text>
                    </View>
                </View>
                <View style={styles.fxDirRow}>

                    <View style={{marginRight: 9}}>
                        <CustomEtcButton 
                            onPress={Actions.ViewAfterServiceMatch}
                            WhiteBackBtn={true}
                        >
                            상세정보
                        </CustomEtcButton>
                    </View>

                    <View style={{marginLeft: 9}}>
                        <CustomEtcButton 
                            onPress={this._arriveAfterService}
                        >
                            도착완료
                        </CustomEtcButton>
                    </View>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isArriveModal}
                    onPress1={() => Actions.TakeBeforeAfterService(this.props.asPrgsId)}
                    onPress2={() => alert("ddddd")}
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

export default AfterServiceStateCard;