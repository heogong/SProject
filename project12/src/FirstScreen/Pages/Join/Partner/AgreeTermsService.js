import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { CheckBox, Container, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

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
      disableBtn : true,
      checkBox1 : false,
      checkBox2 : false,
      checkBox3 : false,
      checkBox4 : false,
      checkBox5 : false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  toggleSwitch = () => {
    const {checkBox1, checkBox2, checkBox3, checkBox4 } = this.state;

    if(checkBox1 && checkBox2 && checkBox3 && checkBox4) {
      this.setState({disableBtn : false})
    } else {
      this.setState({disableBtn : true})
    }
  }

  // 쿨리닉 약관 동의 등록
  _regAgreeTerm = () => {
    const {checkBox1, checkBox2, checkBox3, checkBox4, checkBox5} = this.state;

    const agreeTerms = {
      checkBox1 : checkBox1 ? 'Y' : 'N',
      checkBox2 : checkBox2 ? 'Y' : 'N',
      checkBox3 : checkBox3 ? 'Y' : 'N',
      checkBox4 : checkBox4 ? 'Y' : 'N',
      checkBox5 : checkBox5 ? 'Y' : 'N'
    }

    RegAgreeTerm(agreeTerms).then(async result => {
      GetCommonData(result, this._regAgreeTerm).then(async resultData => {
        if(resultData !== undefined) {
            console.log(resultData);
            const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
            if(ResultBool) {
                Actions.SuccessJoinPartner();
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
                <Text style={stylesReg.rightStepNum}>07</Text>
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
              <View style={stylesReg.procBarOn} />
              </View>
            </View>
            
          </View>

          <View style={[styles.alignItemsCenter, {paddingTop: 30, paddingBottom: 30, borderBottomWidth: 1, borderBottomColor: "#c9cacb"}]}>
            <Text style={styles.greyFont}>쿨리닉 내의 원활한 서비스 이용을 위해서는</Text>
            <Text style={styles.greyFont}>아래의 필수 항목에 대한 동의가 필요합니다</Text>
          </View>

          <View style={localStyles.termsWrap}>
            <View style={styles.fx5}>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={[styles.blueFont, styles.mb20]}>서비스 이용약관 동의(필수)</Text>
                <CheckBox 
                  checked={this.state.checkBox1}
                  onPress={async () => { await this.setState({checkBox1 : !this.state.checkBox1}), await this.toggleSwitch()}}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={[styles.blueFont, styles.mb20]}>위치기반 서비스 이용약관 동의(필수)</Text>
                <CheckBox 
                  checked={this.state.checkBox2}
                  onPress={async () => { await this.setState({checkBox2 : !this.state.checkBox2}), await this.toggleSwitch() }}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={[styles.blueFont, styles.mb20]}>개인정보 수집 동의(필수)</Text>
                <CheckBox 
                  checked={this.state.checkBox3}
                  onPress={async () => { await this.setState({checkBox3 : !this.state.checkBox3}), await this.toggleSwitch() }}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={[styles.blueFont, styles.mb20]}>개인정보 제 3자 제공 동의서(필수)</Text>
                <CheckBox 
                  checked={this.state.checkBox4}
                  onPress={async () => { await this.setState({checkBox4 : !this.state.checkBox4}), await this.toggleSwitch() }}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
              </View>
              <View style={[styles.fxDirRow, styles.justiConBetween]}>
                <Text style={[styles.blueFont, styles.mb20]}>마케팅 전체 수신동의(선택)</Text>
                <CheckBox 
                  checked={this.state.checkBox5}
                  onPress={() => { this.setState({checkBox5 : !this.state.checkBox5}) }}
                  style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                />
              </View>
            </View>

          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              disabled={this.state.disableBtn}
              onPress={ this._regAgreeTerm }
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

export default AgreeTermsService;