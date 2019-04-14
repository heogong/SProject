import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TouchableOpacity, View, FlatList, ListItem } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetNoticeList from '~/Main/Functions/GetNoticeList';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

const ENTRIES1 = [
  {
    notiId: 1,
    notiTitle: '타이틀1', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 2,
    notiTitle: '타이틀2', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀3', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 1,
    notiTitle: '타이틀4', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 2,
    notiTitle: '타이틀5', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀6', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 1,
    notiTitle: '타이틀7', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 2,
    notiTitle: '타이틀8', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀9', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀10', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀11', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀12', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀13', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: '타이틀14', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
];

const ENTRIES2 = [
  {
    notiId: 1,
    notiTitle: 'new타이틀1', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 2,
    notiTitle: 'new타이틀2', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 3,
    notiTitle: 'new타이틀3', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
  {
    notiId: 1,
    notiTitle: 'new타이틀4', 
    regDt : '2019.04.14',
    newYn : 'A/S 완료까지',
  },
];



class NoticeList extends Component {
  constructor(props) {
    super(props);

    this.initPageNum = 1;

    this.state = {
      data : [],
      isAlertModal : false, // alert 용
      resultMsg : null, // alert 용
      testData : ENTRIES1, // test
    }
  }
  
  componentDidMount() {
    this._getNoticeList();
  }

  // 공지사항 리스트 가져오기
  _getNoticeList = () => {
    GetNoticeList(this.initPageNum).then(async result => {
        GetCommonData(result, this._getNoticeList).then(async resultData => {
            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                    // this.setState({data : resultData.data})
                    if(resultData.data.length > 0) {
                      this.setState({
                        testData : this.state.data.concat(resultData.data)
                      })
                      this.initPageNum++;
                    }
                    console.log(this.initPageNum);
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
        </View>
      </TouchableOpacity>
  )


  render() {
    return (
      <Container style={styles.container}>
        <View style={{
          paddingLeft : styles.containerInnerPd.paddingLeft, 
          paddingRight : styles.containerInnerPd.paddingRight 
        }}>
          <CustomHeader title="공지사항"/>
        </View>

        <View style={[styles.fx1, {backgroundColor: color.defaultColor}]}>
          <View style={{marginTop: 16}}>
            <FlatList 
              data={this.state.testData} 
              renderItem={this._renderItem} 
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              onEndReached={this._getNoticeList}
            />

            {/* <ScrollView 
              showsVerticalScrollIndicator={false}
            >
              {this.state.data.map((notice, idx) =>
                <TouchableOpacity key={ idx } onPress={ () => Actions.NoticeDetail({notiId : notice.notiId}) }>
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
            </ScrollView>*/}
                
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