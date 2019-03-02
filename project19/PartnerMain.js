import React, { Component } from "react";
import { Animated, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
    Badge,
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

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

const SLIDER_1_FIRST_ITEM = 1;

class PartnerMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalVisible: false,
        isModalVisible1: false,
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        wait : true,
        data : [
            {
                title: 'STEP.1',
                business : '서울시 용산구',
                product : '업소용 냉장고'
            },
            {
                title: 'STEP.2',
                business : '서울시 강남구',
                product : '업소용 냉장고'
            },
            {
                title: 'STEP.3',
                business : '서울시 동작구',
                product : '업소용 냉장고'
            }
        ]
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
  _toggleModal1 = () => this.setState({ isModalVisible1: !this.state.isModalVisible1 });
  
  _renderItem ({item, index}) {
    return (
        <TouchableOpacity onPress={ () => alert("dddd")}>
            <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                <View style={{marginTop: 30}}>
                    <Text style={{fontSize: 24, color: "#038dbd", fontWeight: "bold"}}>{item.title}</Text>
                </View>
                <View style={[styles.fx1, styles.justiConCenter]}>
                    <Text style={localStyles.guideBoxTxt}>A/S 출발에서</Text>
                    <Text style={localStyles.guideBoxTxt}>A/S 완료까지</Text>
                    <Text style={localStyles.guideBoxTxt}>진행가이드</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }

  _renderItem2 ({item, index}) {
    return (
        <TouchableOpacity onPress={ () => alert("dddd")}>
            <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 16, color: "#038dbd", fontWeight: "bold"}}>{item.business}</Text>
                </View>
                <View style={[styles.fx4, styles.justiConCenter]}>
                    <Image 
                        source={require("./img/license-depart02.png")} 
                        resizeMode="contain" 
                        style={{height : 80, width : 80}} />
                </View>
                <View style={[styles.fx1, styles.justiConCenter]}>
                    <Text style={styles.greyFont}>{item.product}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
  

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
            {/* AS 미진행중일떄------------------- */}
            {/* 가이드 표출일때
            <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 28, paddingBottom: 21}}>
                {(this.state.wait) ? (
                    <View>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>파트너</Text>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>가입신청승인</Text>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>대기중입니다</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>현재</Text>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>A/S매칭</Text>
                        <Text style={[styles.leftGuideTxt, {color : color.whiteColor}]}>요청이 없습니다</Text>
                    </View>
                )}
            </View>
             */}
             {/* ./가이드 표출일때 */}
             {/* 매칭 알림일때 */}
{/* 
             <View style={{paddingLeft: 27, paddingRight: 27, paddingTop: 16, paddingBottom: 15}}>
                <View style={{backgroundColor: color.whiteColor, height: 104, widht: "100%"}}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTopTxtWrap}>
                            <Text style={styles.modalTopTxt}>시흥시 정왕동에서 A/S 요청이 있습니다</Text>
                        </View>
                        <View style={styles.modalBtnWrap}>
                            <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                            <Text style={styles.modalBtnFillTxt}>매칭수락</Text>
                        </Button>
                        </View>
                    </View>
                </View>
             </View>
              */}
             {/* ./매칭 알림일때 */}
{/*              
            <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    renderItem={ (this.state.wait) ? this._renderItem : this._renderItem2 }
                    sliderWidth={viewportWidth}
                    // activeSlideAlignment={'start'}
                    itemWidth={cardWidth}
                    data={this.state.data}
                    firstItem={this.state.slider1ActiveSlide}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
            </View>

            <View style={[styles.alignItemsCenter, styles.justiConStart]}>
                <Pagination
                    dotsLength={this.state.data.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={localStyles.paginationContainer}
                    dotColor={color.whiteColor}
                    dotStyle={localStyles.paginationDot}
                    inactiveDotColor={color.whiteColor}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View> */}

             {/* ,.AS 미진행중일떄------------------- */}

            {/* AS 진행중일때------------------- */}
            <View style={localStyles.topAsYesWrap}>
                <View style={[styles.justiConStart, styles.alignItemsCenter, styles.mb10]}>
                    <H1 style={localStyles.topTitleTxt}>세나정육점으로 A/S 출발중입니다</H1>
                    <Text style={localStyles.topTxt}>경기도 시흥시  정왕동 산기대학로 237</Text>
                    <Text style={localStyles.topTxt}>한국산업기술대학교 TIP 307호</Text>
                </View>
                <View style={[styles.justiConStart, styles.alignItemsCenter]}>
                    <View 
                        style={[
                            styles.mb10,
                            styles.alignItemsCenter,
                            styles.justiConCenter]}>
                        <Image source={require("./img/license-depart01.png")} 
                            style={[styles.mb10, {
                            height : 100, 
                            width : 100
                            }]}/>
                        <Text style={localStyles.topTxt}>업소용 냉장고</Text>
                        <Text style={localStyles.topTxt2}>증상1. 냉동온도가 올라가지 않음</Text>
                    </View>
                </View>
                <View style={styles.fxDirRow}>
                    <View style={{marginRight: 9}}>
                        <Button style={styles.modalBtnNoFill} onPress={this._toggleModal1}>
                            <Text style={styles.modalBtnNoFillTxt}>매칭취소</Text>
                        </Button>
                    </View>
                    <View style={{marginLeft: 9}}>
                        <Button style={styles.modalBtnFill} onPress={this._toggleModal1}>
                            <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
                        </Button>
                    </View>
                </View>
            </View>
            {/* ./AS 진행중일때------------------- */}

            <View style={{backgroundColor : color.whiteColor}}>
                <View style={[styles.alignItemsCenter, {backgroundColor : color.whiteColor, paddingVertical : 10}]}>
                    <Text style={[{color: "#038dbd", fontSize : 14}]}>서울시 천호동에서 A/S 매칭이 완료되었습니다</Text>
                </View>

                <View style={[styles.mb10, styles.pd10, styles.fxDirRow, {backgroundColor : color.defaultColor}]}>
                    <View style={{flex: 1, marginTop: 25}}>
                        <View style={[styles.alignItemsCenter, styles.justiConEnd]}>
                            <Badge info style={{
                                position : 'absolute', 
                                right : 12, 
                                top : -12, 
                                zIndex : 1, 
                                color : color.defaultColor, 
                                elevation : 10
                            }}>
                                <Text>2</Text>
                            </Badge>
                            <Image 
                                source={require("./img/license-bg02.png")} 
                                resizeMode="contain" 
                                style={[{height : 79, width : 56}]}
                            />
                        </View>
                    </View>

                    <View style={[styles.alignItemsCenter, styles.fx2, {height: 120}]}>
                        <Text style={localStyles.reportTitleTxt}>A/S 출장시 보고서 작성이 필요해요</Text>
                        <Text style={localStyles.reportTxt}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
                        <View style={styles.alignItemsCenter}>
                            <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 36, width: "70%"}]}>
                                <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 14}]}>지금 작성하러가기</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                
                <View style={[styles.pd20, {backgroundColor : color.defaultColor}]}>
                    <H1 style={{color : color.whiteColor}}>쿨리닉</H1>
                    <H1 style={{color : color.whiteColor}}>사용자 가이드</H1>
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
            </View>
        </ScrollView>

        <Footer style={{shadowOpacity: 0.3}}>
            <FooterTab style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                <View style={styles.fx1}>
                    <Button vertical active={this.state.tab1} onPress={() => this.setState({wait:true})}
                        style={styles.noPadding}>
                        <Image 
                            source={require("./img/ico-camera.png")}
                            style={{height : 30, width : 34}} />
                        <Text style={styles.footTxt}>홈으로</Text>
                    </Button>
                </View>
                <View style={styles.fx1}>
                    <Button vertical active={this.state.tab2} onPress={() => this.setState({wait:false})}
                        style={styles.noPadding}>
                        <Image 
                            source={require("./img/ico-camera.png")}
                            style={{height : 30, width : 34}} />
                        <Text style={styles.footTxt}>A/S 매칭</Text>
                    </Button>
                </View>
                <View style={styles.fx1}>
                    <Button vertical active={this.state.tab3} onPress={() => this.setState({wait:false})}
                        style={styles.noPadding}>
                        <Image 
                            source={require("./img/ico-camera.png")}
                            style={{height : 30, width : 34}} />
                        <Text style={styles.footTxt}>보고서</Text>
                    </Button>
                </View>
                <View style={styles.fx1}>
                    <Button vertical active={this.state.tab4} onPress={() =>  alert("tab4")}
                        style={styles.noPadding}>
                        <Image 
                            source={require("./img/ico-camera.png")}
                            style={{height : 30, width : 34}} />
                        <Text style={styles.footTxt}>더보기</Text>
                    </Button>
                </View>
            </FooterTab>
        </Footer>

        <Modal isVisible={this.state.isModalVisible}>
            <View style={[styles.modalWrap, {height: 128}]}>
                <View style={styles.modalContent}>
                    <View style={[styles.modalTop2LTxtWrap]}>
                        <Text style={styles.modalTopTxt}>A/S 매칭을 수락하시겠습니까?</Text>
                        <Text style={styles.modalTopTxt}>수락 후 1시간 30분 내에 도착하셔야 합니다</Text>
                    </View>
                    <View style={styles.modalBtnTwinWrap}>
                        <View style={{marginRight: 9}}>
                            <Button style={styles.modalBtnNoFill} onPress={this._toggleModal}>
                                <Text style={styles.modalBtnNoFillTxt}>매칭취소</Text>
                            </Button>
                        </View>
                        <View style={{marginLeft: 9}}>
                            <Button style={styles.modalBtnFill} onPress={this._toggleModal}>
                                <Text style={styles.modalBtnFillTxt}>A/S 출발</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <Modal isVisible={this.state.isModalVisible1}>
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>A/S 진행 또는 업체와 전화연결을 선택하세요</Text>
              </View>
              <View style={[styles.modalBtnTwinWrap, styles.fx1]}>
                    <View style={{marginRight: 9}}>
                        <Button style={styles.modalBtnNoFill} onPress={this._toggleModal1}>
                            <Text style={styles.modalBtnNoFillTxt}>A/S 진행</Text>
                        </Button>
                    </View>
                    <View style={{marginLeft: 9}}>
                        <Button style={styles.modalBtnFill} onPress={this._toggleModal1}>
                            <Text style={styles.modalBtnFillTxt}>전화연결</Text>
                        </Button>
                    </View>
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
    const value = (percentage * (viewportHeight)) / 100;
    return Math.round(value);
}
  
