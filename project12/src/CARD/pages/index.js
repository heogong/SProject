import React, { Component } from 'react';
import{ Alert, View, TouchableOpacity } from 'react-native';

import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class CardIndex extends Component {

  _showAlert = () => {
    Alert.alert(
      '',
      '나중에 등록 하시겠습니까?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '네', onPress: () => Actions.ClientIndex() },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <CustomBasicWrapper
        resetPage={ true }
        title="간편결제 카드 등록"
      >
        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ Actions.CardInputInfo }>
          <Text>
            카드 등록
          </Text>
        </CustomButton>
        <View style={{ alignItems : 'center' }}> 
          <TouchableOpacity  onPress={this._showAlert}>
            <Text style={{ color: 'skyblue', fontSize: 13}}>
                나중에 하기
            </Text>
          </TouchableOpacity>
        </View>
      </CustomBasicWrapper>
    )
  }
}