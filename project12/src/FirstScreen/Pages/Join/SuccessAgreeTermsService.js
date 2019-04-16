import React, { Component } from "react";
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";
import { Actions } from "react-native-router-flux";

class SuccessAgreeTermsService extends Component {
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
        <View style={styles.succContentWrap}>
          <View style={styles.succContentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('~/Common/Image/Next_icon.png')}  style={styles.btnSuccNextIcon}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>약관동의가</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>결제카드를 등록하시면</Text>
              <Text style={styles.greyFont}>빠르게 A/S 신청이 가능합니다.</Text>
              <Text style={styles.greyFont}>지금 등록하러 가시겠어요?</Text>
            </View>

            <View style={styles.footerBtnWrap}>
	            <CustomButton 
                onPress={Actions.ClientMain}
                DefaultLineBtn={true}
                CustomBtnStyle={styles.mb5}
              >
                메인화면으로
              </CustomButton>
              <CustomButton 
                onPress={Actions.CardInputInfo}
              >
                결제카드등록
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

export default SuccessAgreeTermsService;
