import React, { Component } from 'react';
//import { View, Text, TextInput, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { 
  Container, 
  Header, 
  Item, 
  Input, 
  Icon, 
  Button, 
  Text, 
  Content, 
  List, 
  ListItem,
  Body
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import getAddress from '../../functions/AddressInfo';
//import Button from '../../../COMMON/components/Button';

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

  // _renderItem=({item}) => (
  //   <TouchableHighlight
  //     onPress={() => this._onPress(item)}>
  //     <View style={{backgroundColor: 'white'}}>
  //       <Text>{item.address_name}</Text>
  //     </View>
  //   </TouchableHighlight>
  // )

  _renderItem = (item) => (
    <ListItem onPress={() => this._onPress(item)}>
      <Body>
        <Text>{item.address_name}</Text>
        <Text note>{(item.road_address != null) ? item.road_address.address_name : ''}</Text>
      </Body>
    </ListItem>
  );

  _onPress = (item) => {
    //Actions.SelectMapAddress({addressInfo : item});
    Actions.popTo('SetAddress', {addressInfo: item} ); // 뒤로가면서 기존페이지로 이동하는 듯;;
    this.props.onResult({ addressInfo: item })
  }
  
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input 
              placeholder="장소 또는 주소 검색" 
              value={this.state.strAddress}
              onChangeText={(text) => this.setState({strAddress : text})}
              onSubmitEditing={this._setAddressInfo}
              />
          </Item>
        </Header>
        {/* <Button onPress={this._setAddressInfo}>
          <Text>Search</Text>
        </Button> */}
        <Content>
          <List dataArray={this.state.data} renderRow={this._renderItem} />
        </Content>
      </Container>
    )
  }
}

export default InputAddress;