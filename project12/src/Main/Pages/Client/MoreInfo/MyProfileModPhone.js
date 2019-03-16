import React, { Component } from "react";
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import SendSmsCertNum from '~/FirstScreen/Functions/SendSmsCertNum';
import CheckSmsCertNum from '~/FirstScreen/Functions/CheckSmsCertNum';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

const PHONE_AUTH_LEN = 6; // 인증번호 길이
let SMS_SEND_ID = null; // 인증 고유번호

class MyProfileModPassword1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNum : '',
      authNum : '',
      disableBtn1 : true,
      disableBtn2 : true,
      
      isAlertModal : false, // alert 용
      isAlertLine : false, // alert 용
      resultMsg : null, // alert 용
      resultMsg2 : null // alert 용
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
          resultMsg2 : `보내드렸습니다. 5분 내 인증번호를 입력해주세요!`
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
        // 휴대폰 번호 변경 api 호출
        if(true) {
          Actions.popTo("PartnerMoreInfo");

        } else {
          this.setState({
            isAlertModal : true,
            resultMsg : result.resultMsg,
            resultMsg2 : null
          })
        }
      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  };

  // 인증번호 받기 버튼 활성화 여부
  _chkButton1 = () => {
    const chkLen = 9;
    const { phoneNum } = this.state;

    if(phoneNum.length > chkLen) {
      this.setState({disableBtn1 : false});
    } else {
      this.setState({disableBtn1 : true});
    }
  }

  // 휴대폰 설정 완료 버튼 활성화 여부
  _chkButton2 = () => {
    const { authNum } = this.state;

    if(authNum.length >= PHONE_AUTH_LEN) {
      this.setState({disableBtn2 : false});
    } else {
      this.setState({disableBtn2 : true});
    }
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="휴대폰 번호 설정"/>

        <View style={styles.contentWrap}>

          <View>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>휴대폰 번호를 입력하신 후 [인증번호 받기] 버튼을 눌러주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>휴대폰번호 (’-’ 제외)</Text>

            <Item regular style={[styles.inputNbWhBackGreyBottomBo, styles.mb10]}>
              <Input
                onChangeText={ (text) => {this.setState({ phoneNum : text }), this._chkButton1() }}
                keyboardType={"number-pad"}
                placeholder="휴대폰 번호를 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox}
              />
              <TouchableOpacity onPress={ () => this.setState({ phoneNum : '' })}>
                <Icon name="close-circle" style={localStyles.phototIcon} style={{color: "#8e8e98"}} />
              </TouchableOpacity>
            </Item>

            <CustomButton
              onPress={ this._sendSmsCertNum }
              disabled={this.state.disableBtn1}
            >
              인증번호 받기
            </CustomButton>


            <Text style={styles.inputNbTitleTxt}>인증번호</Text>

            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                onChangeText={ async (text) => {await this.setState({ authNum : text }), this._chkButton2() }}
                keyboardType={"number-pad"}
                maxLength={PHONE_AUTH_LEN}
                placeholder="인증번호를 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton
              onPress={this._checkSmsCertNum}
              disabled={this.state.disableBtn2}
            >
              휴대폰 번호 설정완료
            </CustomButton>
          </View>
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
  inputIcon: {
    paddingLeft: 0,
    marginRight: 6,
    width: 24,
    height: 24
  },
});

export default MyProfileModPassword1; 
