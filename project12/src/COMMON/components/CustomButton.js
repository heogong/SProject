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
        disabled: false
      }

    render() {
        return (
            <Button
                style={{ margin: 15, marginTop: 10, width: 200 }}
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
            >
                {this.props.children}
            </Button>
        );
    }
}


export default CustomButton;
