
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import DrawMap from './DrawMap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.566535,
        longitude: 126.97796919999996,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title : 'abc'
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (positon) => {
        this.setState({
          region : {
            ...this.state.region,
            latitude : positon.coords.latitude,
            longitude : positon.coords.longitude
          }
        })
      },
      (error) => {alert(error.message)},
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
    );
  }

  _regionChangeComplete = (region) => {
    console.log("region :", region)

    this.setState({region, title : region.latitude})
  }

  _onPress = () => {
    this.getLocation();
  }

  render() {
    return (
      <View>
        <DrawMap 
          region={ this.state.region }
          onRegionChangeComplete={ this._regionChangeComplete }
        />
       <Button
        onPress={this._onPress}
        title='현재위치'
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
    );
  }
}
