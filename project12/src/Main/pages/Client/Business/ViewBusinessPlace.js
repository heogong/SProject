import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { Body, Button, Card, CardItem, Item, Icon, Input, Left, Text, Thumbnail } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetBizPlace from '../../../Functions/GetBizPlace';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';


class ViewBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = { 
            bplaceNm : '',
            bplaceDsc : '',
            addressName : '',
            latLng : ''
       };
    }

    componentDidMount() {
        this._getBizPlace();
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
                            latLng : resultData.data.latLng
                        });
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

    render() {
        return (
            <CustomBlockWrapper
                title="사업장 조회"
            >
                <Card style={{flex: 0}}>
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
                            <ImageBackground source={{uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'}} style={{height: 200, width: 200, flex: 1}}/>
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