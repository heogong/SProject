import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class DrawMap extends Component {
    constructor(props) {
      super(props);

      this.state = {
      };
    }

    static defaultProps = {
        lat : '37.566535',
        lng : '126.97796919999996',
        makerYn : true,
        
    }
    render() {
        return (
            <View style={ styles.container }>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={ styles.map }
                    region={{
                        latitude: Number(this.props.lat),
                        longitude: Number(this.props.lng),
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034,
                    }}
                    >
                    <Marker
                        coordinate={{
                            latitude: Number(this.props.lat),
                            longitude: Number(this.props.lng)
                        }}
                        pinColor="red"
                        opacity={(this.props.makerYn == true)? Number(1) : Number(0)}
                    />
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});

export default DrawMap;