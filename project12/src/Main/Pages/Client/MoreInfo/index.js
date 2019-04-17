import React, { Component } from "react";
import { AsyncStorage, Image, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Container, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomEtcButton from "~/Common/Components/CustomEtcButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

class MoreMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data : [],
        isModalVisible : false,
        isAlertModal : false, // alert 용
    }
  }

  componentDidMount() {
      this._getUserInfo();
  }

    //  사용자 정보 가져오기
  _getUserInfo = () => {
    GetUserInfo().then(async result => {
        GetCommonData(result, this._getUserInfo).then(async resultData => {
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

  // 메인페이지 이동 
  _goToMain = () => {
    Actions.ResetMain({client : true});
  } 

  // 로그아웃 
  _logOut = async () => {
    try {
      await AsyncStorage.removeItem("AccessToken");
      await AsyncStorage.removeItem("RefreshToken");
      await Actions.IntroPage();
    } 
    catch(exception) {
      return false;
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={{paddingLeft : 26, paddingRight: 26}}>
          <CustomHeader 
            title="더보기"
            customAction={this._goToMain}
          />
        </View>

        <View style={[styles.fx1, {backgroundColor: color.defaultColor}]}>

          <View style={localStyles.profileWrap}>
            <View style={localStyles.profileTxtWrap}>
              <Text style={[localStyles.profileTitleTxt, styles.mb10]}>{this.state.data.usrNm}</Text>
              <Text style={localStyles.profileSubTxt}>
                {
                  this.state.data.snsSignupYn == "N" ? this.state.data.usrId // SNS 가입자가 아니면
                  : this.state.data.snsSiteCd == "SNS_SITE_CD_01" ? "네이버로 로그인 하셨습니다." : "카카오로 로그인 하셨습니다."  
                }
              </Text>
            </View>

            <View style={[localStyles.btnProfileModWrap]}>

              {/* <CustomEtcButton 
                onPress={ Actions.ClientMyProfileInfo }
                SmallBtn={true}
                >
                    내정보 수정
                </CustomEtcButton> */}
            </View>
          </View>

          <View style={localStyles.quickBtnWrap}>
              <TouchableOpacity 
                style={[localStyles.quickBtnBox, {borderRightColor: color.defaultColor, borderRightWidth: 1}]}
                onPress={ Actions.ClientMyProfileInfo }>
                <Image source={require("~/Common/Image/myinfo_icon.png")} style={localStyles.quickBtnImg} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={localStyles.quickBtnBox}
                onPress={ () => Actions.CardListInfo({morePage : true}) }>
                <Image source={require("~/Common/Image/card_manager_icon.png")} style={localStyles.quickBtnImg} />
              </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={ Actions.ClientNoticeList }>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>공지사항</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ Actions.ClientTermsMenu } 
            style={{marginBottom: 14}}>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>약관 및 정책</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ () => this.setState({isModalVisible : true}) }>
            <View style={localStyles.listMenuWrap}>
              <Text style={localStyles.listMenuTxt}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => alert("개발중입니다.")} style={{marginBottom: 14}}>
            <View style={localStyles.listMenuWrap1}>
              <Text style={localStyles.listMenuTxt}>앱 버전</Text>
              <Text style={localStyles.listMenuTxt}>V.1.00</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* alert 메세지 모달 */}
        <CustomModal
            modalType="ALERT"
            isVisible={this.state.isAlertModal}
            onPress={ () => this.setState({isAlertModal : false})}
            infoText={this.state.resultMsg}
            btnText="확인"
        />
        <CustomModal
					modalType="CONFIRM"
					isVisible={this.state.isModalVisible}
					onPress1={() => this.setState({isModalVisible : false})}
					onPress2={this._logOut}
					infoText1="로그아웃 하시겠습니까?"
					infoText2={null}
					btnText1="취소"
					btnText2="확인"
				/>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  profileWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    padding: 26, 
    backgroundColor : color.whiteColor,
    height: 96,
    marginTop: 14,
    width: "100%"
  },
  profileTxtWrap: {
    justifyContent : "center",
    flex: 2
  },
  profileTitleTxt: {
    fontSize: 21,
    color: "#0b2024"
  },
  profileSubTxt: {
    fontSize: 14,
    color: "#8e8e98"
  },
  btnProfileModWrap: {
    alignItems: "flex-end"
  },
  quickBtnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 96,
    width: "100%",
    marginBottom: 14
  },
  quickBtnBox: {
    flex: 1,
    justifyContent : "center",
    alignItems: "center"
  },
  quickBtnImg: {
    width: 94,
    height: 74
  },
  listMenuWrap: {
    justifyContent: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26
  },
  listMenuTxt: {
    fontSize: 16,
    color: "#8e8e98"
  },
  listMenuWrap1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    backgroundColor : color.whiteColor,
    height: 48,
    width: "100%",
    paddingLeft: 26,
    paddingRight: 26
  }
});

export default MoreMenu;