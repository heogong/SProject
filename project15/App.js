/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import BackgroundTask from 'react-native-background-task'

BackgroundTask.define(() => {
  console.log('Hello from a background task')
  BackgroundTask.finish()
})


class App extends Component {
  componentDidMount() {
    BackgroundTask.schedule()
  }

  render() {
    return (
      <View style={styles.container}>.
        <Text>Hello world</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
