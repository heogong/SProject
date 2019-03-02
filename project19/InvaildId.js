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
  Right,
  Picker,
  Body,
  Tab,
  Tabs,
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
import InvaildPasswd from './InvaildPasswd';
import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class InvaildId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : false,
      findId : false,
      tabIndex : 0,
      passwdStatus : 0
    };
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./images/btn_back_arrow.png")} width="30" height="30" />
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
                <Text style={styles.leftGuideTxt}>본인인증 하고</Text>
                {
                  (this.state.tabIndex == 0 ) ? (
                    <Text style={styles.leftGuideTxt}>아이디를 찾으세요</Text>
                  ) : (
                    <Text style={styles.leftGuideTxt}>비밀번호를 찾으세요</Text>
                  )
                }
              </View>
            </View>
          </View>

          <View style={localStyles.idPwFindTabWrap}>
            <Tabs 
              onChangeTab={(obj, ref) => this.setState({tabIndex : obj.i})}
              scrollWithoutAnimation={true}
              style={{}}
              tabContainerStyle={styles.tabsReset}>
              <Tab 
                heading="아이디찾기" 
                style={styles.tabHeadTxt}
                tabStyle={styles.tabStyle}
                textStyle={styles.tabTxtStyle}
                activeTabStyle={styles.tabActStyle}
                activeTextStyle={styles.tabActTxtStyle}
              >
              { (!this.state.findId) ? (
                <View style={localStyles.inputBoxWrap}>
                  <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                    <Input placeholder="이름" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
                  </Item>
                  <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                    <Input placeholder="핸드폰번호 (하이푼 - 제외하고 입력)" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
                  </Item>

                  <View style={[styles.fxDirRow, styles.mb12]}>
                    <View style={[styles.fx3, styles.pr12]}>
                      <Item regular style={styles.inputWhBackWhBo}>
                        <Input placeholder="인증번호입력" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
                      </Item>
                    </View>
                    <View style={styles.fx2}>
                      <Button style={[styles.btnDefault, styles.btnWhBoder, {height: 36}]}>
                        <Text style={[styles.btnDefaultTxt, styles.btnWhBoderTxt, {fontSize: 12}]}>인증번호 전송</Text>
                      </Button>
                    </View>
                  </View>

                  <View>
                    <Text style={{color: color.whiteColor}}>유효한 인증번호입니다.</Text>
                  </View>
                </View>

              ) : (
                <View style={localStyles.blankBoxWrap}>
                  <Text style={{color: color.whiteColor}}>김성찬님은 이메일로 가입되어있으며</Text>
                  <Text style={[{color: color.whiteColor}, styles.mb12]}>회원님의 아이디는 rastid@naver.com 입니다</Text>
                  <Text style={{color: color.whiteColor}}>지금 바로 로그인하러 이동하세요</Text>
                </View>
              )}
                
              </Tab>

              <Tab 
                heading="비밀번호찾기" 
                style={styles.tabHeadTxt}
                tabStyle={styles.tabStyle}
                textStyle={styles.tabTxtStyle}
                activeTabStyle={styles.tabActStyle}
                activeTextStyle={styles.tabActTxtStyle}
              >

                <InvaildPasswd status={ this.state.passwdStatus }/>

              </Tab>

            </Tabs>
          </View>


          { 
            (this.state.tabIndex == 0) ? (
              (!this.state.findId) ? (
                <View style={styles.footerBtnWrap}>
                  <Button 
                    onPress={ () => this.setState({findId : true})}
                    style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>확인</Text>
                  </Button>
                </View>
              ) : (
                <View style={styles.footerBtnWrap}>
                  <Button 
                    onPress={ () => alert("로그인하기") }
                    style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>로그인하기</Text>
                  </Button>
                </View>
              )
            ) : (
              (this.state.passwdStatus == 0 ) ? (
                <View style={styles.footerBtnWrap}>
                  <Button 
                    onPress={ () => this.setState({passwdStatus : 1})}
                    style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                    <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>비밀번호 확인</Text>
                  </Button>
                </View>
              ) : (
                (this.state.passwdStatus == 1 ) ? (
                  <View style={styles.footerBtnWrap}>
                    <Button 
                      onPress={ () => this.setState({passwdStatus : 2})}
                      style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                      <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>비밀번호 설정</Text>
                    </Button>
                  </View>
                ) : (
                  <View style={styles.footerBtnWrap}>
                    <Button 
                      onPress={ () => alert("로그인하기")}
                      style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
                      <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>로그인 하기</Text>
                    </Button>
                  </View>
                )

              )
              
            )
          }
           </View>
      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  idPwFindTabWrap: {
    flex: 3,
    marginTop: 38
  },
  inputBoxWrap: {
    paddingTop : 52,
    paddingLeft : 20,
    paddingRight : 20,
    flex: 1,
    backgroundColor : color.defaultColor
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center'
  }
});

export default InvaildId;
