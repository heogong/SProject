import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-animated-swiper';

class ServiceRequestSwiper extends Component {
    constructor(props) { 
        super(props); 
    
        this.state = {};
    }

    render() {
        return (
        <Swiper
            dots
            dotsColor="rgba(97, 218, 251, 0.25)"
            dotsColorActive="rgba(97, 218, 251, 1)"
            style={styles.slides}>
        
            {this.props.bizList.map((business, idx) =>
                <View style={{alignItems: 'center'}} key={ idx }>
                    <Text>{business.bplaceNm}</Text>
                    <Text>{business.addr.addressName}</Text>
                    <Text>{business.detail.detailAddr1}</Text>
                    <TouchableOpacity
                        onPress={this.props.ListBusinessProduct}
                    >
                        <View style={styles.slide}>
                            <Text style={styles.title}>A/S신청</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            )}
          </Swiper>
        );
    }
}

const styles = {
  slides: { backgroundColor: '#F5FCFF'},
  slide: { 
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      height: 100,
      width: 100,
      backgroundColor: 'pink'
    },
  title: { color: 'black', fontSize: 20 }
};

export default ServiceRequestSwiper;