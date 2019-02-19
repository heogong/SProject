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

class SelectJoinType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : true
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
            <View style={[styles.mb20, {flexDirection : 'row'}]}>
              <View style={{flex:1, justifyContent : 'center'}}>
                <H1>회원가입할</H1>
                <H1>방법을</H1>
                <H1>선택해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end'}}>
                  <Image source={require('./img/join-ico01.png')} style={{height : 100, width : 100}} />
              </View>
            </View>
            <View>
              <Text style={styles.greyFont}>클리닉의 회원이 되시면</Text>
              <Text style={styles.greyFont}>다양한 A/S 관련 서비스를 누릴 수 있습니다</Text>
            </View>
          </View>

          <View style={{flex:2, flexDirection:'row', alignItems : 'center', justifyContent : 'center'}}>
            <View style={{height : itemSize, width : itemSize, backgroundColor : '#28c8f5', marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
              <Image source={require('./img/join-email.png')} resizeMode='contain' style={{height : itemSize - 60, width : itemSize - 60}} />
              <Text style={[styles.whiteFont, {marginTop : 10}]}>이메일</Text>
            </View>
            <View style={{height : itemSize, width : itemSize, backgroundColor : '#28c8f5', marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
              <Image source={require('./img/ico-naver.png')} resizeMode='contain' style={{height : itemSize - 60, width : itemSize - 60}} />
              <Text style={[styles.whiteFont, {marginTop : 10}]}>네이버</Text>
            </View>
            <View style={{height : itemSize, width : itemSize, backgroundColor : '#28c8f5', marginRight : 5, paddingTop : 15,alignItems : 'center'}}>
              <Image source={require('./img/ico-kakao.png')} resizeMode='contain' style={{height : itemSize - 60, width : itemSize - 60}} />
              <Text style={[styles.whiteFont, {marginTop : 10}]}>카카오</Text>
            </View>
          </View>
          
        </View>

      </Container>
    );
  }
}

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const viewportWidth = Dimensions.get('window').width;
const itemSize = wp(28);

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
  mg20 : {
    marginTop : 20,
    marginBottom : 20,
    marginLeft : 20,
    marginRight : 20
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  },
  whiteFont : {
    color : '#FFF',
    fontSize : 15
  }
});

export default SelectJoinType;