import React, { Component } from "react";
import { Image, ImageBackground, View } from 'react-native'
import { Container, H1, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

import GetCommonData from '~/Common/Functions/GetCommonData';
import TakeAfterServiceImg from '~/Main/Functions/TakeAfterServiceImg';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';


let SOURCE = null;

const OPTIONS = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

class TakeBeforeAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertModal : false, //alert 용
      resultMsg : null // alert 결과 메세지
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
          this._takeAfterServiceImg();
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
          this._takeAfterServiceImg();
      }
    })
  };

   // AS 조치전/후 사진 등록 (true : 조치전 이미지 등록)
   _takeAfterServiceImg = () => {
    TakeAfterServiceImg(true, this.props.asPrgsId, SOURCE.uri).then(result => {
        GetCommonData(result, this._takeAfterServiceImg)(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
                if(ResultBool) {
                    //this.setState({imgId : resultData.data.imgId});
                    Actions.RegReportAfterService({asPrgsId : this.props.asPrgsId});
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
        <CustomHeader resetPage={true} />

        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.justiConStart, styles.alignItemsCenter]}>
            <H1 style={styles.mb10}>조치전 이미지 등록</H1>
            <Text style={styles.greyFont}>-------------------------</Text>
            <Text style={styles.greyFont}>-------------------------</Text>
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
              DefaultLineBtn={true}
              CustomBtnStyle={styles.mb12}
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

export default TakeBeforeAfterService;

