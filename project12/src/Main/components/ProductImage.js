import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { SUCCESS_RETURN_CODE } from '../../Common/Blend';

import { Button, Content, Text, Thumbnail, Icon } from "native-base";
import { Actions } from 'react-native-router-flux';
import RegProdImg from '../Functions/RegProdImg';
import GetCommonData from '../../Common/Functions/GetCommonData';

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

    onResult = async (result) => {
        console.log(result.data);

        await this.setState({tempImgUri : result.data.uri}); // 촬영 한 이미지 임시 저장

        // const data = new FormData();

        // data.append('name', 'testName'); // you can append anyone.
        // data.append('photo', {
        //     uri: result.data.uri,
        //     type: 'image/jpeg', // or photo.type
        //     name: 'testPhotoName'
        // });

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
                        //console.log(resultData);
                        this.setState({ uri : resultData.data.fileUrl , deleteYn : true, insertYn : false});
                    }
                }
            });
        });
    }

    render() {
        return (
            <View key={ this.props.index }>
                <Thumbnail square large source={{uri: this.state.uri}} />
                <Button 
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
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});


export default ProductImage;