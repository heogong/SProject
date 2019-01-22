import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Body, Button, Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ReactTimeout from 'react-timeout'

import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail';
import DepartureAfterService from '~/Main/Functions/DepartureAfterService';
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
        defaultImg : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png'
    }

    componentWillMount() {
        this._getLocation();
    }

    componentDidMount() {
        this.props.setTimeout(this._departureAfterService, 500);
        this._getAfterServiceDetail();
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
                    } else {
                        alert(resultData.resultMsg);
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
                        alert(resultData.resultMsg);
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

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 출발중"
            >
                <View>
                    <Thumbnail large source={{ uri: this.state.data.prdTypeImgUrl }} />
                    <Text>사업장 : {this.state.data.bplaceNm}</Text>
                    <Text>주소 : {this.state.data.bplaceAddr} {this.state.data.bplaceAddrDtl}</Text>
                </View>

                <CustomButton onPress={ this._arriveAfterServiceConfirm }>
                    <Text>도착 완료</Text>
                </CustomButton>
                <Text> {this.state.latitude}</Text>
                <Text> {this.state.longitude}</Text>

                <CustomButton onPress={ this._completeAfterServiceConfirm }>
                    <Text>A/S 완료</Text>
                </CustomButton>
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