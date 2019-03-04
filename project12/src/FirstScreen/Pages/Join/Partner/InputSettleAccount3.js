import React, { Component } from 'react';
import { View } from 'react-native'
import { ActionSheet, Container, Root, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetBankInfo from '~/FirstScreen/Functions/GetBankInfo';
import RegSettleAccount from '~/FirstScreen/Functions/RegSettleAccount';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class InputSettleAccount3 extends Component {
  constructor(props) {
      super(props);
      this.state = {
        buttonTitle : null,
        selectIndex : 0,
        bankInfo : [
          { text : "데이터가 없습니다.", bankCode : ''}
        ],
        settleAccount: {
          number : '',
          name :'',
        }
    };
  }

  componentWillMount() {
    this._getBankInfo();
  }


  // 은행정보 가져오기
  _getBankInfo = () => {
    GetBankInfo().then(result => {
      GetCommonData(result, this._getBankInfo).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              //console.log(resultData);
              if(ResultBool) {
                const bankSet = resultData.data.map((bank) => {
                  return { ...bank, text : bank.commCdNm, bankCode : bank.commCd };
                });
                this.setState({ bankInfo: bankSet });
              } else {
                  alert(resultData.resultMsg);
              }
          }
      });
    });
  }

  // 계좌번호 입력
  _inputSettleAccount = (account) => {
    this.setState({
      settleAccount : {
        ...this.state.settleAccount,
        number : account
      }
    });
  }

  // 예금 주 입력
  _inputSettleAccountName = (name) => {
    this.setState({
      settleAccount : {
        ...this.state.settleAccount,
        name : name
      }
    });
  }

  // NEXT 
  _nextPress = () => {
    console.log("은행 명 : ",this.state.bankInfo[this.state.selectIndex].text);
    console.log("은행 코드 : ",this.state.bankInfo[this.state.selectIndex].bankCode);
    console.log("계좌번호/예금주 : ",this.state.settleAccount);

    this._regSettleAcccount();
  }

  // 계좌 정보 등록
  _regSettleAcccount = () => {
    RegSettleAccount(this.state.bankInfo[this.state.selectIndex], this.state.settleAccount).then(result => {
      GetCommonData(result, this._regSettleAcccount).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              if(ResultBool) {
                Actions.JoinInputPartnerInfoSuccess();
              } else {
                alert(resultData.resultMsg);
              }
          }
      });
    });
  }

  render() {
    return (
      <Root>
        <Container style={styles.containerInnerPd}>
          <CustomHeader />

          <View style={styles.contentWrap}>

            <View style={styles.mb10}>
              <View style={styles.fxDirRow}>
                <View style={stylesReg.leftGuideTxtWrap}>
                  <Text style={stylesReg.leftGuideTxt}>정산받을</Text>
                  <Text style={stylesReg.leftGuideTxt}>계좌정보를</Text>
                  <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
                </View>
                <View style={stylesReg.rightStepNumWrap}>
                  <Text style={stylesReg.rightStepNum}>06</Text>
                </View>
              </View>

              <View style={stylesReg.procBarWrap}>
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
              </View>
            </View>

            <View style={[styles.fx3, styles.justiConCenter]}>
              <Item 
                regular 
                style={[styles.mb20, styles.inputWhBackGreyBo]}
                onPress={() =>
                  ActionSheet.show(
                  {
                      options: this.state.bankInfo,
                      cancelButtonIndex: this.state.selectIndex,
                      title: "은행 명"
                  },
                  buttonIndex => {
                    this.setState({ buttonTitle: this.state.bankInfo[buttonIndex].text });
                    this.setState({ selectIndex : buttonIndex });
                  }
                )}
              >
                <Input 
                  disabled
                  value={this.state.buttonTitle}
                  placeholder="은행명" 
                  placeholderTextColor={color.inputPlaceHodler} 
                  style={styles.inputDefaultBox}/>
              </Item>
              <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
                <Input 
                  onChangeText={(text) => this._inputSettleAccountName(text) }
                  value={ this.state.settleAccount.name }
                  placeholder="예금주" 
                  placeholderTextColor={color.inputPlaceHodler} 
                  style={styles.inputDefaultBox}/>
              </Item>
              <Item regular style={styles.inputWhBackGreyBo}>
                <Input 
                  onChangeText={(text) => this._inputSettleAccount(text) }
                  value={ this.state.settleAccount.number }
                  keyboardType='numeric'
                  placeholder="계좌번호( - 없이 입력)" 
                  placeholderTextColor={color.inputPlaceHodler} 
                  style={styles.inputDefaultBox}/>
              </Item>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                  onPress={ this._nextPress }
                  disabled={ this.state.btnDisabled }
                  edgeFill={true}
                  fillTxt={true}
                >
                등록완료
              </CustomButton>
            </View>
          </View>

        </Container>
      </Root>
    )
  }
}

export default InputSettleAccount3;