import React, { Component } from 'react';
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';

export default class SuccessRegMember extends Component {

  render() {
    return (

      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true}/>

        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConCenter]}>
            <View style={styles.alignItemsCenter}>
              <Image source={require('~/Common/Image/join-end.png')} resizeMode='center'/>
            </View>
            <View style={styles.alignItemsCenter}>
              <H1>회원가입이</H1>
              <H1>완료되었어요!</H1>
            </View>
          </View>

          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>귀하의 사업자정보를 등록하고</Text>
              <Text style={styles.greyFont}>쿨리닉 매칭 서비스를 이용해보세요</Text>
            </View>
            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={Actions.JoinInputBizLicense}
              >
                입력완료
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    )
  }
}