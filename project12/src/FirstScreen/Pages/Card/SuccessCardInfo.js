import React, { Component } from "react";
import { Image, View } from 'react-native'
import { Container, H1, Text } from "native-base";

import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import CustomHeader from "~/Common/Components/CustomHeader";

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
                <Image source={require('~/Common/Image/join-end.png')} resizeMode='center'/>
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
              onPress={this._cardRegister}
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
