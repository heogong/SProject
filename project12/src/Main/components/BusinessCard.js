import React, { Component } from 'react';
import{ Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text } from "native-base";

import { Actions } from 'react-native-router-flux';
import CustomButton from '~/Common/Components/CustomButton';

class BusinessCard extends Component {
  constructor(props) { 
    super(props); 

    this.state = {};
  }

  static defaultProps = {
    index: null,
    businessName: '+',
    address1: '주소',
    address2: '',
    editDel: false
  }

  render() {
      return (
        <Card key={this.props.index}>
            {(this.props.editDel) ? (
              <CardItem style={styles.itemColor}>
                <CustomButton
                  block={ true }
                  info={ true }
                  bordered={ true }
                  onPress={this.props.btnEditAction}
                  widthSize={100}>
                  <Text>수정</Text>
                </CustomButton>
                <CustomButton
                  block={ true }
                  info={ true }
                  bordered={ true }
                  onPress={this._cardRegister}
                  widthSize={100}>
                  <Text>삭제</Text>
                </CustomButton>
              </CardItem>
            ) : (
              <CardItem style={styles.itemColor}></CardItem>
            )}
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