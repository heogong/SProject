import React, { Component } from 'react';
import { Image, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Button, Body, List, ListItem, Icon, Input, Item, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import DrawMap from '~/Main/Components/DrawMap';
import { Actions } from 'react-native-router-flux';

import GetAddress from '~/Main/Functions/AddressInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let SELECT_ITEM = null;

class SearchAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      addressName : this.props.addressName,
      data: [],
      region: {
        latitude: 37.566535,
        longitude: 126.97796919999996,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
      },
      marker: {
        latitude: 37.566535,
        longitude: 126.97796919999996
      },
      showMap : false,
      makerYn : true
    };
  }

  static defaultProps = {
    addressName : '대방동 392-14'
  }

  componentWillMount () {
    this._setAddressInfo();
  }

  _renderItem = ({item}) => (
    <ListItem 
      style={{marginLeft : 5, marginRight : 5}} 
      onPress={() => this._onPress(item)}
    >
      <Body>
        <Text>{item.address_name}</Text>
        {(item.road_address !== null) ? (
          <Text style={styles.greyFont}>{item.road_address.address_name}</Text>
        ) : (
          <Text style={styles.greyFont}>도로명 주소가 없습니다.</Text>
        )}
      </Body>
    </ListItem>
  );

  _emptyRenderItem = () => (
    <ListItem style={{marginLeft : 5, marginRight : 5}}>
      <Body>
        <Text>검색정보가 없습니다.</Text>
      </Body>
    </ListItem>
  );

   // 맵 이동 후 좌표 값
   _onRegionChangeComplete = (region) => {
    this.setState({region});
  }

  // 주소 정보 가져오기
  _setAddressInfo = () => {
    GetAddress(this.state.addressName).then(result => {
      GetCommonData(result, this._setAddressInfo).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(result.data);
          if(ResultBool) {
            this.setState({data : resultData.data.documents.filter(address => address.address_type !== "REGION")});
          } else {
            alert(resultData.resultMsg);
          }
        }
      });
    });
  }


  _onPress = (item) => {
    this.setState({
      showMap : true,
      region : {
        ...this.state.region,
        latitude : Number(item.y),
        longitude : Number(item.x)
      },
      marker: {
        latitude : Number(item.y),
        longitude : Number(item.x)
      }
    });

    SELECT_ITEM = item;
    
  }


  _nextButton = () => {
    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: SELECT_ITEM });
  }
  
  render() {
    return (
      <Container>
          <DrawMap
            region={ this.state.region }
            onRegionChangeComplete={ this._onRegionChangeComplete }
            makerYn={ this.state.makerYn }
            marker={ this.state.marker }
            showMap={ this.state.showMap }
          />
        
          <View style={[styles.fx1, styles.mg10]}>
            <View style={styles.fx1}>

              <Button transparent onPress={Actions.pop}>
                <Icon name="arrow-back" style={{color : color.defaultColor}} />
              </Button>

              <Item 
                regular 
                onPress={ () => this.setState({showMap : !this.state.showMap}) }
                style={{height : 48, backgroundColor : color.whiteColor, marginLeft : 0}}>

                <Input
                  disabled={ this.state.showMap } 
                  value={this.state.addressName}
                  onChangeText={(text) => this.setState({addressName : text})}
                  onSubmitEditing={this._setAddressInfo}
                  placeholder="주소입력"
                />

                <TouchableOpacity onPress={this._setAddressInfo}>
                  <Icon name="ios-search" style={{color : color.defaultColor}}/>
                </TouchableOpacity>

                
                <Text style={{color : color.greyColor}}>|</Text>
                <Icon name="ios-close" style={{color : color.greyColor}}/>
              </Item>

              <View style={(this.state.showMap) ? localStyles.hide : localStyles.show}>
                <FlatList 
                  data={this.state.data} 
                  renderItem={this._renderItem} 
                  ListEmptyComponent={this._emptyRenderItem}
                  keyExtractor={(item) => item.toString()}
                />
              </View>

            </View>


            <View style={[
              (this.state.showMap) ? localStyles.show : localStyles.hide,
              styles.footerBtnWrap
            ]}>
                <CustomButton
                  onPress={this._nextButton}
                  edgeFill={true}
                  fillTxt={true}
                >
                    확인
                </CustomButton>
            </View>
          </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  hide: {
      display: 'none'
  },
  show: {
      display: 'flex'
  }
});

export default SearchAddress;