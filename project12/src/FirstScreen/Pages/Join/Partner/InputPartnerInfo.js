import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Text,  Item, Input } from "native-base";

import { Actions } from 'react-native-router-flux';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerMaster from '~/FirstScreen/Functions/RegPartnerMaster';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class InputPartnerInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        companyNm : null,
        companyBusinessNum : null,
        ceoNm : null,
        btnDisabled : true
      };
    }

  componentDidMount() {
    this.setState({companyBusinessNum: this.props.data.companyBusinessNum});
  }

  // NEXT : 파트너 제품 선택
  _nextPress = () => {
    this._regPartnerMaster();
  }

  // 사업장 등록 API 호출
  _regPartnerMaster = () => {
    RegPartnerMaster(this.state).then(result => {
      GetCommonData(result, this._regPartnerMaster).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {
            //this.setState({ bizLicense : resultData.companyBusinessNum, btnDisabled : false });
            //Actions.JoinInputProdType();
            Actions.JoinSetPartnerAddress();
          } else {
            alert(resultData.resultMsg);
          }
        }
      });
    });
  }

  render() {
    return (
      // <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
      //   <CustomBasicWrapper
      //     resetPage={ true }
      //     title="사업자정보 입력"
      //   >
      //     <Item regular>
      //       <Input
      //         onChangeText={(text) => this.setState({companyNm : text})}
      //         value={ this.state.companyNm }
      //         placeholder='업체명'
      //       />
      //     </Item>
      //     <Item regular>
      //       <Input
      //         onChangeText={(text) => this.setState({companyBusinessNum : text})}
      //         value={ this.state.companyBusinessNum }
      //         placeholder='사업자 번호'
      //       />
      //     </Item>
      //     <Item regular>
      //       <Input
      //         onChangeText={(text) => this.setState({ceoNm : text})}
      //         value={ this.state.ceoNm }
      //         placeholder='대표명'
      //       />
      //     </Item>

      //     <CustomButton
      //       block={ true }
      //       info={ true }
      //       onPress={ this._nextPress }
      //       // disabled={ this.state.btnDisabled }
      //     >
      //       <Text>
      //         다음단계로 이동 (2/5)
      //       </Text>
      //     </CustomButton>
      //   </CustomBasicWrapper>
      // </KeyboardAvoidingView>
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
                onChangeText={(text) => this.setState({companyNm : text})}
                value={ this.state.companyNm }
                placeholder="업체명" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={[styles.mb20, styles.inputWhBackGreyBo]}>
              <Input 
                onChangeText={(text) => this.setState({companyBusinessNum : text})}
                value={ this.state.companyBusinessNum }
                placeholder="사업자번호 13자리 입력" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
            <Item regular style={styles.inputWhBackGreyBo}>
              <Input 
                onChangeText={(text) => this.setState({ceoNm : text})}
                value={ this.state.ceoNm }
                placeholder="대표자 명" 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputDefaultBox}/>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._nextPress }
              disabled={ this.state.btnDisabled }
              edgeFill={true}
              fillTxt={true}
            >
              등록완료
            </CustomButton>
          </View>
        </View>

      </Container>
    )
  }
}

export default InputPartnerInfo;