import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import HTML from 'react-native-render-html';

import GetNoticeDetail from '~/Main/Functions/GetNoticeDetail';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class NoticeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
        notiCont : '<html/>'
      },
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  componentWillMount() {
    this._getNoticeDetail();
  }

  // 공지사항 단건 조회
  _getNoticeDetail = () => {
    GetNoticeDetail(this.props.notiId).then(async result => {
        GetCommonData(result, this._getNoticeDetail).then(async resultData => {
            if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              if(ResultBool) {
                    this.setState({data : resultData.data})
                } else {
                    this.setState({
                        isAlertModal : true,
                        resultMsg : resultData.resultMsg
                    })
                }
            }
        });
    });
  }

  _goToTop = () => {
    this.scroll.scrollTo({x:0, y:0, animated : true});
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <View style={{
          paddingLeft : styles.containerInnerPd.paddingLeft,
          paddingRight : styles.containerInnerPd.paddingRight
        }}>
          <CustomHeader title="공지사항"/>
        </View>

        <View style={styles.contentWrap}>

          <View style={localStyles.titleTxtWrap}>
            <Text style={localStyles.titleTxt}>{this.state.data.notiTitle}</Text>
          </View>
          <ScrollView
            ref={(c) => {this.scroll = c}}
          >
            <View style={localStyles.noticeWrap}>
              <HTML html={this.state.data.notiCont} imagesMaxWidth={viewportWidth - 52} />
            </View>
          </ScrollView>
          <View style={localStyles.noticeFooterWrap}>
            <View style={localStyles.noticeFooterCont}>
              <Text style={{fontSize: 13, color: "#8e8e98"}}>ⓒ COOLINIC Corp.</Text>
              <TouchableOpacity onPress={this._goToTop}>
                <Image source={require("~/Common/Image/top_button_blue.png")} resizeMode="contain" style={{width: 72, height: 28}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* alert 메세지 모달 */}
        <CustomModal
          modalType="ALERT"
          isVisible={this.state.isAlertModal}
          onPress={ () => this.setState({isAlertModal : false})}
          infoText={this.state.resultMsg}
          btnText="확인"
        />

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
