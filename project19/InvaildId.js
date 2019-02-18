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
  Tab,
  Tabs,
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

class InvaildId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false,
      findId : false,
      tabIndex : 0
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

          <View style={{flex:1}}>
            <H1>본인 인증하고</H1>
            { (this.state.tabIndex == 0 ) ? (
              <H1>아이디를 찾으세요</H1>
            ) : (
              <H1>비밀번호를 찾으세요</H1>
            )}
          </View>

          <View style={{flex:3}}>
            <Tabs
              onChangeTab={(obj, ref) => this.setState({tabIndex : obj.i}) }
            >
              <Tab 
                heading="아이디찾기" 
                activeTabStyle={{backgroundColor:'#28c8f5'}} 
                tabStyle={{ backgroundColor:'#d6f1ff'}}
                textStyle={{color:'#28c8f5'}}
                activeTextStyle={{color:'#fff'}}
              >
              { (!this.state.findId) ? (
                <View style={[styles.pd20, {flex :1, paddingTop : 35, backgroundColor : '#28c8f5'}] }>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
                    <Input 
                      style={{fontSize : 12}}
                      placeholder="이름" 
                    />
                  </Item>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
                    <Input 
                      style={{fontSize : 12}}
                      placeholder="핸드폰번호(하이픈 -제외하고 입력)" 
                    />
                  </Item>

                  <View style={{flexDirection : 'row'}}>
                    <View style={{width : '60%', paddingRight : 10}}>
                      <Item regular style={{backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}}>
                        <Input 
                          style={{fontSize : 12}}
                          placeholder="인증번호입력" />
                      </Item>
                    </View>
                    <View style={{width: '40%'}}>
                      <Button block info 
                        onPress={ () => alert("인증번호전송")}
                        style={{
                          height : inputHeight,
                          borderColor : '#fff',
                          borderTopWidth : 1,
                          borderBottomWidth : 1,
                          borderLeftWidth : 1,
                          borderRightWidth : 1, 
                          elevation:0
                        }} >
                        <Text style={{fontSize : 12}}>인증번호전송</Text>
                      </Button>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.whiteFont}>유효한 인증번호입니다.</Text>
                  </View>
                </View>

              ) : (
                <View style={{flex : 1, backgroundColor : '#28c8f5', justifyContent : 'center', alignItems : 'center'}}>
                  <Text style={styles.whiteFont}>박정진님은 가입되어 있으며</Text>
                  <Text style={styles.whiteFont}>회원님의 아이디는 어쩌구젖구</Text>
                  <Text style={styles.whiteFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                </View>
              )}
                
              </Tab>

              <Tab heading="비밀번호찾기" 
                activeTabStyle={{backgroundColor:'#28c8f5'}} 
                tabStyle={{ backgroundColor:'#d6f1ff'}}
                textStyle={{color:'#28c8f5'}}
                activeTextStyle={{color:'#fff'}}>
                <View style={[styles.pd20, {flex :1, paddingTop : 35, backgroundColor : '#28c8f5'}] }>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
                    <Input 
                      style={{fontSize : 12}}
                      placeholder="이메일 아이디" 
                    />
                  </Item>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
                    <Input 
                      style={{fontSize : 12}}
                      placeholder="이름" 
                    />
                  </Item>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}]}>
                    <Input 
                      style={{fontSize : 12}}
                      placeholder="핸드폰번호(하이픈 -제외하고 입력)" 
                    />
                  </Item>

                  <View style={{flexDirection : 'row'}}>
                    <View style={{width : '60%', paddingRight : 10}}>
                      <Item regular style={{backgroundColor:'#fff', borderColor : '#fff', height : inputHeight}}>
                        <Input 
                          style={{fontSize : 12}}
                          placeholder="인증번호입력" />
                      </Item>
                    </View>
                    <View style={{width: '40%'}}>
                      <Button block info 
                        onPress={ () => alert("인증번호전송")}
                        style={{
                          height : inputHeight,
                          borderColor : '#fff',
                          borderTopWidth : 1,
                          borderBottomWidth : 1,
                          borderLeftWidth : 1,
                          borderRightWidth : 1, 
                          elevation:0
                        }} >
                        <Text style={{fontSize : 12}}>인증번호전송</Text>
                      </Button>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.whiteFont}>유효한 인증번호입니다.</Text>
                  </View>

                </View>
              </Tab>
            </Tabs>
          </View>

          <View style={{flex:1, justifyContent : 'center'}}>

          { 
            (this.state.tabIndex == 0) ? (
              (!this.state.findId) ? (
                <Button block info bordered 
                  onPress={ () => this.setState({findId : true})}
                  style={{
                    elevation:0
                  }} >
                  <Text>확인</Text>
                </Button>
              ) : (
                <Button block info bordered 
                  onPress={ () => this.setState({findId : false})}
                  style={{
                    elevation:0
                  }} >
                  <Text>로그인하기</Text>
                </Button>
              )
            ) : (
              <Button block info bordered 
                onPress={ () => alert("비밀번호 확인")}
                style={{
                  elevation:0
                }} >
                <Text>비밀번호 확인</Text>
              </Button>
            )
          }
           </View>
        </View>

      </Container>
    );
  }
}

const layoutCount = 5; // 화면 분할 개수 사이즈
const viewportHeight = Dimensions.get('window').height;

const inputHeight = (viewportHeight / layoutCount) * 0.3;

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
  pd10 : {
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 10,
    paddingRight : 10
  },
  pd20 : {
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 20,
    paddingRight : 20
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  },
  whiteFont : {
    color : '#FFF',
    fontSize : 15
  },
});

export default InvaildId;