const productCardSize = wp(47.5, 52);
  
const cardWidth = wp(40, 0);
const cardHeight = hp(24);
const reportSize = wp(25, 0)

const localStyles = StyleSheet.create({
    paginationContainer: {
        paddingVertical: 14
    },
    paginationDot: {
        borderRadius: 4,
        marginHorizontal: 0,
        height: 10,
        width: 10
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
    },
    guideBoxTxt: {
        fontSize: 16,
        color: "#1e1e32",
        textAlign: "center"
    },
    reportTitleTxt: {
        marginTop: 17,
        marginBottom: 7,
        fontSize: 16,
        color: "#038dbd",
        fontWeight: "bold"
    },
    reportTxt: {
        marginBottom: 13,
        color : color.whiteColor,
        fontSize : 12
    },
    topAsYesWrap: {
        borderBottomColor: color.defaultColor,
        borderBottomWidth: 10,
        backgroundColor: color.whiteColor,
        height: 358,
        paddingLeft: 27,
        paddingRight: 27,
        paddingTop: 23,
        flex: 1,
        alignItems: "center"
    },
    topTitleTxt: {
        marginBottom: 19,
        fontSize: 18,
        color: color.defaultColor,
        fontWeight: "bold",
        marginBottom: 16,
      },
      topTxt: {
        fontSize: 14,
        color: "#8e8e98"
      },
      topTxt2: {
        fontSize: 14,
        color: "#1e1e32",
        marginTop: 10,
        marginBottom: 13
      }
});

const dotActiveStyle = [localStyles.dotsStyle, { backgroundColor: color.whiteColor }];

export default PartnerMain;
