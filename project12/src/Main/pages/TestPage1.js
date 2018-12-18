import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Drawer, Content, Button, Icon, Left, Right, Body, Text, ListItem, List } from 'native-base';

export default class TestPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }


  render() {
    return (
      <Container>
        <Header>
            <Left>
              <Button transparent onPress={ Actions.drawerOpen }>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Headers</Title>
            </Body>
            <Right />

          </Header>
        </Container>
    )
  }
}