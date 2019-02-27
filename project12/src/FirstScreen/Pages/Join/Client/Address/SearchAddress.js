import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Container, Button, Body, List, ListItem, Icon, Input, Item, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import DrawMap from '~/Main/Components/DrawMap';
import { Actions } from 'react-native-router-flux';

import GetAddress from '~/Main/Functions/AddressInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class SearchAddress extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      strAddress: '',
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
      showMap : true,
      makerYn : true
    };
  }

  static defaultProps = {
    addressName : '대방동 392-14'
  }

  componentDidMount () {
    this.setState({
      strAddress : this.props.addressName
    })
  }

  // 주소 정보 가져오기
  _setAddressInfo = () => {
    GetAddress(this.state.strAddress).then(result => {
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

  _renderItem = (item) => (
    <ListItem onPress={() => this._onPress(item)}>
        <Text>{item.address_name}</Text>
        {(item.road_address !== null) ? (
          <Text style={styles.greyFont}>{item.road_address.address_name}</Text>
        ) : (
          <Text style={styles.greyFont}>도로명 주소가 없습니다.</Text>
        )}
    </ListItem>
  );

  // 맵 이동 후 좌표 값
  _onRegionChangeComplete = (region) => {
      this.setState({region});
  }

  _onPress = (item) => {
    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: item })
  }
  
  render() {
    return (
    //   <View style={{ flex : 1}}>
    //     <CustomHeader
    //         title="주소 검색"
    //     />
    //     <View style={{ flex : 1, padding: 5 }}>
    //       <View style={{ height : 50 }}>
    //         <Item 
    //           regular 
    //           style={{backgroundColor:'white'}}
    //         >
    //           <Icon active name='search' />
    //           <Input 
    //             placeholder="장소 또는 주소 검색" 
    //             value={this.state.strAddress}
    //             onChangeText={(text) => this.setState({strAddress : text})}
    //             onSubmitEditing={this._setAddressInfo}
    //           /> 
    //         </Item>
    //       </View>
    //       <View>
    //         <List dataArray={this.state.data} renderRow={this._renderItem} />
    //       </View>
    //     </View>
    // </View>
      <Container>
          <DrawMap
            region={ this.state.region }
            onRegionChangeComplete={ this._onRegionChangeComplete }
            makerYn={ this.state.makerYn }
            marker={ this.state.marker }
            showMap={ this.state.showMap }
          />
        
          <View style={[styles.fx1, styles.mg10]}>
            <View style={[styles.fx1]}>
              <Button transparent onPress={Actions.pop}>
                <Icon name="arrow-back" style={{color : color.defaultColor}} />
              </Button>

              <Item 
                regular 
                onPress={ () => this.setState({showMap : !this.state.showMap}) }
                style={{height : 48, backgroundColor : color.whiteColor}}>
                <Input
                  disabled={ this.state.showMap } 
                  value={this.state.strAddress}
                  onChangeText={(text) => this.setState({strAddress : text})}
                  onSubmitEditing={this._setAddressInfo}
                  placeholder="주소입력"
                />

                <TouchableOpacity onPress={this._setAddressInfo}>
                  <Icon name="ios-search" style={{color : color.defaultColor}}/>
                </TouchableOpacity>

                
                <Text style={{color : color.greyColor}}>|</Text>
                <Icon name="ios-close" style={{color : color.greyColor}}/>
              </Item>

              <View>
                <List dataArray={this.state.data} renderRow={this._renderItem} />
              </View>
            </View>


            <View style={styles.footerBtnWrap}>
                <CustomButton
                    onPress={this._nextButton}
                    disabled={ this.state.disSaveBtn }
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

export default SearchAddress;