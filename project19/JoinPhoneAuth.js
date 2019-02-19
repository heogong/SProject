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

class JoinPhoneAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  _reCertNum = () => {
    Alert.alert(
      '',
      '입력한 인증번호가 잘못되었어요!',
      [
        {text: '인증번호 재발송', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
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

          <View style={{flex:1}}>
            <View style={[styles.mb10, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H1>도착한</H1>
                <H1>인증번호를</H1>
                <H1>입력해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                <H1 style={{color:'#28c8f5'}}>01</H1>
              </View>
            </View>

            <View style={{flexDirection : 'row'}}>
              <View style={{flex:1}}>
                <View style={{height : 10, backgroundColor : '#28c8f5'}} />
              </View>
              <View style={{flex:1}}>
                <View style={{height : 10, backgroundColor : '#d6f1ff'}} />
              </View>
              <View style={{flex:1}}>
               <View style={{height : 10, backgroundColor : '#d6f1ff'}} />
              </View>
              
            </View>
            
          </View>

          <View style={{flex:2, justifyContent:'center'}}>
            <View style={{flexDirection : 'row'}}>
              <View style={{width : '60%', paddingRight : 5}}>
                <Item regular style={{height : 50}}>
                  <Input 
                    placeholder="인증번호입력" />
                </Item>
              </View>
              <View style={{width: '40%'}}>
                <Button block info 
                  onPress={ () => alert("인증번호전송")}
                  style={{
                    height : 50,
                    elevation:0
                  }} >
                  <Text>인증번호확인</Text>
                </Button>
              </View>
            </View>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <Button block info onPress={this._reCertNum}>
              <Text>입력완료</Text>
            </Button>
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

export default JoinPhoneAuth;
