import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Header, Text, Title, Button, Left, Right, Body} from "native-base";

import { Actions } from 'react-native-router-flux';

import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

class PartnerGuide3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <Container style={[styles.containerInnerPd, {backgroundColor: color.defaultColor}]}>
        <Header style={[styles.header, styles.noPadding, {backgroundColor: color.defaultColor}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => Actions.pop()}>
              <Image source={require("~/Common/Image/Back_icon_white.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
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
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={[stylesReg.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>쿨리닉</Text>
                <Text style={[stylesReg.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>출장비 정책 및</Text>
                <Text style={[stylesReg.leftGuideTxt, {color: color.whiteColor, fontWeight: "bold"}]}>정산·보고서 안내</Text>
              </View>
            </View>
            
          </View>

          <View>
            <TouchableOpacity onPress={Actions.PartnerGuide3Sub}>
              <Image source={require('~/Common/Image/partner_guide/A35.png')} resizeMode="center" style={localStyles.guideImg}/>  
            </TouchableOpacity>
          </View>
          
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  guideImg: {
    height: "100%",
    width: "100%",
  }
});

export default PartnerGuide3;
