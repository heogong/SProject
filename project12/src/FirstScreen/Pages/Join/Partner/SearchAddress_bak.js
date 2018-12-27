import React, { Component } from 'react';
import { View } from "react-native"

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
  Body,
  Right,
  Left
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import DrawMap from '../../../../Main/Components/DrawMap';
import GetAddress from '../../../../Main/Functions/AddressInfo';
import CustomHeader from '../../../../Common/Components/CustomHeader';
import CustomButton from '../../../../Common/Components/CustomButton';

class SearchAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      strAddress: '대방동 392-14',
      data: []
    };
  }

  // 주소 정보 가져오기
  _setAddressInfo = () => {
    GetAddress(this.state.strAddress).then(result => {
      console.log(result.data.documents);

      this.setState({data : result.data.documents.filter(address => address.address_type !== "REGION")});
    });
  }

  _renderItem = (item) => (
    <ListItem onPress={() => this._onPress(item)}>
      <Body>
        <Text>{item.address_name}</Text>
        {(item.road_address !== null) ? (
          <Text note>{item.road_address.address_name}</Text>
        ) : (
          <Text note>도로명 주소가 없습니다.</Text>
        )}
      </Body>
    </ListItem>
  );

  _onPress = (item) => {
    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: item })
  }

  _selectMap = () => {
    Actions.JoinSearchPartnerMapAddress({onResult : this.props.onResult}) 
  }

  _unSelectMap = () => {
    this.setState({ showMap: false });
  }


  
  render() {
    return (
      <View style={{ flex : 1}}>
        <CustomHeader
            title="주소 검색"
        />
        <View style={{ flex : 1, padding: 5 }}>
          <View style={ {height : 50} }>
            <Item 
              regular 
              style={{backgroundColor:'white'}}
            >
              <Icon active name='search' />
              <Input
                placeholder="장소 또는 주소 검색" 
                value={this.state.strAddress}
                onChangeText={(text) => this.setState({strAddress : text})}
                onSubmitEditing={this._setAddressInfo}
              > 
                  {this.state.addressName} 
              </Input>
            </Item>
          </View>
          <View>
            <CustomButton
              styleWidth={ false }
              full={ true }
              dark={ true }
              bordered={ true }
              icon={ true }
              onPress={() => this._selectMap()} >
                <Icon name='md-map' />
                <Text style={{ color: 'black'}}>지도로 지정하기</Text>
            </CustomButton>
          </View>
          <View>
            <List dataArray={this.state.data} renderRow={this._renderItem} />
          </View>
        </View>
      </View>
    )
  }
}

export default SearchAddress;