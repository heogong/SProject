import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // 
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class DrawMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={ this.props.region }
          onRegionChangeComplete={ this.props.onRegionChangeComplete }
        // onUserLocationChange={ this.props.onUserLocationChange }
          showsUserLocation={ true }
          showsMyLocationButton={true}
        >
        </MapView>
   </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
