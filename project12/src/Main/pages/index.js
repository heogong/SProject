import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";

import CustomHeader from '~/Common/Components/CustomHeader';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    };
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener
  }

  handleBackPress = () => {
    return false;
  }

  render() {
    return (
        <View style={{ flex : 1, flexDirection: 'column'}}>
            <CustomHeader
                title='메인'
                backBtn={ false }
                menuBtn={ true }
            />
            <View style={{ flex : 1, backgroundColor : 'powderblue'}}>
                <Text>컨텐츠1</Text>
            </View>
            <View style={{ flex : 2, backgroundColor : 'skyblue'}}>
                <Text>컨텐츠2</Text>
            </View>
            <View style={{ flex : 3, backgroundColor : 'steelblue'}}>
                <Text>컨텐츠3</Text>
            </View>
        </View>
    )
  }
}
