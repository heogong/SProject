import React, { Component } from 'react';
import{ Alert, KeyboardAvoidingView,  Keyboard, View } from 'react-native';
import { Container, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE, CLIENT_USER, PARTNER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SnsSignUp from '~/FirstScreen/Functions/SnsSignUp';
import SignUp from '~/FirstScreen/Functions/SignUp';
import CheckUsr from '~/FirstScreen/Functions/CheckUsr';
import CheckSmsCertNum from '~/FirstScreen/Functions/CheckSmsCertNum';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import SendSmsCertNum from '~/FirstScreen/Functions/SendSmsCertNum';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const CERT_LEN = 4;

class InputPhoneAuth extends Component {
  constructor(props) {
    super(props);

    this.authNum = null;

    this.state = { 
      InpuCertNum: '',
      resultMsg : null,
      btnDisabled: true,
      disabledNextBtn : true,
      incorrectAuthNum : false,
      smsSendId : this.props.smsSendId,
      isModalVisible: false, // confirm modal 용
      isAlertModal : false, // alert 용
      resultMsg : null
    };
  }

  componentDidMount() {
    alert("certNum : "+ this.props.certNum)
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  // 인증번호 next 버튼 활성화 여부
  _handleNumberChange = async (text)  => {
    await this.setState({InpuCertNum : text})
    this.setState({btnDisabled : (this.state.InpuCertNum.length > CERT_LEN) ? false : true})
  } 

  // 인증번호 확인
  _checkSmsCertNum = () => {

    Keyboard.dismiss();
    // SMS 인증 확인
    CheckSmsCertNum(this.state.smsSendId, this.state.InpuCertNum).then(async result => {
      const CertResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      // SMS 인증 정상 여부
      if(CertResultBool) {

         // 가입 여부 확인
         CheckUsr(this.props.usrObj.usrPhoneNum).then(async result => {
            const UsrResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

            // 회원 가입X  : true
            if (UsrResultBool) {
              this.setState({
                disabledNextBtn : false, // 입력완료 버튼 활성화
                resultMsg : '핸드폰 인증이 완료되었습니다.'
              });
            } else {
              this._toggleModal();
              this.setState({
                btnDisabled : true,
                resultMsg : result.resultMsg
              });
            }
        });
      } else {
        this.setState({
          disabledNextBtn : true,
          incorrectAuthNum : true,
          resultMsg : result.resultMsg
        });
      }
    });
  }

  // 입력완료 - 회원가입
  _nextJoinBtn = () => {
    // SNS 가입 시
    if(this.props.usrObj.snsSignupYn == 'Y') {

      // 회원가입
      SnsSignUp(this.props.usrObj, this.props.tokenObj).then(async result => {
        console.log(result);
        const SignUpResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
        if (SignUpResultBool) {
        
          // 사용자 정보 가져오기
          this._getUserInfo();

        } else {
          this.setState({
            isAlertModal : true,
            resultMsg : resultData.resultMsg
          })
        }
      });
    } else {
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
          this.setState({
            isAlertModal : true,
            resultMsg : resultData.resultMsg
          })
        }
      });
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

  // 인증번호 API 호출 : 인증번호 틀렸을시 재전송
  _getAuthNumber = () => {

    SendSmsCertNum(this.props.usrObj.usrPhoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        // 인증페이지 이동
        this.setState({
          incorrectAuthNum : false,
          smsSendId : result.data.smsSendId,
          resultMsg : ''
        });

        this.authNum._root.clear();

        alert(result.data.certNum);
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : resultData.resultMsg
        })
      }
    })
  };

  // 이미 가입된 대상자 화면 이동
  _closeMoveAccountType = () => {
    //this._toggleModal();
    Actions.popTo("LoginAccountType");
  }

  // errorMsg 대상자 화면 이동
  _closeMoveAccountType2 = () => {
    //this.setState({isAlertModal : false});
    Actions.popTo("LoginAccountType");
  }


  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
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
            
            <View style={[styles.fx3, styles.justiConCenter]}>
              <View style={styles.fxDirRow}>
                <View style={[styles.fx3, styles.pr12, styles.justiConCenter]}>
                  <Item regular style={styles.inputWhBackGreyBo}>
                    <Input
                      ref={(input) => { this.authNum = input; }}
                      onChangeText={this._handleNumberChange}
                      value={this.state.text}
                      onSubmitEditing={this._checkSmsCertNum}
                      maxLength={ CERT_LEN + 2 }
                      autoFocus={ true }
                      keyboardType='numeric'
                      placeholder="인증번호 입력"
                      placeholderTextColor={color.inputPlaceHodler}
                      style={styles.inputDefaultBox}
                      />
                  </Item>
                </View>
                <View style={[styles.fx2, styles.justiConCenter]}>
                  <CustomButton 
                    onPress={this._checkSmsCertNum}
                    disabled={ this.state.btnDisabled }
                    CustomFontStyle={{fontSize: 14}}
                    CustomBtnStyle={{height: 48, marginBottom: -5}}
                  >
                    인증번호 확인
                  </CustomButton>
                </View>
              </View>

              <Text style={{marginTop: 10, color: color.warningColor, fontSize: 13}}>{this.state.resultMsg}</Text>

              {(this.state.incorrectAuthNum) ? (
                <View style={{marginTop: 10}}>
                  <CustomButton 
                    onPress={this._getAuthNumber}
                    DefaultLineBtn={true}
                  >
                    인증번호 재전송
                  </CustomButton>
                </View>
              ) : (
                <View/>
              ) }
            </View>

          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={this._nextJoinBtn}
              disabled={ this.state.disabledNextBtn }
              edgeFill={true}
              fillTxt={true}
            >
              입력완료
            </CustomButton>
          </View>
            

          <CustomModal
              modalType="CONFIRM"
              isVisible={this.state.isModalVisible}
              onPress1={this._toggleModal}
              onPress2={this._closeMoveAccountType}
              infoText1="현재 쿨리닉에 가입 되어있습니다."
              infoText2="로그인 페이지로 이동하시겠습니까?"
              btnText1="아니오"
              btnText2="예"
          />

          {/* alert 메세지 모달 */}
          <CustomModal
              modalType="ALERT"
              isVisible={this.state.isAlertModal}
              onPress={this._closeMoveAccountType2}
              infoText={this.state.resultMsg}
              btnText="확인"
          />
        </Container>
      </KeyboardAwareScrollView>


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