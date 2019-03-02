import React, { Component } from 'react';
import { Image, ImageBackground, Icon, TouchableOpacity, View } from 'react-native'
import { H2, Text, Item, Input,} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImageOverlay from "react-native-image-overlay";

import RegProdImg from '~/Main/Functions/RegProdImg';
import DelProdImage from '~/Main/Functions/DelProdImage';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let SOURCE_URI = null;

class ProductImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          imageTouch : true, // 이미지 없을 시 터치 가능 여부,

          clientPrdImgId: this.props.clientPrdImgId,
          isImage : (this.props.uri !== null) ? true : false,
          sourceUri : this.props.uri
      };
    }

    static defaultProps = {
        imageTouch : true,
        viewProduct : false, // 단순 조회 여부
        clientPrdImgId : null
    }


    // 이미지 삭제
    _handleImageDelete = () => {
        this._delProdImage();
    }

    // 이미지 삭제
    _delProdImage = () => {
        DelProdImage(this.props.clientPrdId, this.state.clientPrdImgId).then(result => {
            GetCommonData(result, this._delProdImage).then(async resultData => {
                //console.log(resultData);
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    
                    if(ResultBool) {
                        this.setState({ 
                            isImage : false
                        });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 촬영 결과 데이터
    _takeOnResult = (result) => {
        console.log("촬영 결과 데이터 source :", result);

        this.setState({
            isImage : true,
            sourceUri : result.source.uri,
            clientPrdImgId : result.resultData.clientPrdImgId
        })

        console.log(result.source.uri);
    }


    render() {
        return (
            (this.state.isImage) ? (
                <View style={[styles.mb10, {width : cameraSize, height : cameraSize}]}>
                    <View>
                        <ImageBackground 
                            style={{width: '100%', height: '100%'}}
                            source={{uri: this.state.sourceUri}}
                        >
                            <View style={[styles.pd10, styles.fx2]}>
                                <TouchableOpacity onPress={ this._handleImageDelete }>
                                    <Image source={require("~/Common/Image/check-on2.png")} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter, {backgroundColor : 'rgba(40, 200, 245, 0.6)'}]}
                                onPress={ () => Actions.TakeProductImage({ 
                                    onResult : this._takeOnResult,
                                    clientPrdId : this.props.clientPrdId,
                                    prdTypeImgCateId :this.props.prdTypeImgCateId
                                }) }>
                                <View>
                                    <Text style={[styles.whiteFont, {fontWeight : '500'}]}>재등록하기</Text>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </View>
            ) : (
                <View style={[styles.pd10, styles.mb10, {width : cameraSize, height : cameraSize, backgroundColor : color.whiteColor}]}>
                    <View style={styles.fx1} />
                        <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                            <TouchableOpacity 
                                onPress={ () => Actions.TakeProductImage({ 
                                    onResult : this._takeOnResult,
                                    clientPrdId : this.props.clientPrdId,
                                    prdTypeImgCateId :this.props.prdTypeImgCateId
                                }) }>
                                <Image source={require("~/Common/Image/ico-camera.png")} resizeMode="center"/>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.fx1} />
                </View>
            )

        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}

// 메인 상품 카드 사이즈
const slideWidth = wp(85, 26);
const itemHorizontalMargin = wp(2, 0);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

// 사진 촬영박스 사이즈
const cameraSize = (45 * itemWidth) / 100;

export default ProductImage;