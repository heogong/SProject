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

          <View style={{flex:1}}>
            <H1>본인 인증하고</H1>
            <H1>아이디를 찾으세요</H1>
          </View>

          <View style={{flex:3}}>
            <Tabs>
              <Tab 
                heading="아이디찾기" 
                activeTabStyle={{backgroundColor:'#28c8f5'}} 
                tabStyle={{ backgroundColor:'#d6f1ff'}}
                textStyle={{color:'#28c8f5'}}
                activeTextStyle={{color:'#fff'}}
                >
                <View style={{backgroundColor : '#28c8f5'}}>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : 50}]}>
                    <Input placeholder="이름" />
                  </Item>
                  <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : 50}]}>
                    <Input placeholder="핸드폰번호(하이픈 -제외하고 입력)" />
                  </Item>

                  <View style={{flexDirection : 'row'}}>
                    <View style={{width:'65%'}}>
                      <Item regular style={[styles.mb15, {backgroundColor:'#fff', borderColor : '#fff', height : 50}]}>
                        <Input placeholder="인증번호입력" />
                      </Item>
                    </View>
                    <View style={{width:'35%'}}>
                      <Button block info style={{
                        marginRight : 5,
                        borderColor : '#fff',
                        borderTopWidth : 1,
                        borderBottomWidth : 1,
                        borderLeftWidth : 1,
                        borderRightWidth : 1
                        }} >
                        <Text>인증번호전송</Text>
                      </Button>
                    </View>

                  </View>
                </View>
              </Tab>
              <Tab heading="비밀번호찾기" 
                activeTabStyle={{backgroundColor:'#28c8f5'}} 
                tabStyle={{ backgroundColor:'#d6f1ff'}}
                textStyle={{color:'#28c8f5'}}
                activeTextStyle={{color:'#fff'}}>
              <Text>bbbbbbbbbbbbbbbbbbbbbbbb</Text>
              </Tab>
            </Tabs>
          </View>

          <View style={{flex:1}}>
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

export default InvaildId;
