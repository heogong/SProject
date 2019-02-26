import { StyleSheet } from 'react-native'

export const HStyles = StyleSheet.create({
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
  }
});