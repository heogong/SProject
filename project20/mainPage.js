

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
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={Actions.cameraPage}
          title="카메라"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        
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
