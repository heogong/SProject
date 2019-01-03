import React, { Component } from "react";
import { StyleSheet, ImageBackground, View, scrollToEnd } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Button, Body, Card, CardItem, Container,  Icon, Footer, FooterTab, Item, Input, Left, Right, Text, Thumbnail, List, ListItem } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetProdImageType from '~/Main/Functions/GetProdImgType'
import RegProductMst from '~/Main/Functions/RegProductMst'
import ProductImage from '~/Main/Components/ProductImage'

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';


class InputShowCase extends Component {
    constructor(props) {
      super(props);
      this.showCase = null;

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        data : [],
        newShowCase: []
      };
    }

    static defaultProps = {
        prodTypeId : 2 // 테스트용
    }

    componentWillMount(){
        this._drawProductImageType();
    }

    componentDidMount() {
        this._regProductMst();
    }

    // 제품 이미지 타입 가져오기
    _drawProductImageType = () => {
        GetProdImageType(this.props.prodTypeId).then(result => {
            GetCommonData(result, this._drawProductImageType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({data : resultData.data});
                    }
                    console.log("data:", this.state.data)
                }
            });
        });
    }

    // 제품 마스터 초기 등록 
    _regProductMst = () => {
        RegProductMst(this.props.value.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._regProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {

                        const newData = this.state.data.map((prodImgType, idx) => {
                            return { ...prodImgType, clientPrdId: resultData.data.clientPrdId };
                        });

                        // 화면 로드 시 초기 생성된 clientPrdId 세팅
                        if(this.state.newShowCase.length == 0 ) {
                            this.setState({ data: newData });
                        } else {
                            // showCase 추가 후 마지막 배열에 clientPrdId 세팅
                            const addClientPrdShowCase = this.state.newShowCase.map((showCase, sidx) => {
                                return (sidx == this.state.newShowCase.length - 1) ? { ...showCase, clientPrdId: resultData.data.clientPrdId } : showCase;
                            });
                            this.setState({ newShowCase: addClientPrdShowCase });
                        }
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

   // showCase 카드 추가
   _handleAddShowCase = () => {
        this.setState({ 
            newShowCase: this.state.newShowCase.concat([{ clientPrdId : null }]) 
        });
        this._regProductMst();
       //this.showCase.scrollToEnd();
    }

     // showCase 카드 제거
     _handleRemoveShowCase = (idx) => () => {
        this.setState({ newShowCase: this.state.newShowCase.filter((s, sidx) => idx !== sidx) });
    }

    render() {
        return (
            <Container>
                <CustomBlockWrapper
                    title="제품 등록"
                >
                    <Card>
                        <CardItem>
                            <Thumbnail large source={{ uri: this.state.defaultImg }} />
                        </CardItem>
                        <CardItem>
                            <Item regular>
                                <Input
                                    value={ this.state.text }
                                    placeholder='제품명'
                                />
                            </Item>
                        </CardItem>
                        <CardItem cardBody>
                            <View style={{ flex:1, justifyContent: 'center'}}>
                                <View style={ styles.boxLayout }>
                                {this.state.data.map((info, idx) => (
                                    <ProductImage 
                                        prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                        prdImgCateId={ info.prdTypeImgCateId }
                                        clientPrdId={ info.clientPrdId }
                                        uri={ this.state.defaultImg }
                                        index={ idx }
                                    />
                                ))}
                                </View>
                            </View>
                        </CardItem>
                        <Button>
                            <Text>복제</Text>
                        </Button>
                    </Card>

                    {this.state.newShowCase.map((showCase, idx) =>(
                        <Card
                            ref={ ( ref ) => this.showCase = ref }
                        >
                            <CardItem>
                                <Thumbnail large source={{ uri: this.state.defaultImg }} />
                                <Button onPress={ this._handleRemoveShowCase(idx) }>
                                    <Text>삭제</Text>
                                </Button>
                            </CardItem>
                            <CardItem>
                                <Item regular>
                                    <Input
                                        value={ this.state.text }
                                        placeholder='제품명'
                                    />
                                </Item>
                            </CardItem>
                            <CardItem cardBody>
                                <View style={{ flex:1, justifyContent: 'center'}}>
                                    <View style={ styles.boxLayout }>
                                    {this.state.data.map((info, idx) => (
                                        <ProductImage 
                                            prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                            clientPrdId={ showCase.clientPrdId }
                                            prdImgCateId={ info.prdTypeImgCateId }
                                            uri={ this.state.defaultImg }
                                            index={ idx }
                                        />
                                    ))}
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    ))}
                </CustomBlockWrapper>

                <Footer>
                    <Button onPress={ this._handleAddShowCase }>
                        <Text>추가</Text>
                    </Button>
                    <Button>
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
    }
});

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputShowCase = connect(mapStateToProps, undefined)(InputShowCase);
export default InputShowCase;