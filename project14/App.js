import React, {Component} from 'react';
import {Modal, Platform, StyleSheet, Text, View} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export default class App extends Component {
  state = {
    index: 0,
    modalVisible: true,
    images : [{
      url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
      props: {
        // headers: ...
      }
    },{
      url : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png'
      // props: {
      //     // Or you can set source directory.
      //     source: require('../background.png')
      // }
    }]
  };

  render() {
    return (
      <View
        style={{
          padding: 10
        }}
      >
        <Modal visible={true} transparent={true} onRequestClose={() => this.setState({ modalVisible: false })}>
          <ImageViewer 
            index={this.state.index}
            imageUrls={this.state.images}
            />
        </Modal>
      </View>
    );
  }
}