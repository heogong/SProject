import React, { Component } from "react";
import { Image, ImageBackground, View } from 'react-native'
import { Container, H1, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerBizLicense from '~/FirstScreen/Functions/RegPartnerBizLicense';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


let SOURCE = null;
class TakeBizLicense extends Component {
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
          this._regBizLicense();
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
          this._regBizLicense();
      }
    })
  };

   // 사업자등록증 API 호출
   _regBizLicense = () => {
    RegPartnerBizLicense(SOURCE.uri).then(result => {
      GetCommonData(result, this._regBizLicense).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {
            Actions.JoinInputPartnerInfo({data : resultData.data});
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
            <H1 style={styles.mb10}>사업자등록증사진</H1>
            <Text style={styles.greyFont}>사업자등록번호와 기업명, 대표이름 등</Text>
            <Text style={styles.greyFont}>글씨가 잘 보이도록 촬영 또는 스캔해주세요</Text>
          </View>

          <View style={styles.fx3}>
            <ImageBackground
              source={require("~/Common/Image/license-bg01.png")} 
              resizeMode="contain"
              style={[styles.alignItemsCenter, styles.justiConCenter, {height : 'auto', width : '100%'}]}> 
                <Image source={require("~/Common/Image/license-bg02.png")} 
                  style={{height:'80%', width : '60%'}}
                  resizeMode="contain"
                />
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

export default TakeBizLicense;
