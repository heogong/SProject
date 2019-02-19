import React, { Component } from "react";
import { Image, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
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

class ApplyAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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
            <Title style={styles.headerTitleTxt}>육류용냉장고</Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={styles.contentWrap}>

          <View style={{flex: 2, justifyContent: 'center'}}>
            
            <View style={{flexDirection : 'row'}}>
              <View style={styles.leftGuideTxtWrap}>
                <Text style={styles.leftGuideTxt}>증상 및</Text>
                <Text style={styles.leftGuideTxt}>상세 정보를 </Text>
                <Text style={styles.leftGuideTxt}>입력해주세요</Text>
              </View>

              <View style={{flex:1, alignItems : 'flex-end'}}>
                {/* <Image source={require('./img/license-depart01.png')} />  */}
                <Thumbnail square large source={require('./img/license-depart01.png')} />
              </View>
            </View>

            <View>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>

              <Textarea rowSpan={5} bordered placeholder="Textarea" />
            </View>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{color:'#28c8f5'}}>클리닉 제품 분석</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
            <Text>aaaaaaaaaaaaaaaa</Text>
          </View>

          <View style={styles.footerBtnWrap}>
            <Button style={[styles.btnDefault, styles.btnDefaultNoFill, styles.mb5]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultNoFillTxt]}>결제카드선택</Text>
            </Button>
            <Button block info style={[styles.btnDefault, styles.btnDefaultFill]}>
              <Text style={[styles.btnDefaultTxt, styles.btnDefaultFillTxt]}>입력 완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentWrap: {
    flex: 1
  },
  leftGuideTxt: {
    fontSize: 26,
    letterSpacing: -1
  },
  footerBtnWrap: {
    flex: 1,
    justifyContent: "center"
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
  }
});

export default ApplyAfterService;