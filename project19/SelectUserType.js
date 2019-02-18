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

class SelectUserTypejs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : true
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <ScrollView style={{flex:1}}>

          <View style={{flex:1, alignItems:'center'}}>
            <Image source={require('./img/intro-logo.png')} resizeMode='center' />
          </View>

          <View style={{flex:1, marginRight : 30, marginLeft:30, justifyContent : 'center', alignItems : 'center'}}>

            <TouchableOpacity  style={[styles.mb10, styles.typeBox]} onPress={ () => alert("USER")}>
              <View style={{alignItems : 'center'}}>
                <H1 style={{color:'#fff', fontWeight:'900'}}>USER</H1>
                <Text style={{color:'#fff', fontSize : 15}}>A/S 서비스를 이용하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.mb20, styles.typeBox]} onPress={ () => alert("PARTNER")}>
              <View style={{alignItems : 'center'}}>
                <H1 style={{color:'#fff', fontWeight:'900'}}>PARTNER</H1>
                <Text style={{color:'#fff', fontSize : 15}}>제품을 수리 하시겠어요?</Text>
              </View>
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={ () => alert("비 회원으로 A/S 신청하기")}>
                <Text style={{color : '#28c8f5', fontSize : 15}}>비 회원으로 A/S 신청하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>

      </Container>
    );
  }
}

const layoutCount = 2;
const viewportHeight = Dimensions.get('window').height;
const itemHeight = (viewportHeight / layoutCount) * 0.25;

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
  typeBox : {
    justifyContent : 'center', 
    height : itemHeight, 
    width : '100%', 
    backgroundColor : '#28c8f5'
  }
});

export default SelectUserTypejs;