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
      <Container style={styles.container}>
        <Header style={{height:60, paddingTop : 0, elevation:0}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{flex:1, alignItems: 'center'}}>
            <Title>육류용냉장고</Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={[styles.mg10, {flex:1}]}>

          <View style={{flex:2, justifyContent:'center'}}>
            
            <View style={[styles.mb20, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H2>증상 및</H2>
                <H2>상세 정보를 </H2>
                <H2>입력해주세요</H2>
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

          <View style={{flex:1, justifyContent:'center'}}>
            <Button block info bordered style={{marginBottom : 5}}>
              <Text>결제카드선택</Text>
            </Button>
            <Button block info style={{elevation:0}}>
              <Text>입력 완료</Text>
            </Button>
          </View>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb20: {
    marginBottom: 20
  },
  mg10 : {
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 10,
    marginRight : 10
  },
});

export default ApplyAfterService;