import React, { Component } from "react";
import { Image, Picker, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
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

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class RegPassBook3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false,
      language : null
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
                <Text style={styles.leftGuideTxt}>정산받을</Text>
                <Text style={styles.leftGuideTxt}>계좌정보를</Text>
                <Text style={styles.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>06</Text>
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
               <View style={styles.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={styles.procBarOn} />
              </View>
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

          <View style={[styles.fx3, styles.justiConCenter]}>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input placeholder="은행명" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input placeholder="예금주" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={styles.inputWhBackGreyBo}>
              <Input placeholder="계좌번호( - 없이 입력)" placeholderTextColor={color.inputPlaceHodler} style={styles.inputDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>등록완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  inputWrap: {
    marginTop: 32
  }
});

export default RegPassBook3;
