import React, { Component } from 'react';
import{ Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text } from "native-base";

import { Actions } from 'react-native-router-flux';
import CustomHeader from '~/Common/Components/CustomHeader';

class BusinessCard extends Component {
  constructor(props) { 
    super(props); 

    this.state = {};
  }

  static defaultProps = {
    index: null,
    businessName: '+',
    address1: '주소',
    address2: ''
    }

  render() {
      return (
        <Card key={this.props.index}>
          <CardItem style={styles.itemColor}></CardItem>
          <CardItem cardBody style={styles.itemColor}>
            <View style={{ flex:1, justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}} >
                <TouchableOpacity
                    onPress={this.props.btnAction}
                >
                    <View style={styles.slide}>
                        <Text style={styles.title}>{this.props.businessName}</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.itemColor}>
            <View>
              <Text>{ this.props.address1 }</Text>
              <Text>{ this.props.address2 }</Text>
            </View>
          </CardItem>
        </Card>
      );
  }
}

const styles = StyleSheet.create({
    slides: { backgroundColor: '#F5FCFF'},
    slide: { 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 100,
        width: 100,
        backgroundColor: '#ffffff'
      },
    title: { color: 'black', fontSize: 20 },
    itemColor : {
      backgroundColor:'#eaeaea',
    }
});
export default BusinessCard;