import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, UIManager} from 'react-native';

import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
    UIManager.setLayoutAnimationEnabledExperimental(true);
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
  render() {
    return (
      <View>
        <LiteCreditCardInput 
          onChange={this._onChange} 
          placeholders={
            { number: "1212 4545 7878 9898", expiry: "MM/YY"}
          }
          />
        <TouchableOpacity onPress={this.scanCard.bind(this)}>
          <Text>Scan card!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}