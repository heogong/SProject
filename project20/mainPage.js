

import React, {Component} from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';


class mainPage extends Component {
  constructor(props) { 
    super(); 
    this.camera = null;

    this.state = {
      img : 'https://facebook.github.io/react-native/docs/assets/favicon.png'
    };
  }


  onResult = (result) => {
      console.log(result);
      this.setState({img : result.uri});
  }

  _goCamera = () => {
    Actions.cameraPage({onResult : this.onResult});
  }

  render() {
    return (
      <View style={ styles.container }>
        <Button
          onPress={this._goCamera}
          title="카메라"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <ImageBackground 
          source= {{uri: this.state.img}}
          style={{width: '100%', height: '100%'}}>
        </ImageBackground>
        
      </View>
    );
  }
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

export default mainPage;
