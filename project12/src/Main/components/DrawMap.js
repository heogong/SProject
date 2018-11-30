import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class DrawMap extends Component {
    constructor(props) {
      super(props);

      this.state = {

      };
    }
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: Number(this.props.lat),
                        longitude: Number(this.props.lng),
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034,
                    }}
                    >
                    <Marker
                        key="0"
                        coordinate={{
                            latitude: Number(this.props.lat),
                            longitude: Number(this.props.lng)
                        }}
                        pinColor="red"
                    />
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