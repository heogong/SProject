import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Thumbnail,
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

class AfterServiceState extends Component {
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
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:1, alignItems: 'center'}}>
            <Title>A/S현황</Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={{flex:1}}>
            <View style={ [styles.basicBackgroundColor, {flex : 2}] }>
                <View style={[styles.stateBox, {flexDirection : 'row', height : '51%', zIndex : 1}]}>

                    <View style={{flex:2}}>
                        <H2 style={{color:'#28c8f5'}}>세나정육점</H2>
                        
                        <View style={styles.mb15}></View>

                        <Text>육류용 냉장고</Text>
                        <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                        <Text style={styles.greyFont}>bbbbbbbbbbb</Text>

                        <View style={styles.mb20}></View>
                    </View>

                    <View style={{flex:1}}>
                        <Thumbnail square large source={require('./img/license-depart01.png')} />
                    </View>
                </View>
                <View style={[styles.stateBox, {flexDirection : 'column', height : '50%', borderTopColor : '#fff'}]}>
                    <Text>참고사항</Text>
                    <Text style={styles.greyFont}>
                        레이아웃 구성하는데 하루종일 걸리네 나 너무 힘드네 
                        돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                        돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                        돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                    </Text> 
                </View>
            </View>

            <View style={[styles.basicBackgroundColor, {flex:1}]}>
                <View style={ [styles.secondBox, {height : secondHeight}] }>
                    <Text style={{textAlign:'center', color:'#28c8f5'}}>파트너와 A/S 매칭 중입니다.</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                    <Text>aaaaaaaaaaaaaaa</Text>
                </View>
            </View>

            <View style={[styles.basicBackgroundColor, styles.pd20, {flex:1, flexDirection:'row', alignItems : 'center'}]}>
                <View style={[styles.serviceBox, {backgroundColor : '#FFF'}]}>
                </View>
                <View style={[styles.serviceBox, {backgroundColor : '#FFF'}]}>
                </View>
                <View style={[styles.serviceBox, {backgroundColor : '#FFF'}]}>
                </View>
            </View>
        </View>

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

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const layoutCount = 4;

const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height / layoutCount;
const horizontalMargin = wp(2);
const slideWidth = wp(24);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const secondHeight = viewportHeight * 0.7; // 상태 box 높이


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb15: {
        marginBottom: 15
    },
    mb20: {
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
    stateBox : {
        marginLeft : 20, 
        marginRight : 20,
        paddingTop : 20,
        paddingLeft : 20,
        backgroundColor : '#FFF'
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
    },
    serviceBox: {
        width: itemWidth,
        height: itemWidth,
        paddingHorizontal: horizontalMargin,
        borderRadius : 5,
        marginRight : 10,
        elevation: 10
        // other styles for the item container
    },
    greyFont : {
        color : '#BDBDBD',
        fontSize : 15
    }
});

export default AfterServiceState;