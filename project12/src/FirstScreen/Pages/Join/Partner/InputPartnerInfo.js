import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Text,  Item, Input } from "native-base";

import { Actions } from 'react-native-router-flux';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerMaster from '~/FirstScreen/Functions/RegPartnerMaster';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class InputPartnerInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        companyNm : '',
        companyBusinessNum : '',
        ceoNm : '',
        btnDisabled : true,
        isAlertModal : false, // alert 용
        resultMsg : null // alert 용
      };
    }

  componentDidMount() {
    this.setState({companyBusinessNum: this.props.data.companyBusinessNum});
    this._chkNextBtn();
  }

  // 사업장 등록 API 호출
  _regPartnerMaster = () => {
    RegPartnerMaster(this.state).then(result => {
      GetCommonData(result, this._regPartnerMaster).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {
            Actions.JoinSetPartnerAddress();
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

  // 완료버튼 활성화 여부
  _chkNextBtn = () => {
    const companyNmLen = 2;
    const companyBusinessNumLen = 10;
    const ceoNmLen = 2;

    const { companyNm, companyBusinessNum, ceoNm } = this.state;

    if(companyNm.length >= companyNmLen 
      && companyBusinessNum.length >= companyBusinessNumLen 
      && ceoNm.length >= ceoNmLen ) {
      this.setState({btnDisabled : false});
    } else {
      this.setState({btnDisabled : true});
    }
  }


  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.contentWrap}>

          <View style={styles.mb10}>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                <Text style={stylesReg.leftGuideTxt}>사업자정보를</Text>
                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
              </View>
              <View style={stylesReg.rightStepNumWrap}>
                <Text style={stylesReg.rightStepNum}>06</Text>
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

          <View style={[styles.fx3, styles.justiConCenter]}>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input 
                onChangeText={async (text) => { await this.setState({companyNm : text}), this._chkNextBtn() }}
                value={ this.state.companyNm }
                placeholder="업체명" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input 
                onChangeText={async (text) => { await this.setState({companyBusinessNum : text}), this._chkNextBtn() }}
                value={ this.state.companyBusinessNum }
                placeholder="사업자번호 13자리 입력" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={styles.inputWhBackGreyBo}>
              <Input 
                onChangeText={async (text) => {await this.setState({ceoNm : text}), this._chkNextBtn() }}
                value={ this.state.ceoNm }
                placeholder="대표자 명" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._regPartnerMaster }
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

export default InputPartnerInfo;