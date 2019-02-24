import React, { Component } from "react";
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/Button';

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
        widthSize : 200,
        
        //2019.02.24
        edgeFill : false,
        fillTxt : false
      }

    render() {
        return (
            // <Button
            //     style={ (this.props.styleWidth) ? { margin : this.props.marginSize, width : this.props.widthSize } : { margin : this.props.marginSize } }
            //     light={ this.props.light } 
            //     primary={ this.props.primary } 
            //     success={ this.props.success } 
            //     warning={ this.props.warning  } 
            //     danger={ this.props.danger } 
            //     dark={ this.props.dark } 
            //     info={ this.props.info } 
            //     bordered={ this.props.bordered }
            //     rounded={ this.props.rounded }
            //     block={ this.props.block }
            //     disabled={ this.props.disabled }
            //     onPress={ this.props.onPress }
            //     full={ this.props.full }
            //     iconLeft={ this.props.icon }
            // >
            //     {this.props.children}
            // </Button>

            <Button 
                onPress={ this.props.onPress }
                style={[
                    styles.btnDefault, 
                    styles.mb5,
                    (this.props.edgeFill) ? styles.btnDefaultEdgeFill : styles.btnDefaultNoFill // 화이트 테두리 여부
                ]}
            >
                <Text style={[
                    styles.btnDefaultTxt, 
                    (this.props.fillTxt) ? styles.btnDefaultFillTxt : styles.btnDefaultNoFillTxt // 글자배경 채움 여부
                ]}>
                    {this.props.children}
                </Text>
            </Button>
        );
    }
}


export default CustomButton;
