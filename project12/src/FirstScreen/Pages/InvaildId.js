import React, { Component } from "react";
import { Keyboard, StyleSheet, View } from 'react-native'
import { Container, Button, Tab, Tabs, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import SendSmsCertNum from '~/FirstScreen/Functions/SendSmsCertNum';
import CheckSmsCertNum from '~/FirstScreen/Functions/CheckSmsCertNum';
import FindUserId from '~/FirstScreen/Functions/FindUserId';
import FindUserPwd from '~/FirstScreen/Functions/FindUserPwd';
import ChangeUserPwd from '~/FirstScreen/Functions/ChangeUserPwd';
import InvaildPasswd from './InvaildPasswd';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

let SMS_SEND_ID = null; // 인증 고유번호
let PWD_AUTH_NUM = null; // 패스워드 탭 인증번호
let PWD_EMAIL = null; // 패스워드 찾기 아이디(이메일)
let PWD_NAME = null; // 패스워드 찾기 이름
let PWD_PHONE_NUM = null; // 패스워드 찾기 폰번호 
let PASSWD1 = null; // 패스워드 탭 비밀번호1
let PASSWD2 = null; // 패스워드 탭 비밀번호1

class InvaildId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableAuthBtn : true,
      disableNextBtn : true,
      disablePwdBtn1 : true,
      usrId : '',
      name : '',
      phoneNum : '',
      authNum : '',
      authErrorMsg : null,
      authPwdErrorMsg : null,
      isAlertModal : false, // alert 용
      resultMsg : '',// alert 용

      checkBox : false,
      findId : false,
      tabIndex : 0,
      passwdStatus : 0
    };
  }

  // 인증번호 API 호출
  _sendSmsCertNum = () => {
    Keyboard.dismiss();

    const { phoneNum } = this.state;

    SendSmsCertNum(phoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        this.setState({
          isAlertModal : true,
          resultMsg : `${phoneNum}로 6자리 인증번호를`,
          resultMsg2 : `보내드렸습니다. 5분 내 인증번호를 입력해주세요!${result.data.certNum}`,
          disableNextBtn : false
        })

        SMS_SEND_ID = result.data.smsSendId;

      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  };


  // SMS 인증 확인
  _checkSmsCertNum = () => {
    CheckSmsCertNum(SMS_SEND_ID, this.state.authNum).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 
      if(ResultBool) {
        this._findUserId();
      } else {
        this.setState({
          authErrorMsg : result.resultMsg
        })
      }
    })
  };

  // 아이디 찾기 요청
  _findUserId = () => {
    const { name, phoneNum } = this.state;

    FindUserId(name, phoneNum).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 
      if(ResultBool) {
        this.setState({
          usrId : result.data.usrId,
          findId : true
        });
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  }

  // SMS 인증 확인 - 비밀번호
  _checkPwdSmsCertNum = () => {
    CheckSmsCertNum(SMS_SEND_ID, PWD_AUTH_NUM).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 
      if(ResultBool) {
        this._findUserPwd();
      } else {
        this.setState({
          authPwdErrorMsg : result.resultMsg
        })
      }
    })
  };

   // 비밀번호 찾기 요청
   _findUserPwd = () => {
    FindUserPwd(PWD_EMAIL, PWD_NAME, PWD_PHONE_NUM).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 
      if(ResultBool) {
        this.setState({
          passwdStatus : 1
        });
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  }

  // 비밀번호 변경 요청
  _changeUserPwd = () => {
    ChangeUserPwd(PWD_EMAIL, PWD_NAME, PWD_PHONE_NUM, PASSWD2).then(async result => {
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 
      if(ResultBool) {
        this.setState({
          passwdStatus : 2
        });
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  }


  _chkAuthBtn = () => {
    const nameLen = 2;
    const numLen = 10;

    const { name, phoneNum } = this.state;

    if( name.length >= nameLen && phoneNum.length >= numLen ) {
      this.setState({disableAuthBtn : false});
    } else {
      this.setState({disableAuthBtn : true});
    }
  }

  // 비밀번호 - 인증요청 성공 시
  _activePwd1Button = (returnData) => {
    SMS_SEND_ID = returnData.smsSendId;
    PWD_EMAIL = returnData.email;
    PWD_NAME = returnData.name;
    PWD_PHONE_NUM = returnData.phoneNum;

    this.setState({disablePwdBtn1 : false});
  }

  // 비밀번호 - SET 인증값 
  _pwdAuthNum = (num) => {
    PWD_AUTH_NUM = num;
  }

   // 비밀번호 - 변경 비밀번호1
   _setPasswd1 = (text) => {
    PASSWD1 = text;
   }

   // 비밀번호 - 변경 비밀번호2
   _setPasswd2 = (text) => {
    PASSWD2 = text;
   }

   _changePasswd = () => {
    //패스워드 유효성 검사 필요(null 여부 / 패턴 여부)
    if(PASSWD1 == '') {
      this.setState({
        isAlertModal : true,
        resultMsg : '비밀번호를 입력해주세요.',
        resultMsg2 : null
      })
      return;
    }

    if(PASSWD2 == '') {
      this.setState({
        isAlertModal : true,
        resultMsg : '비밀번호를 입력해주세요.',
        resultMsg2 : null
      })
      return;
    }

    if(PASSWD1 == PASSWD2) {
      this._changeUserPwd();
    } else {
      this.setState({
        isAlertModal : true,
        resultMsg : '비밀번호가 동일하지 않습니다.',
        resultMsg2 : null
      })
    }
  }


  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>본인인증 하고</Text>
                {
                  (this.state.tabIndex == 0 ) ? (
                    <Text style={stylesReg.leftGuideTxt}>아이디를 찾으세요</Text>
                  ) : (
                    <Text style={stylesReg.leftGuideTxt}>비밀번호를 찾으세요</Text>
                  )
                }
              </View>
            </View>
          </View>

          <View style={localStyles.idPwFindTabWrap}>
            <Tabs 
              onChangeTab={(obj, ref) => this.setState({tabIndex : obj.i})}
              scrollWithoutAnimation={true}
              style={{}}
              tabContainerStyle={styles.tabsReset}>
              <Tab 
                heading="아이디찾기" 
                style={styles.tabHeadTxt}
                tabStyle={styles.tabStyle}
                textStyle={styles.tabTxtStyle}
                activeTabStyle={styles.tabActStyle}
                activeTextStyle={styles.tabActTxtStyle}
              >
              { (!this.state.findId) ? (
                <View style={localStyles.inputBoxWrap}>
                  <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                    <Input
                      onChangeText={ async (text) => { await this.setState({name : text}), this._chkAuthBtn()} } 
                      placeholder="이름" 
                      style={[styles.inputBox, styles.pl9]} 
                      placeholderTextColor={color.inputPlaceHodler}
                    />
                  </Item>
                  <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                    <Input 
                      onChangeText={ async (text) => { await this.setState({phoneNum : text}), this._chkAuthBtn()} } 
                      placeholder="핸드폰번호 (하이푼 - 제외하고 입력)" 
                      style={[styles.inputBox, styles.pl9]} 
                      placeholderTextColor={color.inputPlaceHodler}
                      keyboardType={"numeric"}
                    />
                  </Item>

                  <View style={[styles.fxDirRow, styles.mb12]}>
                    <View style={[styles.fx4, styles.pr12]}>
                      <Item regular style={styles.inputWhBackWhBo}>
                        <Input 
                          onChangeText={ (text) => this.setState({authNum : text})}
                          placeholder="인증번호입력" 
                          style={[styles.inputBox, styles.pl9]} 
                          placeholderTextColor={color.inputPlaceHodler}
                          keyboardType={"numeric"}
                        />
                      </Item>
                    </View>

                    <View style={styles.fx3}>
                      <CustomButton
                        onPress={this._sendSmsCertNum}
                        // disabled={this.state.disableAuthBtn}
                        WhiteLineBtn={true}
                        CustomBtnStyle={{height: 36}}
                        CustomFontStyle={{fontSize: 12}}
                      >
                        인증번호 받기
                      </CustomButton>
                    </View>
                  </View>

                  <View>
                    <Text style={{color: color.whiteColor}}>{this.state.authErrorMsg}</Text>
                  </View>
                </View>
              ) : (
                <View style={localStyles.blankBoxWrap}>
                  <Text style={{color: color.whiteColor}}>{this.state.name}님은 이메일로 가입되어있으며</Text>
                  <Text style={[{color: color.whiteColor}, styles.mb12]}>회원님의 아이디는 {this.state.usrId} 입니다</Text>
                  <Text style={{color: color.whiteColor}}>지금 바로 로그인하러 이동하세요</Text>
                </View>
              )}
              </Tab>
              <Tab 
                heading="비밀번호찾기" 
                style={styles.tabHeadTxt}
                tabStyle={styles.tabStyle}
                textStyle={styles.tabTxtStyle}
                activeTabStyle={styles.tabActStyle}
                activeTextStyle={styles.tabActTxtStyle}
              >
                <InvaildPasswd 
                  status={ this.state.passwdStatus } 
                  action={this._activePwd1Button}
                  authAction={this._pwdAuthNum}
                  setPwdActions1={this._setPasswd1}
                  setPwdActions2={this._setPasswd2}
                  authErrorMsg={this.state.authPwdErrorMsg}
                />

              </Tab>
            </Tabs>
          </View>
          { 
            (this.state.tabIndex == 0) ? (
              (!this.state.findId) ? (
                <View style={styles.footerBtnWrap}>
                  <CustomButton
                    onPress={ this._checkSmsCertNum }
                    DefaultLineBtn={true}
                    disabled={this.state.disableNextBtn}
                    CustomBtnStyle={styles.mt13}
                  >
                    확인
                  </CustomButton>
                </View>
              ) : (
                <View style={styles.footerBtnWrap}>
                  <CustomButton
                    onPress={ () => Actions.popTo("LoginAccountType") }
                    DefaultLineBtn={true}
                    CustomBtnStyle={styles.mt13}
                  >
                    로그인하기
                  </CustomButton>
                </View>
              )
            ) : (
              (this.state.passwdStatus == 0 ) ? (
                <View style={styles.footerBtnWrap}>
                  <CustomButton
                    onPress={ this._checkPwdSmsCertNum }
                    disabled={ this.state.disablePwdBtn1 }
                    DefaultLineBtn={true}
                    CustomBtnStyle={styles.mt13}
                  >
                    확인
                  </CustomButton>
                </View>
              ) : (
                (this.state.passwdStatus == 1 ) ? (
                  <View style={styles.footerBtnWrap}>
                    <CustomButton
                      onPress={ this._changePasswd }
                      DefaultLineBtn={true}
                      CustomBtnStyle={styles.mt13}
                    >
                      비밀번호 설정
                    </CustomButton>
                  </View>
                ) : (
                  <View style={styles.footerBtnWrap}>
                    <CustomButton
                      onPress={ () => Actions.popTo("LoginAccountType") }
                      DefaultLineBtn={true}
                      CustomBtnStyle={styles.mt13}
                    >
                      로그인 하기
                    </CustomButton>
                  </View>
                )
              )
            )
          }
          </View>

          {/* alert 메세지 모달 */}
          <CustomModal
              modalType="ALERT"
              isVisible={this.state.isAlertModal}
              onPress={ () => this.setState({isAlertModal : false})}
              infoText={this.state.resultMsg}
              infoText2={this.state.resultMsg2}
              btnText="확인"
          />
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  idPwFindTabWrap: {
    flex: 3,
    marginTop: 38
  },
  inputBoxWrap: {
    paddingTop : 52,
    paddingLeft : 20,
    paddingRight : 20,
    flex: 1,
    backgroundColor : color.defaultColor
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default InvaildId;
