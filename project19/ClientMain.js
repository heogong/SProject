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

import Swiper from 'react-native-swiper';
import { locale } from "core-js";
import { Actions } from "react-native-router-flux";


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
        style={localStyles.topBoxSwiperWrap}
        paginationStyle={{
            bottom: 10
        }} 
        dot={<View style={[localStyles.swiperDot, {backgroundColor: 'rgba(3,151,189, 0.4)'}]} />}
        activeDot={<View style={[localStyles.swiperDot, {backgroundColor: color.whiteColor}]} />}
    >

        <View style={localStyles.topBoxWrap}>
            <View style={styles.mb10}>
                <Text style={localStyles.topBoxNameTxt}>세나정육점</Text>
                <Text style={localStyles.topBoxtAddrTxt}>서울시 대방동</Text>
                <Text style={localStyles.topBoxtAddrTxt}>392-14</Text>
            </View>

            <View style={localStyles.bottomBoxWrap}>

                <View style={localStyles.bottomBoxLeftWrap}>
                    <Image source={require("./img/license-depart01.png")} style={localStyles.leftImg}  />
                </View>

                <View style={localStyles.bottomBoxRightWrap}>
                    <View style={localStyles.rightStateCircle}>
                        <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={localStyles.topBoxWrap}>
            <View style={styles.mb10}>
                <Text style={localStyles.topBoxNameTxt}>세나정육점</Text>
                <Text style={localStyles.topBoxtAddrTxt}>서울시 대방동</Text>
                <Text style={localStyles.topBoxtAddrTxt}>392-14</Text>
            </View>

            <View style={localStyles.bottomBoxWrap}>

                <View style={localStyles.bottomBoxLeftWrap}>
                    <Image source={require("./img/license-depart01.png")} style={localStyles.leftImg}  />
                </View>

                <View style={localStyles.bottomBoxRightWrap}>
                    <View style={localStyles.rightStateCircle}>
                        <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={localStyles.topBoxWrap}>
            <View style={styles.mb10}>
                <Text style={localStyles.topBoxNameTxt}>세나정육점</Text>
                <Text style={localStyles.topBoxtAddrTxt}>서울시 대방동</Text>
                <Text style={localStyles.topBoxtAddrTxt}>392-14</Text>
            </View>

            <View style={localStyles.bottomBoxWrap}>

                <View style={localStyles.bottomBoxLeftWrap}>
                    <Image source={require("./img/product/01_icon_white.png")} style={localStyles.leftImg}  />
                </View>

                <View style={localStyles.bottomBoxRightWrap}>
                    <View style={localStyles.rightStateCircle}>
                        <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                    </View>
                </View>
            </View>
        </View>
    </Swiper>
);

unRegister = () => (
    <View style={localStyles.topBoxWrap}>
        <View style={styles.mb10}>
            <Text style={localStyles.topBoxNameTxt}>제품정보 미등록</Text>
            <Text style={localStyles.topBoxtAddrTxt}>사업장·제품정보를 등록해놓으면</Text>
            <Text style={localStyles.topBoxtAddrTxt}>편리하고 정확한 서비스가 제공됩니다</Text>
        </View>

        <View style={localStyles.bottomBoxWrap}>
            <View style={styles.fx1}>
                <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 36, width: "90%"}]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 14}]}>정보등록하러 이동</Text>
                </Button>

                <View style={localStyles.noRegWrap}>
                    <Text style={localStyles.noRegTxt}>· 사업장 미등록</Text>
                    <Text style={localStyles.noRegTxt}>· 보유제품 미등록</Text>
                </View>
                <Text style={localStyles.percentTxt}>50%</Text>
            </View>
            <View style={localStyles.bottomBoxRightWrap}>
                <View style={localStyles.rightStateCircle}>
                    <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                </View>
            </View>
        </View>
    </View>
);

