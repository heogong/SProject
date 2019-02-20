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

class FindBusinessAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={[styles.container, {backgroundColor : 'pink'}]}>
        <View style={[styles.mg10, {flex:1}]}>
          <View style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color : color.defaultColor}} />
            </Button>
            <Item regular style={{height : 50}}>
              <Input placeholder="주소입력" />
              <Icon name="ios-search" style={{color : color.defaultColor}}/>
              <Text style={{color : color.greyColor}}>|</Text>
              <Icon name="ios-close" style={{color : color.greyColor}}/>
            </Item>
          </View>

          <View style={{flex:3}} />

          <View style={{flex:1, justifyContent:'center'}}>
            <Button block info>
              <Text>확인</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

export default FindBusinessAddress;
