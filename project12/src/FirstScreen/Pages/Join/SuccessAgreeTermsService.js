import React, { Component } from "react";
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import CustomHeader from "~/Common/Components/CustomHeader";
import { color } from "~/Common/Styles/colors";

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
        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConCenter]}>
            <View>
              <View style={styles.alignItemsCenter}>
                <Image source={require('~/Common/Image/join-end.png')} resizeMode='center'/>
              </View>
              <View style={styles.alignItemsCenter}>
                <H1>약관동의가</H1>
                <H1>완료되었어요!</H1>
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
              onPress={this._cardRegister}
              edgeFill={true}
              backgroundColor={color.whiteColor}
            >
              메인화면으로
            </CustomButton>
            
            <CustomButton 
              onPress={this._cardRegister}
              edgeFill={true}
              fillTxt={true}
            >
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
