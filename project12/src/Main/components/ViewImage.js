import React, {Component} from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text } from "native-base";

import { Actions } from 'react-native-router-flux';
import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
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
        // <CustomBasicWrapper
        //     title={ this.props.title }
        //     rightBtn={ this.props.rightBtn }
        //     rightAction={ this.props.rightAction }
        // >
            <ImageBackground source={{uri : this.state.imgUri}} style={styles.container}/>
      // </CustomBasicWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: null,
    height: null,
  }
});

export default ViewImage;