import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetNoticeList from '~/Main/Functions/GetNoticeList';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    }
  }

  componentDidMount() {
    this._getNoticeList();
  }

   // 공지사항 리스트 가져오기
   _getNoticeList = () => {
    GetNoticeList().then(async result => {
        GetCommonData(result, this._getNoticeList).then(async resultData => {
            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

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

  render() {
    return (
      <Container style={styles.container}>
        <View style={{
          paddingLeft : styles.containerInnerPd.paddingLeft, 
          paddingRight : styles.containerInnerPd.paddingRight}}
        >
          <CustomHeader title="공지사항"/>
        </View>

        <View style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
          <View style={{marginTop: 16}}>

            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.data.map((notice, idx) =>
                <TouchableOpacity key={ idx } onPress={ () => Actions.ClientNoticeDetail({notiId : notice.notiId}) }>
                  <View style={localStyles.listNoticeWrap}>
                    <View>
                      <Text style={localStyles.listNoticeTitleTxt}>{notice.notiTitle}</Text>
                      <Text style={localStyles.listNoticeDateTxt}>{notice.regDt}</Text>
                    </View>
                    {notice.newYn == 'Y' ? (
                      <Image source={require('~/Common/Image/New_icon.png')} style={localStyles.newIcon} />
                    ) : (
                      <View/>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>        
                
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