import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class SelectProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
          btnClick : false
      };
    }
    _handleBtnClick = async () => {
        await this.setState({btnClick : (this.state.btnClick) ? false : true});

        if(this.state.btnClick) {
            this.props.addDataArray(this.props.value);
        } else {
            this.props.removeDataArray(this.props.value);
        }
        
    }

    _handleFullAddBtn = async () => {
        await this.setState({btnClick : true});
        await this.props.removeDataArray(this.props.value);
        await this.props.addDataArray(this.props.value);
    }

    _handleFullRemoveBtn = async () => {
        await this.setState({btnClick : false});
        this.props.removeDataArray(this.props.value);
    }

    render() {
        return (
            <TouchableOpacity onPress={this._handleBtnClick}  key={this.props.index}>
                <View 
                    style={[
                        styles.mb15, 
                        styles.pd10,
                        styles.alignItemsCenter,
                        styles.justiConCenter,
                        { 
                        backgroundColor : (this.state.btnClick) ? color.prdTypeBackColor : color.defaultColor, 
                        height : productCardSize, 
                        width : productCardSize
                    }]}>
                    <Image source={{uri : this.props.imgUri}} 
                        style={[styles.mb10, {
                        height : productCardSize - 60, 
                        width : productCardSize - 60
                        }]}/>
                    <Text style={localStyles.whiteFont}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}
  
const productCardSize = wp(47.5, 52);

const localStyles = StyleSheet.create({
    whiteFont: {
        color: color.whiteColor,
        fontSize: 16,
        fontWeight: "500"
    }
});

export default SelectProduct;