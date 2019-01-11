import React, { Component } from 'react';
import { View } from "react-native"

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Text, Item, Input, Icon, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { setBizId, setBizAddress, setBizAddressDsc } from '~/Redux/Actions';

import DrawMap from '~/Main/Components/DrawMap';
import RegPartnerPlace from '~/FirstScreen/Functions/RegPartnerPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';

class SetAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressName : '',
            makerYn : false,
            disSaveBtn : true,
            addressObj : [],
            region: {
                latitude: 37.566535,
                longitude: 126.97796919999996,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            marker:{
                latitude: 37.566535,
                longitude: 126.97796919999996
            }
        };
    }

    componentDidMount() {
        this._getLocation();
    }

    // 현재 위치 조회
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
          (positon) => {
            this.setState({
              region : {
                ...this.state.region,
                latitude : positon.coords.latitude,
                longitude : positon.coords.longitude

              }
            })
          },
          (error) => {console.log(error.message)},
          {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
        );
    }

    // 맵 이동 후 좌표 값
    _onRegionChangeComplete = (region) => {
        this.setState({region});
    }


    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.JoinSearchPartnerAddress({
            onResult : this.onResult, 
            addressName : this.state.addressName
        }) 
    )

    // 주소검색 후 결과 데이터 
    onResult = (address) => {
        this.setState({
            region : {
                ...this.state.region,
                latitude : Number(address.result.y),
                longitude : Number(address.result.x)
            },
            marker : {
                latitude : Number(address.result.y),
                longitude : Number(address.result.x)
            },
            addressName : address.result.address.address_name,
            makerYn : true,
            addressObj : address.result,
            disSaveBtn : false
        });
    }

    // 파트너 사업장 버튼 클릭
    _saveButton() {
       this._regPartnerPlace();
    }

    // 사업장 등록
    _regPartnerPlace = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        //await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        console.log(this.props.value);

        RegPartnerPlace(this.props.value).then(async result => {
            GetCommonData(result, this._regBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    console.log(resultData.data);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.bizPlaceId); // 사업장 ID 리덕스 SET
                         Actions.JoinInputProdType();
                    } else {
                       alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    _onRegionChangeComplete = (region) => {
        this.setState({region});
    }

    render() {
        return (
            <View style={{ flex : 1}}>
                <CustomHeader
                    title="파트너 주소 입력"
                />
                <View style={{ flex : 1, padding: 5 }}>
                    <DrawMap
                        region={ this.state.region }
                        onRegionChangeComplete={ this._onRegionChangeComplete }
                        makerYn={ this.state.makerYn }
                        marker={ this.state.marker }

                    />
                    <View style={{ height : 50 }}>
                        <Item 
                            regular 
                            onPress={this._goSearchAddress}
                            style={{backgroundColor:'white'}}
                        >
                            <Icon active name='md-home' />
                            <Input 
                                disabled
                                placeholder="주소"
                            > 
                                {this.state.addressName} 
                            </Input>
                        </Item>
                    </View>
                    <View style={{ height : 40 }}>
                        <CustomButton
                            styleWidth={ false }
                            full={ true }
                            dark={ true }
                            disabled={ this.state.disSaveBtn }
                            onPress={() => this._saveButton()} >
                            <Text>주소 저장</Text>
                        </CustomButton>
                    </View>
                </View>
            </View>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizId: (value) => dispatch(setBizId(value)),
        onSetBizAddress: (value) => dispatch(setBizAddress(value)),
        onSetBizAddressDsc: (value) => dispatch(setBizAddressDsc(value))
    }
}
  
SetAddress = connect(mapStateToProps, mapDispatchToProps)(SetAddress);
export default SetAddress;