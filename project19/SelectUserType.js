import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
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
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <Image source={require('./img/intro-logo.png')} style={{width: '100%', height: '100%'}} />
          </View>
          <View style={{flex:1}}>

          </View>
        </View>

      </Container>
    );
  }
}

const viewportWidth = Dimensions.get('window').width;
const imageSize = viewportWidth / 3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#28c8f5"
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
  }
});

export default SelectUserTypejs;