import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { Body, Button, Card, CardItem, Content, Item, Icon, Input, Left, Text, Thumbnail } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetBizPlace from '~/Main/Functions/GetBizPlace';
import GetBizProduct from '~/Main/Functions/GetBizProduct';

import DrawMap from '~/Main/Components/DrawMap';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ViewBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = { 
            bplaceNm : '',
            bplaceDsc : '',
            addressName : '',
            latLng : '',
            prodData : [],
            region: {
                latitude: 37.566535,
                longitude: 126.97796919999996,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            },
            marker: {
                latitude: 37.566535,
                longitude: 126.97796919999996
            }
       };
    }

    componentDidMount() {
        this._getBizPlace();
        this._getBizProduct();
    }

    // 사업장 정보 조회
    _getBizPlace = () => {
        GetBizPlace(this.props.value.bizId).then(async result => {
            GetCommonData(result, this._getBizPlace).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({
                            bplaceNm : resultData.data.bplaceNm,
                            bplaceDsc : resultData.data.bplaceDsc,
                            addressName : resultData.data.addr.addressName,
                            detailAddress : resultData.data.detail.detailAddr1,
                            latLng : resultData.data.latLng,
                            region : {
                                ...this.state.region,
                                latitude  : Number(resultData.data.latLng.lat),
                                longitude : Number(resultData.data.latLng.lng)
                              },
                              marker: {
                                  latitude: Number(resultData.data.latLng.lat),
                                  longitude: Number(resultData.data.latLng.lng)
                              },
                        });
                    } else {
                        alert(resultData.resultMsg)
                    }
                }
            });
        });
    }

    // 사업장 제품 정보 조회
    _getBizProduct = () => {
        GetBizProduct(this.props.value.bizId).then(async result => {
            GetCommonData(result, this._getBizProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({prodData : resultData.data});
                    } else {
                        alert(resultData.resultMsg)
                    }
                }
            });
        });
    }

    // 사업장 수정 페이지 이동
    _editBussiness = () => {
        Actions.RegBusinessPlace({
            editBiz : true,
            bplaceNm : this.state.bplaceNm,
            bplaceDsc : this.state.bplaceDsc,
        });
    }

    // 주소 수정 페이지 이동
    _editAddress = () => {
        //console.log(this.state.latLng);
        Actions.SetAddress({
            editAddress : true,
            address : this.state.addressName,
            detailAddress : this.state.detailAddress,
            latLng : this.state.latLng
        });
    }

    // 제품 수정 페이지 이동
    _editProduct = () => {
        alert("제품 수정!");
    }

    render() {
        return (
            <CustomBlockWrapper
                title="사업장 조회"
            >
                <Card>
                    <CardItem style={{ backgroundColor: 'skyblue'}}>
                        <Text style={{ color: 'white'}}>사업장 정보</Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            {/* <Thumbnail square soure={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} /> */}
                            <Body>
                                <View style={{ flex:1, flexDirection:'row'}}>
                                    <Text style={{ flexDirection: 'column'}}>{ this.state.bplaceNm }</Text>
                                    <Button warning bordered onPress={ this._editBussiness }>
                                        <Text>사업장명 변경</Text>
                                    </Button>
                                </View>
                                <View style={{ flex:1, flexDirection:'row'}}>
                                    <Text note style={{ flexDirection: 'column'}}>{ this.state.addressName }</Text>
                                    <Button bordered onPress={ this._editAddress }>
                                        <Text>주소변경</Text>
                                    </Button>
                                </View>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <View style={{width:"100%", height:200}}>
                                <DrawMap
                                    region={ this.state.region }
                                    onRegionChangeComplete={ this._onRegionChangeComplete }
                                    makerYn={ true }
                                    marker={ this.state.marker }
                                />
                            </View>
                            <Text>
                                { this.state.bplaceDsc }
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}}>
                                <Icon name="logo-github" />
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem style={{ backgroundColor: 'skyblue'}}>
                        <Text style={{ color: 'white'}}>사업장 제품 목록</Text>
                    </CardItem>
                    {this.state.prodData.map((product, index) => (
                        <CardItem key={ index }>
                            <Content>
                                <CustomButton
                                    styleWidth={ false }
                                    info={ true }
                                    block={ true }
                                    marginSize={ 0 }
                                    onPress={ this._editProduct }
                                >
                                    <Icon name="md-cube" />
                                    <Text>{ product.clientPrdNm }</Text>
                                </CustomButton>
                            </Content>
                        </CardItem>
                    ))}
                </Card>

            </CustomBlockWrapper>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}
  
ViewBusinessPlace = connect(mapStateToProps, undefined)(ViewBusinessPlace);

export default ViewBusinessPlace;