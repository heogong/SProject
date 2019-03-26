import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
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
          <View style={styles.fx1}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                <Text style={stylesReg.leftGuideTxt}>사업장정보를</Text>
                <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>04</Text>
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
              <View style={styles.fx1}>
                  <View style={stylesReg.procBarOn} />
              </View>
            </View>
          </View>

          <View style={[styles.fx2, styles.justifyContent]}>
            <View style={localStyles.placeBoxWrap}>
              <View style={localStyles.btnPlusWrap}>
                <TouchableOpacity onPress={Actions.RegBusinessPlace} onPress={Actions.RegBusinessPlace}>
                  <Image source={require('~/Common/Image/campany_add_icon.png')} style={localStyles.btnPlus}/>
                </TouchableOpacity>
              </View>
              <View style={localStyles.txtWrap}>
                  <Text style={localStyles.placeNameTxt}>사업장명칭</Text>
                  <View style={localStyles.infoTxtWrap}>
                    <Text style={localStyles.infoTxt}>새로운 사업장을 추가하려면</Text>
                    <Text style={localStyles.infoTxt}>위의 아이콘을 클릭하세요</Text>
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

const localStyles = StyleSheet.create({
  placeBoxWrap: {
    width : '100%',
    height : itemHeight, 
    backgroundColor : color.defaultColor
  },
  btnPlusWrap: {
    flex: 3,
    alignItems : 'center',
    justifyContent:'center'
  },
  btnPlus: {
    width: 120,
    height: 120
  },
  txtWrap: {
    flex: 2,
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 22
  },
  infoTxtWrap: {
    flex: 1,
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 15,
    color: color.whiteColor
  }
});

export default RegBusinessPlaceIndex;
