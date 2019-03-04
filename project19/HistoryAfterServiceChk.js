import React, { Component } from "react";
import { Image, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
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

import { styles, viewportHeight } from './css/common';
import { color } from './css/color';

class HistoryAfterServiceChk extends Component {
  constructor(props) {
    super(props);

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
            <Title></Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <ScrollView>

          <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>
            <View style={{flex:1}}>
              <H2>A/S 받으신</H2>
              <H2>내역에 대해</H2>
              <H2>확인해보세요</H2>
            </View>
            <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
              <H1 style={{color:'#28c8f5'}}>00</H1>
              <Text>건</Text>
            </View>
          </View>

          <View style={[styles.justiConCenter, styles.alignItemsCenter, {height : emptyFlexSize}]}> 
            <View style={{
                borderStyle : 'dashed',
                borderRadius: 100, 
                borderColor : color.defaultColor, 
                borderWidth : 1,
                height : emptyFlexSize - 160,
                width : emptyFlexSize - 160
            }}>
                <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                    <Image 
                        source={require("./img/license-depart01.png")} 
                        style={{height : '40%', width : '40%'}}  
                    />
                    <Text style={{fontSize:12}}>A/S 서비스를</Text>
                    <Text style={{fontSize:12}}>받은 내역이 없습니다.</Text>
                </View>
                
            </View>
          </View>
        </ScrollView>

      </Container>
    );
  }
}

function hp (percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

const emptyFlexSize = hp(55);

export default HistoryAfterServiceChk;