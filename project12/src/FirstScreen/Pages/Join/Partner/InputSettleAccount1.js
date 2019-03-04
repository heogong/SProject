import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class InputSettleAccount1 extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.contentWrap}>

          <View style={styles.mb10}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>정산받을</Text>
                <Text style={stylesReg.leftGuideTxt}>통장사본을</Text>
                <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>05</Text>
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
              <View style={styles.fx1}>
               <View style={stylesReg.procBarOn} />
              </View>
              <View style={styles.fx1}>
               <View style={stylesReg.procBarOff} />
              </View>
              <View style={styles.fx1}>
               <View style={stylesReg.procBarOff} />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={Actions.JoinInputSettleAccount2}
            style={localStyles.photoBoxWrap}
          >
            <View style={localStyles.photoBox}>
              <Icon name="ios-camera" style={localStyles.phototIcon} />
              <Text style={localStyles.photoTxt}>등록하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  photoBoxWrap: {
    flex: 5,
    borderColor : "#c9cacb",
    borderWidth : 1,
    marginTop: 18
  },
  photoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  phototIcon: {
    color: color.defaultColor,
    fontSize: 60
  },
  photoTxt: {
    fontSize: 16,
    color: color.defaultColor,
    fontWeight: "bold"
  }
});

export default InputSettleAccount1;