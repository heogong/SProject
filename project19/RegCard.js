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
  Input,
  IconNB,
  CheckBox
} from "native-base";

class RegCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require('./images/btn_back_arrow.png')} width="30" height="30" />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View>
            <View style={styles.fxDirRow}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>쿨리닉</Text>
                <Text style={styles.leftGuideTxt}>결제카드를</Text>
                <Text style={styles.leftGuideTxt}>등록해주세요</Text>
              </View>
              <View style={styles.rightStepNumWrap}>
                <Text style={styles.rightStepNum}>02</Text>
              </View>
            </View>

            <View style={styles.fxDirRow}>
              <View style={{flex: 1}}>
                <View style={styles.procBarOn} />
              </View>
              <View style={{flex: 1}}>
                <View style={styles.procBarOn} />
              </View>
              <View style={{flex: 1}}>
               <View style={styles.procBarOff} />
              </View>
            </View>
            
          </View>

          <View style={{flex:3, justifyContent:'flex-end'}}>
            <Item regular style={[styles.mb15, {height : inputHeight, borderColor : '#28c8f5'}]}>
              <Input placeholder="카드번호16자리" />
              <IconNB name="ios-camera" style={{color:'#28c8f5'}}/>
            </Item>
            <View style={{flexDirection : 'row'}}>
              <View style={{flex:1}}>
                <Item regular style={[styles.mb15, {height : inputHeight, borderColor : '#28c8f5'}]}>
                  <Input placeholder="MM" />
                </Item>
              </View>
              <View style={{flex:1}}>
                <Item regular style={[styles.mb15, {height : inputHeight, borderColor : '#28c8f5'}]}>
                  <Input placeholder="YY" />
                </Item>
              </View>
              <View style={{flex:1}}>
                <Item regular style={[styles.mb15,  {height : inputHeight, borderColor : '#28c8f5'}]}>
                  <Input placeholder="비밀번호2자리" />
                </Item>
              </View>
            </View>
            <View>
              <Item regular style={[styles.mb15, {height : inputHeight, borderColor : '#28c8f5'}]}>
                <Input placeholder="주민등록번호6자리" />
              </Item>
            </View>

            <View style={{flexDirection : 'row'}}>
              <View style={{flex:1}}>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
                <Text style={[styles.greyFont, styles.mb5]}>전자금융거래 이용약관</Text>
                <Text style={[styles.greyFont, styles.mb5]}>개인정보 수집 및 이용안내</Text>
              </View>

              <View style={{flex:1, flexDirection : 'row'}}>
                <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'space-between'}}>
                  <CheckBox
                    checked={this.state.checkBox}
                    onPress={ () => this.setState({checkBox : (this.state.checkBox) ? false : true})}
                  />
                  <CheckBox 
                    style={{paddingBottom : 1}} 
                    checked={this.state.checkBox}
                    onPress={ () => this.setState({checkBox : (this.state.checkBox) ? false : true})}
                  />
                  <CheckBox 
                    style={{paddingBottom : 1}} 
                    checked={this.state.checkBox}
                    onPress={ () => this.setState({checkBox : (this.state.checkBox) ? false : true})}
                  />
                  <CheckBox 
                    checked={this.state.checkBox}
                    onPress={ () => this.setState({checkBox : (this.state.checkBox) ? false : true})}
                  />
                </View>
                <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'space-between'}}>
                  <Text style={styles.greyFont}>전체동의</Text>
                  <Text style={styles.greyFont}>동의</Text>
                  <Text style={styles.greyFont}>동의</Text>
                  <Text style={styles.greyFont}>동의</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <Button block info
              onPress={ () => alert("등록완료")}
            >
              <Text>입력완료</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content : {
    marginLeft : 10,
    marginRight : 10
  },
  mb5: {
    marginBottom: 5
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
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  },
  redFont : {
    color : '#FF0000',
    fontSize : 15
  },

  // ----------------------------
  // YOO
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
    justifyContent : "flex-end",
    marginTop: 20

  },
  rightStepNum: {
    fontSize: 72,
    color: "#28c8f5"
  },
  footerBtnWrap: {
    flex: 1,
    justifyContent: "center"
  },
  procBarOn: {
    height : 10,
    backgroundColor : '#28c8f5'
  },
  procBarOff: {
    height : 10,
    backgroundColor : '#d6f1ff'
  },
  // ----------------------------
  // containerInnerPd
  // ----------------------------
  containerInnerPd: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingLeft: 26,
    paddingRight: 26,
  },
  // 상세 헤더
  header: {
    height: 105,
    paddingTop : 0,
    elevation: 0,
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
  mb5: {
    marginBottom: 5
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  fxDirRow: {
    flexDirection : "row"
  },
  colorDefault: {
    color: "#28c8f5"
  }
});

export default RegCard;
