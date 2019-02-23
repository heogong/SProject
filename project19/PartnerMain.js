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

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

const SLIDER_1_FIRST_ITEM = 1;

class PartnerMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tab1: false,
        tab2: false,
        tab3: true,
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

  
  _renderItem ({item, index}) {
    return (
        <TouchableOpacity onPress={ () => alert("dddd")}>
            <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                <View style={styles.fx1}>
                    <Text>{item.title}</Text>
                </View>
                <View style={styles.fx3}>
                    <Text>A/S 출발에서</Text>
                    <Text>A/S 완료까지</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }

  _renderItem2 ({item, index}) {
    return (
        <TouchableOpacity onPress={ () => alert("dddd")}>
            <View style={[styles.pd10, styles.alignItemsCenter, {backgroundColor : color.whiteColor, height : cardHeight}]}>
                <View style={styles.fx1}>
                    <Text style={{color : color.defaultColor}}>{item.business}</Text>
                </View>
                <View style={[styles.fx3, styles.justiConCenter]}>
                    <Image 
                        source={require("./img/license-depart02.png")} 
                        resizeMode="contain" 
                        style={{height : cardHeight - 90, width : cardWidth - 90}} />
                </View>
                <View style={styles.fx1}>
                    <Text style={styles.greyFont}>{item.product}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
  

  render() {
    return (
        <Container style={{
            flex: 1,
            backgroundColor: color.defaultColor
        }}>
            <Header style={[styles.header, styles.noPadding]}>
              <Left style={styles.headerLeftWrap}/>
              <Body style={styles.headerCenterWrap}>
                <Title style={styles.headerTitleTxt}>쿨리닉</Title>
              </Body>
              <Right style={styles.headerRightWrap}/>
            </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.pd20}>
                {(this.state.wait) ? (
                    <View>
                        <H1 style={{color : color.whiteColor}}>파트너</H1>
                        <H1 style={{color : color.whiteColor}}>가입신청승인</H1>
                        <H1 style={{color : color.whiteColor}}>대기중입니다</H1>
                    </View>
                ) : (
                    <View>
                        <H1 style={{color : color.whiteColor}}>현재</H1>
                        <H1 style={{color : color.whiteColor}}>A/S매칭</H1>
                        <H1 style={{color : color.whiteColor}}>요청이 없습니다</H1>
                    </View>
                )}
            </View>

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
            </View>

            <View style={{backgroundColor : color.whiteColor}}>
                <View style={[styles.alignItemsCenter, {backgroundColor : color.whiteColor, paddingVertical : 10}]}>
                    <Text style={[{color:color.defaultColor, fontSize : 13}]}>서울시 천호동에서 A/S 매칭이 완료되었습니다</Text>
                </View>

                <View style={[styles.mb10, styles.pd10, styles.fxDirRow, {backgroundColor : color.defaultColor}]}>
                    <View style={styles.fx3}>

                        <View style={[styles.alignItemsCenter, styles.justiConEnd, {height : reportSize, width : reportSize}]}>
                            <Badge info style={{
                                position : 'absolute', 
                                right : 7, 
                                top : 5, 
                                zIndex : 1, 
                                color : color.defaultColor, 
                                elevation : 10
                            }}>
                                <Text>2</Text>
                            </Badge>
                            <Image 
                                source={require("./img/license-bg02.png")} 
                                resizeMode="contain" 
                                style={[{height : '85%', width : '90%'}]}
                            />
                        </View>
                    </View>

                    <View style={[styles.alignItemsCenter, styles.justiConCenter, {flex:7}]}>
                        <Text>A/S 출장시 보고서 작성이 필요해요</Text>
                        <Text style={[styles.mb10, {color : color.whiteColor, fontSize : 13}]}>보고서를 작성해야 비용을 정산받을 수 있어요</Text>
                        <View style={styles.alignItemsCenter}>
                            <Button style={{
                                height: 40,
                                borderRadius: 0,
                                elevation: 0,
                                width: "50%",
                                backgroundColor: color.defaultColor,
                                borderWidth: 1,
                                borderColor: color.whiteColor,
                                elevation: 0,
                                shadowOpacity: 0,
                            }}>
                                <Text style={[styles.btnDefaultFillTxt, {
                                    fontSize: 12,
                                    flex: 1,
                                    textAlign: "center",
                                    fontWeight: "500"
                                }]}>보고서 작성가이드</Text>
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

        <Footer>
            <FooterTab>
                <Button vertical active={this.state.tab1} onPress={() => this.setState({wait:true})}>
                    <Icon active={this.state.tab1} name="apps" />
                    <Text>홈으로</Text>
                </Button>
                <Button vertical active={this.state.tab2} onPress={() => this.setState({wait:false})}>
                    <Icon active={this.state.tab2} name="camera" />
                    <Text>A/S 매칭</Text>
                </Button>
                <Button vertical active={this.state.tab3} onPress={() =>  alert("tab4")}>
                    <Icon active={this.state.tab3} name="contact" />
                    <Text>보고서</Text>
                </Button>
                <Button vertical active={this.state.tab3} onPress={() =>  alert("tab4")}>
                    <Icon active={this.state.tab3} name="contact" />
                    <Text>더보기</Text>
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
    const value = (percentage * (viewportHeight)) / 100;
    return Math.round(value);
}
  
const cardWidth = wp(40, 0);
const cardHeight = hp(24);
const reportSize = wp(25, 0)

const localStyles = StyleSheet.create({
    paginationContainer: {
        paddingVertical: 10
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
    }
});

const dotActiveStyle = [localStyles.dotsStyle, { backgroundColor: color.whiteColor }];

export default PartnerMain;
