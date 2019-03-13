import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { Container, H1, Button, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';

import RegProdImg from '~/Main/Functions/RegProdImg';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


class SuccessRegProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.succContentWrap}>
          <View style={styles.succContentTop}>
            <View>
              <View style={[styles.alignItemsCenter, {marginBottom: 38}]}>
                <Image source={require('~/Common/Image/Next_icon.png')} style={{width: 48, height: 48}}/>
              </View>
              <View style={styles.succTopTxtWrap}>
                <Text style={styles.succTopTxt}>제품등록이</Text>
                <Text style={styles.succTopTxt}>완료되었어요!</Text>
              </View>
            </View>
          </View>
          <View style={styles.fx1}>
            <View style={[styles.fx1, styles.alignItemsCenter]}>
              <Text style={styles.greyFont}>국내최초 냉동기기 A/S매칭서비스</Text>
              <Text style={styles.greyFont}>쿨리닉의 다양한 기능을 누려보세요!</Text>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton
                onPress={Actions.ClientMain}
                DefaultLineBtn={true}
              >
                메인화면으로
              </CustomButton>

              <CustomButton>
                등록제품 확인하기
              </CustomButton>
            </View>

          </View>
        </View>

      </Container>
    );
  }
}

export default SuccessRegProduct;
