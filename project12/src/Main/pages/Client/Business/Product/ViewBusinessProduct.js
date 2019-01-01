import React, { Component } from "react";
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Body, Card, CardItem, Text, Left, Thumbnail, Container } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import GetBizPlace from '~/Main/Functions/GetBizPlace'

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ViewBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        productData : [],
        productImage : [],
        clientBplaceNm : ''
      };
    }

    componentDidMount() {
        this._getProduct();
        this._getBizPlace();
    }

    // 제품 조회
    _getProduct = () => {
        GetProduct(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            productData: resultData.data,
                            productImage: resultData.data.images
                        });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 사업장 정보
    _getBizPlace = () => {
        GetBizPlace(this.props.clientBplaceId).then(result => {
            GetCommonData(result, this._getBizPlace).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                   // console.log(resultData);
                    if(ResultBool) {
                        this.setState({clientBplaceNm : resultData.data.bplaceNm});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

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
            <CustomBlockWrapper
                title="A/S 신청"
            >
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail square source={{ uri: this.state.defaultImg }} />
                        </Left>
                        <Body>
                            <Text>{ this.state.productData.clientPrdNm }</Text>
                        </Body>
                    </CardItem>

                    <CardItem>
                        <View style={{ flex:1, justifyContent: 'center'}}>
                            <View style={ styles.boxLayout }>
                                { this.state.productImage.map((productImg, sidx) => (
                                    <View style={ styles.box }>
                                        <ImageBackground source={{ uri: productImg.fileUrl }} style={{width: '100%', height: '100%'}}/>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </CardItem>
                </Card>

                <View>
                    <Text>{ this.state.clientBplaceNm }</Text>
                </View>
                <Container>
                    <CustomButton
                        styleWidth={ false }
                        block={ true }
                        info={ true }
                    >
                        <Text>A/S 신청하기</Text>
                    </CustomButton>
                </Container>
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
    },
    box: {
        width: 80, 
        height: 80,
        justifyContent: 'center', 
        alignItems:'center'
    },
});

export default ViewBusinessProduct;