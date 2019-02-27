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
        tab1: false,
        tab2: false,
        tab3: true,
        map : false
    };
  }

  drawMap = () => {
    <View style={[styles.fx3, {backgroundColor : 'skyblue'}]}>
        <Text>MAP</Text>
    </View>
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

            {/* {this.drawMap()} */}
            { (this.state.map) ? (
                <View style={[styles.fx3, {backgroundColor : 'skyblue'}]}>
                    <Text>MAP</Text>
                </View>

            ) : (
                <View style={localStyles.descBox}>
                    <View style={[styles.fx2, styles.mb15, styles.fxDirRow]}>
                        <View style={styles.fx2}>
                            <H2 style={[styles.mb10, {color : color.defaultColor}]}>세나정육점 A/S</H2>
                            <Text>육류용 냉장고</Text>
                            <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                            <Text style={styles.greyFont}>bbbbbbbbbbb</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter]}>
                            <Image source={require("./img/license-depart01.png")} resizeMode="contain" style={{height : productImgSize, width : productImgSize}}/>
                        </View>
                    </View>

                    <View style={styles.fx3}>
                        <Text>참고사항</Text>
                        <Text style={styles.greyFont}>
                            레이아웃 구성하는데 하루종일 걸리네 나 너무 힘드네 
                            돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                            돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                            돈벌기가 이렇게 먹고살기 힘들어서 살겄나
                        </Text> 
                    </View>
                    
                </View>
            )}

            <View style={[styles.fx2, styles.basicBackgroundColor, {paddingLeft : 26, paddingRight : 26}]}>
                <View style={localStyles.secondBox}>
                    <Text style={[styles.mb10, {textAlign:'center', color: color.defaultColor}]}>매칭된 A/S 업체가 출발했어요.</Text>
                    <View style={styles.fxDirRow}>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 대기</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 출발</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 도착</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 진행</Text>
                        </View>
                        <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConBetween]}>
                            <Image source={require("./img/input-able.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                            <Text style={{fontSize : 12}}>A/S 완료</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[
                styles.fx2, 
                styles.fxDirRow, 
                styles.alignItemsCenter, 
                {paddingLeft : 26, paddingRight : 26}
            ]}>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                    <Text style={{color : color.defaultColor, fontSize : 14}}>서비스평가</Text>
                </View>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                    <Text style={{color : color.defaultColor, fontSize : 14}}>최근보고서</Text>
                </View>
                <View style={[localStyles.serviceBox]}>
                    <Image source={require("./img/join-end.png")} resizeMode="contain" style={{height : serviceImgSize, width : serviceImgSize}} />
                    <Text style={{color : color.defaultColor, fontSize : 14}}>이전 A/S 내역</Text>
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
const serviceImgSize = wp(17, 52);
const serviceHeightBoxSize = hp(25);


const localStyles = StyleSheet.create({
    descBox : {
        flex: 3.5,
        backgroundColor : color.whiteColor, 
        borderColor : color.defaultColor,
        borderBottomWidth : 1,
        marginLeft : 26, 
        marginRight : 26,
        paddingTop : 10,
        paddingLeft : 10,
        paddingRight : 10
    },
    secondBox : {
        paddingTop : 15,
        paddingBottom : 15,
        borderBottomLeftRadius : 5, 
        borderBottomRightRadius : 5, 
        backgroundColor : color.whiteColor,
        elevation: 10
    },
    serviceBox: {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : color.whiteColor,
        height : serviceHeightBoxSize, 
        borderRadius : 5, 
        elevation: 10
    }
});

export default AfterServiceState;