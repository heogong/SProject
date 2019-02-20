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

class ManageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:1, alignItems: 'center'}}>
            <Title>결제카드관리</Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <ScrollView style={styles.mg30}>
        
          <View style={[localStyles.regCardStyle, styles.mb20, styles.pd15, {flex:1}]}>
            <View style={{flex:1, flexDirection : 'row'}}>
              <View style={{flex:1}}>
                <H3>국민카드</H3>
              </View>
              <View style={{flex:1, alignItems :'flex-end'}}>
                <Icon name="close"></Icon>
              </View>
            </View>
            <View style={{flex:3, justifyContent : 'center'}}>
              <Image source={require('./img/join-end.png')} style={{height:iconSize, width : iconSize}}/>
            </View>
            <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
              <Text>****-*****-2046-****</Text>
              <Text style={styles.greyFont}>COOLINIC</Text>
            </View>
          </View>

          <View style={[localStyles.newCardStyle, styles.pd15, {flex:1}]}>
            <View style={{flex:1}}>
              <H3>카드등록</H3>
            </View>
            <View style={{flex:3, alignItems : 'center'}}>
              <Image source={require('./img/join-end.png')} resizeMode='center'/>
            </View>
            <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
              <Text style={styles.greyFont}>COOLINIC</Text>
            </View>
            
          </View>
          
        </ScrollView>

      </Container>
    );
  }
}

const layoutCount = 3;
const cardHeight = (viewportHeight / layoutCount) * 0.8;
const iconSize = (viewportWidth - 60) / 7;

const localStyles = StyleSheet.create({
  regCardStyle : {
    height : cardHeight, 
    width : '100%',
    backgroundColor : color.defaultBackColor,
    borderColor : color.defaultColor,
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  },
  newCardStyle : {
    height : cardHeight, 
    width : '100%',
    borderColor : color.greyColor,
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  }
});

export default ManageCard;
