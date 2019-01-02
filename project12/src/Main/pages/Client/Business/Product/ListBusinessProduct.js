import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Body, Container, Content, Icon, Text, Left, List, ListItem, Right, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetTotalProductList from '~/Main/Functions/GetTotalProductList'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';

class ListBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.onPress = this._onProductPress.bind(this);

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        productData : []
      };
    }

    componentDidMount() {
        this._getTotalProductList();
    }

    // 사업장 전체 제품 조회
    _getTotalProductList = () => {
        GetTotalProductList().then(result => {
            GetCommonData(result, this._getTotalProductList).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({ 
                            productData: resultData.data,
                         });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }
    

    // 제품 클릭
    _onProductPress = (clientBplaceId, clientPrdId) => {
        Actions.ViewBusinessProduct({
            clientBplaceId : clientBplaceId,
            clientPrdId : clientPrdId
        });
    }

    _renderListItem = (info, idx) => (
        <ListItem thumbnail onPress={() => this._onProductPress(info.clientBplaceId, info.clientPrdId) }>
            <Left>
                <Thumbnail square source={{ uri: this.state.defaultImg }} />
            </Left>
            <Body>
                <Text>{ info.clientPrdNm }</Text>
                <Text note numberOfLines={1}>{ info.clientPrdDsc }</Text>
                <Text note numberOfLines={1}>{ (info.images.length > 0) ? "이미지" : "이미지없음" }</Text>
            </Body>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
    );

    _nextButton = () => {
        Alert.alert(
            '',
            '등록되지 않은 이미지는 어딘가에서 등록 가능 \ 제품을 추가 등록 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => Actions.MainStack() },
              {text: '네', onPress: () => Actions.InputProdType() },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <CustomHeader
                    title="A/S 신청"
                />
                <View>
                    <Text>쿨리닉은 빠른 AS 서비스를 준비하고 있습니다.</Text>
                    <Text>AS 품목을 선택해 주세요</Text>
                </View>
                
                <Content>
                    <List dataArray={this.state.productData} renderRow={this._renderListItem} />
                </Content>
            </View>
        )
    }
}

export default ListBusinessProduct;