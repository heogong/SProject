import React, { Component } from 'react';
import { Image, TouchableOpacity, Keyboard, StyleSheet, View, ScrollView } from 'react-native';
import { Container, Text, Item, Input, CheckBox } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import Spinner from 'react-native-loading-spinner-overlay';

import RegCardAgreeTerm from '~/FirstScreen/Functions/RegCardAgreeTerm';
import GetCommonData from '~/Common/Functions/GetCommonData';
import RegCard from '~/FirstScreen/Functions/Card/RegCard';
import GetClientPaymAgreeState from '~/Main/Functions/GetClientPaymAgreeState';

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
        check5 : false,
        isAlertModal : false, // alert 용
        resultMsg : null,
        isPaymAgree : false, // 결제 약관 동의 여부
        spinner : false
    };
  }

  static defaultProps = {
    regAsCard : false, // as신청시 카드 등록 여부 
    morePage : false // 더보기 페이지 접근 시
  }
  
  componentWillMount() {
    this._paymAgreeCheck();
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

  // 결제 약관 동의 등록
  _regCardAgreeTerm = () => {
    
    this.setState({spinner : true}); // 로딩 모달 시작

    if(this.state.isPaymAgree) {
    // 결제 약관에 동의했으면
      // 바로 가트 등록
      this._cardRegister();
    } else {
    // 결제 약관에 동의 안했으면
      // 약관 등록 후 카드 등록
      const {check1, check2, check3, check4, check5} = this.state;

      const agreeTerms = {
        checkBox1 : check1 ? 'Y' : 'N',
        checkBox2 : check2 ? 'Y' : 'N',
        checkBox3 : check3 ? 'Y' : 'N',
        checkBox4 : check4 ? 'Y' : 'N',
        checkBox5 : check5 ? 'Y' : 'N'
      }

      RegCardAgreeTerm(agreeTerms).then(async result => {
        GetCommonData(result, this._regAgreeTerm).then(async resultData => {
          if(resultData !== undefined) {
              console.log(resultData);
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              if(ResultBool) {
                  this._cardRegister();
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
  } 

  // 카드 등록
  _cardRegister = () => {
    RegCard(this.state).then(result => {
      GetCommonData(result, this._cardRegister).then(async resultData => {
        if(resultData !== undefined) {
          console.log(resultData);

          this.setState({spinner : false}); // 로딩 모달 시작

          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          if(ResultBool) {
            if(this.props.regAsCard) { // A/S 신청 페이지에서 접근 시
              this.props.getListCard();
              Actions.pop();
            } else if(this.props.morePage) { // 더보기 페이지에서 접근 시
              this.props.refreshCard();
              Actions.pop();
            } else {
              Actions.SuccessCardInfo();
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

  // 결제 약관 동의 여부 체크
  _paymAgreeCheck = () => {
    GetClientPaymAgreeState().then(result => {
      GetCommonData(result, this._paymAgreeCheck).then(async resultData => {
        if(resultData !== undefined) {
            console.log(resultData);
            const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
            if(ResultBool) {
                let flag = resultData.data.clientPaymYn == 'Y' ? true : false;
                this.setState({isPaymAgree  : flag}); // 결제 여부 갱신
                
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
      check1 : check1,
      check2 : check1,
      check3 : check1,
      check4 : check1,
      check5 : check1,
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

    const { cardNumber, vaildTermMonth, vaildTermYear, passwd, birthDay, check2, check3, check4, check5, isPaymAgree } = this.state;

    // 입력값 검사
    if(cardNumber.length >= cardNumLen 
      && vaildTermMonth.length >= vaildTermMonthLen 
      && vaildTermYear.length >= vaildTermYearLen 
      && passwd.length >= passwdLen
      && birthDay.length >= birthDayLen) {
    // 입력값이 충족하면
      if(isPaymAgree) {
      // 약관 동의한 사애이면
        this.setState({disableBtn : false});
      } else {
      // 약관 동의를 안한 상태이면
        // 약관 동의 여부 체크
        if(check2 && check3 && check4 && check5) {
          this.setState({disableBtn : false});
        } else {
          this.setState({disableBtn : true});
        }
      }
    } else {
    // 입력값이 불충족하면
      this.setState({disableBtn : true});
    }
  }
  
  render() {
    return (

      <Container style={styles.containerInnerPd}>
          <Spinner
            visible={this.state.spinner}
            textContent={'카드를 등록중입니다.'}
            textStyle={styles.whiteFont}
            style={{color: color.whiteColor}}
          />
          <CustomHeader/>
          <View style={styles.fxDirRow}>
            <View style={stylesReg.leftGuideTxtWrap}>
              <Text style={stylesReg.leftGuideTxt}>쿨리닉</Text>
              <Text style={stylesReg.leftGuideTxt}>결제카드를</Text>
              <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
            </View>
            {/* 선택사항이므로 주석처리
            <View style={stylesReg.rightStepNumWrap}>
              <Text style={stylesReg.rightStepNum}>03</Text>
            </View>
             */}
          </View>
          {/* 선택사항이므로 주석처리             
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
          </View>
          */}

          <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
            <View style={localStyles.inputWrap}>
              <Item regular style={[styles.mb10, styles.inputWhBackBuBo]}>
                <Input
                  placeholder="카드번호 16자리"
                  placeholderTextColor={color.inputPlaceHodler}
                  style={styles.inputDefaultBox}
                  onChangeText={(text) => this._setCardNum(text) }
                  value={ this.state.cardNumber }
                  keyboardType='numeric'
                  maxLength={19}
                />
                <TouchableOpacity onPress={this.scanCard.bind(this)}>
                  <Image source={require("~/Common/Image/camera_icon.png")} resizeMode="contain" style={localStyles.cameraIcon} />
                </TouchableOpacity>
              </Item>
              <View style={[styles.mb10, styles.fxDirRow]}>
                <View style={styles.fx1}>
                  <Item regular style={[styles.inputWhBackBuBo, styles.mr7]}>
                    <Input
                      placeholder="MM" 
                      placeholderTextColor={color.inputPlaceHodler} 
                      style={[styles.inputDefaultBox, {textAlign: "center"}]}
                      onChangeText={ async (text) => { await this.setState({vaildTermMonth : text}), this._chkNextBtn()} }
                      value={ this.state.vaildTerm }
                      keyboardType='numeric'
                      maxLength={2}
                    />
                  </Item>
                </View>
                <View style={styles.fx1}>
                  <Item regular style={[styles.inputWhBackBuBo, styles.mr7]}>
                    <Input 
                      placeholder="YY"
                      placeholderTextColor={color.inputPlaceHodler}
                      fontSize="14"
                      style={[styles.inputDefaultBox, {textAlign: "center"}]}
                      onChangeText={ async (text) => { await this.setState({vaildTermYear : text}), this._chkNextBtn()} }
                      value={ this.state.vaildTerm }
                      keyboardType='numeric'
                      maxLength={2}
                    />
                  </Item>
                </View>
                <View style={styles.fx2}>
                  <Item regular style={styles.inputWhBackBuBo}>
                    <Input 
                      placeholder="비밀번호 앞2자리"
                      placeholderTextColor={color.inputPlaceHodler} 
                      fontSize="14" 
                      style={[styles.inputDefaultBox, {textAlign: "center"}]}
                      secureTextEntry={ true }
                      onChangeText={ async (text) => { await this.setState({passwd : text}), this._chkNextBtn()} }
                      value={ this.state.passwd }
                      keyboardType='numeric'
                      maxLength={2}
                    />
                  </Item>
                </View>
              </View>
              <View>
                <Item regular style={styles.inputWhBackBuBo}>
                  <Input
                    placeholder="생년월일(YYMMDD)"
                    placeholderTextColor={color.inputPlaceHodler}
                    style={styles.inputDefaultBox}
                    onChangeText={ async (text) => { await this.setState({birthDay : text}), this._chkNextBtn()} }
                    value={ this.state.birthDay }
                    keyboardType='numeric'
                    maxLength={6}
                    />
                </Item>
              </View>

              {this.state.isPaymAgree 
              ?
              // 결제 약관에 동의 안했으면
              <View />
              :
              //결제 약관에 동의 했으면
              <View style={localStyles.termsWrap}>
                <View style={styles.fx5}>
                  <View style={styles.alignItemsEnd}>
                    <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                      {this.state.check1
                      ?
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check1 : false}), await this._totalCheck()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check1 : true}), await this._totalCheck()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      }
                      <Text style={localStyles.inputBottomTxt}>전체동의</Text>
                    </View>
                  </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                    <Text style={localStyles.inputBottomTxt}>전자금융거래 이용약관</Text>
                    <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                    {this.state.check2
                      ?
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check2 : false}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check2 : true}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      }
                      <Text style={localStyles.inputBottomTxt}>동의</Text>
                    </View>
                  </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                    <Text style={localStyles.inputBottomTxt}>개인정보 수집 및 이용안내</Text>
                    <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                      {this.state.check3
                      ?
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check3 : false}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check3 : true}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      }
                      <Text style={localStyles.inputBottomTxt}>동의</Text>
                    </View>
                  </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                    <Text style={localStyles.inputBottomTxt}>전자금융거래 이용약관</Text>
                    <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                      {this.state.check4
                      ?
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check4 : false}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check4 : true}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      }
                      <Text style={localStyles.inputBottomTxt}>동의</Text>
                    </View>
                  </View>
                  <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                    <Text style={localStyles.inputBottomTxt}>개인정보 수집 및 이용안내</Text>
                    <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                      {this.state.check5
                      ?
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check5 : false}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      :
                        <TouchableOpacity
                          onPress={async () => { await this.setState({check5 : true}), await this._chkNextBtn()}}
                        >
                          <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                        </TouchableOpacity>
                      }
                      <Text style={localStyles.inputBottomTxt}>동의</Text>
                    </View>
                    </View>
                </View>
              </View>
              }
            </View>
          </ScrollView>
          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={this._regCardAgreeTerm}
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
    marginTop: 32,
    flex: 1
  },
  termsWrap: {
    marginTop: 20,
    flexDirection : "row",
    flex: 1,
    width: "100%"
  },
  inputBottomTxt: {
    color: "#8e8e98",
    fontSize: 13
  },
  cameraIcon: {
    width: 25,
    height: 25,
    marginRight: 15
  }
});

const viewHeight = viewportHeight;