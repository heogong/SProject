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
import CustomButton from '~/Common/Components/CustomButton';

class InputBizLicense extends Component {
    constructor(props) {
      super(props);

      this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
      
      this.state = {
          bizLicense : '',
          btnDisabled : true,
          avatarSource : null
      };
    }

  // 카메라 on
  _handleTakeLicense = () => {
    Actions.reactCamera({onResult : this.onResult});
  }
  
  onResult = async (result) => {
    console.log("result.data : ",result.data);

    await this.setState({ imgUri : result.data });

    this._regBizLicense();
  }


  // NEXT : 파트너 제품 선택
  _nextPress = () => {
    Actions.JoinInputProdType();
  }

  // 사업장 등록 API 호출
  _regBizLicense = () => {
    RegPartnerBizLicense(this.state.imgUri).then(result => {
      GetCommonData(result, this._regBizLicense).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {
            this.setState({ bizLicense : resultData.companyBusinessNum, btnDisabled : false });
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
          <Image style={styles.avatar} source={this.state.avatarSource} />
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
          onPress={ this._handleTakeLicense }>
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
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 300,
    height: 300,
  },
});

export default InputBizLicense;