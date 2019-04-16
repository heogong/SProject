import React, { Component } from "react";
import { ScrollView, Keyboard, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Button, Container, CheckBox, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


import { BStyles } from '~/Common/Styles/Button';


class MyProfileExit2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc : '',
      checkbox : false,
      disableBtn : true,
      isAlertModal : false, // alert 용
      resultMsg : ''    // alert 용
    };
  }

  _exitChk = () => {
    // 탈퇴 호출
    if (true) {
      Actions.InitPage();
    } else {
      this.setState({
        isAlertModal : true,
        resultMsg : resultData.resultMsg
      })
    }
  }

  toggleSwitch() {
    this.setState({
      checkbox: !this.state.checkbox
    });

    this._chkBtn();
  }

  _chkBtn = () => {
    const descLen = 3;
    const {checkbox, desc} = this.state;

    if(checkbox && desc.length >= descLen) {
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

          <View style={localStyles.topTxtWrap}>
            <Text style={localStyles.topTxt}>회원 탈퇴 시 이용 정보 및</Text>
            <Text style={localStyles.topTxt}>모든 혜택이 즉시 소멸됩니다</Text>
          </View>
      
          <View style={localStyles.reasonWrap}>
            <Text style={localStyles.subTitleTxt}>탈퇴 사유</Text>
            <Item regular style={styles.inputWhBackGreyBo}>
              <Input 
                onChangeText={ (text) => {this.setState({desc : text}), this._chkBtn() }}
                placeholder="탈퇴 사유를 입력해주세요." 
                style={styles.inputDefaultBox}
                placeholderTextColor={color.inputPlaceHodler} 
              />
            </Item>
          </View>

          <View style={localStyles.reasonWrap}>
            <Text style={localStyles.subTitleTxt}>탈퇴 전 꼭 확인 하세요!</Text>
            <View style={{height: 200}}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <View style={localStyles.infoWrap}>
                  <Text style={localStyles.dotTxt}>·</Text>
                  <Text style={localStyles.infoTxt}>쿨리닉 회원 탈퇴 시, 즉시 탈퇴 처리되며 서비스 이용이 불가합니다.</Text>
                </View>

                <View style={localStyles.infoWrap}>
                  <Text style={localStyles.dotTxt}>·</Text>
                  <Text style={localStyles.infoTxt}>회원정보는 회원 탈퇴 시 즉시 삭제됩니다. 다만, 부정 이용·거래 방지 및 전자상거래법 등 관련 법령에 따라 보관이 필요한 경우 해당 기간동안 회원정보가 보관됩니다.</Text>
                </View>

                <View style={localStyles.infoWrap}>
                  <Text style={localStyles.dotTxt}>·</Text>
                  <Text style={localStyles.infoTxt}>동일한 이메일 주소로 회원 탈퇴 후 5일 동안 가입이 불가합니다. (다른 이메일 주소로는 가입이 가능합니다.)</Text>
                </View>

                <View style={localStyles.infoWrap}>
                  <Text style={localStyles.dotTxt}>·</Text>
                  <Text style={localStyles.infoTxt}>자세한 사항은 개인정보처리방침을 확인하시기 바랍니다.</Text>
                </View>
                
              </ScrollView>
            </View>
          </View>

          <View style={[styles.footerBtnWrap, {flex: 1}]}>
            <View style={[styles.fxDirRow, styles.alignItemsCenter, styles.justiConEnd]}>
              {this.state.checkbox
              ?
                <TouchableOpacity
                  onPress={async () => { await this.setState({checkbox : false}), await this._chkBtn()}}
                >
                  <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                </TouchableOpacity>
              :
                <TouchableOpacity
                  onPress={async () => { await this.setState({checkbox : true}), await this._chkBtn()}}
                >
                  <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                </TouchableOpacity>
              }
              <Text style={{fontSize: 14, color: "#1e1e32"}}>동의합니다.</Text>
            </View>
             <CustomButton 
                onPress={ this._exitChk }
                disabled={ this.state.disableBtn }
              >
                탈퇴하기
            </CustomButton>
          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  topTxtWrap: {
    marginTop: 26,
    marginBottom: 39
  },
  topTxt: {
    fontSize: 21,
    color: color.defaultColor
  },
  reasonWrap: {
    marginBottom: 30
  },
  subTitleTxt: {
    fontSize: 14,
    color: "#8e8e98",
    marginBottom: 10,
    fontWeight: "bold"
  },
  dotTxt: {
    marginRight: 6,
    fontSize: 16,
    color: "#626270",
    fontWeight: "bold"
  },
  infoTxt: {
    fontSize: 14,
    color: "#626270"
  },
  infoWrap: {
    flexDirection: "row",
    marginBottom: 12,
    paddingLeft: 3
  }
});

export default MyProfileExit2; 
