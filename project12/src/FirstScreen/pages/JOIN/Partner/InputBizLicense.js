import React, { Component } from 'react';

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';

import { connect } from 'react-redux';
import { Input, Item, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import GetCommonData from '../../../../Common/Functions/GetCommonData';
import RegPartnerBizLicense from '../../../Functions/RegPartnerBizLicense';

class InputBizLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bizLicense : '',
            btnDisabled : true,
            imgUri : ''
        };
      }

  // 카메라 on
  _handleTakeLicense = () => {
    Actions.reactCamera({onResult : this.onResult});
  }
  
  onResult = async (result) => {
    console.log(result.data);

    await this.setState({ imgUri : result.data });

    this._regBizLicense();
  }

  _inputBizLicense = (text) => {
    this.setState({bizLicense : text, btnDisabled : false});
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

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="사업자등록증 입력"
      >
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ this._handleTakeLicense }>
          <Text>
            사업자등록증 스캔
          </Text>
        </CustomButton>
        <Item regular>
            <Input 
              onChangeText={ this._inputBizLicense }
              value={ this.state.bizLicense }
              placeholder='사업자 번호'
              keyboardType='numeric'
            />
        </Item>
        <CustomButton
          block={ true }
          info={ true }
          onPress={ this._nextPress }
          disabled={ this.state.btnDisabled }>
          <Text>
            NEXT
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
    )
  }
}

export default InputBizLicense;