import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Picker,
  Body,
  Text,
  Textarea,
  Thumbnail,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConCenter, styles.mb20]}>
            <Image source={require('./img/intro-logo.png')} resizeMode='contain' style={{width : 132}} />
            <Text style={localStyles.versionTxt}>Coolonic Ver. 1.00</Text>
          </View>
          
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  versionTxt: {
    fontSize: 14,
    color: '#1e1e32',
    top: 100
  }
});

export default Intro;