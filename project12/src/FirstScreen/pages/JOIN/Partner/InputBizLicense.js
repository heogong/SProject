import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon,Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerBizLicense from '~/FirstScreen/Functions/RegPartnerBizLicense';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class InputBizLicense extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizLicense : '',
          btnDisabled : true,
          avatarSource : null,
          isAlertModal : false, // alert 용
          resultMsg : null // alert 용
      };
    }

  // NEXT : 파트너 제품 선택
  _nextPress = () => {
    this._regBizLicense();
  }

  // 사업자등록증 API 호출
  _regBizLicense = () => {
    RegPartnerBizLicense(this.state.avatarSource.uri).then(result => {
      GetCommonData(result, this._regBizLicense).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {
            Actions.JoinInputPartnerInfo({data : resultData.data});
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

  render() {
    return (
        <Container style={styles.containerInnerPd}>
          <CustomHeader resetPage={true}/>

          <View style={styles.contentWrap}>

            <View>
              
              <View style={styles.fxDirRow}>
                <View style={stylesReg.leftGuideTxtWrap}>
                  <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                  <Text style={stylesReg.leftGuideTxt}>사업자등록증을</Text>
                  <Text style={stylesReg.leftGuideTxt}>등록해주세요</Text>
                </View>
                <View style={stylesReg.rightStepNumWrap}>
                  <Text style={stylesReg.rightStepNum}>02</Text>
                </View>
              </View>

              <View style={stylesReg.procBarWrap}>
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOff} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
                <View style={styles.fx1}>
                <View style={stylesReg.procBarOff} />
                </View>
              </View>
              
            </View>

            <TouchableOpacity 
              onPress={Actions.JoinTakeBizLicense}
              style={localStyles.photoBoxWrap}>
              <View style={localStyles.photoBox}>
                <Image source={require("~/Common/Image/camera_icon.png")} resizeMode="contain" style={localStyles.phototIconImg}/>
                <Text style={localStyles.photoTxt}>등록하기</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.footerBtnWrap, {marginTop: 16}]}>
              <CustomButton 
                onPress={ this._nextButton }
                disabled={ this.state.btnDisabled }
              >
                등록완료
              </CustomButton>
            </View>
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
  photoBoxWrap: {
    flex: 5,
    borderColor : "#c9cacb",
    borderWidth : 1,
    marginTop: 18
  },
  photoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  phototIconImg: {
    width: 40,
    height: 40
  },
  photoTxt: {
    fontSize: 16,
    color: color.defaultColor,
    fontWeight: "bold"
  }
});

export default InputBizLicense;