import React, { Component } from 'react';
import { Image, ImageBackground, Icon, StyleSheet, TouchableOpacity, View } from 'react-native'
import { H2, Text, Item, Input,} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImageOverlay from "react-native-image-overlay";

import RegProdImg from '~/Main/Functions/RegProdImg';
import DelProdImage from '~/Main/Functions/DelProdImage';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';

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
          sourceUri : this.props.uri,
          isAlertModal : false, // alert 용
          resultMsg : null // alert 용
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
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                }
            });
        });
    }

    // 촬영 결과 데이터
    _takeOnResult = (result) => {
        //console.log("촬영 결과 데이터 source :", result);

        this.setState({
            isImage : true,
            sourceUri : result.source.uri,
            clientPrdImgId : result.resultData.clientPrdImgId
        })
    }


    render() {
        return (
            (this.state.isImage) ? (
                <View style={localStyles.prdCardOnPhotoWrap}>
                    <View>
                        <ImageBackground 
                            style={{width: '100%', height: '100%'}}
                            source={{uri: this.state.sourceUri}}
                        >
                            <View style={[styles.pd10, styles.fx2]}>
                                <TouchableOpacity onPress={ this._handleImageDelete }>
                                    <Image source={require("~/Common/Image/small_delete_button.png")} resizeMode="contain" style={{width: 20, height: 20}} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={localStyles.prdCardPhotoBtnEn}
                                onPress={ () => Actions.TakeProductImage({ 
                                    onResult : this._takeOnResult,
                                    clientPrdId : this.props.clientPrdId,
                                    clientPrdImgId : this.state.clientPrdImgId,
                                    prdTypeImgCateId :this.props.prdTypeImgCateId,
                                    reTeakPicture  : true
                                }) }
                                >
                                <View>
                                    <Text style={localStyles.prdCardPhotoBtnTxt}>재등록하기</Text>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    {/* alert 메세지 모달 */}
                    <CustomModal
                        modalType="ALERT"
                        isVisible={this.state.isAlertModal}
                        onPress={ () => this.setState({isAlertModal : false})}
                        infoText={this.state.resultMsg}
                        btnText="확인"
                    />
                </View>
            ) : (
                <TouchableOpacity  
                    onPress={ () => Actions.TakeProductImage({ 
                        onResult : this._takeOnResult,
                        clientPrdId : this.props.clientPrdId,
                        prdTypeImgCateId :this.props.prdTypeImgCateId
                    }) }>
                    <View style={localStyles.prdCardOffPhotoWrap}>
                        <Image source={require("~/Common/Image/camera_icon.png")}  resizeMode="contain" style={localStyles.prdCardCameraIcon} />
                        <Text style={{fontSize: 14}}>{this.props.prdTypeImgCateNm}</Text>
                    </View>
                </TouchableOpacity>
            )
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}

// 메인 상품 카드 사이즈
const slideWidth = wp(90, 88);
const itemHorizontalMargin = wp(2, 0);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

// 사진 촬영박스 사이즈
const cameraSize = (45 * itemWidth) / 100;

const localStyles = StyleSheet.create({
    prdCardOffPhotoWrap: {
        padding: 10,
        width : cameraSize,
        height : cameraSize,
        backgroundColor : color.whiteColor,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
      },
      prdCardOnPhotoWrap: {
        width : cameraSize,
        height : cameraSize,
        margin: 5
      },
      prdCardPhotoBtnEn: {
        height : 35,
        width : "100%",
        backgroundColor: 'rgba(40, 200, 245, 0.6)'
      },
      prdCardPhotoBtnTxt: {
        fontSize: 14,
        color: color.whiteColor,
        textAlign: "center",
        marginTop: 10
      },
      prdCardCameraIcon: {
        width: 36,
        height: 36
      }
});

export default ProductImage;