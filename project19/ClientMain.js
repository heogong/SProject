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
        style={localStyles.topBoxWrap}
        paginationStyle={{
            bottom: 0, left: null, right: 10
        }} 
        dot={<View style={{backgroundColor: 'rgba(3,151,189, 0.4)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        activeDot={<View style={{backgroundColor: color.whiteColor, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
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
                    <Image source={require("./img/license-depart01.png")} style={localStyles.leftImg}  />
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
                <Image source={require("./img/license-depart01.png")} style={[localStyles.leftImg, {alignSelf: "center", height: 90, width: 90}]}  />
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
            <Title style={styles.headerTitleTxt}>쿨리닉</Title>
          </Body>
          <Right style={styles.headerRightWrap}/>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
                
            {/* {this.unRegister()} */}
            {/* {this.maching()} */}

            {/* {this.drawSwiper()} */}

            <Swiper 
                style={localStyles.topBoxWrap}
                paginationStyle={{
                    bottom: 0, left: null, right: 10
                }} 
                dot={<View style={{backgroundColor: 'rgba(3,151,189, 0.4)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: color.whiteColor, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
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
                            <Image source={require("./img/license-depart01.png")} style={localStyles.leftImg}  />
                        </View>

                        <View style={localStyles.bottomBoxRightWrap}>
                            <View style={localStyles.rightStateCircle}>
                                <Text style={localStyles.rightStateTxt}>A/S 신청</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swiper>

            <View style={{backgroundColor : '#d6f1ff'}}>
                <View style={[styles.boxShadowTopNo, localStyles.secondBox]}>
                    <Text style={localStyles.asMatchStateDscTxt}>매칭된 A/S 업체가 출발했어요.</Text>
                    <View style={styles.fxDirRow}>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                        </View>
                        <View style={localStyles.asMatchIconWrap}>
                            <Image source={require("./img/input-able.png")} style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
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
    topBoxWrap: {
        width: "100%",
        height: 290,
        paddingLeft: 27,
        paddingRight: 27,
        paddingTop: 40
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
        color: "#0397bd",
        fontWeight: "500",
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