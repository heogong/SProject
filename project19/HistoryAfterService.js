import React, { Component } from "react";
import { Image, StyleSheet, View } from 'react-native'
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

class HistoryAfterService extends Component {
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
            <Title>A/S신청내역</Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <View style={[styles.mg10, {flex:1}]}>
          <View style={{flex:3, justifyContent:'center'}}>
            <Card>
              <CardItem bordered style={styles.mg10}>
                <View style={[styles.mg10, {flexDirection : 'row'}]}>

                  <View style={{flex:1}}>
                    {/* <Image source={require('./img/license-depart01.png')} />  */}
                    <Thumbnail square large source={require('./img/license-depart01.png')} />
                  </View>

                  <View style={{flex:2}}>
                    <H2 style={{color:'#28c8f5'}}>세나정육점</H2>
                    <Text>육류용 냉장고</Text>
                    <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                    <Text style={styles.greyFont}>bbbbbbbbbbb</Text>
                  </View>

                </View>
              </CardItem>
              <CardItem style={styles.mg10}>
                <Body style={styles.mg10}>

                  <H2 style={[styles.mb20, {color:'#28c8f5'}]}>A/S 신청내역</H2>

                  <H3>육류용 냉장고</H3>
                  <Text style={styles.greyFont}>aaaaaaaaaaaaaaaaaaaaa</Text>
                  <View style={styles.mb20}></View>

                  <H3>참고사항</H3>
                  <Text style={styles.greyFont}>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </Text>
                  <View style={styles.mb20}></View>

                  <H3>출장비 결제</H3>
                  <Text style={styles.greyFont}>aaaaaaaaaaaaaaaaaaaaa</Text>
                  <View style={styles.mb20}></View>
                </Body>
              </CardItem>
            </Card>
          </View>

          <View style={{flex:1, justifyContent:'center'}}>
            <View style={[styles.mb20, {alignItems : 'center'}]}>
              <Text style={styles.greyFont}>입력하신 사항이 정확한가요?</Text>
              <Text style={styles.greyFont}>매칭이 시작되면 출장비가 결제되니 꼼꼼하게 살펴주세요</Text>
            </View>
            <Button block info style={{elevation:0}}>
              <Text>매칭시작</Text>
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
  mb10: {
    marginBottom: 10
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
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  }
});

export default HistoryAfterService;