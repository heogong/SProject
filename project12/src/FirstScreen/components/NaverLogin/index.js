import React, { Component } from 'react';

import NativeButton from 'apsl-react-native-button';
import { NaverLogin, getProfile } from 'react-native-naver-login';
import styles from './styles';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUsrId, setUsrNm, setSnsSignYn, setSnsToken } from '../../../Redux/Actions';
import SignUp from '../../Functions/SignUp';
import login from '../../Functions/Login';

import { Text } from "native-base";
import CustomButton from '../../../Common/Components/CustomButton';

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
  static defaultProps = {
    name: 'NAVER LOGIN'
  }

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

   
    this._LoginCheckGotoPage(this.state); 

    if (profileResult.resultcode === '024') {
      console.log('로그인 실패', profileResult.message);
      return;
    }
  }

   // 사용자 데이터에 따른 페이지 이동
  _LoginCheckGotoPage = (USER) => {

    this.props.onSetUsrId(USER.usrId);  // 리덕스 사용자 아이디 SET
    this.props.onSetUsrNm(USER.usrNm);  // 리덕스 사용자 이름 SET
    this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 가입여부 SET

    // 회원가입 여부 확인 (일단 회원가입 로직으로 확인)
    SignUp(this.props.usrObj).then(result => {
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

  //여기 부터 시작!!!!!!!!!!
  async _Login() {
    login(this.props.usrObj, this.props.tokenObj).then(result => {
      console.log(result);
    });
  }

  // 네이버 로그인 시작.
  async naverLoginStart() {
    NaverLogin.login(initials, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`);

      // 로그인 페이지에서 접근 시
      if(this.props.loginYn) {
        this.props.onSetSnsSignYn('Y');     // 리덕스 SNS 로그인 여부 SET
        this.props.onSetSnsToken(token);    // 리덕스 SNS TOKEN SET
        
        // 로그인
        this._Login();

      } else {
        this.setState({ theToken: token });
        this.fetchProfile();
      }

      if (err) {
        console.log(err);
        return;
      }
    });
  }
  render() {
    const { theToken } = this.state;
    return (
      // <View style={ styles.container }>
      //   <View>
      //     <NativeButton
      //       isLoading={this.state.isNaverLoggingin}
      //       onPress={() => this.naverLoginStart()}
      //       >
      //       {this.props.name}
      //     </NativeButton>
      //   </View>
      // </View>
      <CustomButton
        block={ true }
        info={ true }
        bordered={ true }
        onPress={() => this.naverLoginStart()}
      ><Text>{this.props.name}</Text>
      </CustomButton>
    );
  }
}

let mapStateToProps = (state) => {
  return {
      usrObj: state.USER,
      tokenObj: state.TOKEN
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetUsrId: (value) => dispatch(setUsrId(value)),
      onSetUsrNm: (value) => dispatch(setUsrNm(value)),
      onSetSnsSignYn: (value) => dispatch(setSnsSignYn(value)),
      onSetSnsToken: (value) => dispatch(setSnsToken(value))
  }
}
Page = connect(mapStateToProps, mapDispatchToProps)(Page);
export default Page;