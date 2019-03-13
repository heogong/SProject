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
    <View style={localStyles.myPrdBoxWrap}>

      <Text style={localStyles.myPrdNumTxt}>01</Text>

      <View style={localStyles.myPrdImgWrap}>
        <Image source={require("./img/product/01_icon_white.png")} style={localStyles.myPrdImg} />
      </View>

      <View style={localStyles.myPrdInfoTxtWrap}>
        <Text style={localStyles.myPrdNameTxt}>육류용냉장고</Text>
        <Text style={localStyles.myPrdDscTxt}>짧은 설명에 대해 짧은 설명에 대해 짧은 설명에 대해</Text>
      </View>
      
    </View>
  );

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

          <View style={{marginBottom: 36}}>
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>수리가</Text>
                <Text style={styles.leftGuideTxt}>필요한 제품을</Text>
                <Text style={styles.leftGuideTxt}>선택해주세요</Text>
              </View>
            </View>
          </View>


          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={localStyles.myPrdListWrap}>
              
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
                { this.drawPrdouct() }
              
            </View>
          </ScrollView>
        </View>

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const productCardSize = wp(48, 52);

const localStyles = StyleSheet.create({
  myPrdBoxWrap: {
    alignItems: "center",
    backgroundColor : color.defaultColor,
    width : productCardSize,
    height: 280,
    marginBottom: 10
  },
  myPrdNumTxt: {
    color : color.whiteColor,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 14
  },
  myPrdImgWrap: {
    marginBottom: 14
  },
  myPrdImg: {
    height: 100,
    width: 100
  },
  myPrdInfoTxtWrap: {
    justifyContent: "center",
    alignItems: "center"
  },
  myPrdNameTxt: {
    marginBottom: 10,
    color : color.whiteColor,
    fontSize: 16,
    fontWeight: "bold"
  },
  myPrdDscTxt: {
    color: color.whiteColor,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    height: 45
  },
  myPrdListWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default SelectProduct2;