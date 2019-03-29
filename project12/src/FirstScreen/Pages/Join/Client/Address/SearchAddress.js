import React, { Component } from 'react';
import { Image, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Button, Body, List, ListItem, Icon, Input, Item, Text, Header, Left, Right, Title } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import DrawMap from '~/Main/Components/DrawMap';
import GetAddress from '~/Main/Functions/AddressInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let SELECT_ITEM = null;

class SearchAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      addressName : (this.props.addressName !== null) ? this.props.addressName : '대방동 392-27',
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
      makerYn : true,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  componentWillMount () {
    this._setAddressInfo();
  }

  _renderItem = ({item}) => (
    <ListItem
      style={localStyles.flatListWrapList}
      onPress={() => this._onPress(item)}
    >
      <Body style={localStyles.flatListWrap}>
        <Text style={localStyles.flatListTxt}><Text style={[localStyles.flatListTxt, {color: color.defaultColor}]}>[지번]</Text> {item.address_name}</Text>
          {(item.road_address !== null) ? (
            <Text style={localStyles.flatListTxt}><Text style={[localStyles.flatListTxt, {color: color.defaultColor}]}>[도로]</Text> {item.road_address.address_name}</Text>
          ) : (
            <Text style={[localStyles.flatListTxt, {color: color.greyColor, marginTop: 2}]}><Text style={[localStyles.flatListTxt, {color: color.defaultColor}]}>[도로]</Text> 주소가 없습니다.</Text>
          )}
      </Body>
    </ListItem>
  );

  _emptyRenderItem = () => (
    <ListItem style={localStyles.flatListWrapList}>
      <Body style={[localStyles.flatListWrap, {paddingTop: 20, paddingBottom: 20}]}>
        <Text style={[localStyles.flatListTxt, {color: color.greyColor}]}>검색정보가 없습니다.</Text>
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
           // this.setState({data : resultData.data.documents.filter(address => address !== null)});
          } else {
            this.setState({
              isAlertModal : true,
              resultMsg : resultData.resultMsg
            })
          }
        }
      });
    });
  }


  _onPress = (item) => {
    console.log(item)
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
      },
      addressName : item.address_name
    });

    SELECT_ITEM = item;
  }


  _nextButton = () => {
    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: SELECT_ITEM });
  }
  
  render() {
    return (
      <Container style={styles.Container}>
        <DrawMap
          region={ this.state.region }
          onRegionChangeComplete={ this._onRegionChangeComplete }
          makerYn={ this.state.makerYn }
          marker={ this.state.marker }
          showMap={ this.state.showMap }
        />
        
        <Header style={[styles.header, styles.noPadding, {backgroundColor: "transparent", paddingLeft: 26, paddingRight: 26, borderBottomWidth: 0}]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={Actions.pop}>
              <Image source={require("~/Common/Image/btn_back_arrow.png")} style={styles.btnBackArrowIcon}/>
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{flex:1, paddingLeft: 26, paddingRight: 26, borderWidth: 0}}>
          <Item
            regular
            style={[styles.inputWhBackBuBo, {backgroundColor: color.whiteColor, marginLeft: 0}]}
            onPress={ () => this.setState({showMap : !this.state.showMap})}
          >
            <Input
              placeholder="주소를 입력해 주세요"
              placeholderTextColor={color.inputPlaceHodler}
              style={styles.inputDefaultBox}
              disabled={ this.state.showMap } 
              value={this.state.addressName}
              onChangeText={(text) => this.setState({addressName : text})}
              onSubmitEditing={this._setAddressInfo}
              />
            <Icon 
              active
              name="ios-search"
              style={[styles.inputIcon, {fontSize: 25, marginRight: 0, paddingRight: 0}]}
              onPress={this._setAddressInfo}
            />
            <Icon
              name="ios-close"
              style={[styles.inputIcon, {fontSize: 38, color: "#8e8e98"}]}
            />
          </Item>

          <View style={[(this.state.showMap) ? localStyles.hide : localStyles.show, 
            {
              borderColor : color.inputBoGrey,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 0,
              backgroundColor: color.whiteColor}]}>
            <FlatList 
              data={this.state.data} 
              renderItem={this._renderItem} 
              ListEmptyComponent={this._emptyRenderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={[
              (this.state.showMap) ? localStyles.show : localStyles.hide,
              styles.footerBtnWrap,
              {paddingLeft: 26, paddingRight: 26, paddingBottom: 26}
            ]}>
            <CustomButton
              onPress={this._nextButton}
            >
                확인
            </CustomButton>
        </View>
        {/* alert 메세지 모달 */}
        <CustomModal
          modalType="ALERT"
          isVisible={this.state.isAlertModal}
          onPress={ () => this.setState({isAlertModal : false})}
          infoText={this.state.resultMsg}
          btnText="확인"
        />
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
  },
  flatListTxt: {
    fontSize: 13, color: "#1e1e32"
  },
  flatListWrap: {
    flex: 1, 
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor : color.inputBoGrey,
    width: "100%"
  },
  flatListWrapList: {
    marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, alignItems: "flex-start", flexDirection: "column"
  }
});

export default SearchAddress;