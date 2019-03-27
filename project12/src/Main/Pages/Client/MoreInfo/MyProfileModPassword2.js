import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Button, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import ChangeMyUsrPasswd from '~/Main/Functions/ChangeMyUsrPasswd';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class MyProfileModPassword2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwd1 : '',
      passwd2 : '',
      disableBtn : true,
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

  _chkPasswd = () => {
    const { passwd1, passwd2 } = this.state;

    if(passwd1 == passwd2) {
      this._changeMyUsrPasswd();
    } else {
      this.setState({
        isAlertModal : true,
        resultMsg : '비밀번호가 동일하지 않습니다.'
      })
    }
  }

  _chkButton = () => {
    const chkLen = 4; // 변경 필요
    const { passwd1, passwd2 } = this.state;

    if(passwd1.length > chkLen && passwd2.length > chkLen) {
      this.setState({disableBtn : false});
    } else {
      this.setState({disableBtn : true});
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
                onChangeText={async (text) => { await this.setState({passwd1 : text}), this._chkButton() } }
                placeholder="새로운 비밀번호를 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox} secureTextEntry={true}
              />
            </Item>
            <Text style={styles.inputNbTitleTxt}>새 비밀번호 확인</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                onChangeText={async (text) => { await this.setState({passwd2 : text}), this._chkButton() } }
                placeholder="새로운 비밀번호를 다시 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox} 
                secureTextEntry={true}
              />
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._chkPasswd }
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
