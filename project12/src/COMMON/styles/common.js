import { Dimensions, StyleSheet } from 'react-native'
import { color } from './colors';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: color.whiteColor
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
    // ----------------------------
    // containerInnerPd
    // ----------------------------
    containerInnerPd: {
      flex: 1,
      backgroundColor: color.whiteColor,
      paddingLeft: 26,
      paddingRight: 26,
      paddingBottom: 26
    },
    // ----------------------------
    // 공통 Style
    // ----------------------------
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

    fx1: {flex: 1}, 
    fx2: {flex: 2}, 
    fx3: {flex: 3}, 
    fx4: {flex: 4}, 
    fx5: {flex: 5}, 
    
    mb5: {marginBottom: 5},
    mb10: {marginBottom: 10},
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
    
    justiConCenter: {justifyContent : "center"},
    justiConBetween: {justifyContent : "space-between"},
    justiConStart: {justifyContent : "flex-start"},
    justiConEnd: {justifyContent : "flex-end"},
    
    noPadding: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0},
    noMargin: {marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0},
    noBackNBorderColor: {backgroundColor: color.whiteColor, borderColor: color.whiteColor}
  });

export const viewportHeight = Dimensions.get('window').height;
export const viewportWidth = Dimensions.get('window').width;