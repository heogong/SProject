import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { color } from '~/Common/Styles/colors';

class DrawMap extends Component {
    constructor(props) {
      super(props);
    }

    static defaultProps = {
        makerYn : true, // 마커 보임 여부
        showMap : true  // 맵 보임 여부      
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: color.defaultBackColor}]}>
                { (this.props.showMap) ? (
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={ styles.map }
                    region={ this.props.region }
                    onRegionChangeComplete={ this.props.onRegionChangeComplete }
                >
                    {(this.props.makerYn) ? (
                        <Marker
                        coordinate={{
                            latitude: this.props.marker.latitude,
                            longitude: this.props.marker.longitude
                        }}
                        pinColor={color.defaultColor}
                        />
                    ): (
                        <View></View>
                    )}
                    
                </MapView>
                ) : (
                    <View></View>
                )}
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