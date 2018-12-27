import React, { Component } from 'react';
import { ImageBackground, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Text, Icon } from "native-base";

import { SUCCESS_RETURN_CODE } from '../../Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImageOverlay from "react-native-image-overlay";
import RegProdImg from '../Functions/RegProdImg';
import GetCommonData from '../../Common/Functions/GetCommonData';
import CustomButton from '../../Common/Components/CustomButton';

class ProductImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          tempImgUri : '', // 촬영 한 이미지 임시 이미지 데이터
          uri : this.props.uri, // API 호출 후 정상 이미지 데이터
          defaultImg : this.props.uri, // 초기 이미지 데이터
          insertYn : true,
          modifyYn : false,
          deleteYn : false,
          imageTouch : true // 이미지 없을 시 터치 가능 여부
      };
    }

    // 카메라 on
    _handleTakeImage = () => {
      Actions.reactCamera({onResult : this.onResult});
    }

    // 이미지 수정
    _handleImageModify = () => {
        Actions.reactCamera({onResult : this.onResult});
        this.setState({ deleteYn : true, modifyYn : false });
    }

    // 이미지 삭제
    _handleImageDelete = () => {
        this.setState({ uri : this.state.defaultImg , deleteYn : false, modifyYn : true });
    }

    // 이미지 조회
    _handleImageView = () => {
        Actions.ViewImage({imageUri : this.state.uri});
    }

    onResult = async (result) => {
        console.log(result.data);
        await this.setState({tempImgUri : result.data.uri}); // 촬영 한 이미지 임시 저장

        this._registerProdImage();
        
    }

    // 촬영한 이미지 API 전송
    _registerProdImage = () => {
        RegProdImg(this.state.tempImgUri, this.props.clientPrdId, this.props.prdImgCateId).then(result => {
            GetCommonData(result, this._registerProdImage).then(async resultData => {
                console.log("이미지 전송 리턴 :", resultData);
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        console.log("이미지 url:", resultData.data.fileUrl);
                        await this.setState({ uri : resultData.data.fileUrl , deleteYn : true, insertYn : false, imageTouch : false });
                        //await this.setState({ uri : 'https://www.google.com/logos/doodles/2018/holidays-2018-northern-hemisphere-day-1-6271106234187776-s.png' , deleteYn : true, insertYn : false, imageTouch : false });
                    }
                }
            });
        });
    }

    render() {
        return (
            <View key={ this.props.index } style={ styles.box }>
                <View style={ [styles.box ] }>
                    <View style={ styles.innerTitle }>
                        <Text>{ this.props.prdTypeImgCateNm }</Text>
                    </View>

                    { (this.state.imageTouch) ? (
                        <TouchableHighlight onPress={this._handleTakeImage}>
                            <View style={ styles.innerImage }>
                                <ImageBackground source={{ uri: this.state.uri }} style={{width: '100%', height: '100%'}}/>
                            </View>
                        </TouchableHighlight>
                    ) : (
                        <View style={ styles.innerImage }>
                            <ImageOverlay 
                                containerStyle={ styles.innerImage }
                                source={{ uri: this.state.uri }} 
                                overlayAlpha={0.5}
                                contentPosition="center"
                            >
                                <CustomButton 
                                    styleWidth={ false }
                                    block={ true } 
                                    light={ true }
                                    bordered={ true }
                                    onPress={ this._handleImageView }
                                    >
                                    <Icon active name="md-eye" />
                                    <Text>보기</Text>
                                </CustomButton>
                                <CustomButton 
                                    styleWidth={ false }
                                    block={ true } 
                                    light={ true }
                                    bordered={ true }>
                                    <Icon active name="md-trash" />
                                    <Text>삭제</Text>
                                </CustomButton>
                            </ImageOverlay>
                        </View>
                    )
                    } 

                </View>
                {/* <Thumbnail square large source={{uri: this.state.uri}} /> */}
                {/* <Button 
                    onPress={this._handleTakeImage}
                    style={(this.state.insertYn) ? styles.show : styles.hide }>
                    <Icon name='md-camera' />
                    <Text>{this.props.prdTypeImgCateNm}</Text>
                </Button>
                <Button 
                    onPress={this._handleImageModify}
                    style={(this.state.modifyYn) ? styles.show : styles.hide }>
                    <Text>{this.props.prdTypeImgCateNm} 수정</Text>
                </Button>
                <Button 
                    onPress={this._handleImageDelete}
                    style={(this.state.deleteYn) ? styles.show : styles.hide }>
                    <Text>삭제</Text>
                </Button> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        width: 155, 
        height: 155,
        justifyContent: 'center', 
        alignItems:'center'
    },
    innerTitle : {
        width: 80, 
        height: 20
    },
    innerImage : {
        width: 130, 
        height: 130
    },
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});


export default ProductImage;