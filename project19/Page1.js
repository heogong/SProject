import React, { Component } from "react";
import { StyleSheet, View } from 'react-native'
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
  Body,
  Text,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

class Header2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: true,
      checkBox : true
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <View style={styles.mb15}>
            <H1>Header One</H1>
            <H2>Header Two</H2>
            <H3>Header Three</H3>
            <Text>Default</Text>
          </View>

          <View style={styles.mb15}>
            <CheckBox checked={this.state.checkBox} color='#28c8f5' onPress={ 
              () => this.setState({
                checkBox : (this.state.checkBox) ? false : true
              });
            }/>
          </View>

          <Button block info style={styles.mb15}>
            <Text>Info</Text>
          </Button>

          <Button block info bordered style={styles.mb15}>
            <Text>Info</Text>
          </Button>

          <Button info style={styles.mb15}>
            <Text>Info</Text>
          </Button>

          <Button info bordered style={styles.mb15}>
            <Text>Info</Text>
          </Button>

          <Form>
            <Item regular style={styles.mb15}>
              <Input placeholder="Regular Textbox" />
            </Item>
            <Item regular style={[styles.mb15, {borderColor : '#28c8f5'}]}>
              <Input placeholder="Regular Textbox" />
            </Item>
            <Item regular style={styles.mb15}>
              <Icon active name="home" style={{color:'#dbdbe9'}}/>
              <Input placeholder="Regular Textbox" />
            </Item>
            <Item regular style={styles.mb15}>
              <Input placeholder="Textbox with Success Input" />
              <IconNB name="ios-checkmark-circle" style={{color:'#28c8f5'}}/>
            </Item>
          </Form>
        </Content>

        <Footer>
          <FooterTab>
            <Button vertical active={this.state.tab1} onPress={() => alert("tab1")}>
              <Icon active={this.state.tab1} name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical active={this.state.tab2} onPress={() =>  alert("tab2")}>
              <Icon active={this.state.tab2} name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active={this.state.tab3} onPress={() =>  alert("tab4")}>
              <Icon active={this.state.tab3} name="contact" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb15: {
    marginBottom: 20
  },
});

export default Header2;