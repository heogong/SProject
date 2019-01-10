import React, { Component } from 'react';
import { CameraRoll, ImageBackground, View } from 'react-native';
import { Input, Item, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerBizLicense from '~/FirstScreen/Functions/RegPartnerBizLicense';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class InputBizLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bizLicense : '',
            btnDisabled : true,
            imgUri : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png'
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

  // 앨범에서 사진 가져오기
  _handleAlbumPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        console.log(r);
        //this.setState({ photos: r.edges });
        Actions.ReactCameraAlbum({result : this.onResult, photos: r.edges})
      })
      .catch((err) => {
         //Error Loading Images
    });
  };

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

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="사업자등록증 입력"
      >
        <View style={{flex:1}}>
          <ImageBackground source={{ uri: this.state.imgUri }} style={{width: '100%', height: '100%'}}/>
        </View>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ this._handleAlbumPress }>
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

export default InputBizLicense;