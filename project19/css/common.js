import { Dimensions, StyleSheet } from 'react-native'
import { color } from './color';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: color.whiteColor
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
      flex: 1,
      justifyContent: "flex-end",
    },
    greyFont : {
      color : color.greyColor,
      fontSize : 15
    },
    whiteFont : {
      color : color.whiteColor,
      fontSize : 15
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
      borderColor: color.defaultColor,
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
    btnDefaultFillTxt: {
      color: color.whiteColor,
      flex: 1,
      textAlign: "center"
    },

    fx1: {flex: 1}, 
    fx2: {flex: 2}, 
    fx3: {flex: 3}, 
    fx4: {flex: 4}, 
    fx5: {flex: 5}, 
    fx6: {flex: 6}, 
    
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

    fxDirRow: {flexDirection : "row"},
    
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

    checkboxReset: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, marginLeft: -10, marginRight: 15, marginTop: 0, marginBottom: 0},
    checkboxTxt: {fontSize: 14, fontWeight: 'normal'},
  });

export const viewportHeight = Dimensions.get('window').height;
export const viewportWidth = Dimensions.get('window').width;