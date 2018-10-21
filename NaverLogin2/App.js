import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';

import Styles from './src/Styles';

import { StackNavigator } from 'react-navigation';
import FirstPage from './src/components/pages/First';
import SecondPage from './src/components/pages/Second';

const startPage = 'First';

type Props = {};
export default class App extends Component<Props> {
  render() {
    const Navigator = StackNavigator({
        First: {
          screen: FirstPage,
          path: 'first',
        },
        Second: {
          screen: SecondPage,
          path: 'second',
        },
      }, {
        initialRouteName: startPage,
        header: null,
        headerMode: 'none',
        navigationOptions: {
          header: null,
        },
    });
    return (
      <View style={{ flex: 1, }}>
        <StatusBar
          barStyle="dark-content"
        />
        <Navigator/>
      </View>
    );
  }
}

