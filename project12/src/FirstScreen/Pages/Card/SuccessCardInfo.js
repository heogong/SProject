import React, { Component } from "react";
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles } from '~/Common/Styles/common';

class SuccessCardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true}/>
        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConCenter]}>
            <View>
              <View style={styles.alignItemsCenter}>
                <Image source={require('~/Common/Image/Next_icon.png')} resizeMode='center' style={styles.btnSuccNextIcon}/>
              </View>
              <View style={styles.alignItemsCenter}>
                <H1>카드등록이</H1>
                <H1>완료되었어요!</H1>
              </View>
            </View>
          </View>

          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>1,000원 카드결제에 놀라지 마세요!</Text>
              <Text style={styles.greyFont}>10분 이내로 결제가 취소됩니다.</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={Actions.ClientMain}
                DefaultLineBtn={true}
                CustomBtnStyle={styles.mb12}
              >
                메인화면으로
              </CustomButton>
              <CustomButton 
              onPress={Actions.ClientAgreeTermsService}
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

export default SuccessCardInfo;
