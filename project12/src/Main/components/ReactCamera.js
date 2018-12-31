import React, {Component} from 'react';

import {
  AppRegistry,
  Button,
  CameraRoll,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  ImageEditor
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ReactTimeout from 'react-timeout'
import { Actions } from 'react-native-router-flux';


class ReactCamera extends Component {
  constructor(props) { 
    super(); 
    this.camera = null;

    this.state = {
      timePassed: false
    };
  }

  componentDidMount() {
    this.props.setTimeout(this.setTimePassed, 500);
  }

  setTimePassed = () => {
    this.setState({timePassed: true});
  }

  // 앨범에서 사진 가져오기
  _handleAlbumPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        console.log(r);
        //this.setState({ photos: r.edges });
        Actions.ReactCameraAlbum({result : this.props.onResult, photos: r.edges})
      })
      .catch((err) => {
         //Error Loading Images
    });
  };

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
              flashMode={RNCamera.Constants.FlashMode.auto}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
          />
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
            <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style = {styles.capture}
            >
                <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableHighlight onPress={this._handleAlbumPress}>
              <View style={ {width: 130, height: 130} }>
                  <ImageBackground source={require('../../../src/Common/Image/gallery.png')} style={{width: '100%', height: '100%'}}/>
              </View>
            </TouchableHighlight>
          </View>

        </View>
      );
    }
  }

  takePicture = async function() {
    if (this.camera) {
      //const options = { quality: 0.5, base64: true };
      const options = {
        fixOrientation: false,
        skipProcessing: true,
        width: 512
      };
      const data = await this.camera.takePictureAsync(options)
    //   .then(({ uri, imageWidth, imageHeight }) => {
    //     ImageEditor.cropImage(uri, {
    //        offset: { x: 0, y: 0 },
    //        size: { width: imageWidth, height: imageHeight },
    //        displaySize: { width: '300', height: '300'},
    //        resizeMode: 'contain'
    //     }, (res) => {
    //        // res == 'file:///data/.../img.jpg'
    //     }, (err) => {
    //        // ='(
    //     }
    //  )});
    

      Actions.pop();
      this.props.onResult({ data: data });
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

export default ReactTimeout(ReactCamera)