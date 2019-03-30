import React, { Component } from "react";
import { Keyboard, StyleSheet, TouchableOpacity, ImageBackground, View } from 'react-native'
import { Button, Container, CheckBox, Text, Item, Input } from "native-base";

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    imgUri: 'https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png',
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.contentWrap}>
        
          <ImageBackground
            source={{uri : this.props.imgUri}} 
            resizeMode="contain"
            style={localStyles.newCardStyle}
          /> 
        </View>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  newCardStyle : {
    width : '100%',
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
});

export default ViewImage; 
