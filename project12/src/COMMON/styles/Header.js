import { StyleSheet } from 'react-native'

export const HStyles = StyleSheet.create({
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
    fontSize: 22,
    marginLeft: "auto",
    marginRight: "auto"
  },
  headerRrightWrap: {
    flex: 1
  }
});