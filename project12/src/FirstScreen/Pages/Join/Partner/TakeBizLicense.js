import React, { Component } from "react";
import { Image, ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Container, H1, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerBizLicense from '~/FirstScreen/Functions/RegPartnerBizLicense';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


let SOURCE = null;

const OPTIONS = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

class TakeBizLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource : null,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.takePhotoTapped = this.takePhotoTapped.bind(this);
  }


  // 앨범에서 사진 가져오기
  selectPhotoTapped() {
    ImagePicker.launchImageLibrary(OPTIONS, (response) => {
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
    ImagePicker.launchCamera(OPTIONS, (response) => {
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
            this.setState({
              isAlertModal : true,
              resultMsg : resultData.resultMsg
            })
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
          <View style={[styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={localStyles.topTitleTxt}>사업자등록증사진</H1>
            <Text style={localStyles.topTxt}>사업자등록번호와 기업명, 대표이름 등</Text>
            <Text style={localStyles.topTxt}>글씨가 잘 보이도록 촬영해주세요</Text>
          </View>

          <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
            <Image source={require("~/Common/Image/compay_reg_illust.png")} resizeMode="contain" style={localStyles.photoGuideImg} />
          </View>
          

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this.selectPhotoTapped.bind(this) }
              DefaultLineBtn={true}
              CustomBtnStyle={styles.mb5}
            >
              앨범에서 선택하기
            </CustomButton>
            
            <CustomButton 
              onPress={ this.takePhotoTapped.bind(this) }
            >
              사진 촬영하기
            </CustomButton>
          </View>
        </View>
        
        {/* alert 메세지 모달 */}
        <CustomModal
          modalType="ALERT"
          isVisible={this.state.isAlertModal}
          onPress={ () => this.setState({isAlertModal : false})}
          infoText={this.state.resultMsg}
          btnText="확인"
        />

      </Container>
    );
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
  },
  photoGuideImg: {
    width: "80%",
    height: "80%"
  }
});

export default TakeBizLicense;

