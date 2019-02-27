import React, { Component } from "react";
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';
import { color } from "../Styles/colors";

class CustomButton extends Component {
    static defaultProps = {
        disabled: false,
        edgeFill : false,
        whiteFill : false,
        fillTxt : false,
        backgroundColor : color.backgroundColor,
        textStyle : null
      }

    render() {
        return (
            // 활성화 여부
            (this.props.disabled) ? (
                <Button 
                    disabled={ this.props.disabled }
                    style={BStyles.btnDefault}>
                    <Text
                        style={[
                            (this.props.textStyle !== null ) ? this.props.textStyle : BStyles.btnDefaultTxt,
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
                    style={
                        [{backgroundColor : this.props.backgroundColor},
                        BStyles.btnDefault, 
                        styles.mb5,
                        (this.props.edgeFill) ? // 테두리 여부
                        (this.props.whiteFill) ? BStyles.btnDefaultWhiteEdgeFill : BStyles.btnDefaultFill // 화이트 or 디폴트 테두리
                        : BStyles.btnDefaultNoFill // 테두리 x
                    ]}
                >
                    <Text style={[
                        (this.props.textStyle !== null ) ? this.props.textStyle : BStyles.btnDefaultTxt, 
                        (this.props.fillTxt) ? BStyles.btnDefaultFillTxt : BStyles.btnDefaultNoFillTxt // 글자배경 채움 여부
                    ]}>
                        {this.props.children}
                    </Text>
                </Button>

            )
            
        );
    }
}


export default CustomButton;
