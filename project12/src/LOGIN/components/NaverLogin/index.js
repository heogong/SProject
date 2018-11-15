import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';

import NativeButton from 'apsl-react-native-button';
import { NaverLogin, getProfile } from 'react-native-naver-login';
import styles from './styles';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setValue } from '../../../REDUX/actions';

const initials = {
  kConsumerKey: 'HEZ2CaOwmSPvw18HCB4c',
  kConsumerSecret: 'hVQH0djpGH',
  kServiceAppName: 'espresso',
  kServiceAppUrlScheme: 'dooboolaburlscheme', // only for iOS
};
const naverInit = {
  kConsumerKey: 'jyvqXeaVOVmV',
  kConsumerSecret: '527300A0_COq1_XV33cf',
  kServiceAppName: '네이버 아이디로 로그인하기',
  kServiceAppUrlScheme: 'thirdparty20samplegame', // only for iOS
};

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNaverLoggingin: false,
      theToken: 'token has not fetched',
      usrId: ''
    };
  }

  // 로그인 후 내 프로필 가져오기.
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theToken);

    //console.log(profileResult);

    this.setState({ 
      usrId : profileResult.response.email,
      usrNm : profileResult.response.name
    });

    this._LoginCheckGotoPage(this.state); // 사용자 데이터에 따른 페이지 이동

    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
  }

  _LoginCheckGotoPage = (USER) => {
    //console.log("LoginCheck USER : ", USER);
    this.props.onSetValue(USER);

    if(USER.userNm) {
      Actions.JoinInputName();
    } else {
      Actions.JoinInputPhone();
    }
};

  // 네이버 로그인 시작.
  async naverLoginStart() {
    //console.log('  naverLoginStart  ed');
    NaverLogin.login(initials, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
      this.setState({ theToken: token });

      this.fetchProfile();
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  render() {
    const { theToken } = this.state;
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <NativeButton
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.naverLoginStart()}
            activeOpacity={0.5}
            style={styles.btnNaverLogin}
            textStyle={styles.txtNaverLogin}
          >NAVER LOGIN</NativeButton>
          {/* <Text>{theToken}</Text> */}
          {/* <NativeButton
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.fetchProfile()}
            activeOpacity={0.5}
            style={styles.btnNaverLogin}
            textStyle={styles.txtNaverLogin}
          >Fetch Profile</NativeButton> */}

        </View>
      </View>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetValue: (value) => dispatch(setValue(value))
  }
}
Page = connect(undefined, mapDispatchToProps)(Page);
export default Page;