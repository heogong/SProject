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
                <Image source={require('~/Common/Image/Next_icon.png')} style={{width: 48, height: 48}}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>약관동의가</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>제품을 등록하면 빠른 서비스를 받을 수 있어요!</Text>
              <Text style={styles.greyFont}>지금 등록하러 가시겠어요?</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={Actions.RegBusinessPlaceIndex}
                style={[styles.btnDefault, styles.btnDefaultFill]}>
                제품등록 하러가기
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

export default SuccessAgreeTermsService;
