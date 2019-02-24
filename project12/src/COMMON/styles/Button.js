import { StyleSheet } from 'react-native'
import { color } from './colors';

export const styles = StyleSheet.create({
// Button Style
  btnNoneStyle: {
    backgroundColor: color.whiteColor,
    flex: 1,
    borderColor: color.whiteColor,
    height: 13,
    borderRadius: 0,
    elevation: 0
  },
  btnDefault: {
    height: 48,
    borderRadius: 0,
    elevation: 0,
    width: "100%"
  },
  btnDefaultTxt: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    fontWeight: "500"
  },
  btnDefaultNoFill: {
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.whiteColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnDefaultNoFillTxt: {
    color: color.defaultColor,
    flex: 1,
    textAlign: "center"
  },
  btnDefaultFill: {
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnDefaultEdgeFill : {
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.whiteColor,
    elevation: 0,
    shadowOpacity: 0,
  },
  btnDefaultFillTxt: {
    color: color.whiteColor,
    flex: 1,
    textAlign: "center"
  }
});