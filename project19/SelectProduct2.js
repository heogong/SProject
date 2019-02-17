import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

class SelectProduct2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      checkBox : true
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          </Body>
        </Header>

        <View style={{flex:1}}>

          <View style={[styles.mg10, {flex:1, backgroundColor: 'pink'}]}>
            <Text>수리가</Text>
            <Text>필요한것을</Text>
            <Text>선택해주세요</Text>
          </View>

          <View style={{flex:2, justifyContent : 'center'}}>
            <View style={{paddingVertical: 30}}>
              <View style={[styles.mg10, {backgroundColor : '#28c8f5', height : 5}]}/>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={[styles.slide, styles.mg10, {backgroundColor : '#28c8f5'}]}></View>
              <View style={[styles.slide, styles.mg10, {backgroundColor : '#28c8f5'}]}></View>
              <View style={[styles.slide, styles.mg10, {backgroundColor : '#28c8f5'}]}></View>
              <View style={[styles.slide, styles.mg10, {backgroundColor : '#28c8f5'}]}></View>
            </ScrollView>
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
const viewportHeight = Dimensions.get('window').height;
const horizontalMargin = wp(2);
const itemHeight = viewportHeight * 0.36;
const slideWidth = wp(35);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb15: {
    marginBottom: 20
  },
  pd10 : {
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 10,
    paddingRight : 10
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
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  }
});

export default SelectProduct2;