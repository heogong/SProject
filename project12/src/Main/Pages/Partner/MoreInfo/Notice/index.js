import React, { Component } from "react";
import { Image, FlatList, StyleSheet, TouchableOpacity, View,  } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import GetNoticeList from '~/Main/Functions/GetNoticeList';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

const FIRST_PAGE_NUM = 1;

class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.initPageNum = FIRST_PAGE_NUM;

    this.state = {
      data : [],
      isAlertModal : false, // alert 용
      resultMsg : null, // alert 용
      spinner: false
    }
  }
  
  componentDidMount() {
    this._getNoticeList();
  }

  // 공지사항 리스트 가져오기
  _getNoticeList = () => {

    this.setState({ spinner: true });

    GetNoticeList(this.initPageNum).then(async result => {
        GetCommonData(result, this._getNoticeList).then(async resultData => {

            this.setState({ spinner: false });

            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                    if(resultData.data.notices.length > 0) {
                      this.setState({
                        data : this.state.data.concat(resultData.data.notices)
                      })
                      this.initPageNum++;
                    }
                    // console.log(this.initPageNum);
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

  _renderItem = ({item}) => (
      <TouchableOpacity onPress={ () => Actions.NoticeDetail({notiId : item.notiId}) }>
        <View style={localStyles.listNoticeWrap}>
          <View>
            <Text style={localStyles.listNoticeTitleTxt}>{item.notiTitle}</Text>
            <Text style={localStyles.listNoticeDateTxt}>{item.regDt}</Text>
          </View>
          {item.newYn == 'Y' ? (
              <Image source={require('~/Common/Image/New_icon.png')} style={localStyles.newIcon} />
          ) : (
            <View/>
          )}
        </View>
      </TouchableOpacity>
  )


  render() {
    return (
      <Container style={styles.container}>
        <Spinner
					visible={this.state.spinner}
					textContent={'공지사항을 불러오고 있습니다.'}
					textStyle={styles.whiteFont}
					style={{ color: color.whiteColor }}
				/>
        <View style={{
          paddingLeft : styles.containerInnerPd.paddingLeft, 
          paddingRight : styles.containerInnerPd.paddingRight 
        }}>
          <CustomHeader title="공지사항"/>
        </View>

        <View style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
          <View style={{marginTop: 16}}>
            <FlatList 
              data={this.state.data} 
              renderItem={this._renderItem} 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              onEndReached={this._getNoticeList}
            />
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