import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  View,
  Text,
  Alert,
} from 'react-native';

import NativeButton from 'apsl-react-native-button';
import { NaverLogin, getProfile } from 'react-native-naver-login';

// import { naverLogin, getNaverProfile } from '../../../apis/AuthApi';

const initials = {
  kConsumerKey: 'VN6WKGFQ3pJ0xBXRtlN9',
  kConsumerSecret: 'AHBgzH9ZkM',
  kServiceAppName: 'dooboolab',
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

    console.log('\n\n Initial Page :: src/components/pages/First/index.js \n\n');

    this.state = {
      isNaverLoggingin: false,
      theToken: 'token has not fetched'
    };
  }

  // 로그인 후 내 프로필 가져오기.
  async fetchProfile() {
    const profileResult = await getProfile(this.state.theToken);
    console.log(profileResult);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    this.props.navigation.navigate('Second', {
      profileResult,
    });
  }

  // 네이버 로그인 시작.
  async naverLoginStart() {
    console.log('  naverLoginStart  ed');
    NaverLogin.login(initials, (err, token) => {
      console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
      this.setState({ theToken: token });
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
          <Text>{theToken}</Text>
          <NativeButton
            isLoading={this.state.isNaverLoggingin}
            onPress={() => this.fetchProfile()}
            activeOpacity={0.5}
            style={styles.btnNaverLogin}
            textStyle={styles.txtNaverLogin}
          >Fetch Profile</NativeButton>

        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop: Platform.OS === 'ios' ? 0 : '$statusSize',
      paddingTop: Platform.OS === 'ios' ? '$statusPaddingSize' : 0,
      backgroundColor: 'white',
    },
    header: {
      flex: 8.8,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 87.5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    title: {
      fontSize: '$24',
      fontWeight: 'bold',
    },
    btnNaverLogin: {
      height: '$48',
      width: '240 * $ratio',
      alignSelf: 'center',
      backgroundColor: '#00c40f',
      borderRadius: 0,
      borderWidth: 0,
    },
    txtNaverLogin: {
      fontSize: '$fontSize',
      color: 'white',
    },
  });

export default Page;