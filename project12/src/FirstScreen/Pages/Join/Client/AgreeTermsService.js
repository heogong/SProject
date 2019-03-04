import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Text } from "native-base";

import { PARTNER } from '~/Common/Blend';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';

class AgreeTermsService extends Component {
  constructor(props) {
    super(props);
  }


  // 고객 타입에 따른 페이지 이동
  _nextPage = () => {
    if(this.props.usrObj.usrCustomerType == PARTNER) {
        Actions.PartnerTermsService();
    } else {
        Actions.ClientTermsService();
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
                <Text style={stylesReg.rightStepNum}>03</Text>
              </View>
            </View>

            <View style={stylesReg.procBarWrap}>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
            </View>
          </View>

          <View style={[styles.fx2, styles.justiConCenter]}>
            
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._nextPage }
              edgeFill={true}
              fillTxt={true}
            >
              약관동의완료
            </CustomButton>
          </View>
        </View>

      </Container>
    )
  }
}

let mapStateToProps = (state) => {
    return {
        usrObj: state.USER
    };
}
  
AgreeTermsService = connect(mapStateToProps)(AgreeTermsService);
export default AgreeTermsService;