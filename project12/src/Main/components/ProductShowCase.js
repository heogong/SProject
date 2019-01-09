import React, { Component } from "react";
import { Alert, StyleSheet, ImageBackground, View, scrollToEnd } from 'react-native';
import { Button, Card, CardItem, Icon, Item, Input, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import EditProductMst from '~/Main/Functions/EditProductMst';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ProductImage from '~/Main/Components/ProductImage';

class ProductShowCase extends Component {
    constructor(props) { 
        super(); 

        this.state = {
            setProductName : false, // 제품명 입력 여부
            productName : ''
        };
    }

    static defaultProps = {
        copyBtn : true // 복사버튼 사용 여부
    }

    componentDidMount() {
        if(this.props.clientPrdNm !== null) {
            this.setState({ setProductName : true});
        } else {
            this.setState({ setProductName : false});
        }
    }

     // 제품명 입력 여부
    _setProductNm = (text)  => {
        this.setState({productName : text});

        if(text.length > 0) {
            this.setState({ setProductName : true});
        } else{
            this.setState({ setProductName : false});
        }

    }

    // 제품명 업데이트
    _submitProductNm = () => {
        EditProductMst(this.props.clientPrdId, this.state.productName).then(result => {
            GetCommonData(result, this._submitProductNm).then(async resultData => {
                if(resultData !== undefined) {
                    console.log("GetProdImageType : ",resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(!ResultBool) {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            <Card key={this.props.index}>
                <CardItem>
                    <Thumbnail large source={{ uri: this.props.defaultImg }} />
                    {(this.props.index !== 0) ? 
                        <Button onPress={ this.props.handleRemoveShowCase(this.props.index) }>
                            <Text>삭제</Text>
                        </Button>
                    :
                        <View></View>
                    }
                </CardItem>
                <CardItem>
                    <Item error success={ this.state.setProductName }>
                        <Input
                            value={ this.props.productName }
                            placeholder='제품명을 입력하세요.'
                            onChangeText={(text) => this._setProductNm(text) }
                            onBlur={this._submitProductNm}
                            // autoFocus={ true }
                        >
                            {this.props.clientPrdNm}
                        </Input>
                        {(this.state.setProductName) ? <Icon name='checkmark-circle' /> : <Icon name='close-circle' />}
                    </Item>
                </CardItem>
                <CardItem cardBody>
                    <View style={{ flex:1, justifyContent: 'center'}}>
                        <View style={ styles.boxLayout }>
                            {this.props.data.map((info, idx) => (
                                <ProductImage 
                                    prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                    clientPrdId={ this.props.clientPrdId }
                                    clientPrdImgId={ info.clientPrdImgId }
                                    prdImgCateId={ info.prdTypeImgCateId }
                                    uri={ (info.fileUrl !== null) ? info.fileUrl : this.props.defaultImg }
                                    defaultImg={ this.props.defaultImg }
                                    imageTouch={ (info.fileUrl !== null) ? false : true }
                                    index={ idx }
                                />
                            ))}

                        </View>
                    </View>
                </CardItem>
                {(this.props.copyBtn) ? (
                    <Button onPress={ this.props.handleCopyShowCase(this.props.index) }>
                        <Text>복제</Text>
                    </Button>
                ) : (
                    <View></View>
                )
                }
                
            </Card>
        );
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

export default ProductShowCase;