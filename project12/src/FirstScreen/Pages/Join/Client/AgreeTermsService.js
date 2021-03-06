import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Container, CheckBox, Text } from "native-base";

import { SUCCESS_RETURN_CODE, PARTNER } from '~/Common/Blend';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import RegAgreeTerm from '~/FirstScreen/Functions/RegAgreeTerm';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class AgreeTermsService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check1 : false,
      check2 : false,
      check3 : false,
      check4 : false,
      check5 : false,
      disableBtn : true,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
    
  }

  // 쿨리닉 약관 동의 등록
  _regAgreeTerm = () => {
    const {check1, check2, check3, check4, check5} = this.state;

    const agreeTerms = {
      checkBox1 : check1 ? 'Y' : 'N',
      checkBox2 : check2 ? 'Y' : 'N',
      checkBox3 : check3 ? 'Y' : 'N',
      checkBox4 : check4 ? 'Y' : 'N',
      checkBox5 : check5 ? 'Y' : 'N'
    }

    RegAgreeTerm(agreeTerms).then(async result => {
      GetCommonData(result, this._regAgreeTerm).then(async resultData => {
        if(resultData !== undefined) {
            console.log(resultData);
            const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
            if(ResultBool) {
                Actions.SuccessAgreeTermsService();
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

  // 확인 버튼 유효성 체크
  _chkNextBtn = () => {
    const { check1, check2, check3, check4 } = this.state;

    if(check1 && check2 && check3 && check4) {
      this.setState({disableBtn : false })
    } else {
      this.setState({disableBtn : true })
    }
  }

  render() {
    return (
    <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true}/>
        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>쿨리닉</Text>
                <Text style={stylesReg.leftGuideTxt}>이용약관에</Text>
                <Text style={stylesReg.leftGuideTxt}>동의해주세요</Text>
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
          </View>

          <View style={[styles.alignItemsCenter, {paddingTop: 30, paddingBottom: 30, borderBottomWidth: 1, borderBottomColor: "#c9cacb"}]}>
            <Text style={styles.greyFont}>쿨리닉 내의 원활한 서비스 이용을 위해서는</Text>
            <Text style={styles.greyFont}>아래의 필수 항목에 대한 동의가 필요합니다</Text>
          </View>

          <View style={localStyles.termsWrap}>
            <View style={styles.fx5}>
              <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                <Text style={styles.blueFont}>서비스 이용약관 동의(필수)</Text>
                {this.state.check1
                ?
                  <TouchableOpacity
                    onPress={async () => { await this.setState({check1 : false}), await this._chkNextBtn()}}
                  >
                    <Image source={require("~/Common/Image/check_circle_on.png")} resizeMode="contain" style={styles.checkboxIcon} />
                  </TouchableOpacity>
                :
                  <TouchableOpacity
                    onPress={async () => { await this.setState({check1 : true}), await this._chkNextBtn()}}
                  >
                    <Image source={require("~/Common/Image/check_circle_off.png")} resizeMode="contain" style={styles.checkboxIcon} />
                  </TouchableOpacity>
                }
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                <Text style={styles.blueFont}>위치기반 서비스 이용약관 동의(필수)</Text>
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
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                <Text style={styles.blueFont}>개인정보 수집 동의(필수)</Text>
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
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                <Text style={styles.blueFont}>개인정보 제 3자 제공 동의서(필수)</Text>
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
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween, styles.alignItemsCenter]}>
                <Text style={styles.blueFont}>마케팅 전체 수신동의(선택)</Text>
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
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._regAgreeTerm }
              disabled={ this.state.disableBtn }
            >
              약관동의완료
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
    )
  }
}

const localStyles = StyleSheet.create({
  termsWrap: {
    marginTop: 27,
    flexDirection : "row",
    flex: 1
  }
});

let mapStateToProps = (state) => {
    return {
        usrObj: state.USER
    };
}
  
AgreeTermsService = connect(mapStateToProps)(AgreeTermsService);
export default AgreeTermsService;