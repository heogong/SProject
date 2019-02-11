import React, { Component } from 'react';
import { View, UIManager, Platform } from 'react-native';
import { Input, Item, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

import RegCard from '~/FirstScreen/Functions/Card/RegCard';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';

export default class InputCardInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        cardNumber: '',
        vaildTermMonth: '',
        vaildTermYear: '',
        passwd: '',
        birthDay: ''
    };
  }

  scanCard() {
    const config = {
      hideCardIOLogo : true,
      scanInstructions : '와리가리!',
      suppressConfirmation  : true
    }
    CardIOModule
      .scanCard(config)
      .then(card => {
        // the scanned card
        console.log(card);

      })
      .catch(() => {
        // the user cancelled
        console.log("exit");
      })
  }

  // 카드 등록
  _cardRegister = () => {
    RegCard(this.state).then(result => {
      GetCommonData(result, this._cardRegister).then(async resultData => {
        if(resultData !== undefined) {
          console.log(resultData);
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          if(ResultBool) {

          } else {
            alert(resultData.resultMsg);
          }
        }
      });
    });
  }

  // 카드 번호 입력
  _setCardNum = (value) => {
    let resultValue;

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i = 0, len = match.length; i < len; i+=4) {
      parts.push(match.substring(i, i+4))
    }3
    if (parts.length) {
      resultValue = parts.join('-');
    } else {
      resultValue = value;
    }

    this.setState({cardNumber : resultValue})
  }
  
  render() {
    return (
      <CustomBasicWrapper
        title="간편결제 카드 등록"
      >
        <Text>카드번호</Text>
        <Item regular>
          <Input
            onChangeText={(text) => this._setCardNum(text) }
            onKeyPress={this._handleKeyPress }
            value={ this.state.cardNumber }
            placeholder='1234 5678 1234 5678'
            keyboardType='numeric'
            maxLength={19}
          />
        </Item>

        <Text>유효기간</Text>
        <Item regular>
          <Input
            onChangeText={(text) => this.setState({vaildTermMonth : text})}
            value={ this.state.vaildTerm }
            placeholder='유효기간 / 월'
            keyboardType='numeric'
            maxLength={2}
          />
        </Item>

        <Item regular>
          <Input
            onChangeText={(text) => this.setState({vaildTermYear : text})}
            value={ this.state.vaildTerm }
            placeholder='유효기간 / 년'
            keyboardType='numeric'
            maxLength={2}
          />
        </Item>

        <Text>비밀번호</Text>
        <Item regular>
          <Input
            secureTextEntry={ true }
            onChangeText={(text) => this.setState({passwd : text})}
            value={ this.state.passwd }
            placeholder='앞 두자리'
            keyboardType='numeric'
            maxLength={2}
          />
        </Item>

        <Text>생년월일</Text>
        <Item regular>
          <Input
            onChangeText={(text) => this.setState({birthDay : text})}
            value={ this.state.birthDay }
            placeholder='YY/MM/DD'
            keyboardType='numeric'
            maxLength={6}
          />
        </Item>

        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={this.scanCard.bind(this)}>
          <Text>
            카드 스캔
          </Text>
        </CustomButton>

        <CustomButton
          block={ true }
          info={ true }
          bordered={ true }
          onPress={this._cardRegister}>
          <Text>
            다음 단계로 이동(7/9)
          </Text>
        </CustomButton>
      </CustomBasicWrapper>
      
    )
  }
}