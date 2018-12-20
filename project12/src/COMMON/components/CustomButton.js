import React, { Component } from "react";

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
        styleWidth: true
      }

    render() {
        return (
            <Button
                style={ (this.props.styleWidth) ? { margin: 15, marginTop: 10, width: 200 } : { margin: 15, marginTop: 10 }}
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
            >
                {this.props.children}
            </Button>
        );
    }
}


export default CustomButton;
