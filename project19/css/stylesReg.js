import { StyleSheet } from 'react-native'
import { color } from './color';

export const stylesReg = StyleSheet.create({
    leftGuideTxtWrap: {
      flex: 1
    },
    leftGuideTxt: {
      fontSize: 26,
      letterSpacing: 0
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
    inputWrap: {
      marginTop: 32
    },
    termsWrap: {
      marginTop: 27,
      flexDirection : "row"
    },
  });