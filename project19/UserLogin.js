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

class UserLogin extends Component {
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
        <View style={{flex:1}}>

          <View style={{flex:1, alignItems:'center'}}>
            <Image source={require('./img/logo-partner.png')} resizeMode='center' style={{height : logoHeight}} />
          </View>

          <View style={{
            flex:2,
            alignItems : 'center',
            marginRight : 10, 
            marginLeft:10, 
            marginBottom:10, 
            paddingTop : 30,
            paddingBottom : 30,
            paddingRight : 30, 
            paddingLeft: 30,
            backgroundColor : '#28c8f5'}}>

            <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : 50}]}>
              <Icon active name="mail" style={{color:'#dbdbe9'}}/>
              <Input placeholder="이메일" />
            </Item>

            <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : 50}]}>
              <Icon active name="lock" style={{color:'#dbdbe9'}}/>
              <Input placeholder="비밀번호(영문,숫자,특수문자8-15자)" />
            </Item>


            <View style={{flexDirection : 'row', marginBottom : 10}}> 
              <View style={{width : '25%'}}>
                <View style={{flexDirection : 'row'}}>
                <CheckBox style={{left : 1}} checked={this.state.checkBox} onPress={ 
                  () => this.setState({
                    checkBox : (this.state.checkBox) ? false : true
                  })
                }/>
                <Text style={{paddingLeft : '15%', color:'#fff', fontSize : 13}}>자동로그인</Text>
                </View>
              </View>
              <View style={{width : '75%', alignItems : 'flex-end'}}>
                <TouchableOpacity onPress={ () => alert("아이디와 비밀번호를 잊으셨나요?")}>
                  <Text style={{color:'#fff', fontSize : 13}}>아이디와 비밀번호를 잊으셨나요?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Button block info style={{
                  marginRight : 5,
                  borderColor : '#fff',
                  borderTopWidth : 1,
                  borderBottomWidth : 1,
                  borderLeftWidth : 1,
                  borderRightWidth : 1
                  }} >
                  <Text>회원가입</Text>
                </Button>
              </View>
              <View style={{flex:1}}>
                <Button block info bordered style={{
                  backgroundColor : '#fff',
                  borderColor : '#fff',
                  borderTopWidth : 1,
                  borderBottomWidth : 1,
                  borderLeftWidth : 1,
                  borderRightWidth : 1
                  }}>
                  <Text>로그인</Text>
                </Button>
              </View>
            </View>

            <View style={{marginTop : 20}}>
              <Text style={{color:'#fff', marginBottom : 10}}>SNS LOGIN</Text>

              <View style={{flexDirection : 'row'}}>

                <View style={{flex:1, alignItems : 'flex-end', paddingRight : 20}}>
                  <View style={[styles.snsIcon]}>
                    <Image square small source={require('./img/ico-kakao.png')} 
                    style={{height : snsIconSize, width : snsIconSize}}/>
                  </View>
                </View>

                <View style={{flex:1}}>
                  <View style={[styles.snsIcon]}>
                    <Image square small source={require('./img/ico-naver.png')} 
                    style={{height : snsIconSize, width : snsIconSize}}/>
                  </View>
                </View>

              </View>
              
            </View>
          </View>
          
        </View>

      </Container>
    );
  }
}

const layoutCount = 4; // 화면 분할 개수 사이즈
const snsDivideCount = 12;

const viewportHeight = Dimensions.get('window').height;
const viewportWidth = Dimensions.get('window').width;

const logoHeight = (viewportHeight / layoutCount);
const snsIconSize = (viewportWidth / snsDivideCount);


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
  snsIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : '#fff',
    borderBottomWidth : 1, 
    borderTopWidth : 1,
    borderLeftWidth : 1,
    borderRightWidth : 1,
    height : snsIconSize + 20, width : snsIconSize + 20,
    borderRadius : 5
  }
});

export default UserLogin;
