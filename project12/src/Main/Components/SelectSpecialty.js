import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from "native-base";

import { color } from '~/Common/Styles/colors';

class SelectSpecialty extends Component {
    constructor(props) {
      super(props);

      this.state = {
          btnClick : false,
          specialty : this.props.specialty
      };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({specialty : nextProps.specialty})
    }

    render() {
        return (
            (this.state.specialty) ? (
                <Button 
                    onPress={() => { 
                        this.props.removeDataArray(this.props.product.prdType.prdTypeId), 
                        this.setState({specialty : false})
                    }}
                    style={localStyles.prdBtnOn}>
                    <Text style={localStyles.prdBtnOnTxt}>
                        {this.props.product.prdType.prdTypeKoNm}
                    </Text>
                </Button>
            ) : (
                <Button 
                    onPress={() => { 
                        this.props.addDataArray(this.props.product.prdType.prdTypeId), 
                        this.setState({specialty : true})
                    }}
                    style={localStyles.prdBtnOff}>
                    <Text style={localStyles.prdBtnOffTxt}>
                        {this.props.product.prdType.prdTypeKoNm}
                    </Text>
                </Button>
            )
        )
    }
}

const localStyles = StyleSheet.create({
    prdBtnOn: {
      backgroundColor: color.defaultColor,
      borderRadius: 0,
      elevation: 0,
      width: "50%",
      shadowOpacity: 0,
      height: 34,
      justifyContent: "center"
    },
    prdBtnOnTxt: {
      fontSize: 14,
      color: color.whiteColor
    },
    prdBtnOff: {
      backgroundColor: "#d6f1ff",
      borderRadius: 0,
      elevation: 0,
      width: "50%",
      shadowOpacity: 0,
      height: 34,
      justifyContent: "center"
    },
    prdBtnOffTxt: {
      fontSize: 14,
      color: color.defaultColor
    }
});

export default SelectSpecialty;