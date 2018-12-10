/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ReactTimeout from 'react-timeout'
import { Actions } from 'react-native-router-flux';


class cameraPage extends Component {
  constructor(props) { 
    super(); 
    this.camera = null;

    this.state = {
      imgUri : 'file:///data/user/0/com.project20/cache/Camera/6b76547f-c9cb-4a06-8102-9b7417a164de.jpg',
      timePassed: false
    };
  }

  componentDidMount() {
    this.props.setTimeout(this.setTimePassed, 500)
  }

  setTimePassed = () => {
    this.setState({timePassed: true});
  }

  render() {
    if (!this.state.timePassed){
      return (
        <View style={styles.container}><Text>Loading</Text></View>
      );
    }else{
      return (
        <View style={styles.container}>
          <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes)
              }}
          />
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
            <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style = {styles.capture}
            >
                <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)

      Actions.popTo('mainPage'); // 뒤로가면서 기존페이지로 이동
      this.props.onResult({ uri: data.uri });
    }
  };
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'black'
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center'
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  paddingHorizontal: 20,
  alignSelf: 'center',
  margin: 20
}
});

export default ReactTimeout(cameraPage)