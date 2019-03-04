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
  IconNB,
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class AgreeTermsService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  toggleSwitch() {
    this.setState({
      checkbox: !this.state.checkbox
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
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>쿨리닉</Text>
                <Text style={styles.leftGuideTxt}>이용약관에</Text>
                <Text style={styles.leftGuideTxt}>동의해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>07</Text>
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
               <View style={styles.procBarOn} />
              </View>
            </View>
            
          </View>

          <View style={[styles.alignItemsCenter, {paddingTop: 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: "#c9cacb"}]}>
            <Text style={styles.greyFont}>쿨리닉 내의 원활한 서비스 이용을 위해서는</Text>
            <Text style={styles.greyFont}>아래의 필수 항목에 대한 동의가 필요합니다</Text>
          </View>

          <View style={localStyles.termsWrap}>
            <View style={[styles.fx5, styles.alignItemsStart, styles.justiConBetween]}>
              <Text style={[styles.blueFont, styles.mb20]}>서비스 이용약관 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>위치기반 서비스 이용약관 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>개인정보 수집 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>개인정보 제 3자 제공 동의서(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>마케팅 전체 수신동의(선택)</Text>
            </View>
              
            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConBetween]}>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.checkbox}
                    onPress={() => this.toggleSwitch()}
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>약관동의완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  termsWrap: {
    marginTop: 27,
    flexDirection : "row"
  }
});

export default AgreeTermsService;
