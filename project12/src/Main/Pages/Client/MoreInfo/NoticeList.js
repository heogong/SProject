import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="공지사항"/>

        <View style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
          <View style={{marginTop: 16}}>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('~/Common/Image/intro-logo.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('~/Common/Image/intro-logo.png')} style={localStyles.newIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => alert("사진조회")}>
                <View style={localStyles.listNoticeWrap}>
                  <View>
                    <Text style={localStyles.listNoticeTitleTxt}>[공지] 쿨리닉 서비스가 시작되었습니다</Text>
                    <Text style={localStyles.listNoticeDateTxt}>2019.02.11</Text>
                  </View>
                  <Image source={require('~/Common/Image/intro-logo.png')} style={localStyles.newIcon} />
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
    width: 24,
    height: 24
  },
});

export default NoticeList;