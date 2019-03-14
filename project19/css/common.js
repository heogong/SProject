import { Dimensions, StyleSheet } from 'react-native'
import { color } from './color';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: color.whiteColor
    },
    containerDefault: {
      flex: 1,
      backgroundColor: color.whiteColor
    },
    containerRightSlide: {
      flex: 1,
      backgroundColor: color.whiteColor,
      paddingLeft: 26
    },
    containerInnerPd: {
      flex: 1,
      backgroundColor: color.whiteColor,
      paddingLeft: 26,
      paddingRight: 26,
      paddingBottom: 26
    },
    containerScroll: {
      flex: 1,
      backgroundColor: color.whiteColor,
      paddingLeft: 26,
      paddingRight: 26,
      paddingBottom: 0
    },
    containerSwiper: {
      flex: 1,
      backgroundColor: color.whiteColor,
      paddingLeft: 26,
      paddingRight: 0,
      paddingBottom: 26
    },
    contentWrap: {
      flex: 1
    },
    footerBtnWrap: {
      justifyContent: "flex-end",
    },
    greyFont : {
      color : color.greyColor,
      fontSize : 14
    },
    whiteFont : {
      color : color.whiteColor,
      fontSize : 14
    },
    blueFont: {
      color : color.defaultColor,
      fontSize : 14
    },
    btnBackArrowIcon: {
      width: 30,
      height: 30
    },
    // 메인 헤더
    headerM: {
      height: 55,
      paddingTop : 0,
      elevation: 0,
      shadowOpacity: 0,
      alignItems: "center"
    },
    // 상세 헤더
    header: {
      height: 55,
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
      marginLeft: "auto",
      marginRight: "auto"
    },
    headerRrightWrap: {
      flex: 1
    },
    headerLogoImg: {
      width : 102
    },
    // ----------------------------
    // 공통 Style
    // ----------------------------
    // Select Box
    selectBoxWrap: {
      paddingLeft: 14,
      paddingRight: 14,
      width: "100%",
      height: 36,
      borderWidth: 1,
      borderColor: "#c9cacb",
      borderRadius: 0
    },
    selectBoxTxt: {
      fontSize: 13,
      color: color.defaultColor,
      paddingLeft: 0,
      paddingRight: 0
    },
    selectBoxIcon: {
      fontSize: 35,
      marginLeft: 0,
      marginRight: 0,
      color: color.defaultColor
    },
    // TextArea
    textAreaDefault: {
      paddingLeft: 14,
      paddingRight: 14,
      paddingTop: 12,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: "#c9cacb",
      borderRadius: 0,
      fontSize: 13
    },
    // 성공화면 
    succContentWrap: {
      flex:1
    },
    succContentTop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    succTopTxtWrap: {
      alignItems: 'center'
    },
    succTopTxt: {
      fontSize: 26,
      color: "#1e1e32",
      letterSpacing: 0,
      lineHeight: 30,
      fontWeight: "bold"
    },
    // Tootip
    tooltipWrap: {
      width: "100%",
      backgroundColor: "rgba(230, 230, 230, 1)",
      padding: 14
    },
    tooltipTxt: {
      fontSize: 11,
      color: "#626270"
    },
    // Line
    line: {
      width: "100%",
      height: 1,
      borderTopWidth: 1
    },
    // List Style
    listPrdBoxDeTxt: {
      fontSize: 13,
      color: color.whiteColor
    },
    listPrdBoxFillWrap: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 12,
      padding: 14, 
      backgroundColor : color.defaultColor
    },
    listPrdBoxStartIcon: {
      color: color.whiteColor,
      fontSize: 17,
      marginRight: 2
    },
    listPrdBoxImgWrap: {
      alignItems: "flex-start",
      justifyContent : "center",
      height : 80,
      width : 80
    },
    listPrdBoxImg: {
      height : 80,
      width : 80,
      marginBottom: 5
    },
    listPrdBoxImgTxt: {
      width: 80,
      textAlign: "center",
      fontSize: 12,
      color: color.whiteColor
    },
    listPrdBoxRightTxtWrap: {
      justifyContent : "center",
      paddingLeft: 20
    },
    listPrdBoxRightTitleTxt: {
      marginBottom: 12,
      fontWeight: "bold",
      fontSize: 18,
      color : color.whiteColor
    },
    listPrdBoxNextIconWrap: {
      flex: 1,
      alignItems: "flex-end"
    },
    listPrdBoxNextIcon: {
      color: color.whiteColor
    },
    listPrdBoxEmptyImgWrap: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    // TextInput
    textInputBox: {
      paddingLeft: 9,
      fontSize: 14,
      height : 100,
      width: "100%",
      paddingRight: 9,
    },
    textInputWhBackWhBo: {
      backgroundColor: color.whiteColor,
      borderColor : color.whiteColor,
      height : 100
    },
    textInputBox1: {
      padding: 14,
      paddingTop: 14,
      fontSize: 14,
      height : 170,
      width: "100%",
    },
    textInputWhBack: {
      backgroundColor: color.whiteColor,
      borderWidth : 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      height : 170,
      marginRight: 1
    },
    // Box Shdow
    boxShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      marginTop: 2,
      marginLeft: 5,
      marginRight: 5
    },
    boxShadowTopNo: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      marginLeft: 5,
      marginRight: 5
    },
    // FooterTab
    footTxt: {
      fontSize: 12,
      color: "#1e1e32",
      marginTop: 3
    },
    // Modal
    modalWrap: {
      marginLeft: 14,
      marginRight: 14,
      height: 106,
      backgroundColor: color.whiteColor
    },
    modalContent: {
      flex: 1,
      alignItems : "center",
      justifyContent : "center"
    },
    modalBtnWrap: {
      flex: 1
    },
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
    },
    modalTopTxtWrap: {
      flex: 1,
      justifyContent: "center"
    },
    modalTop2LTxtWrap: {
      flex: 3,
      justifyContent: "center"
    },
    modalTopTxt: {
      color: color.modalTxtColor,
      fontSize: 14,
      textAlign: "center"
    },
    modalBtnTwinWrap: {
      flex: 2,
      flexDirection: "row"
    },
    modalBtnOneWrap: {
      flex: 2,
      flexDirection: "row"
    },
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
    procBarTxt: {
      fontSize: 12,
      color: "#888888",
      marginTop: 6,
      textAlign: "center"
    },
    // Input Style
    inputWhBackWhBo: {
      backgroundColor: color.whiteColor,
      borderColor : color.whiteColor,
      height : 36
    },
    inputBox: {
      paddingLeft: 0,
      paddingRight: 9,
      fontSize: 14,
      height : 36
    },
    inputDefaultBox: {
      paddingRight: 8,
      fontSize: 14,
      height: 46,
    },
    inputWhBackBuBo: {
      height : 46,
      borderColor : color.defaultColor
    },
    inputWhBackGreyBo: {
      height : 46,
      borderColor : color.inputBoGrey
    },
    inputIcon: {
      color: color.defaultColor,
      fontSize: 30,
      marginRight: 5,
      marginTop: 3
    },
    inputNbTitleTxt: {
      fontSize: 13,
      color: "#8e8e98",
      marginBottom: 0,
      marginTop: 16
    },
    inputNbWhBackGreyBottomBo: {
      height : 46,
      borderColor : color.inputBoGrey,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0
    },
    inputNbDefaultBox: {
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: 14,
      height: 46
    },
    // Tabs Style
    tabsReset: {
      elevation: 0,
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      height: 36
    },
    tabHeadTxt: {fontWeight: "500"},
    tabStyle: {backgroundColor: color.defaultBackColor},
    tabTxtStyle: {color: color.defaultColor, fontSize: 14},
    tabActStyle: {backgroundColor: color.defaultColor},  
    tabActTxtStyle: {color: color.whiteColor, fontSize: 14},
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

    fx1: {flex: 1}, 
    fx2: {flex: 2}, 
    fx3: {flex: 3}, 
    fx4: {flex: 4}, 
    fx5: {flex: 5}, 
    fx6: {flex: 6}, 

    fxDirRow: {flexDirection : "row"},

    fxWraWra: {flexWrap: "wrap"},
    
    mt13: {marginTop: 13},

    mb5: {marginBottom: 5},
    mb10: {marginBottom: 10},
    mb11: {marginBottom: 11},
    mb12: {marginBottom: 12},
    mb13: {marginBottom: 13},
    mb14: {marginBottom: 14},
    mb15: {marginBottom: 15},
    mb20: {marginBottom: 20},
    
    mr7: {marginRight: 7},

    mg5 : {marginTop : 5, marginBottom : 5,marginLeft : 5,marginRight : 5},
    mg10 : {marginTop : 10, marginBottom : 10, marginLeft : 10, marginRight : 10},
    mg20 : {marginTop : 30,marginBottom : 30,marginLeft : 30,marginRight : 30},
    mg30 : {marginTop : 30, marginBottom : 30, marginLeft : 30, marginRight : 30},

    pd10 : {paddingTop : 10, paddingBottom : 10, paddingLeft : 10, paddingRight : 10},
    pd15 : {paddingTop : 15, paddingBottom : 15, paddingLeft : 15, paddingRight : 15},
    pd20 : {paddingTop : 20, paddingBottom : 20, paddingLeft : 20, paddingRight : 20},

    pl9: {paddingLeft: 9},
    pl12: {paddingLeft: 12},

    pr12: {paddingRight: 12},
    
    alignItemsStart: {alignItems : "flex-start"},
    alignItemsCenter: {alignItems : "center"},
    alignItemsEnd: {alignItems : "flex-end"},

    alignSelfEnd: {alignSelf: "flex-end"},
    
    justiConCenter: {justifyContent : "center"},
    justiConBetween: {justifyContent : "space-between"},
    justiConStart: {justifyContent : "flex-start"},
    justiConEnd: {justifyContent : "flex-end"},
    
    noPadding: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0},
    noMargin: {marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0},
    noBackNBorderColor: {backgroundColor: color.whiteColor, borderColor: color.whiteColor},

    checkboxReset: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, marginLeft: -10, marginRight: 15, marginTop: 0, marginBottom: 0, backgroundColor: color.whiteColor},
    checkboxTxt: {fontSize: 14, fontWeight: 'normal'},

    ftWe500: {fontWeight: "500"},
    ftWeBold: {fontWeight: "bold"}
  });

export const viewportHeight = Dimensions.get('window').height;
export const viewportWidth = Dimensions.get('window').width;