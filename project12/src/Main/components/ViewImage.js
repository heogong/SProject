import React, {Component} from 'react';
import { View,ImageBackground } from 'react-native';

import { Actions } from 'react-native-router-flux';
import CustomHeader from '~/Common/Components/CustomHeader';

class ViewImage extends Component {
  constructor(props) { 
    super(); 

    this.state = {};
  }

  render() {
      return (
        <View>
            <CustomHeader
                title={ this.props.title }
                rightBtn={ this.props.rightBtn }
                rightAction={ this.props.rightAction }
            />
            <View>
              <ImageBackground source={ {uri : this.props.imageUri} } style={ {width: 300, height: 100} }/>
            </View>
        </View>
      );
  }
}
export default ViewImage;