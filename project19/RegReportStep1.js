import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View, TextInput} from 'react-native'
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

import Modal from "react-native-modal";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class ListNotCompReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      beforeMatch : true
    }
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  asImage = () => (
    <View style={localStyles.prdPhoto}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}>
        <TouchableOpacity 
          style={localStyles.prdPhotoBtnEn}
          onPress={ () => alert("사진조회")}>
          <Text style={localStyles.prdPhotoBtnTxt}>재등록하기</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )

  asNoImage = () => (
    <TouchableOpacity style={localStyles.photoNoBoxWrap}>
      <View style={localStyles.photoNoBox}>
        <Icon name="ios-camera" style={localStyles.phototNoIcon} />
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
          <View style={{marginBottom: 30}}>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>수리내역</Text>
                <Text style={styles.leftGuideTxt}>A/S 보고서를</Text>
                <Text style={styles.leftGuideTxt}>작성해주세요</Text>
              </View>
              <View style={styles.rigthTxtWrap}>
                <Text style={[styles.rightTxt, {fontWeight: "bold"}]}>
                  25<Text style={styles.rightTxtSmall}>%</Text>
                </Text>
              </View>
            </View>

            <View style={styles.procBarWrap}>
              <View style={styles.fx1}>
                <View style={styles.procBarOn} />
                <Text style={styles.procBarTxt}>조치전사진</Text>
              </View>
              <View style={styles.fx1}>
                <View style={styles.procBarOff} />
                <Text style={styles.procBarTxt}>조치전증상</Text>
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
               <Text style={styles.procBarTxt}>조치후사진</Text>
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
               <Text style={styles.procBarTxt}>수리한내역</Text>
              </View>
            </View>
            
          </View>

            <View>

              <View style={{backgroundColor : color.defaultColor, marginBottom: 32}}>
                  <View style={localStyles.secondBox}>
                      <Text style={localStyles.asMatchStateDscTxt}>매칭된 A/S 업체가 출발했어요.</Text>
                      <View style={styles.fxDirRow}>
                          <View style={localStyles.asMatchIconWrap}>
                              {/* 
                              <Image source={require("./img/user_as_step_icon/Default/as_wait_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                              */}
                              <Image source={require("./img/partner_as_step_icon/Step_on/as_wait_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={[localStyles.asMatchStateTxt, {color: "#0364c8"}]}>A/S 대기</Text>
                          </View>
                          <View style={localStyles.asMatchIconWrap}>
                              <Image source={require("./img/partner_as_step_icon/Default/as_start_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={localStyles.asMatchStateTxt}>A/S 출발</Text>
                          </View>
                          <View style={localStyles.asMatchIconWrap}>
                              <Image source={require("./img/partner_as_step_icon/Default/as_arrive_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={localStyles.asMatchStateTxt}>A/S 도착</Text>
                          </View>
                          <View style={localStyles.asMatchIconWrap}>
                              <Image source={require("./img/partner_as_step_icon/Default/as_progress_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={localStyles.asMatchStateTxt}>A/S 진행</Text>
                          </View>
                          <View style={localStyles.asMatchIconWrap}>
                              <Image source={require("./img/partner_as_step_icon/Default/as_complete_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                              <Text style={localStyles.asMatchStateTxt}>A/S 완료</Text>
                          </View>
                      </View> 

                      <View style={[styles.modalBtnTwinWrap, styles.fx1, styles.justiConCenter, {marginTop: 18, marginBottom: 18}]}>
                        <View style={{marginRight: 9}}>
                            <Button style={styles.modalBtnNoFill}>
                                <Text style={styles.modalBtnNoFillTxt}>업체전화연결</Text>
                            </Button>
                        </View>
                        <View style={{marginLeft: 9}}>
                            <Button style={[styles.modalBtnFill, {backgroundColor: "#0397bd"}]}>
                                <Text style={styles.modalBtnFillTxt}>추가A/S진행</Text>
                            </Button>
                        </View>
                    </View>

                  </View>
              </View>

              <View>
                <View style={[localStyles.boxTitleWrap, {justifyContent: "center", alignItems: "center"}]}>
                  <Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
                  <View style={[styles.line, {flex: 2, borderColor: "#038dbd"}]}></View>
                </View>

                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                  <View style={localStyles.prdPhotoWrap}>
                    { this.asImage() }
                    { this.asImage() }
                    { this.asNoImage() }
                    { this.asNoImage() }
                  </View>
                  <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                    <TextInput
                      placeholder="A/S 조치 전의 증상에 대해 적어주세요."
                      placeholderTextColor={color.inputPlaceHodler}
                      numberOfLines={10}
                      multiline={true}
                      style={styles.textInputBox1}
                    />
                  </Item>
                </View>
                

              </View>

              <View style={{marginTop: 32, marginBottom: 26}}>
                <View style={[localStyles.boxTitleWrap, {justifyContent: "center", alignItems: "center"}]}>
                  <Text style={localStyles.boxTitleTxt}>A/S 조치 후</Text>
                  <View style={[styles.line, {flex: 2, borderColor: "#038dbd"}]}></View>
                </View>

                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                  <View style={localStyles.prdPhotoWrap}>
                    { this.asImage() }
                    { this.asImage() }
                    { this.asNoImage() }
                    { this.asNoImage() }
                  </View>
                  <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                    <TextInput
                      placeholder="수리한 내역에 대해 적어주세요."
                      placeholderTextColor={color.inputPlaceHodler}
                      numberOfLines={10}
                      multiline={true}
                      style={styles.textInputBox1}
                    />
                  </Item>
                </View>
                

              </View>
            </View>
          </ScrollView>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>제품등록완료</Text>
            </Button>
          </View>

        </View>

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

const asCardSize = wp(48, 72);
const stateImgSize = wp(15, 52);

const localStyles = StyleSheet.create({
  boxTitleWrap: {
    marginBottom: 20,
    flexDirection: "row",
    flex: 1
  },
  boxTitleTxt: {
    flex: 1,
    fontSize: 18,
    color : "#038dbd",
    fontWeight: "bold"
  },
  prdPhotoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap : 'wrap',
    backgroundColor: color.defaultColor
  },
  prdPhoto: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : color.defaultColor, 
    height : asCardSize, 
    width : asCardSize
  },
  prdPhotoBtnEn: {
    height : 35,
    width : "100%",
    backgroundColor: 'rgba(40, 200, 245, 0.6)'
  },
  prdPhotoBtnTxt: {
    fontSize: 14,
    color: color.whiteColor,
    textAlign: "center",
    marginTop: 10
  },
  photoNoBoxWrap: {
    flex: 5,
    borderColor : "#c9cacb",
    borderWidth : 1,
    margin: 5,
    height : asCardSize, 
    width : asCardSize
  },
  photoNoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.whiteColor
  },
  phototNoIcon: {
    color: color.defaultColor,
    fontSize: 50
  },
  asMatchStateDscTxt: {
    marginBottom: 15,
    textAlign:'center',
    color: "#0364c8",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20
},
asMatchIconWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
},
asMatchStateTxt: {
    fontSize : 12,
    color: color.whiteColor,
    fontWeight: "bold",
    marginTop: 10
},
});

export default ListNotCompReport;