import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: '테스트 중입니다.',
    image: require('./assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

type Props = {};
export default class App extends Component<Props> {
  constructor (Props) {
    super(Props);
    this.state = {
      showRealApp: false
    }
  }
  
  render() {
    _onDone = () => {
      // User finished the introduction. Show real app through
      // navigation or simply by controlling state
      this.setState({ showRealApp: true });
    }
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
    }
  }
}