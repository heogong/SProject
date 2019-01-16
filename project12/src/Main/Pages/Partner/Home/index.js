import React, { Component } from 'react';
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native';
import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { ActionConst, Actions } from 'react-native-router-flux';

import GetAfterService from '~/Main/Functions/GetAfterService';
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import Swiper from 'react-native-animated-swiper';

let SELECT_INDEX = null; // 선택된 A/S
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : [],
        latitude : null,
        longitude : null,
    };
  }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed
        this._getAfterService();
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener
    }

    handleBackPress = () => {
        return false;
    }

    // 나의 AS 매칭 목록 조회
    _getAfterService = () => {
        GetAfterService().then(result => {
            GetCommonData(result, this._getAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
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
            GetCommonData(result, this._departureAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.ViewAfterServiceMatch({
                            asRecvId : data[SELECT_INDEX].asRecvId})
                    } else {
                        alert(resultData.resultMsg);
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
        (error) => {console.log(error.message)},
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
        );
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
            `${this.state.data[SELECT_INDEX].bplaceNm} 으로 A/S 출발하시겠습니까?`,
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
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
                                        <Text style={styles.title}>A/S신청</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Swiper>
                </View>
                <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
                    <Text>컨텐츠2</Text>
                    
                    <CustomButton 
                        onPress={ Actions.ListBusinessProduct }
                    >
                        <Text>A/S</Text>
                    </CustomButton>
                </View>
            </View>
        )
    }
}

const styles = {
    slides: { backgroundColor: '#F5FCFF'},
    slide: { 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 100,
        width: 100,
        backgroundColor: 'pink'
      },
    title: { color: 'black', fontSize: 20 }
  };
