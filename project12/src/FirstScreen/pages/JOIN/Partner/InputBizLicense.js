import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Input, Item, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';

class InputBizLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bizLicense : '',
            btnDisabled : true
        };
      }

  // 카메라 on
  _handleTakeLicense = () => {
    Actions.reactCamera({onResult : this.onResult});
  }
  
  onResult = async (result) => {
    console.log(result.data);
    this.setState({ 
        bizLicense : '1234-5678-90123',
        btnDisabled : false
    });
  }

  // NEXT : 파트너 제품 선택
  _nextPress = () => {
    Actions.JoinInputProdType();
  }

  render() {
    return (
      <CustomBasicWrapper>
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ this._handleTakeLicense }>
          <Text>
            사업자등록증 스캔
          </Text>
        </CustomButton>
        <Item rounded>
            <Input 
              onChangeText={(text) => this.setState({bizLicense : text})}
              value={ this.state.bizLicense }
              placeholder='사업자 번호'
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