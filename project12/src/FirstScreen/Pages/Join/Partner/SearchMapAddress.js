import React, { Component } from 'react';
import { View, StyleSheet } from "react-native"

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';
import { Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import DrawMap from '../../../../Main/Components/DrawMap';
import GetAddressInfo from '../../../Functions/GetAddressInfo';
import GetCommonData from '../../../../Common/Functions/GetCommonData';

import CustomBlockWrapper from '../../../../Common/Components/CustomBlockWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import CustomHeader from '../../../../Common/Components/CustomHeader';

let REGION = []; // 드래그 후 좌표 데이터 변수
let RESULT_DATA = [];

class SearchMapAddress extends Component {
    constructor(props) {
      super(props);

      this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);

      this.state = {
          lat : '',
          lng : '',
          addressName : '',
          roadAddressName : '',
          makerYn : false
        };
    }

    // 초기 데이터 1. 리덕스 값 조회 2. 현재 위치 조회 3. default 값 조회 
    componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (pos) => {
                this.setState({
                    lng : pos.coords.longitude, 
                    lat : pos.coords.latitude
                });
            }, error => console.log(error), {
                enableHighAccuracy: false, timeout: 20000, maximumAge: 1000
            }
        )
    }

    // 주소 저장 화면으로 이동
    _onPress() {
        Actions.popTo("JoinSetPartnerAddress");
        this.props.onResult({ result: RESULT_DATA, region : REGION });
    }

    // 맵 드래그 시 주소값 세팅
    _onRegionChangeComplete(region) {
        REGION = region;
        //console.log(region);
        console.log("_onRegionChangeComplete");
        console.log(this.state);

        this._GetAddressInfo();
    }

    // 좌표값으로 주소 호출
    // error : this.state 값 변경 시 맵에 좌표값 초기화로 맵 이동 불가 현상 
    _GetAddressInfo = async () => {
        console.log("_GetAddressInfo");
        GetAddressInfo(REGION).then(result => {
            GetCommonData(result, this._GetAddressInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        
                        RESULT_DATA = resultData.data.documents[0];
                        // this.setState({
                        //     addressName : RESULT_DATA.address.address_name,
                        //     roadAddressName : (RESULT_DATA.road_address != null) ? RESULT_DATA.road_address.address_name : ''
                        // })
                    }
                }
            });
        });
    }

    render() {
        return (
            <View style={{ flex : 1}}>
                <CustomHeader
                    title="파트너 주소 입력"
                />
                <View style={{ flex : 1 }}>
                    <View style={{ flex : 5 }}>
                        <DrawMap
                            lat={this.state.lat}
                            lng={this.state.lng}
                            makerYn={this.state.makerYn}
                            onRegionChangeComplete={ this._onRegionChangeComplete }
                        /> 
                    </View>
                    <View style={ styles.info }>
                        <Text style={ styles.infoFont }>지도를 움직여 원하는 위치를 지정하세요.</Text>
                    </View>
                    <View style={{ flex : 2 }}>
                        <View style={{ height : 85, paddingTop : 15, paddingLeft : 15}}>
                            <Text>{ this.state.addressName }</Text>
                            <Text style={{ color : 'grey'}}>{ this.state.roadAddressName }</Text>
                        </View>
                        <View style={{ flex : 1 }}>
                            <CustomButton
                                styleWidth={ false }
                                full={ true }
                                dark={ true }
                                onPress={() => this._onPress()} >
                                <Text>주소 선택 하기</Text>
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    info: {
        alignItems:'center', 
        justifyContent:'center',
        height : 25, 
        backgroundColor : 'black', 
        opacity : 0.8
    },
    infoFont: {
        fontSize : 12, 
        fontWeight : "bold", 
        color : 'white'
    }
});


export default SearchMapAddress;