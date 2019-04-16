import React, { Component } from "react";
import { View } from 'react-native'
import { Container, Text, Item, Input, Icon } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import ChangeMyUsrPasswd from '~/Main/Functions/ChangeMyUsrPasswd';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

const USR_PASSWD_LEN = 8;
const PASSWD_PATTERN = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

class MyProfileModPassword2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwd1 : '',
      passwd2 : '',
      patternPw : false,
      disableBtn : true,
      errMsg : null,
      isAlertModal : false, // alert 용
      resultMsg : null  // alert 용
    };
  }

  // 비밀번호 변경 요청(로그인 상태)
  _changeMyUsrPasswd = () => {
    const { passwd2 } = this.state;

    ChangeMyUsrPasswd(passwd2).then(async result => {
        GetCommonData(result, this._changeMyUsrPasswd).then(async resultData => {
            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                    Actions.popTo("ClientMyProfileInfo");
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

  // 비밀번호 변경 버튼 활성화 여부
  _handlePasswdChange = async (text) => {
    const { passwd1, passwd2 } = this.state;

    await this.setState({passwd1 : text});

    if(!PASSWD_PATTERN.test(text)) {
      this.setState({
        patternPw : false,
        disableBtn : true
      });
    } else {
      this.setState({patternPw : true});

      if(passwd2 !== '') {
        this.setState({disableBtn : (passwd1.length > USR_PASSWD_LEN) ? false : true})
      }
    }
  } 

  // 비밀번호 변경 버튼 활성화 여부
  _handleChkPasswdChange = async (text) => {
    const { passwd1, passwd2 } = this.state;

    await this.setState({passwd2 : text});

    if(!PASSWD_PATTERN.test(text)) {
      this.setState({
        disableBtn : true
      });
    } else {
      if( passwd1 !== '') {
        this.setState({disableBtn : (passwd2.length > USR_PASSWD_LEN) ? false : true})
      }
    }
  }

  // 비밀번호 체크 여부
  _checkUsrPasswd = () => {
    const { passwd1, passwd2 } = this.state;

    if(passwd1 !== passwd2) {
      this.setState({errMsg : '비밀번호가 맞지 않습니다.'});
      return false;
    } else {
      this.setState({errMsg : ''});
      return true;
    }
  }

  // 최종 체크 후 변경 완료
  _checkNextButton = async () => {
    const passwdVaild = await(this._checkUsrPasswd());

    if (passwdVaild) {
      this._changeMyUsrPasswd();
    }
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="비밀번호 설정"/>

        <View style={styles.contentWrap}>

          <View>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>8자 이상의 비밀번호를 입력한 후 [설정완료] 버튼을누러주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>새 비밀번호 (8자 이상)</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                onChangeText={this._handlePasswdChange}
                placeholder="새로운 비밀번호를 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox} secureTextEntry={true}
              />
              {this.state.patternPw 
              // 패턴이 맞으면
              ? <Icon name="ios-checkmark-circle" style={[styles.inputIcon, {color: color.defaultColor}]} />
              // 패턴이 틀리면
              : <Icon name="ios-checkmark-circle" style={[styles.inputIcon, {color: color.greyColor}]} />}
            </Item>
            <Text style={styles.inputNbTitleTxt}>새 비밀번호 확인</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                onChangeText={this._handleChkPasswdChange}
                placeholder="새로운 비밀번호를 다시 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox} 
                secureTextEntry={true}
                onBlur={ this._checkUsrPasswd }
              />
            </Item>
            <Text style={{color: color.warningColor, fontSize: 13}}>{this.state.errMsg}</Text>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._checkNextButton }
              disabled={ this.state.disableBtn }
            >
              설정완료
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

export default MyProfileModPassword2; 
