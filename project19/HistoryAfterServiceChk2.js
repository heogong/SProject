import React, { Component } from "react";
import { Image, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
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

class HistoryAfterServiceChk2 extends Component {
  constructor(props) {
    super(props);

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
            <Title></Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <ScrollView>

          <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>
            <View style={{flex:1}}>
              <H2>A/S 받으신</H2>
              <H2>내역에 대해</H2>
              <H2>확인해보세요</H2>
            </View>
            <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
              <H1 style={{color:'#28c8f5'}}>04</H1>
              <Text>건</Text>
            </View>
          </View>

          <View style={[ styles.asCardMargin, {flexDirection : 'row', justifyContent : 'center', backgroundColor : '#28c8f5'}]}>
            <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>

              <View style={{width : '30%', alignItems : 'center'}}>
                <Thumbnail square large source={require('./img/license-depart01.png')} />
                <Text style={styles.whiteFont}>육류용냉장고</Text>
              </View>

              <View style={{width : '60%', paddingLeft : 10}}>
                <Text>세나정육점</Text>

                <View style={styles.mb10} />

                <Text style={styles.whiteFont}>2019년 01월 16일</Text>
                <Text style={styles.whiteFont}>온도계가 어쩌구저쩌구</Text>
                <Text style={styles.whiteFont}>만족도 : 5</Text>
              </View>

              <View style={{width : '10%'}}>
                <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
              </View>
            </View>
          </View>

          <View style={[ styles.asCardMargin, {flexDirection : 'row', justifyContent : 'center', backgroundColor : '#28c8f5'}]}>
            <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>

              <View style={{width : '30%', alignItems : 'center'}}>
                <Thumbnail square large source={require('./img/license-depart01.png')} />
                <Text style={styles.whiteFont}>육류용냉장고</Text>
              </View>

              <View style={{width : '60%', paddingLeft : 10}}>
                <Text>세나정육점</Text>

                <View style={styles.mb10} />

                <Text style={styles.whiteFont}>2019년 01월 16일</Text>
                <Text style={styles.whiteFont}>온도계가 어쩌구저쩌구</Text>
                <Text style={styles.whiteFont}>만족도 : 5</Text>
              </View>

              <View style={{width : '10%'}}>
                <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
              </View>
            </View>
          </View>

          <View style={[ styles.asCardMargin, {flexDirection : 'row', justifyContent : 'center', backgroundColor : '#28c8f5'}]}>
            <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>

              <View style={{width : '30%', alignItems : 'center'}}>
                <Thumbnail square large source={require('./img/license-depart01.png')} />
                <Text style={styles.whiteFont}>육류용냉장고</Text>
              </View>

              <View style={{width : '60%', paddingLeft : 10}}>
                <Text>세나정육점</Text>

                <View style={styles.mb10} />

                <Text style={styles.whiteFont}>2019년 01월 16일</Text>
                <Text style={styles.whiteFont}>온도계가 어쩌구저쩌구</Text>
                <Text style={styles.whiteFont}>만족도 : 5</Text>
              </View>

              <View style={{width : '10%'}}>
                <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
              </View>
            </View>
          </View>

          <View style={[ styles.asCardMargin, {flexDirection : 'row', justifyContent : 'center', backgroundColor : '#28c8f5'}]}>
            <View style={[styles.mg20, {flex:1, flexDirection : 'row'}]}>

              <View style={{width : '30%', alignItems : 'center'}}>
                <Thumbnail square large source={require('./img/license-depart01.png')} />
                <Text style={styles.whiteFont}>육류용냉장고</Text>
              </View>

              <View style={{width : '60%', paddingLeft : 10}}>
                <Text>세나정육점</Text>

                <View style={styles.mb10} />

                <Text style={styles.whiteFont}>2019년 01월 16일</Text>
                <Text style={styles.whiteFont}>온도계가 어쩌구저쩌구</Text>
                <Text style={styles.whiteFont}>만족도 : 5</Text>
              </View>

              <View style={{width : '10%'}}>
                <Icon style={{color : '#fff'}} name="arrow-round-forward"/>
              </View>
            </View>
          </View>
          
        </ScrollView>

      </Container>
    );
  }
}

const layoutCount = 4;
const viewportHeight = Dimensions.get('window').height / layoutCount;
const secondHeight = viewportHeight; // 상태 box 높이

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
  asCardMargin: {
    marginLeft : 20,
    marginRight : 20,
    marginBottom : 10
  },
  mg20 : {
    marginTop : 20,
    marginBottom : 20,
    marginLeft : 20,
    marginRight : 20
  },
  whiteFont : {
    color : '#FFF',
    fontSize : 15
  },
  greyFont : {
    color : '#BDBDBD',
    fontSize : 15
  }
});

export default HistoryAfterServiceChk2;