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
import GetBizProduct from '~/Main/Functions/GetBizProduct'
import GetProduct from '~/Main/Functions/GetProduct'


import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

let DEL_IDX = null; // 제품 삭제 인덱스
let CLIENT_PRODUCT_ID = null; // 제품 복제/추가 제품 아이디

class ViewBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        newShowCase: [], // 추가/복제 SHOW CASE
        addData : [],
        copyData : [],
        clientPrdArray : [], //추가/복제 제품아이디 (뒤로가기 버튼 시 제품 한번에 삭제)
        btnAddAction : true
      };
    }

    componentDidMount() {
        this._getBizProduct();
    }

    // 사업장별 제품타입별 조회
    _getBizProduct = () => {
        GetBizProduct(this.props.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._getBizProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    //console.log(resultData);
                    if(ResultBool) {
                        this.setState({ newShowCase:  resultData.data });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 복제
    _copyProductMst = () => {
        CopyProductMst(CLIENT_PRODUCT_ID).then(result => {
            GetCommonData(result, this._copyProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {

                        this.setState({ 
                            newShowCase: this.state.newShowCase.concat([{ 
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                images : resultData.data.images 
                            }]),
                            clientPrdArray : this.state.clientPrdArray.concat([{
                                clientPrdId : resultData.data.clientPrdId
                            }])
                        });

                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 추가
    _addProductMst = () => {
        RegProductMst(this.props.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._addProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    //console.log(resultData);
                    if(ResultBool) {
                        // 제품 이미지 타입을 가져 오기 위한 제품 단건 조회
                        CLIENT_PRODUCT_ID = resultData.data.clientPrdId;
                        this._getProduct();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 단건 조회
    _getProduct = () => {
        GetProduct(CLIENT_PRODUCT_ID).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            newShowCase: this.state.newShowCase.concat([{ 
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                images : resultData.data.images 
                            }]),
                            clientPrdArray : this.state.clientPrdArray.concat([{
                                clientPrdId : resultData.data.clientPrdId
                            }])
                        });
                      
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 삭제
    _delProductMst = () => {
        DelProductMst(this.state.newShowCase[DEL_IDX].clientPrdId).then(result => {
            GetCommonData(result, this._delProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({ 
                            newShowCase: this.state.newShowCase.filter((s, sidx) => DEL_IDX !== sidx),
                            clientPrdArray : this.state.clientPrdArray.filter((s, sidx) => DEL_IDX !== sidx),
                        })
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 array 삭제(등록된 제품 뒤로가기 시 한번에 삭제)
    _delArrayProductMst = async () => {
        await this.state.clientPrdArray.map((client) => {
            DelProductMst(client.clientPrdId).then(result => {
                GetCommonData(result, this._delArrayProductMst).then(async resultData => {
                    if(resultData !== undefined) {
                        const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                        if(!ResultBool) {
                            alert(resultData.resultMsg);
                        }
                    }
                });
            });
        });
        await Actions.pop();
    }

    // showCase 카드 복사
    _handleCopyShowCase = (idx) => () => {
        CLIENT_PRODUCT_ID = this.state.newShowCase[idx].clientPrdId;
        this._copyProductMst();
    }

    // showCase 카드 추가
   _handleAddShowCase = () => {
        this._addProductMst();
        //this.showCase.scrollToEnd();
    }

     // showCase 카드 제거
    _handleRemoveShowCase = (idx) => () => {
        Alert.alert(
            '',
            '삭제 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '네', onPress: () => {
                DEL_IDX = idx;
                this._delProductMst();
                }
              },
            ],
            { cancelable: false }
        )
    }

    // 뒤로 가기 버튼 클릭 시 등록된 제품 모두 삭제 하기 위함
    _handleBackAction = () => {
        Alert.alert(
            '',
            '제품 등록을 취소 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('cancle') },
              {text: '네', onPress: () => this._delArrayProductMst() },
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
                    {this.state.newShowCase.map((showCase, idx) =>(
                        <ProductShowCase
                            defaultImg={ this.state.defaultImg }
                            data={ showCase.images }
                            clientPrdId={ showCase.clientPrdId }
                            clientPrdNm={ showCase.clientPrdNm } 
                            handleCopyShowCase={ this._handleCopyShowCase }
                            handleRemoveShowCase={ this._handleRemoveShowCase }
                            index={ idx }
                        />
                    ))}
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