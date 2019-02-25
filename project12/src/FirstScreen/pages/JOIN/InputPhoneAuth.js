import React, { Component } from 'react';
import{ Alert, KeyboardAvoidingView, View } from 'react-native';
import { Container, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE, CLIENT_USER, PARTNER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SnsSignUp from '~/FirstScreen/Functions/SnsSignUp';
import SignUp from '~/FirstScreen/Functions/SignUp';
import CheckUsr from '~/FirstScreen/Functions/CheckUsr';
import CheckSmsCertNum from '~/FirstScreen/Functions/CheckSmsCertNum';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const CERT_LEN = 4
class InputPhoneAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      InpuCertNum: '',
      resultMsg : null,
      newMember : false,
      btnDisabled: true
    };
  }

  // 인증번호 next 버튼 활성화 여부
  _handleNumberChange = async (text)  => {
    await this.setState({InpuCertNum : text})
    this.setState({btnDisabled : (this.state.InpuCertNum.length > CERT_LEN) ? false : true})
  } 

  _checkSmsCertNum = () => {
    // SMS 인증 확인
    CheckSmsCertNum(this.props.smsSendId, this.state.InpuCertNum).then(async result => {
      const CertResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      // SMS 인증 정상 여부
      if(CertResultBool) {

         // 가입 여부 확인
         CheckUsr(this.props.usrObj.usrPhoneNum).then(async result => {
            const UsrResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

            // 회원 가입X  : true
            if (UsrResultBool) {
              this.setState({newMember : true});
            } else {

              Alert.alert(
                '',
                `${result.resultMsg} - 로그인 페이지로 이동하시겠습니까?`,
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '네', onPress: () => this._closeMoveAccountType},
                ],
                { cancelable: false }
              )

              this.setState({btnDisabled : true});
            }
        });
      }
      this.setState({resulMsg : result.resultMsg});
    });
  }

  _checkSmsCertNum222= () => {

    if (this.state.newMember) {
      // SNS 가입 시
      if(this.props.usrObj.snsSignupYn == 'Y'){

        // 회원가입
        SnsSignUp(this.props.usrObj, this.props.tokenObj).then(async result => {
          console.log(result);
          const SignUpResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          if (SignUpResultBool) {
          
            // 사용자 정보 가져오기
            this._getUserInfo();

          } else {
            Alert.alert(
              '',
              `${result.resultMsg} - 로그인 페이지로 이동하시겠습니까?`,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '네', onPress: () => this._closeMoveAccountType},
              ],
              { cancelable: false }
            )
            //Actions.InitPage();
          }
        });
      } else {
        // SNS 가입 아닐경우 이메일 입력 이동
        //Actions.JoinInputEmail();

        //회원가입
        SignUp(this.props.usrObj).then(async result => {
          const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

          if (ResultBool) {
            // console.log(result);

            // 고객 타입에 따른 페이지 이동
            if(this.props.usrObj.usrCustomerType == PARTNER) {
              Actions.PartnerIndex(); // 사업자 등록 페이지
            } else {
              Actions.CardIndex(); // 클라이언트 카드 정보 입력
            }

          } else {
            Alert.alert(
              '',
              result.resultMsg,
              [
                {text: '확인', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }
        });
      }
    }
  };

   // 로그인(토큰값 가져온) 사용자 정보 가져오기
   _getUserInfo = () => {
    GetUserInfo().then(async result => {
      GetCommonData(result, this._getUserInfo).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

              if(ResultBool) {
                // 클라이언트 사용자
                if(resultData.data.usrTypeCd == CLIENT_USER) {
                  Actions.CardIndex(); // 클라이언트 카드 정보 입력
                } else { // 파트너 사용자
                  Actions.PartnerIndex();
                }
              }
          }
      });
    });
  }

  // 이미 가입된 대상자 화면 이동
  _closeMoveAccountType = () => {
    Actions.LoginAccountType();
  }

  render() {
    return (
      // <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
      //   <CustomBasicWrapper
      //     title="본인 인증"
      //   >
      //     <Text>인증번호 입력</Text>
      //     <Text>인증ID : {this.props.smsSendId} </Text>
      //     <Text>인증번호 : {this.props.certNum} </Text>
          
      //       <Item regular >
      //         <Input 
      //           onChangeText={this._handleNumberChange}
      //           value={this.state.text}
      //           keyboardType='numeric'
      //           onSubmitEditing={this._checkSmsCertNum}
      //           placeholder='######'
      //           maxLength={ CERT_LEN + 2 }
      //           autoFocus={ true }
      //         />
      //       </Item>

      //       <CustomButton
      //         block={ true }
      //         info={ true }
      //         bordered={ true }
      //         disabled={ this.state.btnDisabled }
      //         onPress={this._checkSmsCertNum}>
      //         <Text>
      //         다음 단계로 이동(4/4)
      //         </Text>
      //       </CustomButton>
      //   </CustomBasicWrapper>
      // </KeyboardAvoidingView>
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>도착한</Text>
                <Text style={stylesReg.leftGuideTxt}>인증번호를</Text>
                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>01</Text>
              </View>
            </View>
            
            <View style={stylesReg.procBarWrap}>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
            </View>
          </View>

          <View style={[styles.fx2, styles.justiConCenter]}>
            <View style={styles.fxDirRow}>
              <View style={{width : '60%', paddingRight : 5}}>
                <Item regular style={{height : 50}}>
                  <Input
                    onChangeText={this._handleNumberChange}
                    value={this.state.text}
                    onSubmitEditing={this._checkSmsCertNum}
                    maxLength={ CERT_LEN + 2 }
                    autoFocus={ true }
                    keyboardType='numeric'
                    placeholder="인증번호입력"
                    />
                </Item>
                <Text style={styles.greyFont}>{this.state.resultMsg}</Text>
              </View>
              <View style={{width: '40%'}}>
                <CustomButton 
                  onPress={this._checkSmsCertNum}
                  disabled={ this.state.btnDisabled }
                  edgeFill={true}
                  fillTxt={true}
                  textStyle={styles.whiteFont}
                >
                  인증번호확인
                </CustomButton>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={this._checkSmsCertNum}
              disabled={ this.state.btnDisabled }
              edgeFill={true}
              fillTxt={true}
            >
              입력완료
            </CustomButton>
          </View>
        </View>
      </Container>


    )
  }
}

let mapStateToProps = (state) => {
  return {
      usrObj: state.USER,
      tokenObj: state.TOKEN

  };
}

InputPhoneAuth = connect(mapStateToProps)(InputPhoneAuth);

export default InputPhoneAuth;