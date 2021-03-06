import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, View } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setNoMemberUsrPhoneNum } from '~/Redux/Actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SendSmsCertNum from '~/FirstScreen/Functions/SendSmsCertNum';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const USER_PHONE_LEN = 9; //최소 번호 길이
class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrPhoneNum: '',
      btnDisabled: true
    };
  }

  // 전화번호 next 버튼 활성화 여부
  _handleNumberChange = async (text)  => {
    await this.setState({usrPhoneNum : text})
    this.setState({btnDisabled : (this.state.usrPhoneNum.length > USER_PHONE_LEN) ? false : true})
  } 

  // 인증번호 API 호출
  _getAuthNumber = () => {
    //let phoneNumber = event.nativeEvent.text;
    this.props.onSetNoMemberUsrPhoneNum(this.state.usrPhoneNum); // 리덕스 폰번호 입력

    SendSmsCertNum(this.state.usrPhoneNum).then(async result => {
      console.log(result);
      const ResultBool = await (result.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

      if(ResultBool) {
        // 인증페이지 이동
        Actions.NoMemberInputPhoneAuth({
          smsSendId: result.data.smsSendId, 
          certNum : result.data.certNum
        });
      } else {
        // Toast.show({
        //   text: result.resultMsg,
        //   type: "danger",
        //   buttonText: '확인'
        // })
        Alert.alert(
          '',
          `${result.resultMsg}`,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //{text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '확인', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    })
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Container style={styles.containerInnerPd}>
          <CustomHeader />
          <View style={styles.contentWrap}>
            <View>
              <View style={styles.fxDirRow}>
                <View style={stylesReg.leftGuideTxtWrap}>
                  <Text style={stylesReg.leftGuideTxt}>연락가능한</Text>
                  <Text style={stylesReg.leftGuideTxt}>핸드폰번호를</Text>
                  <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
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
                  <View style={stylesReg.procBarOn} />
                </View>
                <View style={styles.fx1}>
                  <View style={stylesReg.procBarOff} />
                </View>
              </View>
            </View>
            <View style={[styles.fx3, styles.justiConCenter]}>
              <Item regular style={styles.inputWhBackGreyBo}>
                <Input 
                  onChangeText={ this._handleNumberChange }
                  value={this.state.text}
                  onSubmitEditing={this._getAuthNumber}
                  autoFocus={ true }
                  keyboardType='numeric'
                  placeholder="핸드폰번호(하이픈 - 빼고 입력)"
                  placeholderTextColor={color.inputPlaceHodler}
                  style={styles.inputDefaultBox}
                />
              </Item>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={this._getAuthNumber}
                disabled={ this.state.btnDisabled }
                edgeFill={true}
                fillTxt={true}
              >
                입력완료
              </CustomButton>
            </View>
          </View>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetNoMemberUsrPhoneNum: (value) => dispatch(setNoMemberUsrPhoneNum(value))
  }
}
InputPhone = connect(undefined, mapDispatchToProps)(InputPhone);
export default InputPhone;