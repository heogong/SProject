import React, { Component } from "react";
import { Image, TouchableOpacity, View } from 'react-native'
import { Container,  H2, Text } from "native-base";

import { Actions } from "react-native-router-flux";

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class RegBusinessPlaceIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                <Text style={stylesReg.leftGuideTxt}>사업장정보를</Text>
                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>03</Text>
              </View>
            </View>

            <View style={stylesReg.procBarWrap}>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
                <View style={stylesReg.procBarOn} />
              </View>
            </View>
          </View>

          <View style={[styles.fx2, styles.justiConCenter]}>
            <View style={{width : '100%', height : itemHeight, backgroundColor : color.defaultColor}}>
              <View style={[styles.fx3, styles.alignItemsCenter, styles.justiConCenter]}>
                <TouchableOpacity onPress={Actions.RegBusinessPlace}>
                  <Image source={require('~/Common/Image/ico-naver.png')} resizeMode="contain" />
                </TouchableOpacity>
              </View>
              <View style={[styles.fx2, styles.alignItemsCenter]}>
                <View style={styles.fx1}>
                  <H2 style={{color:color.whiteColor}}>사업장명칭</H2>
                </View>
                <View style={[styles.fx1, styles.alignItemsCenter]}>
                  <Text style={styles.whiteFont}>새로운 사업장을 추가하려면</Text>
                  <Text style={styles.whiteFont}>위의 아이콘을 클릭하세요</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
const itemHeight = viewportHeight * 0.47;

export default RegBusinessPlaceIndex;