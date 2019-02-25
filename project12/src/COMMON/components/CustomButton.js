import React, { Component } from "react";
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/Button';

class CustomButton extends Component {
    static defaultProps = {
        disabled: false,
        edgeFill : false,
        whiteFill : false,
        fillTxt : false,
        textStyle : null
      }

    render() {
        return (
            // 활성화 여부
            (this.props.disabled) ? (
                <Button 
                    disabled={ this.props.disabled }
                    style={styles.btnDefault}>
                    <Text
                        style={[
                            (this.props.textStyle !== null ) ? this.props.textStyle : styles.btnDefaultTxt,
                            {textAlign: "center"}
                        ]}
                    >
                        {this.props.children}
                    </Text>
                </Button>

            ) : (
                <Button
                    info
                    onPress={ this.props.onPress }
                    style={[
                        styles.btnDefault, 
                        styles.mb5,
                        (this.props.edgeFill) ? // 테두리 여부
                        (this.props.whiteFill) ? styles.btnDefaultWhiteEdgeFill : styles.btnDefaultFill // 화이트 or 디폴트 테두리
                        : styles.btnDefaultNoFill // 테두리 x
                    ]}
                >
                    <Text style={[
                        (this.props.textStyle !== null ) ? this.props.textStyle : styles.btnDefaultTxt, 
                        (this.props.fillTxt) ? styles.btnDefaultFillTxt : styles.btnDefaultNoFillTxt // 글자배경 채움 여부
                    ]}>
                        {this.props.children}
                    </Text>
                </Button>

            )
            
        );
    }
}


export default CustomButton;
