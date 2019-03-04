import { StyleSheet } from 'react-native'
import { color } from './colors';

export const stylesReg = StyleSheet.create({
    // Detail Guide Style
    leftGuideTxtWrap: {
      flex: 1
    },
    leftGuideTxt: {
      fontSize: 26,
      letterSpacing: 0,
      lineHeight: 30
    },
    rightStepNumWrap: {
      flex: 1,
      alignItems : "flex-end",
      justifyContent : "flex-end"
    },
    rightStepNum: {
      fontSize: 72,
      color: color.defaultColor,
      height: 76
    },
    rightImgWrap: {
      flex: 1,
      alignItems : "flex-end",
      justifyContent : "flex-end"
    },
    rigthTxtWrap: {
      flex: 1,
      alignItems : "flex-end",
      justifyContent : "flex-end"
    },
    rightTxt: {
      fontSize: 48,
      color: color.defaultColor,
      height: 50
    },
    rightTxtSmall: {
      fontSize: 30,
      color: color.defaultColor,
    },
    procBarWrap: {
      flexDirection : "row",
      marginTop: 18
    },
    procBarOn: {
      height : 10,
      backgroundColor : color.defaultColor
    },
    procBarOff: {
      height : 10,
      backgroundColor : color.defaultBackColor
    },
  });