import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, CheckBox, Text } from "native-base";

import { PARTNER } from '~/Common/Blend';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
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
      disableBtn : true
    };
    
  }


  // 고객 타입에 따른 페이지 이동
  _nextPage = () => {
    // if(this.props.usrObj.usrCustomerType == PARTNER) {
    //     Actions.PartnerTermsService();
    // } else {
    //     Actions.SuccessAgreeTermsService();
    // }
    Actions.SuccessAgreeTermsService();
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
        <CustomHeader />
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

          <View style={[styles.alignItemsCenter, {paddingTop: 40, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: color.inputBoGrey}]}>
            <Text style={styles.greyFont}>쿨리닉 내의 원활한 서비스 이용을 위해서는</Text>
            <Text style={styles.greyFont}>아래의 필수 항목에 대한 동의가 필요합니다</Text>
          </View>

          <View style={localStyles.termsWrap}>
            <View style={[styles.fx5, styles.alignItemsStart, styles.justiConBetween]}>
              <Text style={[styles.blueFont, styles.mb20]}>서비스 이용약관 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>위치기반 서비스 이용약관 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>개인정보 수집 동의(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>개인정보 제 3자 제공 동의서(필수)</Text>
              <Text style={[styles.blueFont, styles.mb20]}>마케팅 전체 수신동의(선택)</Text>
            </View>
              
            <View style={[styles.fx1, styles.fxDirRow]}>
              <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConBetween]}>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.check1}
                    onPress={async () => {await this.setState({check1 : !this.state.check1}), this._chkNextBtn()} }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.check2}
                    onPress={async () => {await this.setState({check2 : !this.state.check2}), this._chkNextBtn()} }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.check3}
                    onPress={async () => {await this.setState({check3 : !this.state.check3}), this._chkNextBtn()} }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.check4}
                    onPress={async () => {await this.setState({check4 : !this.state.check4}), this._chkNextBtn()} }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
                <View style={[styles.fxDirRow, styles.fx1]}>
                  <CheckBox checked={this.state.check5}
                    onPress={() => this.setState({check5 : !this.state.check5}) }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._nextPage }
              disabled={ this.state.disableBtn }
            >
              약관동의완료
            </CustomButton>
          </View>
        </View>

      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  termsWrap: {
    marginTop: 27,
    flexDirection : "row"
  }
});

let mapStateToProps = (state) => {
    return {
        usrObj: state.USER
    };
}
  
AgreeTermsService = connect(mapStateToProps)(AgreeTermsService);
export default AgreeTermsService;