import React, { Component } from "react";
import { Image, StyleSheet, View } from 'react-native'
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
  ListItem,
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
  Input
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { stylesReg } from './css/stylesReg';
import { color } from './css/color';

class ApplyAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>육류용 냉장고</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>쿨리닉</Text>
                <Text style={stylesReg.leftGuideTxt}>결제카드를</Text>
                <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={stylesReg.rightImgWrap}>
                <Image source={require('./img/license-depart01.png')} style={{width: 76, height: 76}}/>
              </View>
            </View>

            <View>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>

              <Textarea rowSpan={5} bordered placeholder="Textarea" />
            </View>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{color:'#28c8f5'}}>클리닉 제품 분석</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>결제카드선택</Text>
            </Button>
            <Button block info style={[styles.btnDefault, styles.btnDefaultFill]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력 완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}
export default ApplyAfterService;