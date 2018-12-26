import React, { Component } from 'react';
import { View } from "react-native"

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';

import { Body, Container, Text, Button, Content, Item, Input, Icon, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { setBizId, setBizAddress, setBizAddressDsc } from '../../../../Redux/Actions';

import DrawMap from '../../../../Main/Components/DrawMap';
import RegBizPlace from '../../../../Main/Functions/RegBizPlace';
import GetCommonData from '../../../../Common/Functions/GetCommonData';

import CustomBlockWrapper from '../../../../Common/Components/CustomBlockWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import CustomHeader from '../../../../Common/Components/CustomHeader';

const ADDRESS_DETAIL_LEN = 1;

class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = {
          lat : '',
          lng : '',
          addressName : '',
          makerYn : false,
          disSaveBtn : true,
          detailAddressName : '',
          addressObj : []
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
            }
        )
    }
    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.JoinSearchPartnerAddress({onResult : this.onResult}) 
    )

    // 주소검색/지도검색 후 결과 데이터 
    // 주소검색/지도검색 리턴 값이 달라 분기 처리 필요
    onResult = (region) = (address) => {
        console.log("주소가져왔다 : ",address);
        console.log("주소가져왔다2 : ",address.region);
        this.setState({
            lng : (address.result.x != null) ? address.result.x : address.region.longitude, 
            lat : (address.result.y != null) ? address.result.y : address.region.latitude,
            addressName : address.result.address.address_name,
            makerYn : true,
            addressObj : address.result,
            disSaveBtn : (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true
        });
    }

    // 주소 저장 버튼 활성화 여부
    _handleChange = (text) => {
        this.setState({detailAddressName : text})

        if(this.state.addressName !== '') {
            this.setState({disSaveBtn : (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true})
        }
    }

    // 사업장 저장 버튼 클릭
    _SaveButton() {
       this._regBusiness();
    }

    // 사업장 등록
    _regBusiness = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        RegBizPlace(this.props.value).then(async result => {
            GetCommonData(result, this._regBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        //console.log("result : ", result);
                        //Actions.popTo("ListBusinessPlace"); // 페이지 이동
                        //Actions.refresh({key: "ListBusinessPlace"}) // 페이지 새로고침
                        await this.props.onSetBizId(resultData.bizPlaceId); // 사업장 ID 리덕스 SET
                        Actions.InputProdType();
                    } else {
                        Toast.show({
                            text: result.resultMsg,
                            type: "danger",
                            buttonText: '확인'
                        })
                    }
                }
            });
        });
    }

    _onRegionChangeComplete(region) {
    }

    render() {
        return (
            <View style={{ flex : 1}}>
                <CustomHeader
                    title="파트너 주소 입력"
                />
                <View style={{ flex : 1, padding: 5 }}>
                    <DrawMap
                        lat={this.state.lat}
                        lng={this.state.lng}
                        makerYn={this.state.makerYn}
                        onRegionChangeComplete={ this._onRegionChangeComplete }
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
                            onPress={() => this._SaveButton()} >
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