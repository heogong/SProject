import React, { Component } from 'react';
import { View } from "react-native"
import { Item, Input, Icon, Text, List, ListItem, Body } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import GetCommonData from '~/Common/Functions/GetCommonData';

import { Actions } from 'react-native-router-flux';
import DrawMap from '../../../../Main/Components/DrawMap';
import GetAddress from '../../../../Main/Functions/AddressInfo';
import GetAddressInfo from '../../../Functions/GetAddressInfo';

let REGION = []; // 드래그 후 좌표 데이터 변수
let RESULT_DATA = [];

class SearchAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      strAddress: '대방동 392-14',
      data: [],
      showMap : false,
      region: {
        latitude: 37.566535,
        longitude: 126.97796919999996,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
      }
    };
  }

  // 초기 데이터 1. 리덕스 값 조회 2. 현재 위치 조회 3. default 값 조회 
  async componentDidMount() {
    if(this.props.addressName !== '') {
      await this.setState({strAddress : this.props.addressName});
      await this._setAddressInfoMap();
    } else {
      this._getLocation();
    }
  }

  _getLocation() {
      navigator.geolocation.getCurrentPosition(
        (positon) => {
          this.setState({
            region : {
              ...this.state.region,
              latitude : positon.coords.latitude,
              longitude : positon.coords.longitude
            }
          })
        },
        (error) => {console.log(error.message)},
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
    );
  }

  _onPress = (item) => {
    //console.log(item);

    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: item })

    //({ result: RESULT_DATA, region : REGION });
  }

  // 지도에서 주소 선택
  _selectMap = () => {
    this.setState({ showMap: true, data:[] });
    //Actions.JoinSearchPartnerMapAddress({onResult : this.props.onResult}) 
  }

  // 지도에서 주소 선택 해제
  _unSelectMap = () => {
    this.setState({ showMap: false });
  }

  // 주소 정보 가져오기 : 주소 정보 리스트 그리기
  _setAddressInfo = () => {
    GetAddress(this.state.strAddress).then(result => {
      //console.log(result.data.documents);

      this.setState({
        //data : result.data.documents.filter(address => address.address_type !== "REGION"),
        data : result.data.documents,
        showMap : false
      })
    })
  }

  // 주소 정보 가져오기 : 초기(주소값이 존재 할 경우) 백단 좌표 그려놓기
  _setAddressInfoMap = () => {
    GetAddress(this.state.strAddress).then(result => {
      this.setState({
        region : {
          ...this.state.region,
          latitude : Number(result.data.documents[0].y),
          longitude : Number(result.data.documents[0].x)
        }
      })
    })
  }

  // 좌표값으로 주소 호출
  // error : this.state 값 변경 시 맵에 좌표값 초기화로 맵 이동 불가 현상 
  _GetAddressInfo = async () => {
    //console.log("_GetAddressInfo");
    GetAddressInfo(this.state.region).then(result => {
      GetCommonData(result, this._GetAddressInfo).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              if(ResultBool) {
                  
                  RESULT_DATA = resultData.data.documents[0];
                  this.setState({
                      strAddress : RESULT_DATA.address.address_name,
                  })
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

  // 맵 이동 후 좌표 값
  _onRegionChangeComplete = async (region) => {
    await this.setState({region});
    this._GetAddressInfo();
  }

  render() {
    return (
      <View style={{ flex : 1}}>
        <CustomHeader
            title="주소 검색"
        />
        <View style={{ flex : 1, padding: 5 }}>
          <DrawMap
            region={ this.state.region }
            onRegionChangeComplete={ this._onRegionChangeComplete }
            makerYn={ false }
            showMap={ this.state.showMap }
          /> 
          <View style={ {height : 50} }>
            <Item 
              regular 
              onPress={ this._unSelectMap }
              style={{backgroundColor:'white'}}
            >
              <Icon active name='search' />
              <Input
                disabled={ this.state.showMap }
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
            { (this.state.showMap) ? (
            <CustomButton
              styleWidth={ false }
              full={ true }
              dark={ true }
              bordered={ true }
              icon={ true }
              onPress={() => this._setAddressInfo()} >
                <Icon name='md-checkmark-circle-outline' />
                <Text style={{ color: 'black'}}>주소 선택 하기</Text>
            </CustomButton>
            ) : (
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
            )}

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