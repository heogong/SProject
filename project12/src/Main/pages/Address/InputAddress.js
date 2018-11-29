import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import getAddress from '../../functions/AddressInfo';
import Button from '../../../COMMON/components/Button';

class InputAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      strAddress: '대방동 392-14',
      data: []
    };
  }

  _setAddressInfo = () => {
     getAddress(this.state.strAddress).then(result => {
      console.log(result.documents);

      this.setState({data : result.documents});
    });
  }

  _renderItem=({item}) => (
    <TouchableHighlight
      onPress={() => this._onPress(item)}>
      <View style={{backgroundColor: 'white'}}>
        <Text>{item.address_name}</Text>
      </View>
    </TouchableHighlight>
  )

  _onPress = (item) => {
    Actions.SelectMapAddress({addressInfo : item});
    //console.log(item);
  }
  
  render() {
    return (
      <View style={{margin: 128}}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({strAddress : text})}
          value={this.state.strAddress}
        />

        <Button onPress={this._setAddressInfo}>
          <Text>
              검색
          </Text>
        </Button>

        <FlatList data={this.state.data} renderItem={this._renderItem}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: { fontSize:24, padding: 42, borderWidth: 1, borderColor: "#DDDDDD" }
});

export default InputAddress;