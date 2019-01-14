import React, {Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from "native-base";

import { Actions } from 'react-native-router-flux';
import CustomButton from '~/Common/Components/CustomButton';

class ViewImage extends Component {
  constructor(props) { 
    super(props); 

    this.state = {
      imgUri : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png'
    };
  }

  componentDidMount() {
    this.setState({imgUri : this.props.imageUri});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fc0', flexDirection: 'column',}}>
        <Image
            resizeMode={'cover'}
            style={{ width: '100%', height: '100%', backgroundColor: 'red'} }
            source={{uri: this.state.imgUri}}
        /> 
        <TouchableOpacity style={ styles.exitButton } onPress={() => Actions.pop() } >
          <Icon name="md-close"  />
        </TouchableOpacity>
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
  avatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  exitButton: {
    position: 'absolute',
    left: 10,
    right: 0,
    top: 7,
    bottom: 0
  }
});

export default ViewImage;