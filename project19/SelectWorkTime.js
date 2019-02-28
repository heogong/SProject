import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

export const ENTRIES1 = [
  {
    title: '월'
  },
  {
    title: '화'
  },
  {
    title: '수'
  },
  {
    title: '목'
  },
  {
    title: '금'
  },
  {
    title: '토'
  },
  {
    title: '일'
  }
];


class SelectWorkTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={styles.mb10}>
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>일하실</Text>
                <Text style={styles.leftGuideTxt}>시간대를</Text>
                <Text style={styles.leftGuideTxt}>선택해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>02</Text>
              </View>
            </View>

            <View style={styles.procBarWrap}>
              <View style={styles.fx1}>
                <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOff} />
              </View>
            </View>
          </View>

          <View
            style={[styles.fx5, styles.justiConCenter]}
          >
            <View style={[styles.fxDirRow, styles.justiConBetween, styles.mb15]}>
              {ENTRIES1.map((entry, index) => (

                <TouchableOpacity onPress={ () => alert(entry.title)}  key={index}>
                  <View style={[styles.alignItemsCenter, styles.justiConCenter, {
                    height : weekCardSize, 
                    width : weekCardSize,
                    borderColor : color.defaultColor, 
                    borderWidth : 1
                  }]}>
                    <Text style={{color : color.defaultColor}}>{entry.title}</Text>
                  </View>
                </TouchableOpacity>
                
              ))}
            </View>

            <View style={styles.mb15}>
              <H1>00</H1>
              <H1>00</H1>
              <H1>00</H1>
            </View>

            <View style={[styles.alignItemsCenter, styles.mb15]}>
              <Text style={styles.greyFont}>취약시간에는 출장비가 상승합니다</Text>
              <Text style={styles.greyFont}>취약시간 기준 : 18시 ~ 09시, 일요일 및 공휴일 포함</Text>
            </View>

            <View style={styles.fxDirRow}>
                <View style={[styles.fx1, styles.alignItemsEnd]}>
{/* 
                  <CheckBox
                    title="풀타임"
                    containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                    textStyle={{fontSize: 14, color: color.greyColor}}
                    checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                    uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                  />
                   */}
                </View>
                <View style={styles.fx1}>
{/* 
                  <CheckBox
                    title="공휴일"
                    containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                    textStyle={{fontSize: 14, color: color.greyColor}}
                    checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                    uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                  />
                   */}
              </View>

            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>선택완료</Text>
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

const weekCardSize = wp(12, 52);


export default SelectWorkTime;
