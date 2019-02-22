import React, { Component } from "react";
import { Animated, Image, ScrollView, StyleSheet, View } from 'react-native'
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

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

import Swiper from 'react-native-animated-swiper';


const Slide = ({ title, address, index }) => (
    <View style={styles.pd20}>
        <View style={styles.mb10}>
            <H1 style={[styles.mb10, {color : color.whiteColor}]}>{title}</H1>
            <Text style={styles.whiteFont}>{address}</Text>
            <Text style={styles.whiteFont}>{address}</Text>
        </View>

        <View style={styles.fxDirRow}>

            <View style={styles.fx1}>
                <Image source={require("./img/license-depart01.png")} style={{height : afterServiceBtnSize, width : afterServiceBtnSize}}  />
            </View>

            <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                    borderRadius: 100, 
                    height: afterServiceBtnSize, 
                    width: afterServiceBtnSize, 
                    backgroundColor : color.whiteColor,
                }]}>
                    <H2 style={{color : color.defaultColor}}>A/S 신청</H2>
                </View>
            </View>
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

  

drawSwiper = () => (
    <Swiper
        dots
        dotsStyle={localStyles.dotsStyle}
        dotsColor="rgba(97, 218, 251, 0.5)"
        dotsColorActive="#FFF"
        customContainer={localStyles.customSwiperContainer}
        customDotsContainerStyle={localStyles.dotsContainerStyle}
        customSlideWidth={viewportWidth}
    >
        <Slide title="세나정육점1" address="서울시 동작구 대방동1" index={0} />
        <Slide title="세나정육점2" address="서울시 동작구 대방동2" index={1}/>
        <Slide title="세나정육점3" address="서울시 동작구 대방동3" index={2}/>
        <Slide title="세나정육점4" address="서울시 동작구 대방동4" index={3}/>
    </Swiper>
);

unRegister = () => (
    <View style={[styles.pd20, {backgroundColor : color.defaultColor, elevation: 5}]}>
        <View style={[styles.fx2, styles.mb10]}>
            <H1 style={[styles.mb10, {color : color.whiteColor}]}>제품정보 미등록</H1>
            <Text style={styles.whiteFont}>사업장·제품정보를 등록해놓으면</Text>
            <Text style={styles.whiteFont}>편리하고 정확한 서비스가 제공됩니다</Text>
        </View>

        <View style={[styles.fx3, styles.fxDirRow]}>
            <View style={styles.fx1}>
                <Button style={[styles.mb5,{
                    height: 48,
                    borderRadius: 0,
                    elevation: 0,
                    width: "80%",
                    backgroundColor: color.defaultColor,
                    borderWidth: 1,
                    borderColor: color.whiteColor,
                    elevation: 0,
                    shadowOpacity: 0,
                }]}>
                    <Text style={[styles.btnDefaultFillTxt, {
                        fontSize: 12,
                        flex: 1,
                        textAlign: "center",
                        fontWeight: "500"
                    }]}>정보등록하러 이동</Text>
                </Button>

                <Text style={styles.greyFont}>·사업장 미등록</Text>
                <Text style={styles.greyFont}>·보유제품 미등록</Text>
                <H1>50%</H1>
            </View>
            <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                    borderRadius: 100, 
                    height: afterServiceBtnSize, 
                    width: afterServiceBtnSize, 
                    backgroundColor : color.whiteColor,
                }]}>
                    <H2 style={{color : color.defaultColor}}>A/S 신청</H2>
                </View>
                
            </View>
        </View>
    </View>
);

maching = () => (
    <View style={[styles.pd20, {backgroundColor : color.defaultColor, elevation: 5}]}>
        <View style={[styles.fx2, styles.mb10]}>
            <H1 style={[styles.mb10, {color : color.whiteColor}]}>세나정육점1</H1>
            <Text style={styles.whiteFont}>서울시 동작구 대방동</Text>
            <Text style={styles.whiteFont}>대방동 392-45 넥서스힐</Text>
        </View>

        <View style={[styles.fx3, styles.fxDirRow]}>
            <View style={styles.fx1}>
                <Text style={[styles.whiteFont, styles.mb10]}>[야채보관냉장고]</Text>
                <Image source={require("./img/license-depart01.png")} style={{height : afterServiceBtnSize, width : afterServiceBtnSize}}  />
            </View>

            <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <View style={[styles.justiConCenter, styles.alignItemsCenter, {
                    borderRadius: 100, 
                    height: afterServiceBtnSize, 
                    width: afterServiceBtnSize, 
                    backgroundColor : '#0397BD',
                }]}>
                    <H2 style={{color : color.whiteColor}}>매칭 중</H2>
                </View>
                
            </View>
        </View>
    </View>
);

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={styles.fx1}/>
          <Body style={[styles.fx1, styles.alignItemsCenter]}>
            <Title>쿨리닉</Title>
          </Body>
          <Right style={styles.fx1}></Right>
        </Header>

        <ScrollView>
                
            {/* {this.drawSwiper()} */}
            {/* {this.unRegister()} */}
            {this.maching()}

            <View style={{backgroundColor : '#EAEAEA'}}>
                <View style={localStyles.secondBox}>
                    <Text style={[styles.mb10, {textAlign:'center', color: color.defaultColor}]}>매칭된 A/S 업체가 출발했어요.</Text>
                    <View style={styles.fxDirRow}>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 대기</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 출발</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 도착</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 진행</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 완료</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={[styles.pd20, {backgroundColor : color.whiteColor}]}>
                <H1 style={{color : color.defaultColor}}>쿨리닉</H1>
                <H1 style={{color : color.defaultColor}}>사용자 가이드</H1>
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

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
const afterServiceBtnSize = wp(33, 30);
const stateImgSize = wp(10, 52);

const localStyles = StyleSheet.create({
    customSwiperContainer : {
        flex:1,
        backgroundColor : color.defaultColor, 
        elevation: 5
    },
    dotsStyle: {
        borderRadius: 4,
        height: 8,
        marginHorizontal: 4,
        width: 8,
    },
    dotsContainerStyle : {
        paddingLeft : 20,
        // // backgroundColor : 'pink',
        // alignSelf: 'auto',
        // flexDirection: 'row',
        position: 'absolute',
        flexDirection: 'row',
    },
    secondBox : {
        marginBottom : 20,
        marginLeft : 20, 
        marginRight : 20, 
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 20,
        borderBottomLeftRadius : 5, 
        borderBottomRightRadius : 5, 
        backgroundColor : color.whiteColor,
        elevation: 10
    }
});

const dotActiveStyle = [localStyles.dotsStyle, { backgroundColor: color.whiteColor }];

export default ClientMain;