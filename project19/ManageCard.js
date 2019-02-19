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
        
          <View style={[styles.regCardStyle, styles.mb20, styles.pd15, {flex:1}]}>
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

          <View style={[styles.newCardStyle, styles.pd15, {flex:1}]}>
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
const viewportHeight = Dimensions.get('window').height;
const viewportWidth = Dimensions.get('window').width;

const cardHeight = (viewportHeight / layoutCount) * 0.8;
const iconSize = (viewportWidth - 60) / 7;

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
  mg30 : {
    marginTop : 30,
    marginBottom : 30,
    marginLeft : 30,
    marginRight : 30
  },
  pd10 : {
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 10,
    paddingRight : 10
  },
  pd15 : {
    paddingTop : 15,
    paddingBottom : 15,
    paddingLeft : 15,
    paddingRight : 15
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
  redFont : {
    color : '#FF0000',
    fontSize : 15
  },
  regCardStyle : {
    height : cardHeight, 
    width : '100%',
    backgroundColor : '#d6f1ff',
    borderColor : '#28c8f5',
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  },
  newCardStyle : {
    height : cardHeight, 
    width : '100%',
    borderColor : '#BDBDBD',
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  }
});

export default ManageCard;
