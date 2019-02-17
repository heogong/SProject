import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from 'react-native'
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

import Swiper from 'react-native-animated-swiper';

const Slide = ({ title, address }) => (
    <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
        <View style={styles.slide}>
            <Text style={styles.title}>A/S신청</Text>
        </View>
    </View>
);

class ClientMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tab1: false,
        tab2: false,
        tab3: true,
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0}}>
          {/* <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left> */}
          <Body style={{alignItems:'center'}}>
            <Title>쿨리닉</Title>
          </Body>
          {/* <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu" />
            </Button>
          </Right> */}
        </Header>

        <ScrollView>
            <View style={[styles.basicBackgroundColor, {height: 280, elevation: 5}]}>
                <Swiper
                    dots
                    dotsStyle={styles.dotsStyle}
                    dotsColor="rgba(97, 218, 251, 0.25)"
                    dotsColorActive="#FFF"
                    style={styles.pd20}>
                
                    <Slide title="세나정육점1" address="서울시 동작구 대방동1"/>
                    <Slide title="세나정육점2" address="서울시 동작구 대방동2"/>
                    <Slide title="세나정육점3" address="서울시 동작구 대방동3"/>
                    <Slide title="세나정육점4" address="서울시 동작구 대방동4"/>

                </Swiper>
            </View>
            <View style={{backgroundColor : '#EAEAEA', height: 150}}>
                <View style={ styles.secondBox }>
                    <Text style={{textAlign:'center', color:'#28c8f5'}}>매칭된 A/S 업체가 출발했어요.</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                </View>
            </View>
            <View style={{backgroundColor : '#FFF'}}>
                <Text style={{textAlign:'center', color:'#28c8f5'}}>클리닉 사용자 가이드</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
                <Text>aaaaaaaaaaaaaaa</Text>
            </View>
        </ScrollView>

        <Footer>
            <FooterTab>
                <Button vertical active={this.state.tab1} onPress={() => alert("tab1")}>
                    <Icon active={this.state.tab1} name="apps" />
                    <Text>Apps</Text>
                </Button>
                    <Button vertical active={this.state.tab2} onPress={() =>  alert("tab2")}>
                    <Icon active={this.state.tab2} name="camera" />
                    <Text>Camera</Text>
                </Button>
                    <Button vertical active={this.state.tab3} onPress={() =>  alert("tab4")}>
                    <Icon active={this.state.tab3} name="contact" />
                    <Text>Contact</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb15: {
        marginBottom: 20
    },
    basicBackgroundColor: {
        backgroundColor: '#28c8f5'
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
    dotsStyle: {
        borderRadius: 4,
        height: 8,
        marginHorizontal: 4,
        width: 8,
    },
    secondBox : {
        marginLeft : 20, 
        marginRight : 20, 
        paddingTop : 5,
        paddingLeft : 20,
        paddingBottom : 5,
        borderBottomLeftRadius : 5, 
        borderBottomRightRadius : 5, 
        backgroundColor : '#FFF',
        elevation: 10
    }
});

export default ClientMain;