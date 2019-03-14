import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
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

import Modal from "react-native-modal";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class AfterServiceState extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalVisible: false,
        map : false
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

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
                            <Image source={require("./img/product/01_icon_white.png")} resizeMode="contain" style={localStyles.topBoxImg}/>
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

            <View style={localStyles.serviceBoxWrap}>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <TouchableOpacity onPress={this._toggleModal}>
                        <Image source={require("./img/service_rating.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    </TouchableOpacity>
                </View>
                <View style={[localStyles.serviceBox, {marginRight : 20}]}>
                    <TouchableOpacity>
                        <Image source={require("./img/recent_report.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    </TouchableOpacity>
                </View>
                <View style={[localStyles.serviceBox]}>
                    <TouchableOpacity>
                        <Image source={require("./img/previous_as.png")} resizeMode="contain" style={localStyles.serviceBoxImg} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    
        <Modal isVisible={this.state.isModalVisible}>
            <View style={[styles.modalWrap, {height: 150}]}>
                <View style={styles.modalContent}>
                    <View style={[styles.modalTop2LTxtWrap, {flex: 2}]}>
                        <Text style={styles.modalTopTxt}>A/S업체의 서비스를 평가해주세요!</Text>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <TouchableOpacity>
                                <Image source={require("./img/Big_bluestar_icon.png")} resizeMode="contain" style={localStyles.starIconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("./img/Big_bluestar_icon.png")} resizeMode="contain" style={localStyles.starIconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("./img/Big_bluestar_icon.png")} resizeMode="contain" style={localStyles.starIconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("./img/Big_graystar_icon.png")} resizeMode="contain" style={localStyles.starIconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("./img/Big_graystar_icon.png")} resizeMode="contain" style={localStyles.starIconImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.modalBtnWrap, {marginBottom: 10}]}>
                        <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                            <Text style={styles.modalBtnFillTxt}>평가완료!</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
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
        color: "#1e1e32",
        fontWeight: "bold",
        marginTop: 10
    },
    serviceBox: {
        flex : 1,
        justifyContent : 'center',
        alignItems : "center",
        marginTop: 22
    },
    serviceBoxImg: {
        height : 96,
        width : 96
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
    },
    starIconImg: {
        width: 32,
        height: 32,
        marginLeft: 2,
        marginRight: 2
    },
    starIconWrap: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    }
});

export default AfterServiceState;