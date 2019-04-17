import React, { Component } from "react";
import { Image, StyleSheet,  View } from 'react-native'
import { Container, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';


class SuccessJoinPartner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true} />

        <View style={styles.succContentWrap}>
          <View style={styles.succContentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('~/Common/Image/input-able.png')} style={styles.btnSuccNextIcon}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>축하합니다!</Text>
                <Text style={styles.succTopTxt}>파트너신청이</Text>
                <Text style={styles.succTopTxt}>완료되었어요</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>파트너 승인이 완료된 후 서비스 이용이 가능해요.</Text>
              <Text style={styles.greyFont}>가입 승인까지는 최대 24시간이 소요되니</Text>
              <Text style={styles.greyFont}>파트너 승인 알람이 도착할 때까지 기다려주세요! </Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                  onPress={ Actions.PartnerMain }
                  edgeFill={true}
                  fillTxt={true}
                >
                메인화면으로
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    )
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

export default SuccessJoinPartner;