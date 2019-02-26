import React, { Component } from 'react';
import { Alert, Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

export default class CardIndex extends Component {

  _showAlert = () => {
    Alert.alert(
      '',
      '나중에 등록 하시겠습니까?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '네', onPress: () => Actions.ClientIndex() },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      //     <TouchableOpacity  onPress={this._showAlert}>
      //       <Text style={{ color: 'skyblue', fontSize: 13}}>
      //           나중에 하기
      //       </Text>

      <Container style={styles.containerInnerPd}>
        <CustomHeader />

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
              <Text style={styles.greyFont}>결제카드를 등록하고 A/S를 신청해보세요</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={Actions.CardInputInfo}
                edgeFill={true}
                fillTxt={true}
              >
                결제카드등록
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    )
  }
}