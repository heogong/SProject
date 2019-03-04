import React, { Component } from 'react';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { connect } from 'react-redux';
import { ActionSheet, Button, Input, Item, Root, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import GetCommonData from '~/Common/Functions/GetCommonData';
import GetBankInfo from '../../../Functions/GetBankInfo';
import RegSettleAccount from '../../../Functions/RegSettleAccount';

class InputSettleAccount3 extends Component {
  constructor(props) {
      super(props);
      this.state = {
        buttonTitle : '은행 선택',
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

  componentDidMount() {
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

  _regSettleAcccount = () => {
    RegSettleAccount(this.state.bankInfo[this.state.selectIndex], this.state.settleAccount).then(result => {
      GetCommonData(result, this._regSettleAcccount).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              if(ResultBool) {
                Actions.PartnerMain();
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
        <CustomBasicWrapper
          resetPage={ true }
          title="계좌입력"
        >
          <Button
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
            <Text>{this.state.buttonTitle}</Text>
          </Button>

          <Item regular>
              <Input 
                onChangeText={(text) => this._inputSettleAccount(text) }
                value={ this.state.settleAccount.number }
                placeholder='계좌번호'
                keyboardType='numeric'
              />
          </Item>

          <Item regular>
              <Input 
                onChangeText={(text) => this._inputSettleAccountName(text) }
                value={ this.state.settleAccount.name }
                placeholder='예금주'
              />
          </Item>

          <CustomButton
            block={ true }
            info={ true }
            onPress={ this._nextPress }
            disabled={ this.state.btnDisabled }>
            <Text>
              등록완료
            </Text>
          </CustomButton>
        </CustomBasicWrapper>
      </Root>
    )
  }
}

export default InputSettleAccount3;