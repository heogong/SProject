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
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
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
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>증상 및</Text>
                <Text style={styles.leftGuideTxt}>상세정보를</Text>
                <Text style={styles.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={styles.rightImgWrap}>
                <Image source={require('./img/license-depart01.png')} style={{width: 80, height: 80}}/>
              </View>
            </View>

            <View style={{marginTop: 26}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-dropdown" style={styles.selectBoxIcon}/>}
                style={{ width: undefined }}
                placeholder="증상을 선택해 주세요."
                placeholderStyle={{ color: color.inputPlaceHodler }}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
                style={styles.selectBoxWrap}
                textStyle={styles.selectBoxTxt}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>

              <Textarea rowSpan={5} style={[styles.textAreaDefault, {marginTop: 12}]} placeholder="상세 증상을 입력해 주세요." placeholderTextColor={{ color: color.inputPlaceHodler }} />
            </View>
          </View>

          <View style={styles.mb20}>
            <Text style={localStyles.boxDetailSubTitleTxt}>쿨리닉 제품분석</Text>
            <View style={styles.fxDirRow}>
              <View style={styles.fx1}>
                <Text style={localStyles.boxDetailSubTxt}>용량 :</Text>
                <Text style={localStyles.boxDetailSubTxt}>전기 :</Text>
                <Text style={localStyles.boxDetailSubTxt}>압축기 :</Text>
              </View>
              <View style={styles.fx1}>
                <Text style={localStyles.boxDetailSubTxt}>응축기 :</Text>
                <Text style={localStyles.boxDetailSubTxt}>증발기 :</Text>
                <Text style={localStyles.boxDetailSubTxt}>제조사 :</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb12]}>
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

const localStyles = StyleSheet.create({
  boxDetailSubTitleTxt: {
    fontSize: 18,
    color: color.defaultColor,
    paddingBottom: 12,
    fontWeight: "bold",
    marginTop: 20
  },
  boxDetailSubTxt: {
    fontSize: 14,
    color: "#8e8e98",
    lineHeight: 20
  },
});

export default ApplyAfterService;