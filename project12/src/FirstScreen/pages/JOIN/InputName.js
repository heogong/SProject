import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrNm, setSnsSignYn } from '~/Redux/Actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const USER_NM_LEN = 1;
class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usrNm: '',
      btnDisabled: true
    };
  }
  
  // componentDidMount () {
  //   this.props.onSetSnsSignYn('N');  // 리덕스 SNS 가입여부 SET
  // }

  // 이름 next 버튼 활성화 여부
  _handleChange = (text) => {
    this.setState({usrNm : text})

    if(this.state.usrNm !== '') {
        this.setState({btnDisabled : (this.state.usrNm.length > USER_NM_LEN) ? false : true})
    }
  } 

  _nextButton = () => {
    this.props.onSetUsrNm(this.state.usrNm);  // 리덕스 사용자 이름 SET
    Actions.JoinInputPhone();
  }
  
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Container style={styles.containerInnerPd}>
          <CustomHeader />
          <View style={styles.contentWrap}>
            <View>
              <View style={styles.fxDirRow}>
                <View style={stylesReg.leftGuideTxtWrap}>
                  <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                  <Text style={stylesReg.leftGuideTxt}>성함을</Text>
                  <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                </View>
                <View style={stylesReg.rightStepNumWrap}>
                  <Text style={stylesReg.rightStepNum}>01</Text>
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
              </View>
            </View>
            <View style={[styles.fx3, styles.justiConCenter]}>
              <Item regular style={styles.inputWhBackGreyBo}>
                <Input  
                  onChangeText={ this._handleChange }
                  value={ this.state.text }
                  autoFocus={ true }
                  placeholder="이름을 입력해주세요."
                  placeholderTextColor={color.inputPlaceHodler}
                  style={styles.inputDefaultBox}/>
              </Item>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton 
                onPress={ this._nextButton }
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
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetSnsSignYn: (value) => dispatch(setSnsSignYn(value))
  }
}

InputName = connect(undefined, mapDispatchToProps)(InputName);

export default InputName;