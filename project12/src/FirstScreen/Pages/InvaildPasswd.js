import React, { Component } from "react";
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import SendSmsCertNum from '~/FirstScreen/Functions/SendSmsCertNum';

import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportHeight } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class InvaildPasswd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableAuthBtn : true,
      disableNextBtn : true,
      email : '',
      name : '',
      phoneNum : '',
      authNum : '',
      authErrorMsg : null,
      isAlertModal : false, // alert 용
      resultMsg : ''// alert 용
    };
  }

  // 인증번호 API 호출
  _sendSmsCertNum = () => {
    Keyboard.dismiss();

    const { email, name, phoneNum } = this.state;

    SendSmsCertNum(phoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        this.setState({
          isAlertModal : true,
          resultMsg : `${phoneNum}로 6자리 인증번호를`,
          resultMsg2 : `보내드렸습니다. 5분 내 인증번호를 입력해주세요!${result.data.certNum}`,
        })

        let data = { 
          smsSendId : result.data.smsSendId,
          email : email,
          name : name,
          phoneNum : phoneNum
        }

        this.props.action(data);

      } else {
        this.setState({
          isAlertModal : true,
          resultMsg : result.resultMsg,
          resultMsg2 : null
        })
      }
    })
  };


  _chkAuthBtn = () => {
    const emailLen = 5;
    const nameLen = 2;
    const numLen = 10;

    const { email, name, phoneNum } = this.state;

    if( email.length >= emailLen && name.length >= nameLen && phoneNum.length >= numLen ) {
      this.setState({disableAuthBtn : false});
    } else {
      this.setState({disableAuthBtn : true});
    }
  }
  
  render() {
    return (
      (this.props.status == 0) ? (
        <View style={localStyles.inputBoxWrap}>
          <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
            <Input 
              onChangeText={ async (text) => { await this.setState({email : text}), this._chkAuthBtn() }}
              placeholder="이메일 아이디" 
              style={[styles.inputBox, styles.pl9]} 
              placeholderTextColor={color.inputPlaceHodler}
            />
          </Item>
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
            <View style={[styles.fx3, styles.pr12]}>
              <Item regular style={styles.inputWhBackWhBo}>
                <Input 
                  onChangeText={ (text) => this.props.authAction(text)}
                  placeholder="인증번호입력" 
                  style={[styles.inputBox, styles.pl9]} 
                  placeholderTextColor={color.inputPlaceHodler}
                  keyboardType={"numeric"}
                />
              </Item>
            </View>
            <View style={styles.fx2}>
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
            <Text style={{color: color.whiteColor}}>{this.props.authErrorMsg}</Text>
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
        </View>

      ) : (
        (this.props.status == 1) ? (
          <View style={localStyles.inputBoxWrap}>

            <View style={localStyles.txtWrap}>
              <Text style={{textAlign: 'center', color: color.whiteColor}}>{this.state.name}님({this.state.email})의</Text>
              <Text style={[{textAlign: 'center', color: color.whiteColor}, styles.mb12]}>본인확인이 완료되었습니다</Text>
              <Text style={{textAlign: 'center', color: color.whiteColor}}>새롭게 사용하실 비밀번호를 입력해주세요</Text>
            </View>
            <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
              <Input 
                onChangeText={ (text) => this.props.setPwdActions1(text)}
                placeholder="비밀번호(영문+숫자+특수문자조합 8~16자리)" 
                style={[styles.inputBox, styles.pl9]} 
                placeholderTextColor={color.inputPlaceHodler}
                secureTextEntry={true}
              />
            </Item>
            <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
              <Input 
                onChangeText={ (text) => this.props.setPwdActions2(text)}
                placeholder="비밀번호 확인" 
                style={[styles.inputBox, styles.pl9]} 
                placeholderTextColor={color.inputPlaceHodler}
                secureTextEntry={true}
              />
            </Item>
          </View>
        ) : (
          <View style={localStyles.blankBoxWrap}>
            <Text style={{color: color.whiteColor}}>{this.state.name}님({this.state.email})의</Text>
            <Text style={[{color: color.whiteColor}, styles.mb12]}>새로운 비밀번호가 설정되었습니다</Text>
            <Text style={{color: color.whiteColor}}>지금 바로 로그인하러 이동해주세요</Text>
          </View>
        )
      )
    );
  }
}

const localStyles = StyleSheet.create({
  idPwFindTabWrap: {
    flex: 2,
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
  },
  txtWrap: {
    paddingTop: 5,
    paddingBottom: 41
  }
});
export default InvaildPasswd;