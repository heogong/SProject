import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class DrawMap extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: parseFloat(this.props.lat),
                        longitude: parseFloat(this.props.lng),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    >
                </MapView>
            </View>
        )
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
    }
});

export default DrawMap;