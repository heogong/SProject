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
import { setUsrId, setUsrNm, setSnsSignYn } from '../../../REDUX/actions';
import SignUp from '../../components/SignUp';

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
      usrId: '',
      usrNm: ''
    };
  }

  // 로그인 후 내 프로필 가져오기.
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theToken);
    
    this.setState({ 
      usrId : profileResult.response.email,
      usrNm : profileResult.response.name
    });

    // 사용자 데이터에 따른 페이지 이동
    this._LoginCheckGotoPage(this.state); 

    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
  }

  _LoginCheckGotoPage = (USER) => {

    this.props.onSetUsrId(USER.usrId);  // 리덕스 사용자 아이디 SET
    this.props.onSetUsrNm(USER.usrNm);  // 리덕스 사용자 이름 SET
    this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 가입여부 SET

    // 회원가입 여부 확인 (일단 회원가입 로직으로 확인)
    SignUp(this.props.value).then(result => {
      // 회원 중복
      if (result.code == '0010') {
        Alert.alert(result.msg);
        Actions.InitPage();
      } else {
        // 이름 value 여부
        if(USER.userNm == '') {
          Actions.JoinInputName();
          //Actions.popTo('JoinInputName'); // 뒤로가면서 기존페이지로 이동하는 듯;;
        } else {
          Actions.JoinInputPhone();
        }
      }
    });
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

let mapStateToProps = (state) => {
  return {
      value: state.USER
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetSnsSignYn: (value) => dispatch(setSnsSignYn(value))
  }
}
Page = connect(mapStateToProps, mapDispatchToProps)(Page);
export default Page;