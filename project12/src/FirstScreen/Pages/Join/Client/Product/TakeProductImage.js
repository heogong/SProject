import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { Container, H1, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

import RegProdImg from '~/Main/Functions/RegProdImg';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


let SOURCE = null;
class TakeProductImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource : null
    };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.takePhotoTapped = this.takePhotoTapped.bind(this);
  }


  // 앨범에서 사진 가져오기
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          SOURCE = { uri: response.uri };
          this._registerProdImage();
      }
    })
  };

  // 촬영
  takePhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {

          SOURCE = { uri: response.uri };
          this._registerProdImage();
      }
    })
  };

  // 촬영한 이미지 API 전송
  _registerProdImage = () => {
    RegProdImg(SOURCE.uri, this.props.clientPrdId, this.props.prdTypeImgCateId).then(result => {
        GetCommonData(result, this._registerProdImage).then(async resultData => {
            console.log("이미지 전송 리턴 :", resultData);
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                if(ResultBool) {

                    this.props.onResult({ 
                      source: SOURCE,
                      resultData : resultData.data
                    });
                    Actions.popTo("InputShowCase");
                } else {
                  alert(resultData.resultMsg);
                }
            }
        });
    });
}

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader/>

        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={styles.mb10}>보유제품사진</H1>
            <Text style={styles.greyFont}>각 제품별 사진 촬영 가이드에 맞추어</Text>
            <Text style={styles.greyFont}>제품의 특징들이 잘 드러나게 촬영해주세요</Text>
          </View>

          <View style={[styles.fx3, {marginLeft : 50, marginRight : 50, marginBottom : 50}]}>
            <ImageBackground
              source={require("~/Common/Image/license-bg01.png")} 
              resizeMode="contain"
              style={[styles.alignItemsCenter, styles.justiConCenter, {height : '100%', width : '100%'}]}
            >

              <TouchableOpacity 
                onPress={Actions.TakeProductGuide1}
                style={[styles.justiConCenter, {
                  height:'80%', width : '70%', 
                  borderColor : color.defaultColor, 
                  borderWidth : 2, 
                  elevation: 2
                }]}>
              <View style={[styles.alignItemsCenter]}>
                <H1 style={{color:color.defaultColor}}>촬영가이드</H1>
                <H1 style={{color:color.defaultColor}}>보러가기</H1>
              </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
          

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this.selectPhotoTapped.bind(this) }
              edgeFill={true}
              backgroundColor={color.whiteColor}
            >
              앨범에서선택하기
            </CustomButton>
            
            <CustomButton 
              onPress={ this.takePhotoTapped.bind(this) }
              edgeFill={true}
              fillTxt={true}
            >
              사진촬영하기
            </CustomButton>
          </View>
        </View>

      </Container>
    );
  }
}

export default TakeProductImage;

