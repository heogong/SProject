/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Radar from 'react-native-radar';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      userId : 'some-user-id123',
      latitude : null,
      longitude : null
    }
  }

  componentWillMount() {
    this._getLocation();
  }

  componentDidMount() {

    // identify the user and request permissions
    Radar.setUserId(this.state.userId);
    Radar.setPlacesProvider('facebook');
    Radar.requestPermissions(true);

    // track the user's location once in the foreground
    Radar.trackOnce().then((result) => {
      alert("result");
      console.log(result)
      // do something with result.events, result.user.geofences
    }).catch((err) => {
      alert("err");
      console.log(err)
      // optionally, do something with err
    });

    // start tracking the user's location in the background
    Radar.startTracking();
  }

   // 현재 위치 조회
   _getLocation() {
      navigator.geolocation.getCurrentPosition(
      (positon) => {
          this.setState({
              latitude : positon.coords.latitude,
              longitude : positon.coords.longitude
          })
      },
      // (error) => {alert(error.message)},
      // {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
      );
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{this.state.latitude}</Text>
        <Text style={styles.instructions}>{this.state.longitude}</Text>
      </View>
    );
  }
}

// receive events
Radar.on('events', (result) => {
  alert("events");
  console.log(result);
  // do something with result.events, result.user
});

// receive location updates
Radar.on('location', (result) => {
  alert("location");
  console.log(result);
  // do something with result.location, result.user
});

// receive errors
Radar.on('error', (err) => {
  alert("error");
  console.log(err);
  // do something with err
});

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
