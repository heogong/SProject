import React, { Component } from "react";
import { Image, ImageBackground, Icon, TouchableOpacity, StyleSheet, View } from 'react-native'
import { H2, Text, Item, Input,} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import EditProductMst from '~/Main/Functions/EditProductMst';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ProductImage from '~/Main/Components/ProductImage';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

class ProductShowCase extends Component {
    constructor(props) { 
        super(); 

        this.state = {
            setProductName : false, // 제품명 입력 여부
            productName : '',
            productDsc : ''
        };
    }

    static defaultProps = {
        copyBtn : true, // 복사버튼 사용 여부
        viewProduct : false // 단순 조회 여부
    }

    componentDidMount() {
        if(this.props.clientPrdNm !== null) {
            this.setState({ setProductName : true });
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
        const { productName, productDsc } = this.state;

        EditProductMst(this.props.item.clientPrdId, productName, productDsc).then(result => {
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
            <View style={localStyles.prdCardWrap}>
                <View style={localStyles.prdCardTopWrap}>
                    <View>
                        {(this.props.index > 0) ? (
                            <TouchableOpacity onPress={this.props.handleRemoveShowCase(this.props.index)}>
                                <Image source={require("~/Common/Image/card_delete_icon.png")} style={localStyles.prdCardTopIconImg} />
                            </TouchableOpacity>
                        ) : (
                            <View style={localStyles.prdCardTopIconImg}/>
                        )}
                    </View>

                    <View style={{flex:3, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={localStyles.prdCardTopNumTxt}>{pad(++this.props.index, 2)}</Text>
                        <Image source={{uri : this.props.item.prdTypeImg}} style={{height : imageSize, width : imageSize}} />
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.props.handleAddShowCase}>
                            <Image source={require("~/Common/Image/card_add_icon.png")} style={[localStyles.prdCardTopIconImg, styles.mb10]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.handleCopyShowCase(this.props.index)}>
                            <Image source={require("~/Common/Image/card_copy_icon.png")} style={localStyles.prdCardTopIconImg} />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={localStyles.prdCardInputWrap}>
                    <Text style={localStyles.prdCardInfoTxt}>제품 이름을 입력하세요</Text>
                    <Item 
                        regular 
                        style={[localStyles.prdCardInputBox, {width: "70%"}]}
                        error 
                        success={ this.state.setProductName }
                    >
                        <Input 
                            onChangeText={(text) => this._setProductNm(text) }
                            onBlur={this._submitProductNm}
                            placeholder="제품이름" 
                            style={localStyles.prdCardNameInput}
                            placeholderTextColor="#8e8e98"
                        >
                            {this.props.clientPrdNm}
                        </Input>
                    </Item>
                    <Text style={localStyles.prdCardInfoTxt}>제품의 간략한 설명을 입력하세요</Text>
                    <Item regular style={localStyles.prdCardInputBox}>
                        <Input 
                            onChangeText={(text) => this.setState({productDsc : text})}
                            onBlur={this._submitProductNm}
                            style={localStyles.prdCardDscInput}
                            placeholder="제품설명" 
                            placeholderTextColor="#8e8e98"
                        >
                            {this.props.clientPrdDsc}
                        </Input>
                    </Item>
                </View>
    
                <View style={styles.alignItemsCenter}>
                    <Text style={styles.whiteFont}>촬영가이드에 따라 제품의 사진을 찍어주세요</Text>
    
                    <View style={localStyles.prdCardPhotoWrap}>
                        <View style={localStyles.prdCardPhoto}>

                        {
                            this.props.item.imgTypeArray.map((imgType, idx) => (
                                <ProductImage
                                    key={idx}
                                    clientPrdId={imgType.clientPrdId}
                                    prdTypeImgCateId={imgType.prdTypeImgCateId}
                                    prdTypeImgCateNm={imgType.prdTypeImgCateNm}
                                    uri={imgType.fileUrl}
                                    clientPrdImgId={imgType.clientPrdImgId}
                                />
                            ))
                        }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}

const imageSize = wp(40, 0);

const localStyles = StyleSheet.create({
      prdCardWrap: {
        padding: 17,
        backgroundColor : "#7be6fd",
        marginBottom: 26
      },
      prdCardTopWrap: {
        marginBottom: 10,
        flexDirection: "row"
      },
      prdCardTopIconImg: {
        width: 36,
        height: 36
      },
      prdCardTopNumTxt: {
        fontSize: 36,
        color: "#038dbd",
        fontWeight: "bold",
        marginBottom: 16
      },
      prdCardInfoTxt: {
        fontSize: 14,
        color: color.whiteColor,
        marginBottom: 8
      },
      prdCardInputWrap: {
        alignItems : 'center'
      },
      prdCardInputBox: {
        marginBottom: 20,
        backgroundColor: color.whiteColor,
        borderColor : color.whiteColor,
        height : 32
      },
      prdCardNameInput: {
        fontSize : 14,
        textAlign: "center",
      },
      prdCardDscInput: {
        fontSize : 13,
        textAlign: "center",
      },
      prdCardPhotoWrap: {
        flex: 1,
        justifyContent : 'center'
      },
      prdCardPhoto: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
});


export default ProductShowCase;