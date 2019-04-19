import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native'
import { Container, H1, H2, Text } from "native-base";

import {SUCCESS_RETURN_CODE} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetBizPlace from '~/Main/Functions/GetBizPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class SetBusinessPlace extends Component {
  constructor(props) { 
    super(props); 

    this.state = {
      data : {
        addr : {
          addressName : null
        },
        detail : {
          detailAddr1 : null
        }
      }
    };
  }

  componentDidMount () {
    this._getBizPlace();
  }

  // 사업장 가져오기
  _getBizPlace = () => {
    GetBizPlace(this.props.value.bizId).then(async result => {
        GetCommonData(result, this._getBizPlace).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
                if(ResultBool) {
                    this.setState({data : resultData.data});
                } else {
                  alert(resultData.resultMsg);
                }
            }
        });
    });
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader resetPage={true}/>

        <View style={styles.contentWrap}>

          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>사업장</Text>
                <Text style={stylesReg.leftGuideTxt}>정보등록이</Text>
                <Text style={stylesReg.leftGuideTxt}>완료되었어요</Text>
              </View>
              <View style={stylesReg.rightImgWrap}>
                <Image source={require('~/Common/Image/input-able.png')} />
              </View>
            </View>
           
            <View style={{marginTop: 22, marginBottom: 23}}>
              <Text style={localStyles.topTxt}>사업장 정보가 제대로 입력되었나요?</Text>
              <Text style={localStyles.topTxt}>이제A/S 받을 제품의 정보를 등록해주세요.</Text>
            </View>
          </View>

          <View style={localStyles.placeBoxWrap}>
            <View style={localStyles.btnPlusWrap}>
              <Image source={require('~/Common/Image/company_illust.png')} style={localStyles.btnPlus} />
            </View>
            <View style={localStyles.txtWrap}>
              <Text style={localStyles.placeNameTxt}>{this.state.data.bplaceNm}</Text>
              <View style={localStyles.infoTxtWrap}>
                <Text style={localStyles.infoTxt}>{this.state.data.addr.addressName}</Text>
                <Text style={localStyles.infoTxt}>{this.state.data.detail.detailAddr1}</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={Actions.ClientMain}
              DefaultLineBtn={true}
              CustomBtnStyle={styles.mb5}
            >
              메인화면으로
            </CustomButton>
            <CustomButton
                onPress={Actions.InputProdType}
            >
                제품등록하러가기
            </CustomButton>
          </View>
        </View>
          
      </Container>
    )
  }
}

function wp (percentage) {
  const value = (percentage * (viewportWidth - 60)) / 100;
  return Math.round(value);
}

const imageSize = wp(35);

const localStyles = StyleSheet.create({
  topTxt: {
    fontSize: 14,
    color: "#8e8e98"
  },
  placeBoxWrap: {
    width : '100%',
    backgroundColor : color.defaultColor,
    flex: 1,
    marginBottom: 16,
    justifyContent: "center"
  },
  btnPlusWrap: {
    alignItems : 'center',
    justifyContent:'center',
    marginBottom: 16
  },
  btnPlus: {
    width: imageSize,
    height: imageSize
  },
  txtWrap: {
    alignItems : 'center'
  },
  placeNameTxt: {
    color: color.whiteColor,
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 16
  },
  infoTxtWrap: {
    alignItems : 'center'
  },
  infoTxt: {
    fontSize: 15,
    color: color.whiteColor,
    textAlign: "center"
  }
});

let mapStateToProps = (state) => {
  return {
      value: state.BIZ
  };
}

SetBusinessPlace = connect(mapStateToProps, undefined)(SetBusinessPlace);
export default SetBusinessPlace;