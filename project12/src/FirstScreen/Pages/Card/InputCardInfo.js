import React, { Component } from 'react';
import { Image, TouchableOpacity, Keyboard, StyleSheet, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CheckBox } from 'react-native-elements'

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegCard from '~/FirstScreen/Functions/Card/RegCard';

import CustomModal from '~/Common/Components/CustomModal';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';


let viewSize = viewportHeight;
export default class InputCardInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        cardNumber: '',
        vaildTermMonth: '',
        vaildTermYear: '',
        passwd: '',
        birthDay: '',
        disableBtn : true,
        check1 : false,
        check2 : false,
        check3 : false,
        check4 : false,
        isAlertModal : false, // alert 용
        resultMsg : null
    };
  }

  static defaultProps = {
    regAsCard : false, // as신청시 카드 등록 여부 
    morePage : false // 더보기 페이지 접근 시
  }
  
  scanCard() {
    const config = {
      hideCardIOLogo : true,
      scanInstructions : '사각라인에 맞추어 카드를 스캔해주세요!',
      suppressConfirmation  : true
    }
    CardIOModule
      .scanCard(config)
      .then(card => {
        // the scanned card
        console.log(card);

      })
      .catch(() => {
        // the user cancelled
        console.log("exit");
      })
  }

  // 카드 등록
  _cardRegister = () => {
    RegCard(this.state).then(result => {
      GetCommonData(result, this._cardRegister).then(async resultData => {
        if(resultData !== undefined) {
          console.log(resultData);
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          if(ResultBool) {
            if(this.props.regAsCard) {
              Actions.SuccessCardInfo();
            } else if(this.props.morePage) { // 더보기 페이지에서 접근 시
              this.props.refreshCard();
              Actions.pop();
            } else {
              Actions.ClientIndex(); // 사업장 제품 등록
            }
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

  // 카드 번호 입력
  _setCardNum = (value) => {
    let resultValue;

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      resultValue = parts.join('-');
    } else {
      resultValue = value;
    }

    this.setState({cardNumber : resultValue})

    this._chkNextBtn(); // 유효성 체크
  }

  _totalCheck = async () => {
    const { check1 } = this.state;


    await this.setState({
      check1 : !check1,
      check2 : !check1,
      check3 : !check1,
      check4 : !check1,
    })

    await this._chkNextBtn(); // 유효성 체크
  }

  // 유효성 체크 : 등록완료 버튼 활성화 여부
  _chkNextBtn = () => {
    const cardNumLen = 16;
    const vaildTermMonthLen = 2;
    const vaildTermYearLen = 2;
    const birthDayLen = 6
    const passwdLen = 2;

    const { cardNumber, vaildTermMonth, vaildTermYear, passwd, birthDay, check2, check3, check4 } = this.state;

    if(cardNumber.length >= cardNumLen 
      && vaildTermMonth.length >= vaildTermMonthLen 
      && vaildTermYear.length >= vaildTermYearLen 
      && passwd.length >= passwdLen
      && birthDay.length >= birthDayLen
      && check2
      && check3
      && check4 ) {
        this.setState({disableBtn : false});
      } else {
        this.setState({disableBtn : true});
      }
  }
  
  render() {
    return (

      <Container style={styles.containerInnerPd}>
          <CustomHeader />
          <View style={styles.fxDirRow}>
            <View style={stylesReg.leftGuideTxtWrap}>
              <Text style={stylesReg.leftGuideTxt}>쿨리닉</Text>
              <Text style={stylesReg.leftGuideTxt}>결제카드를</Text>
              <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
            </View>
            <View style={stylesReg.rightStepNumWrap}>
              <Text style={stylesReg.rightStepNum}>02</Text>
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
              <View style={stylesReg.procBarOff} />
            </View>
          </View>

          <View style={localStyles.inputWrap}>
            <Item regular style={[styles.mb10, styles.inputStyle]}>
              <Input 
                onChangeText={(text) => this._setCardNum(text) }
                value={ this.state.cardNumber }
                keyboardType='numeric'
                maxLength={19}
                placeholder="카드번호 16자리" 
                placeholderTextColor="#777" 
                fontSize="14"
              />
              <TouchableOpacity onPress={this.scanCard.bind(this)}>
                <Icon name="ios-camera" style={styles.inputIcon} />
              </TouchableOpacity>
            </Item>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <Item regular style={[styles.inputStyle, styles.mr7]}>
                  <Input 
                    onChangeText={ async (text) => { await this.setState({vaildTermMonth : text}), this._chkNextBtn()} }
                    value={ this.state.vaildTerm }
                    keyboardType='numeric'
                    maxLength={2}
                    placeholder="MM" 
                    placeholderTextColor={color.deepGreyColor} 
                    fontSize="14" 
                    style={{textAlign: "center"}}
                  />
                </Item>
              </View>
              <View style={styles.fx1}>
                <Item regular style={[styles.inputStyle, styles.mr7]}>
                  <Input 
                    onChangeText={ async (text) => { await this.setState({vaildTermYear : text}), this._chkNextBtn()} }
                    value={ this.state.vaildTerm }
                    keyboardType='numeric'
                    maxLength={2}
                    placeholder="YY" 
                    placeholderTextColor="#777" 
                    fontSize="14" 
                    style={{textAlign: "center"}}
                  />
                </Item>
              </View>
              <View style={styles.fx2}>
                <Item regular style={styles.inputStyle}>
                  <Input 
                    secureTextEntry={ true }
                    onChangeText={ async (text) => { await this.setState({passwd : text}), this._chkNextBtn()} }
                    value={ this.state.passwd }
                    keyboardType='numeric'
                    maxLength={2}
                    placeholder="비밀번호 앞2자리" 
                    placeholderTextColor="#777" 
                    fontSize="14" 
                    style={{textAlign: "center"}}
                  />
                </Item>
              </View>
            </View>
            <View>
              <Item regular style={styles.inputStyle}>
                <Input 
                  onChangeText={ async (text) => { await this.setState({birthDay : text}), this._chkNextBtn()} }
                  value={ this.state.birthDay }
                  keyboardType='numeric'
                  maxLength={6}
                  placeholder="생년월일(YYMMDD)" 
                  placeholderTextColor="#777" 
                  fontSize="14"
                />
              </Item>
            </View>

            <View style={localStyles.termsWrap}>
              <View style={[styles.fx2, styles.alignItemsStart, styles.justiConBetween]}>
                <Text style={[localStyles.inputBottomTxt, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb5]}>개인정보 수집 및 이용안내</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[localStyles.inputBottomTxt, styles.mb5]}>개인정보 수집 및 이용안내</Text>
              </View>

              <View style={[styles.fx1, styles.fxDirRow]}>
                <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConBetween]}>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="전체동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      textStyle={{fontSize: 14}}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.check1}
                      onPress={this._totalCheck}
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.check2}
                      onPress={async () => { await this.setState({check2: !this.state.check2}), this._chkNextBtn()} }
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.check3}
                      onPress={async () => { await this.setState({check3: !this.state.check3}), this._chkNextBtn()} }
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.check4}
                      onPress={async () => { await this.setState({check4: !this.state.check4}), this._chkNextBtn()} }
                    />
                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={this._cardRegister}
              disabled={this.state.disableBtn}
            >
              등록완료
            </CustomButton>
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
      
    )
  }
}

const localStyles = StyleSheet.create({
  inputWrap: {
    marginTop: 32
  },
  termsWrap: {
    marginTop: 27,
    flexDirection : "row"
  },
  inputBottomTxt: {
    color: "#1e1e32",
    fontSize: 13
  },
});

const viewHeight = viewportHeight;