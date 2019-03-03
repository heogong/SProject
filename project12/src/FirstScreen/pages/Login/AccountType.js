import React, { Component } from 'react';
import { AsyncStorage, Alert, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  Icon,
  Text,
  Item,
  Input,
  CheckBox
} from "native-base";
// import { CheckBox } from 'react-native-elements'

import { SUCCESS_RETURN_CODE, CLIENT_USER } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrPw, setAccessToken, setRefreshToken } from '~/Redux/Actions';

import NaverLogin from '../../Components/NaverLogin';
import KakaoLogin from '../../Components/KakaoLogin';

import Login from '~/FirstScreen/Functions/Login';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';


const USR_EMAIL_LEN = 10;
const USR_PASSWD_LEN = 1;

class AccountType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrId: '', 
      usrPw: '',
      btnDisabled: true,
      checkBox : false
    };
  }

  // 아아디(이메일) next 버튼 활성화 여부
  _handleEmailChange = async (text) => {
    await this.setState({usrId : text})

    if(this.state.usrPw !== '') {
        this.setState({btnDisabled : (this.state.usrId.length > USR_EMAIL_LEN) ? false : true})
    }
  } 

  // 비밀번호 next 버튼 활성화 여부
  _handlePasswdChange = async (text) => {
    await this.setState({usrPw : text})

    if(this.state.usrId !== '') {
        this.setState({btnDisabled : (this.state.usrPw.length > USR_PASSWD_LEN) ? false : true})
    }
  }

  // 이메일 로그인 프로세스
  async _login() {
    await this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET (await 절차식으로 진행)
    await this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET (await 절차식으로 진행)

    Login(this.props.value, undefined).then(async result => {
      console.log(result);
      const ResultBool = await (result.error) ? false : true; // API 결과 여부 확인

      // 로그인 성공
      if(ResultBool) {
        // 메인 페이지 이동

        this.props.onSetUsrId(this.state.usrId);  // 리덕스 사용자 ID SET 
        this.props.onSetUsrPw(this.state.usrPw);  // 리덕스 사용자 비밀번호 SET

        this.props.onSetAccessToken(result.access_token); // 리덕스 액세스 토큰 SET
        this.props.onSetRefreshToken(result.refresh_token); // 리덕스 갱신 토큰 SET

        await AsyncStorage.setItem('AccessToken', result.access_token); // AsyncStorage 토큰 저장
        await AsyncStorage.setItem('RefreshToken', result.refresh_token); // AsyncStorage 갱신 토큰 저장

        this._getUserInfo();

      } else {
        Alert.alert(
          '',
          `${result.resultMsg} - 회원가입 페이지로 이동하시겠습니까?`,
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: '네', onPress: () => Actions.JoinCustomerType()},
          ],
          { cancelable: false }
        )
      }
    });
  }

  // 로그인(토큰값 가져온) 사용자 정보 가져오기
  _getUserInfo = () => {
    GetUserInfo().then(async result => {
      GetCommonData(result, this._getUserInfo).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

              if(ResultBool) {
                // 클라이언트 사용자
                if(resultData.data.usrTypeCd == CLIENT_USER) {
                  Actions.ClientMain();
                } else { // 파트너 사용자
                  Actions.PartnerMain();
                }
              }
          }
      });
    });
  }

  render() {
    const loginYn = true; // 진입 경로(로그인/회원가입) 확인

    return (
      //   <CustomButton
      //     block={ true }
      //     info={ true }
      //     bordered={ true }
      //     onPress={Actions.LoginInputAccount}>
      //     <Text>
      //     이메일 로그인
      //     </Text>
      //   </CustomButton>

      // </CustomBasicWrapper>

      // <KeyboardAvoidingView style={{ flex:1 }} behavior="padding" enabled>
      <Container style={styles.containerInnerPd}>
        <CustomHeader />
        <View style={styles.fx1}>

          <View style={[styles.fx1, styles.alignItemsCenter]}>
            <Image source={require('~/Common/Image/logo-partner.png')} resizeMode='contain' style={{height : logoHeight}} />
            <Text>이미지변경 필요</Text>
          </View>
          <View 
            style={[
            styles.fx2, 
            styles.alignItemsCenter, 
            styles.pd20, {
              backgroundColor : color.defaultColor
            }]}>
              <Item regular style={[styles.mb10, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 48}]}>
                <Icon name="mail" style={{color : color.greyColor}} />
                <Input 
                  onChangeText={ this._handleEmailChange }
                  value={ this.state.text }
                  autoFocus={ false }
                  placeholder="이메일" 
                  placeholderTextColor="#777" 
                  fontSize="14"
                />
              </Item>

              <Item regular style={[styles.mb10, {backgroundColor: color.whiteColor, borderColor : color.whiteColor, height : 48}]}>
                <Icon active name="lock" style={{color : color.greyColor}} />
                <Input 
                  secureTextEntry={ true }
                  onChangeText={ this._handlePasswdChange }
                  value={ this.state.text }
                  placeholder="비밀번호(영문,숫자,특수문자8-15자)" 
                  placeholderTextColor="#777" 
                  fontSize="14" 
                />
              </Item>


            <View style={[styles.fxDirRow, styles.mb10]}> 
              <View style={{width : '25%'}}>
                <View style={styles.fxDirRow}>
                {/* <CheckBox
                  title="자동로그인"
                  containerStyle={[styles.noBackNBorderColor, styles.noPadding, styles.noMargin]}
                  textStyle={{fontSize: 14}}
                  checkedIcon={<Image source={require("~/Common/Image/btn_check_box_on.png")} />}
                  uncheckedIcon={<Image source={require("~/Common/Image/btn_check_box_off.png")} />}
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}
                /> */}
                <Text style={{paddingLeft : '15%', color: color.defaultColor, fontSize : 13}}>자동로그인</Text>
                </View>
              </View>
              <View style={[styles.alignItemsEnd, {width : '75%'}]}>
                <TouchableOpacity onPress={ () => alert("아이디와 비밀번호를 잊으셨나요?")}>
                  <Text style={{color: color.whiteColor, fontSize : 13}}>아이디와 비밀번호를 잊으셨나요?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.fxDirRow, styles.justiConBetween, styles.mb20]}>
              <View style={[styles.fx1, {marginRight : 5}]}>
                <CustomButton edgeFill={true} whiteFill={true} fillTxt={true} onPress={Actions.JoinAccountType}>
                  회원가입
                </CustomButton>
              </View>
              <View style={[styles.fx1, {marginLeft : 5}]}>
                <CustomButton onPress={() => this._login()}>
                  로그인
                </CustomButton>
              </View>
            </View>

            <View>
              <Text style={[styles.mb10, {color:color.whiteColor}]}>SNS LOGIN</Text>

              <View style={[styles.fxDirRow, styles.alignItemsCenter]}>

                <View style={[styles.fx1, {marginRight : 10}]}>
                  <NaverLogin loginYn={ loginYn }/>
                </View>
                
                <View style={[styles.fx1, {marginLeft : 10}]}>
                  <KakaoLogin loginYn={ loginYn }/>
                </View>

              </View>
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

const layoutCount = 5; // 화면 분할 개수 사이즈
const snsDivideCount = 12;

const logoHeight = (viewportHeight / layoutCount);
const snsIconSize = (viewportWidth / snsDivideCount);

const localStyles = StyleSheet.create({
  snsIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : color.whiteColor,
    borderWidth : 1,
    height : snsIconSize + 20, width : snsIconSize + 20,
    borderRadius : 5
  }
});


let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrPw: (value) => dispatch(setUsrPw(value)),
      onSetAccessToken: (value) => dispatch(setAccessToken(value)),
      onSetRefreshToken: (value) => dispatch(setRefreshToken(value))
  }
}

AccountType = connect(mapStateToProps, mapDispatchToProps)(AccountType);
export default AccountType;
