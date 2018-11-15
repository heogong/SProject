import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../COMMON/components/Button';



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
    let value = '';
    value = keyIn;

    switch(keyIn.length) {
      case 4:
      case 9:
      case 14:
      value += " ";
        break;
      default:
        break;
     }
     
     this.setState({cardNumber : value});
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>카드번호</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          //onChangeText={(text) => this.setState({cardNumber : text})}
          onChangeText={(text) => this.setCardNumber(text)}
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
        />

        <Text>비밀번호</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({passwd : text})}
            value={this.state.passwd}
            placeholder="앞 두자리"
        />

        <Text>생년월일</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({birthDay : text})}
            value={this.state.birthDay}
            placeholder="YYYYMMDD"
        />

        <Button onPress={Actions.JoinInputName}>
          <Text>
           NEXT
          </Text>
        </Button>


      </View>
    )
  }
}