
import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Icon } from 'native-base';

import CardView from 'react-native-cardview';
import ImageOverlay from "react-native-image-overlay";

export default class Example2 extends Component {
  render () {
    return (
      <View>
        <ImageOverlay 
          source={{ uri:"https://github.com/gaddafirusli/react-native-image-overlay/raw/master/image/header.png" }} 
          overlayAlpha={0.5}
          contentPosition="center"
        >
          <View stlye={{ width : 50 }}>
              <Button transparent bordered info style={{ marginBottom: 20, marginLeft: 10 }}>
                <Icon active name="md-eye" />
                <Text>조회</Text>
              </Button>
              <Button transparent bordered info style={{ marginBottom: 20, marginLeft: 10 }}>
                <Icon active name="md-trash" />
                <Text>삭제</Text>
              </Button>
          </View> 
        </ImageOverlay>
      </View>
    )
  }
}