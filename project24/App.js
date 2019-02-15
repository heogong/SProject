/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image, View} from 'react-native';

import transform from "css-to-react-native-transform";

import { common } from "./common";
import { intro } from "./intro";
import { layout } from "./layout";
import { main } from "./main";
import { member } from "./member";
import {styleDefault } from "./styleDefault";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
}

componentWillMount() {
  console.log(member);
  console.log(common);
  console.log(layout);

}

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>
      
      <View style={layout.containerWrap}>
        <View>
        {/* <!--// page start --> */}
        
          <View style={[member.memberWrapSelect]}>
            <View style={[member.memberWrapsSelectLogo]}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={[member.memberWrapsSelectLogoImg]}
                    source={require('./intro-logo.png')}
                  />
              </View>
            </View>
            
            <View>
              <View>
                <View>
                    <Text style={common.cred}>USER · 유저</Text>
                    <Text style={member.stxt}>A/S 서비스를 이용하시겠어요?</Text>
                </View>
              </View>

              {/* <li>
                <a href="#">
                  <span class="btxt">PARTNER · 파트너</span>
                  <span class="stxt">고객의 냉동기기를 수리하시겠어요?</span>
                </a>
              </li> */}
            </View>
            {/* <a href="#" class="other-btn"><span>비회원으로 A/S 신청하기</span></a> */}
          </View>		
          {/* <!--// page end --> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
