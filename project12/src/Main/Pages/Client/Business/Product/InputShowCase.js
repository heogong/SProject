import React, { Component } from "react";
import { Alert, StyleSheet, ImageBackground, View, scrollToEnd } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Button, Body, Card, CardItem, Container,  Icon, Footer, FooterTab, Item, Input, Left, Right, Text, Thumbnail, List, ListItem } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetProdImageType from '~/Main/Functions/GetProdImgType'
import RegProductMst from '~/Main/Functions/RegProductMst'
import DelProductMst from '~/Main/Functions/DelProductMst'
import CopyProductMst from '~/Main/Functions/CopyProductMst'
import ProductImage from '~/Main/Components/ProductImage'

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

let DEL_IDX = null; // 제품 삭제 인덱스
let CLIENT_PRODUCT_ID = null; // 제품 복제 아이디
class InputShowCase extends Component {
    constructor(props) {
      super(props);

      this.showCase = null;

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        data : [], // 첫번째 SHOW CASE 이미지 데이터
        productName : false, // 제품명 입력 여부
        addData : [], // 추가/복제 SHOW CASE 이미지 데이터
        newShowCase: [], // 추가/복제 SHOW CASE
        firstclientPrdId : null
      };
    }

    componentWillMount(){
        this._drawProductImageType();
    }

    componentDidMount() {
        this._regProductMst();
    }

    // 제품 이미지 타입 가져오기
    _drawProductImageType = () => {
        //GetProdImageType(this.props.prodTypeId).then(result => {
        GetProdImageType(2).then(result => {
            GetCommonData(result, this._drawProductImageType).then(async resultData => {
                if(resultData !== undefined) {
                    console.log("GetProdImageType : ",resultData);
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
        RegProductMst(this.props.value.bizId, 2).then(result => {
            GetCommonData(result, this._regProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        
                        this.setState({firstclientPrdId : resultData.data.clientPrdId});

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
                            this.setState({ 
                                newShowCase: addClientPrdShowCase,
                                addData: newData
                            });
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

    // showCase 카드 복사
    _handleCopyShowCase = (idx) => () => {
        CLIENT_PRODUCT_ID = (idx !== undefined) ? this.state.newShowCase[idx].clientPrdId : this.state.firstclientPrdId;

        this._copyProductMst();
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

    // 제품 삭제
    _delProductMst = () => {
        DelProductMst(this.state.newShowCase[DEL_IDX].clientPrdId).then(result => {
            GetCommonData(result, this._delProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({ newShowCase: this.state.newShowCase.filter((s, sidx) => DEL_IDX !== sidx) })
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
                            newShowCase: this.state.newShowCase.concat([{ clientPrdId : resultData.data.clientPrdId }]),
                            //defaultImg : "http://img.asiatoday.co.kr/file/2018y/03m/19d/20180319001047295_1521424194_1.jpg?1521424194"
                            addData :  resultData.data.images
                        });

                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품명 입력 여부
    _setProductNm = (text)  => {
        //this.setState({usrId : text});
        console.log(text.length);
        if(text.length > 0) {
            this.setState({ productName : true});
        } else{
            this.setState({ productName : false});
        }
        // this.setState((text.length > 0) ? true : false);
    } 

    _submitProductNm = () => {
        alert("onblur");
    }

    _nextButton = () => {
        Alert.alert(
            '',
            '등록되지 않은 이미지는 어딘가에서 등록 가능 \ 제품을 추가 등록 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => Actions.ClientMain() },
              {text: '네', onPress: () => Actions.InputProdType() },
            ],
            { cancelable: false }
        )
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
                            <Item error success={ this.state.productName }>
                                <Input
                                    value={ this.state.text }
                                    placeholder='제품명을 입력하세요.'
                                    onChangeText={(text) => this._setProductNm(text) }
                                    onBlur={this._submitProductNm}
                                />
                                {(this.state.productName) ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
                            </Item>
                        </CardItem>
                        <CardItem cardBody>
                            <View style={{ flex:1, justifyContent: 'center'}}>
                                <View style={ styles.boxLayout }>
                                {this.state.data.map((info, idx) => (
                                    <ProductImage
                                        prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                        prdImgCateId={ info.prdTypeImgCateId }
                                        clientPrdId={ this.state.firstclientPrdId }
                                        uri={ this.state.defaultImg }
                                        index={ idx }
                                    />
                                ))}
                                </View>
                            </View>
                        </CardItem>
                        <Button onPress={ this._handleCopyShowCase() }>
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
                                    {this.state.addData.map((info, idx) => (
                                        <ProductImage 
                                            prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                            clientPrdId={ showCase.clientPrdId }
                                            prdImgCateId={ info.prdTypeImgCateId }
                                            uri={ (info.fileUrl !== null) ? info.fileUrl : this.state.defaultImg }
                                            index={ idx }
                                        />
                                    ))}
                                    </View>
                                </View>
                            </CardItem>
                            <Button onPress={ this._handleCopyShowCase(idx) }>
                                <Text>복제</Text>
                            </Button>
                        </Card>
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
    }
});

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputShowCase = connect(mapStateToProps, undefined)(InputShowCase);
export default InputShowCase;