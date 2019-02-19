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

        <View style={[styles.mg10, {flex:1}]}>

          <View style={{flex:1}}>
            <View style={[styles.mb10, {flexDirection : 'row'}]}>
              <View style={{flex:1}}>
                <H1>쿨리닉</H1>
                <H1>결제카드를</H1>
                <H1>등록해주세요</H1>
              </View>
              <View style={{flex:1, alignItems : 'flex-end', justifyContent : 'flex-end'}}>
                <H1 style={{color:'#28c8f5'}}>02</H1>
              </View>
            </View>

            <View style={{flexDirection : 'row'}}>
              <View style={{flex:1}}>
                <View style={{height : 10, backgroundColor : '#28c8f5'}} />
              </View>
              <View style={{flex:1}}>
                <View style={{height : 10, backgroundColor : '#28c8f5'}} />
              </View>
              <View style={{flex:1}}>
               <View style={{height : 10, backgroundColor : '#d6f1ff'}} />
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
  }
});

export default RegCard;
