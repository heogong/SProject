import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { Button } from "native-base";

class CustomButton extends Component {
    static defaultProps = {
        light: false,
        primary: false,
        success: false,
        warning: false,
        danger: false,
        dark: false,
        info: false,
        bordered: false,
        rounded: false,
        block: false,
        full: false,
        disabled: false,
        styleWidth: true,
        icon: false,
        marginSize : 15,
        widthSize : 200
      }

    render() {
        return (
            <Button
                style={ (this.props.styleWidth) ? { margin : this.props.marginSize, width : this.props.widthSize } : { margin : this.props.marginSize } }
                light={ this.props.light } 
                primary={ this.props.primary } 
                success={ this.props.success } 
                warning={ this.props.warning  } 
                danger={ this.props.danger } 
                dark={ this.props.dark } 
                info={ this.props.info } 
                bordered={ this.props.bordered }
                rounded={ this.props.rounded }
                block={ this.props.block }
                disabled={ this.props.disabled }
                onPress={ this.props.onPress }
                full={ this.props.full }
                iconLeft={ this.props.icon }
            >
                {this.props.children}
            </Button>
        );
    }
}


export default CustomButton;