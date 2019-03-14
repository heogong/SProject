import React, { Component } from "react";
import { Image, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
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

class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state = {}
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
            <Title style={styles.headerTitleTxt}>약관 및 정책</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{flex: 1, backgroundColor: color.defaultColor}}>
          <View style={{marginTop: 16}}>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('./img/New_icon.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('./img/New_icon.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('./img/New_icon.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('./img/New_icon.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>
            </ScrollView>        
          </View>
          
        </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  listNoticeWrap: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 60,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row"
  },
  listNoticeTitleTxt: {
    fontSize: 14,
    color: "#0b2024"
  },
  listNoticeDateTxt: {
    fontSize: 12,
    color: "#0b2024",
    marginTop: 5
  },
  newIcon: {
    width: 20,
    height: 20
  },
  btnHome: {
    width: 72,
    height: 28
  }
});

export default NoticeList;