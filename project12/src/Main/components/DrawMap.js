import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

class DrawMap extends Component {
    constructor(props) {
      super(props);

      this.state = {
        region: {
            latitude: 37.566535,
            longitude: 126.97796919999996,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
        }
      };
    }

    static defaultProps = {
        makerYn : true,             // 마커 보임 여부
        regChangeComplete : false,  // 맵 이동 시 좌표 값 리턴 여부 : 부모 class [resultReg()] 함수 필요
        showMap : true,
        regionChange : false
    }

     // 초기 데이터 1. 리덕스 값 조회 2. 현재 위치 조회 3. default 값 조회 
    componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (pos) => {
                this.setState({ region : { 
                    ...this.state.region,  
                    latitude : pos.coords.latitude,
                    longitude : pos.coords.longitude
                }});
            }
        )
    }

    // 맵 이동 시 좌표 값 리턴
    _onRegionChangeComplete = (region) => {
        this.setState({ region });

        if(this.props.regChangeComplete)
            this.props.resultReg(region);
    }
    
    render() {
        return (
            <View style={ styles.container }>
                { (this.props.showMap) ? (
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={ styles.map }
                    
                    region={ 
                        (this.props.regionChange) ? 
                        {
                            latitude: Number(this.props.lat),
                            longitude: Number(this.props.lng),
                            latitudeDelta: 0.0043,
                            longitudeDelta: 0.0034
                        } : this.state.region 
                    }
                    onRegionChangeComplete={(region) => { this._onRegionChangeComplete(region) } }
                >
                    <Marker
                        coordinate={{
                            latitude: Number(this.state.region.latitude),
                            longitude: Number(this.state.region.longitude)
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