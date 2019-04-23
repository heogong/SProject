import React, { Component } from "react";
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";
import { Actions } from "react-native-router-flux";

class SuccessAfterService extends Component {
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
                <Text style={styles.succTopTxt}>비회원 A/S 접수가</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>입력하신 핸드폰번호로</Text>
              <Text style={[styles.greyFont, {marginBottom: 10}]}>쿨리닉에서 연락 드리겠습니다.</Text>

              <Text style={styles.greyFont}>회원가입을 하시면</Text>
              <Text style={styles.greyFont}>빠르게 A/S 신청이 가능합니다.</Text>
              <Text style={styles.greyFont}>지금 가입하러 가시겠어요?</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={Actions.InitPage}
              >
                회원가입 하러가기
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

export default SuccessAfterService;
