import { StyleSheet } from 'react-native'
import { color } from './colors';

export const BStyles = StyleSheet.create({
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
  btnDefaultSmall: {
    height: 26,
    borderRadius: 0,
    elevation: 0,
    width: "100%",
    paddingTop: 2,
    paddingBottom: 2
  },
  btnDefaultSmallTxt: {
    fontSize: 13,
    flex: 1,
    textAlign: "center",
    fontWeight: "500"
  },
  // 흰색 배경색 기본 테두리색 버튼
  btnDefaultNoFill: {
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnDefaultNoFillTxt: {
    color: color.defaultColor,
    flex: 1,
    textAlign: "center"
  },
  // 기본 배경색 버튼
  btnDefaultFill: {
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnDefaultFillTxt: {
    color: color.whiteColor,
    flex: 1,
    textAlign: "center"
  },
  btnDefaultFillOff: {
    backgroundColor: "#c9cacb",
    borderWidth: 1,
    borderColor: "#c9cacb",
    elevation: 0,
    shadowOpacity: 0
  },
  btnDefaultFillOffTxt: {
    color: "#8e8e98",
    flex: 1,
    textAlign: "center"
  },
  // 흰색 테두리색 기본 배경색 버튼
  btnWhBoder: {
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.whiteColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnWhBoderTxt: {
    color: color.whiteColor,
    flex: 1,
    textAlign: "center"
  },
  // 흰색 배경색 버튼
  btnWhBack: {
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.whiteColor,
    elevation: 0,
    shadowOpacity: 0
  },
  btnWhBackTxt: {
    color: color.defaultColor,
    flex: 1,
    textAlign: "center"
  },
  btnDefaultSmall: {
      height: 26,
      borderRadius: 0,
      elevation: 0,
      width: "100%",
      paddingTop: 2,
      paddingBottom: 2
  },
  btnDefaultSmallTxt: {
    fontSize: 13,
    flex: 1,
    textAlign: "center",
    fontWeight: "500"
  },

  // 비활성화 
   // 흰색 테두리색 기본 배경색 버튼
  disableBtnWhBoder: {
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.greyColor,
    elevation: 0,
    shadowOpacity: 0
  },
  disableBtnWhBoderTxt: {
    color: color.greyColor,
    flex: 1,
    textAlign: "center"
  },

  // modal
  modalBtnFill: {
    height: 36,
    borderRadius: 0,
    elevation: 0,
    width: 130,
    backgroundColor: color.defaultColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    shadowOpacity: 0
  },
  modalBtnFillTxt: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    color: color.whiteColor,
    textAlign: "center"
  },
  modalBtnNoFill: {
    height: 36,
    borderRadius: 0,
    elevation: 0,
    width: 124,
    backgroundColor: color.whiteColor,
    borderWidth: 1,
    borderColor: color.defaultColor,
    shadowOpacity: 0
  },
  modalBtnNoFillTxt: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontWeight: "500",
    color: color.defaultColor,
    textAlign: "center"
  }
});