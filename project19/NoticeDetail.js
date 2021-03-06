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
import HTML from 'react-native-render-html';

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
    <h1>Hello world!</h1>

<p>I&#39;m an instance of <a href="https://ckeditor.com">CKEditor</a>.</p>

<p>&nbsp;</p>

<p>I&#39;m an instance of <a href="https://ckeditor.com">CKEditor</a>.</p>

<p>&nbsp;</p>

<p>I&#39;m an instance of <a href="https://ckeditor.com">CKEditor</a>.</p>

<p>&nbsp;</p>

<ol>
	<li>11123123123123</li>
	<li>23232322</li>
	<li>ㅅㅏㅁ</li>
</ol>

<p>&nbsp;</p>

<ul>
	<li>111ㅋㅋㅋㅋㅋ</li>
	<li>구부점입니다.</li>
</ul>

<p>감사합니다</p>
    `;

class NoticeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <Header style={[styles.header, styles.noPadding, {paddingLeft: 26, paddingRight: 26}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}>공지사항</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={localStyles.titleTxtWrap}>
            <Text style={localStyles.titleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다.</Text>
          </View>
          <ScrollView>
            <View style={localStyles.noticeWrap}>
              <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width - 52} />
            </View>
          </ScrollView>
          <View style={localStyles.noticeFooterWrap}>
            <View style={localStyles.noticeFooterCont}>
              <Text style={{fontSize: 13, color: "#8e8e98"}}>ⓒ COOLINIC Corp.</Text>
              <TouchableOpacity>
                <Image source={require("./img/top_button_blue.png")} resizeMode="contain" style={{width: 72, height: 28}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  titleTxtWrap: {
    height: 66, backgroundColor: color.defaultColor, justifyContent: "center"
  }, 
  titleTxt: {
    fontSize: 18, color: color.whiteColor, fontWeight: 'bold', textAlign: 'center'
  },
  noticeWrap: {
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 26,
    paddingBottom: 26
  },
  noticeFooterWrap: {
    height: 100, borderTopWidth: 1, borderTopColor: "#c9cacb", marginLeft: 26, marginRight: 26
  },
  noticeFooterCont: {
    paddingTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between"
  }
});

export default NoticeDetail;
