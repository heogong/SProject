import React, { Component } from "react";
import { Alert, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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

class JoinSuccess extends Component {
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
            <Title></Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={[styles.mg10, {flex:1}]}>
          <View style={{flex:1, alignItems : 'center', justifyContent : 'center'}}>
            <View>
              <View style={{alignItems : 'center'}}>
                <Image source={require('./img/join-end.png')} resizeMode='center'/>
              </View>
              <View style={{alignItems : 'center'}}>
                <H1>회원가입이</H1>
                <H1>완료되었어요!</H1>
              </View>
            </View>
          </View>
          <View style={{flex:1}}>
            <View style={{flex:1, alignItems : 'center'}}>
              <Text style={styles.greyFont}>결제카드를 등록하고 A/S를 신청해보세요</Text>
            </View>
            <View style={{flex:1, justifyContent : 'center'}}>
              <Button block info onPress={ () => alert("결제카드등록")}>
                <Text>결제카드등록</Text>
              </Button>
            </View>
          </View>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content : {
    marginLeft : 10,
    marginRight : 10
  },
  mb10: {
    marginBottom: 10
  },
  mb15: {
    marginBottom: 15
  },
  mb20: {
    marginBottom: 20
  },
  mg5 : {
    marginTop : 5,
    marginBottom : 5,
    marginLeft : 5,
    marginRight : 5
  },
  mg10 : {
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  },
  redFont : {
    color : '#FF0000',
    fontSize : 15
  }
});

export default JoinSuccess;
