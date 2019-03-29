import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class SelectWeekDay extends Component {
    constructor(props) {
      super(props);

      this.state = {
          btnClick : this.props.workDay
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
            <TouchableOpacity 
                key={this.props.index}
                onPress={ this._handleBtnClick }
            >
                <View 
                    style={ (this.state.btnClick) ?  localStyles.btnWeekOn : localStyles.btnWeekOff}
                >
                    <Text 
                        style={ (this.state.btnClick) ? localStyles.btnWeekOnTxt : localStyles.btnWeekOffTxt }
                    >
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}

const weekCardSize = wp(12, 52);

const localStyles = StyleSheet.create({
    btnWeekOn: {
        alignItems: "center",
        justifyContent: "center",
        height : weekCardSize, 
        width : weekCardSize,
        borderColor : color.defaultColor, 
        borderWidth : 1,
        backgroundColor: color.defaultColor
    },
    btnWeekOnTxt: {
        fontSize: 15,
        color: color.whiteColor
    },
    btnWeekOff: {
      alignItems: "center",
      justifyContent: "center",
      height : weekCardSize, 
      width : weekCardSize,
      borderColor : color.defaultColor, 
      borderWidth : 1
    },
    btnWeekOffTxt: {
      fontSize: 15,
      color: color.defaultColor
    }
});

export default SelectWeekDay;