import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Button from '../../COMMON/components/Button';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import CardReg from '../functions/CardReg';

export default class InputCardInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        cardNumber: '',
        vaildTerm: '',
        passwd: '',
        birthDay: ''
    };
  }
  
  
  setCardNumber = keyIn => {
    // let value = '';
    // value = keyIn;

    // switch(keyIn.length) {
    //   case 4:
    //   case 9:
    //   case 14:
    //   value += " ";
    //     break;
    //   default:
    //     break;
    //  }
     
     this.setState({cardNumber : value});
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
        this.setCardInfo(card);

      })
      .catch(() => {
        // the user cancelled
        console.log("exit");
      })
  }

  setCardInfo(cardInfo) {
    this.setState({
      cardNumber : cardInfo.cardNumber,
      vaildTerm : cardInfo.expiryMonth + '/' + cardInfo.expiryMonth
    });
  }

  cardRegister = () => {
    // 카드 등록
    CardReg(this.state).then(result => {
      alert(result.msg);
    });
  }
  
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>카드번호</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({cardNumber : text})}
          //onChangeText={(text) => this.setCardNumber(text)}
          value={this.state.cardNumber}
          placeholder="1234 5678 1234 5678"
          keyboardType='numeric'
          maxLength={19}
        />

        <Text>유효기간</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({vaildTerm : text})}
            value={this.state.vaildTerm}
            placeholder="MM/YY"
            keyboardType='numeric'
        />

        <Text>비밀번호</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({passwd : text})}
            value={this.state.passwd}
            placeholder="앞 두자리"
            keyboardType='numeric'
        />

        <Text>생년월일</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({birthDay : text})}
            value={this.state.birthDay}
            placeholder="YYYYMMDD"
            keyboardType='numeric'
        />

        <Button onPress={this.scanCard.bind(this)}>
          <Text>
           카드 스캔
          </Text>
        </Button>

        <Button onPress={this.cardRegister}>
          <Text>
           NEXT
          </Text>
        </Button>


      </View>
    )
  }
}