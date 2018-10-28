import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';

import NativeButton from 'apsl-react-native-button';
import styles from './styles';

import RNKakaoLogins  from 'react-native-kakao-logins';

class KakaoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isKakaoLogging: false,
      token: 'token has not fetched',
    };
  }

  // 카카오 로그인 시작.
  kakaoLogin() {
    console.log('   kakaoLogin   ');
    RNKakaoLogins.login((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      //Alert.alert('result', result);
      console.log(result);
    });
  }
 
  kakaoLogout() {
    console.log('   kakaoLogout   ');
    RNKakaoLogins.logout((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
    });
  }
 
  // 로그인 후 내 프로필 가져오기.
  getProfile() {
    console.log('getKakaoProfile1111');
    RNKakaoLogins.getProfile((err, result) => {
      if (err){
        console.log(err);
        return;
      }
      console.log(result);
      //Alert.alert('result', result);
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text>LOGIN</Text>
        </View>
        <View style={ styles.content }>
          <NativeButton
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.kakaoLogin()}
            activeOpacity={0.5}
            style={styles.btnKakaoLogin}
            textStyle={styles.txtNaverLogin}
          >KakaoLOGIN</NativeButton>
          <Text>{this.state.token}</Text>
          <NativeButton
            onPress={() => this.kakaoLogout()}
            activeOpacity={0.5}
            style={styles.btnKakaoLogin}
            textStyle={styles.txtNaverLogin}
          >KakaoLogout</NativeButton>
          <NativeButton
            isLoading={this.state.isKakaoLogging}
            onPress={() => this.getProfile()}
            activeOpacity={0.5}
            style={styles.btnKakaoLogin}
            textStyle={styles.txtNaverLogin}
          >KakaogetProfile</NativeButton>
        </View>
      </View>
    );
  }
}
export default KakaoLogin;