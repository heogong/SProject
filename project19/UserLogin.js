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
import { stylesReg } from './css/stylesReg';
import { color } from './css/color';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter]}>
            <Image source={require('./img/logo-partner.png')} resizeMode='center' style={{height : logoHeight}} />
          </View>

          <View style={[styles.fx2, styles.alignItemsCenter,{
            marginRight : 10, 
            marginLeft:10, 
            marginBottom:10, 
            paddingTop : 30,
            paddingBottom : 30,
            paddingRight : 30, 
            paddingLeft: 30,
            backgroundColor : color.defaultColor
            }]
          }>

            <Item regular style={[styles.mb15, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 50}]}>
              <Icon active name="mail" style={{color:'#dbdbe9'}}/>
              <Input placeholder="이메일" />
            </Item>

            <Item regular style={[styles.mb15, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 50}]}>
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
                  <View style={[localStyles.snsIcon]}>
                    <Image square small source={require('./img/ico-kakao.png')} 
                    style={{height : snsIconSize, width : snsIconSize}}/>
                  </View>
                </View>

                <View style={{flex:1}}>
                  <View style={[localStyles.snsIcon]}>
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

const logoHeight = (viewportHeight / layoutCount);
const snsIconSize = (viewportWidth / snsDivideCount);


const localStyles = StyleSheet.create({
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
