/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, Image, View, TouchableOpacity, PermissionsAndroid} from 'react-native';

import transform from "css-to-react-native-transform";

import { common } from "./common";
import { intro } from "./intro";
import { layout } from "./layout";
import { main } from "./main";
import { member } from "./member";
import {styleDefault } from "./styleDefault";
import Permissions from 'react-native-permissions'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      // {
      //   title: 'Cool Photo App Camera Permission',
      //   message:
      //     'Cool Photo App needs access to your camera ' +
      //     'so you can take awesome pictures.',
      //   buttonNeutral: 'Ask Me Later',
      //   buttonNegative: 'Cancel',
      //   buttonPositive: 'OK',
      // },
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoPermission : null,
      cameraPermission : null,
      locationPermission : null
    }
}



componentDidMount() {
  // Permissions.check('photo').then(response => {
  //   // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
  //   console.log(response);
  //   this.setState({ photoPermission: response })
  // })

  requestCameraPermission();
}

_requestPermission = () => {
  Permissions.request('location').then(response => {
    console.log("_requestPermission :", response)
    // Returns once the user has chosen to 'allow' or to 'not allow' access
    // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    this.setState({ locationPermission: response })
  })
}

// Check the status of multiple permissions
_checkCameraAndPhotos = () => {
  Permissions.checkMultiple(['camera', 'photo', 'location']).then(response => {
    //response is an object mapping type to permission
    alert(response.location)
    this.setState({
      cameraPermission: response.camera,
      photoPermission: response.photo,
    })
  })
}

_alertForPhotosPermission = () => {
  Alert.alert(
    'Can we access your photos?',
    'We need access so you can set your profile pic',
    [
      {
        text: 'No way',
        onPress: () => console.log('Permission denied'),
        style: 'cancel',
      },
      this.state.photoPermission == 'undetermined'
        ? { text: 'OK', onPress: this._requestPermission }
        : { text: 'Open Settings', onPress: Permissions.openSettings },
    ],
  )
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
              <TouchableOpacity onPress={this._requestPermission}>
                <Text>aaaaaaaaaaaaaa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._alertForPhotosPermission}>
                <Text>bbbbbbbb</Text>
              </TouchableOpacity>


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
