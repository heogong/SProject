import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceHistory from '~/Main/Functions/GetAfterServiceHistory'
import GetBizList from '~/Main/Functions/GetBizList';
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
  _delBusiness = () => {
    
    this.setState({ 
      data: this.state.data.filter((s, sidx) => SELECT_IDX !== sidx),
      isModalVisible : false
    })
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.contentWrap}>
          <View style={styles.fx1}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                <Text style={stylesReg.leftGuideTxt}>사업장정보를</Text>
                <Text style={stylesReg.leftGuideTxt}>추가해주세요</Text>
              </View>
            </View>

          </View>

          <ScrollView
            horizontal={true}
            pagingEnabled={false} // animates ScrollView to nearest multiple of it's own width
            showsHorizontalScrollIndicator={true}>

            {this.state.data.map((business, idx) =>
              <View 
                key={idx}
                style={localStyles.placeBoxWrap}>

                {(this.state.data.length > LEAST_COUNT) ? (
                  <TouchableOpacity onPress={ () => {this._toggleModal(), SELECT_IDX=idx} } style={localStyles.closeIconWrap}>
                    <Image source={require('~/Common/Image/card_delete_2.png')} resizeMode="contain" style={localStyles.closeIconImg}/>
                  </TouchableOpacity>
                ) : (<View style={[localStyles.closeIconWrap, localStyles.closeIconImg]}/>
                )}

                <View style={localStyles.prdImgWrap}>
                  <Image source={require('~/Common/Image/product/01_icon_white.png')} style={localStyles.prdImg}/>
                </View>
                <TouchableOpacity onPress={ () => alert("사업장 등록")}>
                  <View style={localStyles.txtWrap}>
                    <Text style={localStyles.placeNameTxt}>{business.bplaceNm}</Text>
                    <View style={localStyles.infoTxtWrap}>
                      {/* <Text style={localStyles.infoTxt}>{business.addr.addressName}</Text>
                      <Text style={localStyles.infoTxt}>{business.detail.detailAddr1}</Text> */}
                      <Text style={localStyles.infoTxt}>test</Text>
                      <Text style={localStyles.infoTxt}>test</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            </View>
            )}
          </ScrollView>

          <View style={styles.footerBtnWrap}>
            <CustomButton onPress={Actions.MyRegBusinessPlace}>
              사업장 추가하기
            </CustomButton>
          </View>

        </View>

        <CustomModal
            modalType="CONFIRM"
            isVisible={this.state.isModalVisible}
            onPress1={this._toggleModal}
            onPress2={this._delBusiness}
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
    height: 284,
    marginRight: 12
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
    marginBottom: 20
  },
  infoTxtWrap: {
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 14,
    color: color.whiteColor
  },
  closeIconImg: {
    width: 24,
    height: 24
  },
  closeIconWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginTop: 14
  }
});

export default ListBusinessPlace;
