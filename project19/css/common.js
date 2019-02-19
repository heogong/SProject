import { Dimensions, StyleSheet } from 'react-native'
import { color } from './color';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff"
    },
    mb10: {
      marginBottom: 10
    },
    mb15: {
      marginBottom: 15
    },
    mb20: {
      marginBottom: 20
    },
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
    greyFont : {
      color : color.greyColor,
      fontSize : 15
    },
    whiteFont : {
      color : color.whiteColor,
      fontSize : 15
    }
  });

export const viewportHeight = Dimensions.get('window').height;
export const viewportWidth = Dimensions.get('window').width;