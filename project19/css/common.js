import { Dimensions, StyleSheet } from 'react-native'
import { color } from './color';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff"
    },
    contentWrap: {
      flex: 1
    },
    leftGuideTxtWrap: {
      flex: 1
    },
    leftGuideTxt: {
      fontSize: 26,
      letterSpacing: -1
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
    footerBtnWrap: {
      flex: 1,
      justifyContent: "flex-end",
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
    greyFont : {
      color : color.greyColor,
      fontSize : 15
    },
    whiteFont : {
      color : color.whiteColor,
      fontSize : 15
    },
    // ----------------------------
    // containerInnerPd
    // ----------------------------
    containerInnerPd: {
      flex: 1,
      backgroundColor: "#FFF",
      paddingLeft: 26,
      paddingRight: 26,
      paddingBottom: 26
    },
    // 상세 헤더
    header: {
      height: 105,
      paddingTop : 0,
      elevation: 0,
      shadowOpacity: 0,
      alignItems: "center"
    },
    headerLeftWrap: {
      flex: 1,
      paddingLeft: 0
    },
    headerCenterWrap: {
      flex: 4
    },
    headerTitleTxt: {
      fontSize: 26,
      marginLeft: "auto",
      marginRight: "auto"
    },
    headerRrightWrap: {
      flex: 1
    },
    // ----------------------------
    // 공통 Style
    // ----------------------------
    // Button Style
    btnNoneStyle: {
      backgroundColor: "#fff",
      flex: 1,
      borderColor: "#fff",
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
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#28c8f5"
    },
    btnDefaultNoFillTxt: {
      color: "#28c8f5",
      flex: 1,
      textAlign: "center"
    },
    btnDefaultFill: {
      backgroundColor: "#28c8f5",
      borderWidth: 1,
      borderColor: "#28c8f5"
    },
    btnDefaultFillTxt: {
      color: "#FFF",
      flex: 1,
      textAlign: "center"
    },
    // 축약 Style
    inputStyle: {
      height : 48,
      borderColor : color.defaultColor
    },
    inputIcon: {
      color: color.defaultColor,
      fontSize: 32,
      marginRight: 5
    },
    mr7: {marginRight: 7},
    fx1: {flex: 1}, 
    fx2: {flex: 2}, 
    mb5: {marginBottom: 5},
    mb10: {marginBottom: 10},
    mb15: {marginBottom: 15},
    mb20: {marginBottom: 20},
    mg5 : {
      marginTop : 5,
      marginBottom : 5,
      marginLeft : 5,
      marginRight : 5
    },
    mg10 : {
      marginTop : 10,
      marginBottom : 10,
      marginLeft : 10,
      marginRight : 10
    },
    mg20 : {
        marginTop : 30,
        marginBottom : 30,
        marginLeft : 30,
        marginRight : 30
    },
    mg30 : {
        marginTop : 30,
        marginBottom : 30,
        marginLeft : 30,
        marginRight : 30
    },
    pd10 : {
      paddingTop : 10,
      paddingBottom : 10,
      paddingLeft : 10,
      paddingRight : 10
    },
    pd15 : {
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 15,
        paddingRight : 15
    },
    pd20 : {
      paddingTop : 20,
      paddingBottom : 20,
      paddingLeft : 20,
      paddingRight : 20
    },
    fxDirRow: {flexDirection : "row"},
    alignItemsEnd: {alignItems : 'flex-end'},
    alignItemsStart: {alignItems : 'flex-start'},
    justiConBetween: {justifyContent : 'space-between'},
    justiConEnd: {justifyContent : 'flex-end'},
    noPadding: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0},
    noMargin: {marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0},
    noBackNBorderColor: {backgroundColor: color.whiteColor, borderColor: color.whiteColor}
  });

export const viewportHeight = Dimensions.get('window').height;
export const viewportWidth = Dimensions.get('window').width;