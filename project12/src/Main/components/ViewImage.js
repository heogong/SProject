import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import CustomHeader from '../../Common/Components/CustomHeader';


class ViewImage extends Component {
  constructor(props) { 
    super(); 

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
      return (
        <View>
            <CustomHeader
                title="제품 이미지 조회"
            />
            <View>
                <ImageBackground source={{ uri : this.props.imageUri}} style={{width: '100%', height: '90%'}}/>
            </View>
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

export default ViewImage;