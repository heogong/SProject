import React, { Component } from 'react';
import { Image, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Container, Button, Body, List, ListItem, Icon, Input, Item, Text, Header, Left, Right, Title } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import DrawMap from '~/Main/Components/DrawMap';
import GetAddress from '~/Main/Functions/AddressInfo';
import GetAddressKakao from '~/Main/Functions/AddressInfoKakao';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let SELECT_ITEM = null;
const FIRST_PAGE_NUM = 1;

class SearchAddress extends Component {
  constructor(props) {
    super(props);

    this.initPageNum = FIRST_PAGE_NUM;
    this.addressInput = null;

    this.state = { 
      addressName : (this.props.addressName !== '' && this.props.addressName != undefined) ? this.props.addressName : '기흥',
      data: {
        juso : []
      },
      data1: [],
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
      resultMsg : null, // alert 용
      spinner: false
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
        <View style={localStyles.flatListTxtWrap}>
          <Text style={localStyles.flatListTxt1}>[지번]</Text><Text style={localStyles.flatListTxt}>{item.jibunAddr}</Text>
        </View>
          {(item.roadAddr !== null && item.roadAddr != '') ? (
            <View style={localStyles.flatListTxtWrap}>
              <Text style={localStyles.flatListTxt1}>[도로]</Text><Text style={localStyles.flatListTxt}>{item.roadAddr}</Text>
            </View>
          ) : (
            <View style={localStyles.flatListTxtWrap}>
              <Text style={localStyles.flatListTxt1}>[도로]</Text><Text style={localStyles.flatListTxt}>주소가 없습니다.</Text>
            </View>
          )}
      </Body>
    </ListItem>
  );

  _emptyRenderItem = () => (
    <ListItem style={localStyles.flatListWrapList}>
      <Body style={[localStyles.flatListWrap, {paddingTop: 20, paddingBottom: 20}]}>
        <Text style={[localStyles.flatListTxt, {color: color.greyColor, paddingLeft: 15}]}>검색정보가 없습니다.</Text>
      </Body>
    </ListItem>
  );

   // 맵 이동 후 좌표 값
   _onRegionChangeComplete = (region) => {
    this.setState({region});
  }

  // 주소 정보 가져오기
  _setAddressInfo = () => {

    this.setState({ spinner: true });

    if(this.state.addressName !== '') {
      GetAddress(this.state.addressName, this.initPageNum).then(result => {
        GetCommonData(result, this._setAddressInfo).then(async resultData => {

          this.setState({ spinner: false });

          if(resultData !== undefined) {
            const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
            console.log(result.data.results);
            if(ResultBool) {
              if(result.data.results.common.totalCount > 0) {
                if(this.initPageNum == 1) {
                // 첫번쨰 페이지 이면
                  // 최초 데이터 SET
                  this.setState({data : result.data.results});
                } else {
                // 첫번쨰 페이지가 아니면
                  // DATA를 Append
                  this.setState({
                    data : {
                      ...this.state.data,
                      juso : this.state.data.juso.concat(result.data.results.juso)
                    }
                  })
                }
                this.initPageNum++; // 페이지 번호 증가
              } else {
                // 목록 초기화
                this.setState({data : []});
                this.initPageNum = 1;
              }
            } else {
              this.setState({
                isAlertModal : true,
                resultMsg : resultData.resultMsg
              })
            }
          }
        });
      });
    } else {
      this.setState({
        isAlertModal : true,
        resultMsg : '주소를 입력해 주세요.'
      })
    }
  }


  _onPress = (item) => {
    /**
     * 위경도 조회를 위하여 카카오 API를 호출
     * 도로명 API Return 값의 roadAddrPart1 값으로 KAKAO API를 호출한다.
     */
    GetAddressKakao(item.roadAddrPart1).then(result => {
      GetCommonData(result, this._onPress).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(item);
          console.log(resultData.data);
          if(ResultBool) {
            // 도로명, 지번주소 변경(도로명 API로)
            resultData.data.documents[0].address.address_name = item.jibunAddr;
            resultData.data.documents[0].road_address.address_name = item.roadAddr;
            resultData.data.documents[0].address_name = item.roadAddr;

            this.setState({
              data1 : resultData.data.documents[0],
              showMap : true,
              region : {
                ...this.state.region,
                latitude : Number(resultData.data.documents.y),
                longitude : Number(resultData.data.documents.x)
              },
              marker: {
                latitude : Number(resultData.data.documents.y),
                longitude : Number(resultData.data.documents.x)
              },
              addressName : item.roadAddr
            });

            // 변화된 Kakao API Object를 셋팅
            SELECT_ITEM = this.state.data1;
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

  _nextButton = () => {
    Actions.pop(); // 뒤로가면서 기존페이지로 이동
    this.props.onResult({ result: SELECT_ITEM });
  }
  
  render() {
    return (
      <Container style={styles.Container}>
        <Spinner
					visible={this.state.spinner}
					textContent={'주소를 불러오고 있습니다.'}
					textStyle={styles.whiteFont}
					style={{ color: color.whiteColor }}
				/>
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
            style={[styles.inputWhBackGreyBo, {backgroundColor: color.whiteColor, marginLeft: 0}]}
            onPress={ () => this.setState({showMap : !this.state.showMap})}
          >
            <Input
              ref={(input) => { this.addressInput = input; }}
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
              onPress={ () => {
                this.addressInput._root.clear(), 
                this.setState({
                  data : [], 
                  addressName : ''
                })
              }}
              style={[styles.inputIcon, {fontSize: 32, color: "#8e8e98"}]}
            />
          </Item>

          <View style={[(this.state.showMap) ? localStyles.hide : localStyles.show, 
            {
              borderColor : "#c9cacb",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              marginBottom: 100,
              backgroundColor: color.whiteColor}]}>
            <FlatList 
              data={this.state.data.juso} 
              renderItem={this._renderItem} 
              ListEmptyComponent={this._emptyRenderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.01}
              onEndReached={this._setAddressInfo}
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
  flatListTxtWrap : {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    flex: 1
  },
  flatListTxt: {
    fontSize: 12, color: "#1e1e32", marginLeft: 0, marginRight: 0, flex: 1
  },
  flatListTxt1: {
    fontSize: 11, marginLeft: 0, marginRight: 0, color: color.defaultColor, width: 35
  },
  flatListWrap: {
    flex: 1, 
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor : "#c9cacb",
    width: "100%"
  },
  flatListWrapList: {
    marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0, alignItems: "flex-start", flexDirection: "column"
  }
});

export default SearchAddress;