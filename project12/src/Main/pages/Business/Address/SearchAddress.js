import React, { Component } from 'react';
import { View } from 'react-native';
import { Body, List, ListItem, Icon, Input, Item, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetAddress from '../../../Functions/AddressInfo';
import GetCommonData from '../../../../Common/Functions/GetCommonData';
import CustomHeader from '../../../../Common/Components/CustomHeader';

class InputAddress extends Component {
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
      GetCommonData(result, this._setAddressInfo).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          if(ResultBool) {
            console.log(result.data.documents);
            this.setState({data : resultData.data.documents.filter(address => address.address_type !== "REGION")});
          } else {
            alert(resultData.resultMsg);
          }
        }
      });
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
  
  render() {
    return (
      <View style={{ flex : 1}}>
        <CustomHeader
            title="주소 검색"
        />
        <View style={{ flex : 1, padding: 5 }}>
          <View style={{ height : 50 }}>
            <Item 
              regular 
              onPress={this._handleBackButton}
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
            <List dataArray={this.state.data} renderRow={this._renderItem} />
          </View>
        </View>
    </View>
    )
  }
}

export default InputAddress;