import React from 'react';

import { Text, View } from 'react-native';

import Swiper from 'react-native-animated-swiper';

const Example = () => (
  <Swiper
    dots
    dotsColor="rgba(97, 218, 251, 0.25)"
    dotsColorActive="rgba(97, 218, 251, 1)"
    style={styles.slides}>

    

    <Slide2 title="세나정육점1" address="서울시 동작구 대방동1"/>
    <Slide2 title="세나정육점2" address="서울시 동작구 대방동2"/>
    <Slide2 title="세나정육점3" address="서울시 동작구 대방동3"/>
    <Slide2 title="세나정육점4" address="서울시 동작구 대방동4"/>

  </Swiper>
);

const Slide2 = ({ title, address }) => (
    <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
        <View style={styles.slide}>
            <Text style={styles.title}>A/S신청</Text>
        </View>
    </View>
);

const styles = {
   
  slides: { backgroundColor: '#F5FCFF'},
  slide: { 
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      height: 100,
      width: 100,
      backgroundColor: 'red'


    },
  title: { color: 'rgba(97, 218, 251, 1)', fontSize: 20 }
};

export default Example;