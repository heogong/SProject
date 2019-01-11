import React, { Component } from 'react';
import { CameraRoll, ImageBackground, View, Image,
  PixelRatio,
  StyleSheet,
  TouchableOpacity } from 'react-native';
import { Input, Item, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerBizLicense from '~/FirstScreen/Functions/RegPartnerBizLicense';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class InputBizLicense extends Component {
    constructor(props) {
      super(props);

      this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
      this.takePhotoTapped = this.takePhotoTapped.bind(this);
      
      this.state = {
          bizLicense : '',
          btnDisabled : true,
          avatarSource : null
      };
    }

  // NEXT : 파트너 제품 선택
  _nextPress = () => {
    this._regBizLicense();
  }

  // 사업자등록증 API 호출
  _regBizLicense = () => {
    RegPartnerBizLicense(this.state.avatarSource.uri).then(result => {
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
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            avatarSource: source,
            btnDisabled : false
          });
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
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          this.setState({
            avatarSource: source,
            btnDisabled : false
          });
      }
    })
  };

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="사업자등록증 입력"
      >
        <View style={styles.container}>
          <Image  resizeMode="contain" style={styles.avatar} source={this.state.avatarSource} />
        </View>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ this.selectPhotoTapped.bind(this) }>
          <Text>
            앨범에서 선택
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ this.takePhotoTapped.bind(this) }>
          <Text>
            사업자등록증 스캔
          </Text>
        </CustomButton>
        <CustomButton
          block={ true }
          info={ true }
          onPress={ this._nextPress }
          disabled={ this.state.btnDisabled }>
          <Text>
            다음단계로 이동 (1/5)
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
});

export default InputBizLicense;