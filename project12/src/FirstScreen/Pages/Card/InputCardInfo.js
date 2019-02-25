import React, { Component } from 'react';
import { Image, TouchableOpacity, Keyboard, ScrollView, View } from 'react-native';
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { CheckBox } from 'react-native-elements'

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegCard from '~/FirstScreen/Functions/Card/RegCard';

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
        birthDay: ''
    };
  }

  static defaultProps = {
    regAsCard : false // as신청시 카드 등록 여부 
  }
  
  scanCard() {
    const config = {
      hideCardIOLogo : true,
      scanInstructions : '와리가리!',
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
              // Actions.pop({ refresh: { data: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }})
              // Actions.pop({ refresh: { data: 'Data after pop', title: 'title after pop' }, key: 'AfterServiceApplyProductCheck' });
              // Actions.popTo("AfterServiceApplyProductCheck");
              this.props.getListCard();
              Actions.pop();
            } else{
              Actions.ClientIndex(); // 사업장 제품 등록
            }
          } else {
            alert(resultData.resultMsg);
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

          <View style={stylesReg.inputWrap}>
            <Item regular style={[styles.mb10, styles.inputStyle]}>
              <Input 
                onChangeText={(text) => this._setCardNum(text) }
                onKeyPress={this._handleKeyPress }
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
                    onChangeText={(text) => this.setState({vaildTermMonth : text})}
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
                    onChangeText={(text) => this.setState({vaildTermYear : text})}
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
                    onChangeText={(text) => this.setState({passwd : text})}
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
                  onChangeText={(text) => this.setState({birthDay : text})}
                  value={ this.state.birthDay }
                  keyboardType='numeric'
                  maxLength={6}
                  placeholder="생년월일(YYMMDD)" 
                  placeholderTextColor="#777" 
                  fontSize="14"
                />
              </Item>
            </View>

            <View style={stylesReg.termsWrap}>
              <View style={[styles.fx2, styles.alignItemsStart, styles.justiConBetween]}>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
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
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={styles.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                      checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={this._cardRegister}
              disabled={ this.state.disabledNextBtn }
              edgeFill={true}
              fillTxt={true}
            >
              등록완료
            </CustomButton>
          </View>
      </Container>
      
    )
  }
}

const viewHeight = viewportHeight;