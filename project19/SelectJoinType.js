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

class SelectJoinType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : true
    };
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
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>회원가입할</Text>
                <Text style={styles.leftGuideTxt}>방법을</Text>
                <Text style={styles.leftGuideTxt}>선택해주세요</Text>
              </View>
              <View style={styles.rightImgWrap}>
              <Image source={require('./img/People_icon.png')} style={{height : 84, width : 84}} />
              </View>
            </View>

            <View style={localStyles.txtWrap}>
              <Text style={{color: color.greyColor, fontSize: 14}}>클리닉의 회원이 되시면</Text>
              <Text style={{color: color.greyColor, fontSize: 14}}>다양한 A/S 관련 서비스를 누릴 수 있습니다</Text>
            </View>
            
          </View>

          <View style={localStyles.btnBottomWrap}>
            <View style={localStyles.bttBoxWrap}>
              <Image source={require('./img/E-mail_button_2.png')} resizeMode='contain' style={localStyles.btnIcon} />
            </View>
            <View style={localStyles.bttBoxWrap}>
              <Image source={require('./img/Naver_button_2.png')} resizeMode='contain' style={localStyles.btnIcon} />
            </View>
            <View style={[localStyles.bttBoxWrap, {marginRight: 0}]}>
              <Image source={require('./img/Kakao_button_2.png')} resizeMode='contain' style={localStyles.btnIcon} />
            </View>
          </View>
          
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  txtWrap: {
    marginTop: 21
  },
  btnBottomWrap: {
    flex:2,
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  bttBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    marginRight : 13,
    alignItems : 'center'
  },
  btnIcon: {
    height: 90,
    width: 90,
  },
  btnTxt: {
    fontSize: 14,
    marginTop : 10,
    color: color.whiteColor,
    paddingBottom: 14
  }
});

export default SelectJoinType;