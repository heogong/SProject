import React, { Component } from "react";
import { Image, ImageBackground, Icon, TouchableOpacity, View } from 'react-native'
import { H2, Text, Item, Input,} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import EditProductMst from '~/Main/Functions/EditProductMst';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ProductImage from '~/Main/Components/ProductImage';

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


class ProductShowCase extends Component {
    constructor(props) { 
        super(); 

        this.state = {
            setProductName : false, // 제품명 입력 여부
            productName : null
        };
    }

    static defaultProps = {
        copyBtn : true, // 복사버튼 사용 여부
        viewProduct : false, // 단순 조회 여부
        clientPrdNm : null
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
        EditProductMst(this.props.item.clientPrdId, this.state.productName).then(result => {
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
            <View style={[styles.pd10, {backgroundColor : color.defaultBackColor}]} key={this.props.index}>
                <View style={[styles.mb10, styles.fxDirRow]}>
                    <View style={styles.fx1}>
                        
                        <View style={styles.fx1}>
                            <TouchableOpacity onPress={this.props.handleRemoveShowCase(this.props.index)}>
                                <Image source={require("~/Common/Image/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fx2} />
                    </View>
    
                    <View style={[styles.fx3, styles.justiConCenter, styles.alignItemsCenter]}>
                        <H2 style={[styles.mb5, {color:color.whiteColor}]}>01</H2>
                        <Image source={require("~/Common/Image/license-depart01.png")} style={{height : imageSize, width : imageSize}} />
                    </View>
    
                    <View style={styles.fx1}>
                        <View style={[styles.fx1, styles.alignItemsEnd]}>

                            <TouchableOpacity onPress={this.props.handleAddShowCase} style={styles.mb10}>
                                <Image source={require("~/Common/Image/input-able.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>

                            
                            <TouchableOpacity onPress={this.props.handleCopyShowCase(this.props.index)}>
                                <Image source={require("~/Common/Image/join-end.png")} style={{height : buttonSize1, width : buttonSize1}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fx2} />
                    </View>
                </View>
    
                <View style={[styles.mb10, {alignItems : 'center'}]}>
                    <Text style={[styles.mb5, styles.whiteFont]}>제품 이름을 입력하세요</Text>
                    <Item 
                        regular 
                        style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}
                        error 
                        success={ this.state.setProductName }
                    >
                        <Input 
                            value={ this.props.clientPrdNm }
                            onChangeText={(text) => this._setProductNm(text) }
                            onBlur={this._submitProductNm}
                            style={{fontSize : 12}}
                            placeholder="제품이름" 
                            placeholderTextColor={color.deepGreyColor}
                        />
                    </Item>
                    <Text style={[styles.mb5, styles.whiteFont]}>제품의 간략한 설명을 입력하세요</Text>
                    <Item regular style={[styles.mb5, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 30}]}>
                        <Input 
                            style={{fontSize : 12}}
                            placeholder="제품설명" 
                            placeholderTextColor={color.deepGreyColor}
                        />
                    </Item>
                </View>
    
                <View style={{alignItems : 'center'}}>
                    <Text style={styles.whiteFont}>촬영가이드에 따라 제품의 사진을 찍어주세요</Text>
    
                    <View style={[styles.fx1, {justifyContent : 'center'}]}>
                        <View style={[styles.fxDirRow, styles.justiConBetween, {flexWrap : 'wrap'}]}>

                        {
                            this.props.item.imgTypeArray.map((imgType, idx) => (
                                <ProductImage
                                    key={idx}
                                    clientPrdId={imgType.clientPrdId}
                                    prdTypeImgCateId={imgType.prdTypeImgCateId}
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

const imageSize = wp(35, 0);
const buttonSize1 = wp(8, 0);

export default ProductShowCase;