import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Body, Button, Card, CardItem, Icon, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import ArriveAfterService from '~/Main/Functions/ArriveAfterService';
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

    // 업체 AS 매칭(진행) 도착
    _arriveAfterService = () => {
        const {latitude, longitude} = this.state;

        ArriveAfterService(this.props.asPrgsId, latitude, longitude).then(result => {
            GetCommonData(result, this._arriveAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this._nextAfterServiceConfirm();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
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

    // 도착 후 A/S 진행 or 전화연결
    _nextAfterServiceConfirm = () => {
        Alert.alert(
            '',
            'A/S 진행 또는 업체와 통화연결을 선택하세요\n 개행 테스트',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'A/S 진행', onPress: () => Actions.RegAsBeforeReport({asPrgsId : this.props.asPrgsId})},
              {text: '전화연결', onPress: () => alert("전화연결")}
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
                <View style={ styles.asBox }>
                    <View style={[{padding : 10, backgroundColor: 'pink'}]}>
                        <Text>{this.state.afterServiceData.bplaceNm}으로 A/S 출발중입니다.</Text>
                        <Text>{this.state.afterServiceData.bplaceAddr}</Text>
                        <Text>{this.state.afterServiceData.bplaceAddrDtl}</Text>
                        <Thumbnail square soure={{uri: this.state.afterServiceData.prdTypeImgUrl}} />
                        <Text>{this.state.afterServiceData.prdTypeKoNm}</Text>

                        { (this.props.asStateBtn) ? (
                            <View>
                                <CustomButton 
                                    info={ true }
                                    bordered={ true }
                                    onPress={ Actions.PartnerReport }
                                >
                                    <Text>상세정보</Text>
                                </CustomButton>
                                <CustomButton 
                                    info={ true }
                                    onPress={ this._arriveAfterServiceConfirm }
                                >
                                    <Text>도착완료</Text>
                                </CustomButton>
                            </View>
                        ) : (
                            <View>
                                <CustomButton onPress={ () => 
                                    Actions.RegAsBeforeReport({asPrgsId : this.props.asPrgsId}) }>
                                    <Text>A/S 진행</Text>
                                </CustomButton>
                            </View>
                        ) }
                    </View>
                </View>
            
            
        );
    }
}

const styles = StyleSheet.create({
    asBox : {
        zIndex : 1, 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        width: '100%',
        height: 350
    }
});

export default AfterServiceStateCard;