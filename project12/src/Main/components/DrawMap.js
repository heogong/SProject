import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class DrawMap extends Component {
    constructor(props) {
      super(props);

    }

    static defaultProps = {
        makerYn : true,             // 마커 보임 여부
        regChangeComplete : false,  // 맵 이동 시 좌표 값 리턴 여부 : 부모 class [resultReg()] 함수 필요
        showMap : true,
    }

    render() {
        return (
            <View style={ styles.container }>
                { (this.props.showMap) ? (
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={ styles.map }
                    region={ this.props.region }
                    onRegionChangeComplete={ this.props.onRegionChangeComplete }
                >
                    <Marker
                        coordinate={{
                            latitude: Number(this.props.region.latitude),
                            longitude: Number(this.props.region.longitude)
                        }}
                        pinColor="red"
                        opacity={(this.props.makerYn == true)? Number(1) : Number(0)}
                    />
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