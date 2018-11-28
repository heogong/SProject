import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';
import getAddress from '../../functions/AddressInfo';
import Button from '../../../COMMON/components/Button';

class InputAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      strAddress: '대방동',
      data: [
        // { address_name : "서울 동작구 대방동", address_type: "REGION"},
        // { address_name : "경남 사천시 대방동", address_type: "REGION1"},
        // { address_name : "경남 창원시 성산구 대방동", address_type: "REGION2"},
      ]
    };
  }

  _setAddressInfo = () => {
     getAddress(this.state.strAddress).then(result => {
      console.log(result.documents);

      this.setState({data : result.documents});
    });
  }

  _renderItem = ({item}) => {
    return <Text style={styles.row}>{item.address_name}</Text>
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