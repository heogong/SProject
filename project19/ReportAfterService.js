import React, { Component } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
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

class ReportAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox : true
    };
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
            <Title>출장보고서</Title>
          </Body>
          <Right style={{flex:1}}></Right>
        </Header>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          <View style={[styles.mb20, {alignItems : 'center'}] }>
            <Thumbnail square large source={require('./img/license-depart01.png')} />
            <H2 style={{color : '#fff'}}>세나정육점</H2>
            <Text style={{color : '#fff'}}>육류용냉장고</Text>
          </View>

          <View style={styles.mb20}>
            <Card>
              <CardItem style={styles.mg10}>
                <View style={styles.mg10}>
                  <H2 style={{color:'#28c8f5'}}>A/S신청내역</H2>
                  <View style={styles.mb10} />

                  <Text>육류용 냉장고</Text>
                  <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                  <Text style={styles.greyFont}>bbbbbbbbbbb</Text>
                  <View style={styles.mb10} />

                  <Text>참고사항</Text>
                  <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                  <View style={styles.mb10} />

                  <Text>클리닉데이터</Text>
                  <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>

                </View>
              </CardItem>
            </Card>
          </View>

          <View>
            <H2 style={{color : '#fff'}}>A/S 조치 전</H2> 
            {/* <View style={{height : 1, backgroundColor : 'red'}}/> */}
          </View>

          <View style={ styles.mb20 }>
            <Card>
              <CardItem style={styles.mg10}>
                <View>
                  <View style={[styles.mb20, {flex : 1, justifyContent : 'center', alignItems : 'center'}]}>
                    <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}>

                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'skyblue'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'pink'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'pink'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'skyblue'}]} />

                    </View>
                  </View>

                  <View>
                    <Text>출장 전 상태</Text>
                    <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                  </View>
                </View>
              </CardItem>
            </Card>
          </View>

          <View>
            <H2 style={{color : '#fff'}}>A/S 조치 후</H2> 
            {/* <View style={{height : 1, backgroundColor : 'red'}}/> */}
          </View>

          <View style={styles.mb20} >
            <Card>
              <CardItem style={styles.mg10}>
                <View>
                  <View style={[styles.mb20, {flex : 1, justifyContent : 'center', alignItems : 'center'}]}>
                    <View style={{flexDirection : 'row', flexWrap : 'wrap', justifyContent : 'center'}}>

                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'skyblue'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'pink'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'pink'}]} />
                      <View style={[styles.mg5, {width : imageSize, height : imageSize, backgroundColor : 'skyblue'}]} />

                    </View>
                  </View>

                  <View>
                    <Text>A/S 조치내역</Text>
                    <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                  </View>
                </View>
              </CardItem>
            </Card>
          </View>

          <View>
            <Card>
              <CardItem style={styles.mg10}>
                <H2 style={{color : '#28c8f5'}}>청구비용</H2>
              </CardItem>
              <CardItem style={styles.mg10}>
                <View style={{flexDirection : 'row'}}>
                  <View style={{flex : 1}}>
                    <Text style={styles.greyFont}>출장비</Text>
                    <Text style={styles.greyFont}>추가 A/S비</Text>
                    <Text>총계</Text>
                  </View>
                  <View style={{flex : 1, alignItems : 'flex-end'}}>
                    <Text style={styles.greyFont}>30,000 원</Text>
                    <Text style={styles.greyFont}>120,000 원</Text>
                    <Text>150,000 원</Text>
                  </View>
                </View>
              </CardItem>

              <CardItem style={styles.mg10}>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <H2 style={{color : '#28c8f5'}}>추가A/S</H2>
                  </View>

                  <CheckBox checked={this.state.checkBox} color='#28c8f5' onPress={ 
                    () => this.setState({
                      checkBox : (this.state.checkBox) ? false : true
                    })
                    }/>
                  <Text style={{paddingLeft : '5%'}}>공인</Text>

                  <CheckBox checked={this.state.checkBox} color='#28c8f5' onPress={ 
                    () => this.setState({
                      checkBox : (this.state.checkBox) ? false : true
                    })
                    }/>
                  <Text style={{paddingLeft : '5%'}}>부품교체</Text>
                </View>
              </CardItem>
              <CardItem style={styles.mg10}>
                <View>
                  <Text>추가 A/S 내역</Text>
                  <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                </View>
              </CardItem>
              <CardItem style={styles.mg10}>
                <View>
                  <Text>추가 A/S 사유</Text>
                  <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                </View>
              </CardItem>
            </Card>

          </View>
        </ScrollView>

      </Container>
    );
  }
}

const layCount = 3;
const viewportWidth = Dimensions.get('window').width;
const imageSize = viewportWidth / layCount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#28c8f5"
  },
  content : {
    marginLeft : 10,
    marginRight : 10
  },
  mb10: {
    marginBottom: 10
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
  }
});

export default ReportAfterService;