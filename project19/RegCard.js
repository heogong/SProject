import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Left,
  ListItem,
  Right,
  Picker,
  Body,
  Text,
  Textarea,
  Thumbnail,
  Footer,
  FooterTab,
  Form,
  Item,
  Input
} from "native-base";
import { CheckBox } from 'react-native-elements'

class RegCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={stl.containerInnerPd}>
        <Header style={[stl.header, stl.noPadding]}>
          <Left style={stl.headerLeftWrap}>
            <Button style={stl.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
            </Button>
          </Left>
          <Body style={stl.headerCenterWrap}>
            <Title style={stl.headerTitleTxt}></Title>
          </Body>
          <Right style={stl.headerRightWrap}></Right>
        </Header>

        <View style={stl.contentWrap}>

          <View>
            <View style={stl.fxDirRow}>
              <View style={stl.leftGuideTxtWrap}>
                <Text style={stl.leftGuideTxt}>쿨리닉</Text>
                <Text style={stl.leftGuideTxt}>결제카드를</Text>
                <Text style={stl.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={stl.rightStepNumWrap}>
                <Text style={stl.rightStepNum}>02</Text>
              </View>
            </View>

            <View style={stl.procBarWrap}>
              <View style={stl.fx1}>
                <View style={stl.procBarOn} />
              </View>
              <View style={stl.fx1}>
                <View style={stl.procBarOn} />
              </View>
              <View style={stl.fx1}>
               <View style={stl.procBarOff} />
              </View>
            </View>
            
          </View>

          <View style={stl.inputWrap}>
            <Item regular style={[stl.mb10, stl.inputStyle]}>
              <Input placeholder="카드번호 16자리" placeholderTextColor="#777" fontSize="14"/>
              <Icon name="ios-camera" style={stl.inputIcon} />
            </Item>
            <View style={[stl.mb10, stl.fxDirRow]}>
              <View style={stl.fx1}>
                <Item regular style={[stl.inputStyle, stl.mr7]}>
                  <Input placeholder="MM" placeholderTextColor="#777" fontSize="14" style={{textAlign: "center"}}/>
                </Item>
              </View>
              <View style={stl.fx1}>
                <Item regular style={[stl.inputStyle, stl.mr7]}>
                  <Input placeholder="YY" placeholderTextColor="#777" fontSize="14" style={{textAlign: "center"}}/>
                </Item>
              </View>
              <View style={stl.fx2}>
                <Item regular style={stl.inputStyle}>
                  <Input placeholder="비밀번호 앞2자리" placeholderTextColor="#777" fontSize="14" style={{textAlign: "center"}}/>
                </Item>
              </View>
            </View>
            <View>
              <Item regular style={stl.inputStyle}>
                <Input placeholder="생년월일(YYMMDD)" placeholderTextColor="#777" fontSize="14"/>
              </Item>
            </View>

            <View style={stl.termsWrap}>
              <View style={[stl.fx2, stl.alignItemsStart, stl.justiConBetween]}>
                <Text style={[stl.greyFont, stl.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[stl.greyFont, stl.mb5]}>개인정보 수집 및 이용안내</Text>
                <Text style={[stl.greyFont, stl.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[stl.greyFont, stl.mb5]}>개인정보 수집 및 이용안내</Text>
              </View>

              <View style={[stl.fx1, stl.fxDirRow]}>
                <View style={[stl.fx1, stl.alignItemsEnd, stl.justiConBetween]}>
                  <View style={stl.fx1}>
                    <CheckBox
                      title="전체동의"
                      containerStyle={[stl.noBackNBorderColor, stl.noPadding, stl.noMargin]}
                      textStyle={{fontSize: 14}}
                      checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={stl.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[stl.noBackNBorderColor, stl.noPadding, stl.noMargin]}
                      checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={stl.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[stl.noBackNBorderColor, stl.noPadding, stl.noMargin]}
                      checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                  <View style={stl.fx1}>
                    <CheckBox
                      title="동의"
                      containerStyle={[stl.noBackNBorderColor, stl.noPadding, stl.noMargin]}
                      checkedIcon={<Image source={require("./images/btn_check_box_on.png")} />}
                      uncheckedIcon={<Image source={require("./images/btn_check_box_off.png")} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={stl.footerBtnWrap}>
            <Button style={[stl.btnDefault, stl.btnDefaultFill, stl.mb5]}>
              <Text style={[stl.btnDefaultTxt, stl.btnDefaultFillTxt]}>등록완료</Text>
            </Button>
          </View>

        </View>
      </Container>
    );
  }
}

const layoutCount = 5; // 화면 분할 개수 사이즈
const viewportHeight = Dimensions.get('window').height;

const inputHeight = (viewportHeight / layoutCount) * 0.3;

const stl = StyleSheet.create({
  // ----------------------------
  // YOO Jung Hyun
  // ----------------------------
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
    color: "#28c8f5",
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
    backgroundColor : '#28c8f5'
  },
  procBarOff: {
    height : 10,
    backgroundColor : '#d6f1ff'
  },
  inputWrap: {
    marginTop: 32
  },
  termsWrap: {
    marginTop: 27,
    flexDirection : "row"
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 14
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
    borderColor : "#28c8f5"
  },
  inputIcon: {
    color: "#28c8f5",
    fontSize: 32,
    marginRight: 5
  },
  mb5: {marginBottom: 5},
  mb10: {marginBottom: 10},
  mr7: {marginRight: 7},
  fx1: {flex: 1}, 
  fx2: {flex: 2}, 
  fxDirRow: {flexDirection : "row"},
  colorBlue: {color: "#28c8f5"},
  alignItemsEnd: {alignItems : 'flex-end'},
  alignItemsStart: {alignItems : 'flex-start'},
  justiConBetween: {justifyContent : 'space-between'},
  justiConEnd: {justifyContent : 'flex-end'},
  noPadding: {paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0},
  noMargin: {marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0},
  noBackNBorderColor: {backgroundColor: "#fff", borderColor: "#fff"}
});

export default RegCard;
