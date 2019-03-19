import React, { Component } from "react";
import { AsyncStorage, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Button, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomEtcButton from "~/Common/Components/CustomEtcButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

class MyProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      isAlertModal : false, // alert 용
      resultMsg : null// alert 용
    };
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
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="내정보 수정" />

        <View style={styles.contentWrap}>

          <View>
            <Text style={styles.inputNbTitleTxt}>이메일</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Image source={require('~/Common/Image/intro-logo.png')} style={localStyles.inputIcon} />
              <Input value={this.state.data.usrId} style={styles.inputNbDefaultBox} editable={false} selectTextOnFocus={false}/>
            </Item>

            <Text style={styles.inputNbTitleTxt}>비밀번호</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input value="1234" style={styles.inputNbDefaultBox} editable={false} selectTextOnFocus={false} secureTextEntry={true}/>

              <CustomEtcButton
                onPress={ Actions.ClientMyProfileModPassword1 }
                SmallBtn={true}
                customStyle={{width: 80, marginTop: 10}}
              >
                변경
              </CustomEtcButton>

            </Item>

            <Text style={styles.inputNbTitleTxt}>이름</Text>

            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input value={this.state.data.usrNm} style={styles.inputNbDefaultBox} editable={false} selectTextOnFocus={false}/>

              <CustomEtcButton
                onPress={ Actions.ClientMyProfileModName }
                SmallBtn={true}
                customStyle={{width: 80, marginTop: 10}}
              >
                변경
              </CustomEtcButton>
            </Item>

            <Text style={styles.inputNbTitleTxt}>핸드폰번호 (2019.02.14 인증됨)</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input value={this.state.data.usrPhoneNum} style={styles.inputNbDefaultBox} editable={false} selectTextOnFocus={false}/>

              <CustomEtcButton
                onPress={ Actions.ClientMyProfileModPhone }
                SmallBtn={true}
                customStyle={{width: 80, marginTop: 10}}
              >
                변경
              </CustomEtcButton>

            </Item>
            
            <View style={styles.fxDirRow}>
              <Text style={[styles.inputNbTitleTxt, {color: "#626270"}]}>회원 탈퇴하시려면 </Text>
              <TouchableOpacity 
                  onPress={ Actions.ClientMyProfileExit1 }>
                  <Text style={[styles.inputNbTitleTxt, {color: "#626270", textDecorationLine: 'underline'}]}>여기</Text>
                </TouchableOpacity>
              <Text style={[styles.inputNbTitleTxt, {color: "#626270"}]}>를 눌려주세요.</Text>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._logOut }
            >
              로그아웃
            </CustomButton>
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
  inputIcon: {
    paddingLeft: 0,
    marginRight: 6,
    width: 24,
    height: 24
  },
});

export default MyProfileInfo; 
