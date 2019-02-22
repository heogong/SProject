import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
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

class SelectProduct2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      checkBox : true
    };
  }

  drawPrdouct = () => (
    <View style={[styles.mr7, styles.pd10, styles.alignItemsCenter, {backgroundColor : color.defaultColor, width : productCardSize}]}>

      <View style={[styles.fx1, styles.justiConCenter]}>
        <H1 style={{color : color.whiteColor}}>01</H1>
      </View>

      <View style={[styles.fx3, styles.justiConCenter]}>
        <Image source={require("./img/license-depart01.png")} style={{height : productCardSize - 20, width : productCardSize - 20}} />
      </View>

      <View style={[styles.fx2, styles.justiConCenter, styles.alignItemsCenter]}>
        <H3 style={[styles.mb10, {color : color.whiteColor}]}>육류용냉장고</H3>
        <Text style={styles.whiteFont}>짧은 설명에 대해</Text>
        <Text style={styles.whiteFont}>20자 내로 작성</Text>
      </View>
      
    </View>
  );

  render() {
    return (
      <Container style={{
        flex: 1,
        backgroundColor: color.whiteColor,
        paddingLeft: 26,
        paddingBottom: 26
      }}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.fx1}>

          <View style={styles.fx1}>
            <H1>수리가</H1>
            <H1>필요한것을</H1>
            <H1>선택해주세요</H1>
          </View>

          <View style={styles.fx3}>

            <View style={[styles.fx1]}>
              <View style={{backgroundColor : color.defaultColor, height : 5, marginRight : 26}}/>
            </View>

            <View style={styles.fx5}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
              </ScrollView>
            </View>
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

const productCardSize = wp(40, 20);

export default SelectProduct2;