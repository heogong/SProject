import React, { Component } from "react";
import { Keyboard, View } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class MyProfileExit1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwd : '',
      disableBtn : true,
      isAlertModal : false, // alert 용
      resultMsg : ''// alert 용
    };
  }

  _chkPasswd = () => {
    
    //비밀번호 인증 api
    if(true) {
      Actions.MyProfileExit2();
    } else {
      this.setState({
        isAlertModal : true,
        resultMsg : resultData.resultMsg
      })
    }
  }



  _chkButton = () => {
    const chkLen = 3;
    const { passwd } = this.state;

    if(passwd.length > chkLen) {
      this.setState({disableBtn : false});
    } else {
      this.setState({disableBtn : true});
    }
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="회원탈퇴"/>
        <View style={styles.contentWrap}>

          <View>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>개인정보를 안전하게 보호하기 위해 비밀번호를 입력해주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>현재 비밀번호</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                onChangeText={(text) => { this.setState({passwd : text}), this._chkButton() } }
                placeholder="현재 비밀번호를 입력해주세요." 
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
              다음
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

export default MyProfileExit1; 
