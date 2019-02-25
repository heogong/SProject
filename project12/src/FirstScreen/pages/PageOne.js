import React, {Component} from 'react';
import { Image, TouchableOpacity, Keyboard, ScrollView, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";
import { viewportHeight } from '~/Common/Styles/common';

export default class PageOne extends Component {
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    console.log(e);
    alert(viewportHeight);
  }

  _keyboardDidHide() {
    alert('Keyboard Hidden');
    alert(viewportHeight);
  }

  render() {
    return (
      <Container style={{flex: 1,
        paddingLeft: 26,
        paddingRight: 26,
        paddingBottom: 26}}>

              <Input 
                keyboardType='numeric'
                maxLength={19}
                placeholder="카드번호 16자리" 
                placeholderTextColor="#777" 
                fontSize="14"
                onSubmitEditing={Keyboard.dismiss}
              />


      </Container>
     
    )
    
  }
}