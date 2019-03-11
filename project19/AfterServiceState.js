import React, { Component } from "react";
import { Image, StyleSheet, View } from 'react-native'
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
        map : false
    };
  }

  render() {
    return (
    <Container style={{   
        flex: 1,
        backgroundColor: color.defaultColor
    }}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft : 26, paddingRight : 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>A/S 현황</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>

            
            { (this.state.map) ? (
                <View style={{height : mapSize, backgroundColor : 'skyblue'}}>
                    <Text>MAP</Text>
                </View>
            ) : (
                <View style={localStyles.descBox}>
                    <View style={localStyles.topTxtWrap}>
                        <View style={styles.fx2}>
                            <Text style={localStyles.topTilteTxt}>세나정육점 A/S</Text>
                            <Text style={localStyles.topSubTitleTxt}>육류용 냉장고</Text>
                            <Text style={localStyles.topInfoTxt}>2019년 01월 01일</Text>
                            <Text style={localStyles.topInfoTxt}>증상1. 냉동 온도가 올라가지 않음</Text>
                        </View>
                        <View style={localStyles.topboxImgWrap}>
                            <Image source={require("./img/license-depart01.png")} resizeMode="contain" style={localStyles.topBoxImg}/>
                        </View>
                    </View>

                    <View>
                        <Text style={[localStyles.topSubTitleTxt, {marginTop: 20, marginBottom: 10}]}>참고사항</Text>
                        <Text style={localStyles.topInfoTxt}>참고사항입니다. 123123123123123123123123333333ㅏㅣㅓㅁㄹㅇ라ㅣㅓㄴㅁㅇ라ㅣㅁㅇ너리만ㅇ럼이ㅏ렁닐</Text>
                    </View>
                    
                </View>
            )}

            <View>  
                <View style={localStyles.secondBox}>
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

            <View style={localStyles.serviceBoxWrap}>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    <Text style={localStyles.serviceBoxTxt}>서비스평가</Text>
                </View>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    <Text style={localStyles.serviceBoxTxt}>최근보고서</Text>
                </View>
                <View style={[localStyles.serviceBox]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    <Text style={localStyles.serviceBoxTxt}>이전 A/S 내역</Text>
                </View>
            </View>
        </View>

        <Footer>
            <FooterTab>
                <Button vertical active={this.state.tab1} onPress={() => this.setState({map : false})}>
                    <Icon active={this.state.tab1} name="apps" />
                    <Text>Apps</Text>
                </Button>
                    <Button vertical active={this.state.tab2} onPress={() => this.setState({map : true})}>
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

function hp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

const productImgSize = wp(25,52);
const stateImgSize = wp(13, 52);
const mapSize = hp(26);


const localStyles = StyleSheet.create({
    descBox : {
        backgroundColor : color.whiteColor, 
        borderColor : "#ddd",
        borderBottomWidth : 1,
        marginLeft : 26, 
        marginRight : 26,
        paddingTop : 30,
        paddingBottom : 30,
        paddingLeft : 10,
        paddingRight : 10,
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingLeft: 26,
        paddingRight: 26
    },
    secondBox : {
        marginLeft : 26, 
        marginRight : 26, 
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
    serviceBox: {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : color.whiteColor,
        height : 96,
        width: 96, 
        borderRadius : 5, 
        elevation: 10,
        marginTop: 22
    },
    serviceBoxImg: {
        height : 56,
        width : 56
    },
    serviceBoxTxt: {
        color : "#0397bd",
        fontSize : 13,
        marginTop: 10
    },
    serviceBoxWrap: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft : 26, 
        marginRight : 26, 
    },
    topTxtWrap: {
        flexDirection: "row"
    },
    topTilteTxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: color.defaultColor,
        marginBottom: 24
    },
    topBoxImg: {
        height : 80,
        width : 80
    },
    topboxImgWrap: {
        flex: 1,
        alignItems: "center"
    },
    topSubTitleTxt: {
        alignItems: "center",
        fontSize: 15,
        color: "#1e1e32",
        fontWeight: "bold",
        marginBottom: 10
    },
    topInfoTxt: {
        fontSize: 13,
        color: "#8e8e98"
    }
});

export default AfterServiceState;