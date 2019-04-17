import React, { Component } from 'react';
import { Alert, Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';

export default class CardIndex extends Component {

  render() {
    return (

      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true}/>
        <View style={styles.succContentWrap}>
          <View style={styles.succContentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('~/Common/Image/Next_icon.png')}  style={styles.btnSuccNextIcon}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>회원가입이</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>

          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>쿨리닉 서비스 이용약관에 동의해 주세요.</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
              onPress={Actions.ClientAgreeTermsService}
              >
              약관동의하러가기
            </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    )
  }
}