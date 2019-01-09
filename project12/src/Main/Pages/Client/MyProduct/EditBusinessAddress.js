import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon, Input, Item } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId, setBizAddress, setBizAddressDsc } from '~/Redux/Actions';

import EditBizPlace from '~/Main/Functions/EditBizPlace';
import EditBizPlaceNm from '~/Main/Functions/EditBizPlaceNm';
import GetCommonData from '~/Common/Functions/GetCommonData';

import DrawMap from '~/Main/Components/DrawMap';
import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';

const ADDRESS_DETAIL_LEN = 1;

class EditBusinessAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressName : '',
            detailAddressName : '',
            makerYn : false,
            disSaveBtn : true,
            addressObj : [],
            region: {
                latitude: 37.566535,
                longitude: 126.97796919999996,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            marker: {
                latitude: 37.566535,
                longitude: 126.97796919999996
            },
            searchSuccess : false // 주소 검색 여부(주소 수정 시 검색 하지 않고 바로 저장 했는가에 대한 여부를 확인 하기 위함)
        };
    }

    static defaultProps = {
        editAddress : false // 주소 수정 페이지 여부
    } 

    componentDidMount() {
        this.setState({
            region : {
                ...this.state.region,
                latitude  : Number(this.props.bizData.latLng.lat),
                longitude : Number(this.props.bizData.latLng.lng)
            },
            marker: {
                latitude: Number(this.props.bizData.latLng.lat),
                longitude: Number(this.props.bizData.latLng.lng)
            },
            addressName : this.props.bizData.addr.addressName,
            detailAddressName : this.props.bizData.detail.detailAddr1,
            makerYn : true,
            disSaveBtn : false
        });
    }

    // 맵 이동 후 좌표 값
    _onRegionChangeComplete = (region) => {
        this.setState({region});
    }

    // param : this.onResult => 주소 결과 값 리턴
    _goSearchAddress = () => (
        Actions.SearchAddress({
            onResult : this.onResult, 
            addressName : this.props.address
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
            addressName : address.result.address_name,
            makerYn : true,
            addressObj : address.result,
            disSaveBtn : (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true,
            searchSuccess : true
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
    _saveButton() {
        if(this.state.searchSuccess) {
            this._editBusinessAddress();
        } else {
            this._editBusinessDetail();
        }
        
    }

    // 사업장 주소 수정
    _editBusinessAddress = async () => {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        EditBizPlace(this.props.value).then(async result => {
            GetCommonData(result, this._editBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        Actions.popTo("ViewBusinessPlace");
                    } else {
                        alert(result.resultMsg);
                    }
                }
            });
        });
    }

    // 사업장 디테일 주소 수정
    _editBusinessDetail = async () => {
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        EditBizPlaceNm(this.props.value).then(async result => {
            GetCommonData(result, this._editBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        Actions.popTo("ViewBusinessPlace");
                    } else {
                        alert(result.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            <View style={{ flex : 1}}>
                <CustomHeader
                    title="주소 입력"
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
                        <Item 
                            regular 
                            style={{backgroundColor:'white'}}
                        >
                            <Input 
                                placeholder="상세주소" 
                                onChangeText={this._handleChange} >
                                {this.state.detailAddressName} 
                            </Input>
                        </Item>
                        <CustomButton
                            styleWidth={ false }
                            full={ true }
                            dark={ true }
                            disabled={ this.state.disSaveBtn } 
                            onPress={() => this._saveButton()}>
                            <Text>저장</Text>
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
  
EditBusinessAddress = connect(mapStateToProps, mapDispatchToProps)(EditBusinessAddress);
export default EditBusinessAddress;