maching = () => (
    <View style={localStyles.topBoxWrap}>
        <View style={styles.mb5}>
            <Text style={localStyles.topBoxNameTxt}>박형정육점</Text>
            <Text style={localStyles.topBoxtAddrTxt}>서울시 동작구 대방동</Text>
            <Text style={localStyles.topBoxtAddrTxt}>392-45 넥서스힐</Text>
        </View>

        <View style={localStyles.bottomBoxWrap}>

            <View style={localStyles.bottomBoxLeftWrap}>
                <Text style={localStyles.prdNameTxt}>[ 야채보관냉장고123 ]</Text>
                <Image source={require("./img/product/01_icon_white.png")} style={[localStyles.leftImg, {alignSelf: "center", height: 90, width: 90}]}  />
            </View>

            <View style={localStyles.bottomBoxRightWrap}>
                <View style={[localStyles.rightStateCircle, {backgroundColor: "#0397bd"}]}>
                    <Text style={[localStyles.rightStateTxt, {color: color.whiteColor}]}>매칭중</Text>
                </View>
            </View>
        </View>
    </View>
);

  render() {
    return (
    <Container style={{flex: 1, backgroundColor: color.defaultColor}}>
        <Header style={[styles.headerM, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}/>
          <Body style={styles.headerCenterWrap}>
            <View style={styles.headerTitleTxt}>
                <Image source={require("./img/Logo_main.png")} resizeMode="contain" style={styles.headerLogoImg} />
            </View>
          </Body>
          <Right style={styles.headerRightWrap}/>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
                
            {this.unRegister()}
            {/* {this.maching()} */}
            {/* {this.drawSwiper()} */}

            <View style={{backgroundColor : '#d6f1ff'}}>
                <View style={[styles.boxShadowTopNo, localStyles.secondBox]}>
                    <Text style={localStyles.asMatchStateDscTxt}>매칭된 A/S 업체가 출발했어요.</Text>
                    <View style={styles.fxDirRow}>
                        <View style={localStyles.asMatchIconWrap}>
                            {/* 
                            <Image source={require("./img/user_as_step_icon/Default/as_wait_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                             */}
                             <Image source={require("./img/user_as_step_icon/Step_on/as_wait_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={[localStyles.asMatchStateTxt, {color: "#0397bd"}]}>A/S 대기</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/user_as_step_icon/Default/as_start_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 출발</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/user_as_step_icon/Default/as_arrive_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 도착</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/user_as_step_icon/Default/as_progress_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 진행</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/user_as_step_icon/Default/as_complete_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 완료</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={localStyles.guideWrap}>
                <Text style={localStyles.guideTitleTxt}>쿨리닉</Text>
                <Text style={localStyles.guideTitleTxt}>사용자 가이드</Text>
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
      </Container>
    );
  }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}
  
const afterServiceBtnSize = wp(33, 30);
const stateImgSize = wp(15, 52);

const localStyles = StyleSheet.create({
    topBoxSwiperWrap: {
        height: 290,
    },
    swiperDot: {
        width: 12,
        height: 12,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    topBoxWrap: {
        width: "100%",
        paddingLeft: 27,
        paddingRight: 27,
        paddingTop: 27,
        paddingBottom: 27
    },
    topBoxNameTxt: {
        marginBottom: 16,
        color : color.whiteColor,
        fontSize: 28,
        fontWeight: "bold"
    },
    topBoxtAddrTxt: {
        color : color.whiteColor,
        fontSize: 14        
    },
    bottomBoxWrap: {
        flexDirection: "row",
        marginTop: 10
    },
    bottomBoxLeftWrap: {
        
    },
    bottomBoxRightWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    rightStateCircle: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100, 
        height: 110, 
        width: 110, 
        backgroundColor : color.whiteColor,
    },
    rightStateTxt: {
        color : color.defaultColor,
        fontSize: 22,
        fontWeight: "bold"
    },
    leftImg: {
        height : 110,
        width : 110
    },
    percentTxt: {
        fontSize: 40,
        fontWeight: "bold"
    },
    noRegWrap: {
        marginTop: 10,
        marginBottom: 5
    },
    noRegTxt: {
        fontSize: 13
    },
    dotsStyle: {
        borderRadius: 12,
        height: 12,
        width: 12,
        marginHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: "#000",

    },
    prdNameTxt: {
        marginBottom: 10,
        fontSize: 13, 
        color: color.whiteColor,
        textAlign: "center",
        fontWeight: "bold"
    },
    secondBox : {
        marginBottom : 24,
        marginLeft : 24, 
        marginRight : 24, 
        paddingTop : 18,
        paddingBottom : 18,
        paddingLeft : 24,
        paddingRight: 24,
        borderBottomLeftRadius : 5, 
        borderBottomRightRadius : 5, 
        backgroundColor : color.whiteColor
    },
    asMatchStateDscTxt: {
        marginBottom: 15,
        textAlign:'center',
        color: "#0397bd",
        fontWeight: "bold",
        fontSize: 16
    },
    asMatchIconWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    asMatchStateTxt: {
        fontSize : 12,
        color: "#1e1e32",
        fontWeight: "bold",
        marginTop: 10
    },
    guideWrap: {
        padding: 22,
        backgroundColor : color.whiteColor
    },
    guideTitleTxt: {
        fontSize: 22,
        color: "#0397db",
        fontWeight: "bold",
    },
});

const dotActiveStyle = [localStyles.dotsStyle, { backgroundColor: color.whiteColor }];

export default ClientMain;