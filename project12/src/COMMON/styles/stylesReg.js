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
      height: 78
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
      height: 53
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
    procBarTxt: {
      fontSize: 12,
      color: "#888888",
      marginTop: 6,
      textAlign: "center"
    }
  });