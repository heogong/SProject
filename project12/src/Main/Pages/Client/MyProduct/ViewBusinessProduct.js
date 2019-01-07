import React, { Component } from "react";
import { Alert, StyleSheet, ImageBackground, View, scrollToEnd } from 'react-native';
import { Button, Container,  Footer, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetProdImageType from '~/Main/Functions/GetProdImgType'
import RegProductMst from '~/Main/Functions/RegProductMst'
import DelProductMst from '~/Main/Functions/DelProductMst'
import CopyProductMst from '~/Main/Functions/CopyProductMst'
import ProductShowCase from '~/Main/Components/ProductShowCase'
import GetProduct from '~/Main/Functions/GetProduct'

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ViewBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        data : [],
        productImage : [],
        clientBplaceNm : ''
      };
    }

    componentDidMount() {
        this._getProduct();
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
                            data: resultData.data,
                        });
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
            <Container>
                <CustomBlockWrapper
                    title="제품 수정"
                    customAction={this._handleBackAction}
                >
                    {/* {this.state.data.map((showCase, idx) =>(
                        <ProductShowCase
                            defaultImg={ this.state.defaultImg }
                            data={ (this.state.btnAddAction) ? this.state.addData : this.state.copyData }
                            clientPrdId={ showCase.clientPrdId }
                            clientPrdNm={ showCase.clientPrdNm } 
                            clientPrdImgId={ showCase.clientPrdImgId } 
                            handleCopyShowCase={ this._handleCopyShowCase }
                            handleRemoveShowCase={ this._handleRemoveShowCase }
                            index={ idx }
                        />
                    ))} */}
                </CustomBlockWrapper>

                <Footer>
                    <Button onPress={ this._handleAddShowCase }>
                        <Text>추가</Text>
                    </Button>
                    <Button onPress={ this._nextButton }>
                        <Text>등록완료</Text>
                    </Button>
                </Footer>
            </Container>
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