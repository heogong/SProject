import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-animated-swiper';

export default class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        logo : 'https://post-phinf.pstatic.net/MjAxNzA5MTJfNTUg/MDAxNTA1MjAwMjMwOTY1.r-hkjFV9Hk_35hyO7hyy5dbGS1vJefzbzhJ_-dNsHWcg.QvI6TK8CYLHnwxilPutQgVzAbElzCvkl0oDWUFiD1Agg.JPEG/image_3359637611505200203003.jpg?type=w1200'
    }
  }
  
  render() {
    return (
      <Swiper
          dots
          dotsColor="rgba(97, 218, 251, 0.25)"
          dotsColorActive="rgba(97, 218, 251, 1)"
          style={styles.slides}>
        
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.avatar} source={{uri : this.state.logo}} />
        </View>
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.avatar} source={{uri : this.state.logo}} />
        </View>
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.avatar} source={{uri : this.state.logo}} />
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  slides: { backgroundColor: '#F5FCFF'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
