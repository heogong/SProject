import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId } from '~/Redux/Actions';

import GetBizList from '~/Main/Functions/GetBizList';
import DelBusinessPlace from '~/Main/Functions/DelBusinessPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const LEAST_COUNT = 1; // 사업장 정보 최소 카운트
let SELECT_IDX = null; // 사업장 인덱스 값

class ListBusinessPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      isModalVisible: false,
      isAlertModal : false, // alert 용
      resultMsg : null // alert 용
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  componentDidMount() {
    this._getBizList();
  }

  // 사업장 목록 가져오기
  _getBizList = () => {
    GetBizList().then(async result => {
        GetCommonData(result, this._getBizList).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log("클라이언트 : 사업장 목록 가져오기", resultData);
                if(ResultBool) {
                  this.setState({data : resultData.data});
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


   // 사업장 삭제
   _delBusinessPlace = () => {
    const {data} = this.state;

    DelBusinessPlace(data[SELECT_IDX].clientBplaceId).then(async result => {
        GetCommonData(result, this._delBusinessPlace).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                if(ResultBool) {
                  this.setState({ 
                    data: this.state.data.filter((s, sidx) => SELECT_IDX !== sidx),
                    isModalVisible : false
                  })
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


  // 메인페이지 이동 
  _goToMain = () => {
    Actions.ResetMain({client : true});
  } 

  render() {
    return (
      <Container style={styles.containerSlide}>
        <CustomHeader customAction={this._goToMain} customStyle={{paddingLeft: 26}} />

        <View style={styles.contentWrap}>
          <View style={{marginBottom: 21, paddingLeft: 26}}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>등록한</Text>
                <Text style={stylesReg.leftGuideTxt}>사업장을</Text>
                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
              </View>
            </View>
          </View>
          <View style={{height: 300}}>
            <ScrollView
              horizontal={true}
              pagingEnabled={false} // animates ScrollView to nearest multiple of it's own width
              showsHorizontalScrollIndicator={true}
              style={{paddingLeft: 26, paddingRight: 26}}>

              {this.state.data.map((business, idx) =>
                <TouchableOpacity 
                  key={idx} 
                  onPress={ async () => {
                    await this.props.onSetBizId(business.clientBplaceId); // 사업장 ID 리덕스 SET  
                    Actions.MyListBusinessProductType({ 
                      bizId : business.clientBplaceId
                  }) } }
                  style={localStyles.placeBoxWrap}
                  >
                  <View>
                      <View style={localStyles.closeIconWrap}>

                        {(this.state.data.length > LEAST_COUNT) ? (
                          <TouchableOpacity onPress={() => {
                            SELECT_IDX = idx,
                            this._toggleModal()
                          }} >
                            <Image source={require('~/Common/Image/card_delete_2.png')} resizeMode="contain" style={localStyles.closeIconImg}/>
                          </TouchableOpacity>
                        ) : (
                          <View style={localStyles.closeIconImg}/>
                        )}
                          <TouchableOpacity 
                            onPress={ async () => {
                              await this.props.onSetBizId(business.clientBplaceId); // 사업장 ID 리덕스 SET  
                              Actions.MyRegBusinessPlace({
                                editBiz : true,
                                refreshAction : this._getBizList
                              }) 
                            }} 
                          >
                            <Image source={require('~/Common/Image/card_mod_2.png')} resizeMode="contain" style={localStyles.closeIconImg}/>
                          </TouchableOpacity>
                      </View>

                      <View style={localStyles.prdImgWrap}>
                        <Image source={require('~/Common/Image/company_illust.png')} style={localStyles.prdImg}/>
                      </View>
                            
                      <View style={localStyles.txtWrap}>
                        <Text style={localStyles.placeNameTxt} numberOfLines={1}>{business.bplaceNm}</Text>
                        <View style={localStyles.infoTxtWrap}>
                          <Text style={localStyles.infoTxt}>
                            {(business.addr != null || business.road != null ?
                              (business.road != null ? business.road.addressName : business.addr.addressName)
                              : "[사업자 주소를 등록해주세요.]")} {(business.detail != null ? business.detail.detailAddr1 : "[상세주소를 입력해주세요.]")}
                          </Text>
                        </View>
                      </View>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          <View style={[styles.footerBtnWrap, {flex: 1, paddingRight : 26, paddingLeft: 26}]}>
            <View style={styles.footerBtnWra}>
                <CustomButton 
                    onPress={Actions.MyRegBusinessPlace}
                    DefaultLineBtn={true}
                >
                    사업장 추가하기
                </CustomButton>
            </View>
          </View>

        </View>

        <CustomModal
            modalType="CONFIRM"
            isVisible={this.state.isModalVisible}
            onPress1={this._toggleModal}
            onPress2={this._delBusinessPlace}
            infoText1="등록하신 사업장 정보를 삭제할까요?"
            infoText2={null}
            btnText1="취소"
            btnText2="삭제"
        />

        {/* alert 메세지 모달 */}
        <CustomModal
            modalType="ALERT"
            isVisible={this.state.isAlertModal}
            onPress={ () => this.setState({isAlertModal : false})}
            infoText={this.state.resultMsg}
            btnText="확인"
        />

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  placeBoxWrap: {
    backgroundColor : color.defaultColor,
    width: 280,
    marginRight: 12,
    marginBottom: 26,
    height: 300
  },
  prdImgWrap: {
    alignItems : 'center',
    justifyContent:'center',
    marginBottom: 23
  },
  prdImg: {
    width: 120,
    height: 120
  },
  txtWrap: {
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  infoTxtWrap: {
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 14,
    color: color.whiteColor,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  closeIconImg: {
    width: 24,
    height: 24
  },
  closeIconWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 14,
    width: "100%"
  }
});

let mapDispatchToProps = (dispatch) => {
  return {
      onSetBizId: (value) => dispatch(setBizId(value))
  }
}

ListBusinessPlace = connect(undefined, mapDispatchToProps)(ListBusinessPlace);

export default ListBusinessPlace;
