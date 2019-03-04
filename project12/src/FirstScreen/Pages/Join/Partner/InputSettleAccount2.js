import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import RegSettleAccoutImage from '~/FirstScreen/Functions/RegSettleAccoutImage';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class InputSettleAccount2 extends Component {
  constructor(props) {
      super(props);
      this.state = {
        buttonTitle : '은행 선택',
        selectIndex : 0,
        bankInfo : [
          { text : "데이터가 없습니다.", bankCode : ''}
        ],
        settleAccount: {
          number : '',
          name :'',
        }
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
          this._regSettleAccoutImage();
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
          this._regSettleAccoutImage();
      }
    })
  };


  // 은행정보 가져오기
  _regSettleAccoutImage = () => {
    RegSettleAccoutImage(SOURCE.uri).then(result => {
      GetCommonData(result, this._regSettleAccoutImage).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              if(ResultBool) {
                Actions.JoinInputSettleAccount3();
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
        <CustomHeader />

        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={localStyles.topTitleTxt}>정산계좌 통장사진</H1>
            <Text style={localStyles.topTxt}>계좌번호 및 예금주 등 기본 계좌정보의</Text>
            <Text style={localStyles.topTxt}>글씨가 잘 보이도록 촬영 또는 스캔해주세요</Text>
          </View>

          <View style={styles.fx3}>
            <ImageBackground
              source={require("~/Common/Image/license-bg01.png")} 
              resizeMode="contain"
              style={[styles.alignItemsCenter, styles.justiConCenter, {height : 'auto', width : '100%'}]}> 
              <Image source={require("~/Common/Image/bank-bg02.png")} 
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
    )
  }
}

const localStyles = StyleSheet.create({
  topTitleTxt: {
    marginBottom: 19,
    fontSize: 26,
    color: "#0b2024",
    fontWeight: "bold"
  },
  topTxt: {
    fontSize: 14,
    color: "#8e8e98"
  }
});
export default InputSettleAccount2;