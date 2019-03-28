import React, { Component } from "react";
import { Image, StyleSheet,  View } from 'react-native'
import { Container, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';

class JoinPartnerInfoSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true} />

        <View style={localStyles.contentWrap}>
          <View style={localStyles.contentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('~/Common/Image/Next_icon.png')} style={{width: 48, height: 48}}/>
              </View>
              <View style={localStyles.topTxtWrap}>
                <Text style={localStyles.topTxt}>사업자정보가</Text>
                <Text style={localStyles.topTxt}>등록되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>이제쿨리닉 이용약관에 동의하고</Text>
              <Text style={styles.greyFont}>A/S 매칭 서비스를 받으러 가볼까요? </Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                  onPress={ Actions.PartnerAgreeTermsService }
                  edgeFill={true}
                  fillTxt={true}
                >
                약관동의하러가기
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  contentWrap: {
    flex:1
  },
  contentTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTxtWrap: {
    alignItems: 'center'
  },
  topTxt: {
    fontSize: 26,
    color: "#1e1e32",
    letterSpacing: 0,
    lineHeight: 30,
    fontWeight: "bold"
  }
});

export default JoinPartnerInfoSuccess;
