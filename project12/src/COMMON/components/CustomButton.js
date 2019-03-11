import React, { Component } from "react";
import { View } from 'react-native';
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';
import { color } from "../Styles/colors";

// 기본 배경에 흰색 글씨
const DefaultBtn = ({action, text, btnStyle, txtStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnDefaultFill, btnStyle]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnDefaultFillTxt, txtStyle]}>{text}</Text>
    </Button>
)

// 기본 라인에 기본색 글씨
const DefaultLineBtn = ({action, text, btnStyle, txtStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnDefaultNoFill, btnStyle]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnDefaultNoFillTxt, txtStyle]}>{text}</Text>
    </Button>
)

// 흰색 라인에 기본 배경색 (기본 바탕 있을경우)
const WhiteLineBtn = ({action, text, btnStyle, txtStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnWhBoder, btnStyle]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnWhBoderTxt, txtStyle]}>{text}</Text>
    </Button>
)

// 흰색 바탕에 기본 글씨 (기본 바탕 있을경우)
const WhiteBackBtn = ({action, text, btnStyle, txtStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnWhBack, btnStyle]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnWhBackTxt, txtStyle]}>{text}</Text>
    </Button>
)
            

class CustomButton extends Component {
    static defaultProps = {
        disabled: false,
        bordered : false,
        defaultBtn : false,
        DefaultLineBtn : false,
        WhiteLineBtn : false,
        WhiteBackBtn : false,
        CustomBtnStyle : '',
        CustomFontStyle : ''
    }

    render() {
        return (
            // 활성화 여부
            (this.props.disabled) ? (
                <View style={styles.mb5}>
                 {(this.props.WhiteLineBtn) ? (
                     <Button 
                        style={[BStyles.btnDefault, BStyles.disableBtnWhBoder, this.props.CustomBtnStyle]}>
                        <Text style={[BStyles.btnDefaultTxt, BStyles.disableBtnWhBoderTxt, this.props.CustomFontStyle]}>{this.props.children}</Text>
                    </Button>
                 ) : (
                    <Button style={[BStyles.btnDefault, BStyles.btnDefaultFillOff]}>
                        <Text style={[BStyles.btnDefaultTxt, BStyles.btnDefaultFillOffTxt]}>{this.props.children}</Text>
                    </Button>
                 ) }
                </View>
            ) : (
                <View style={styles.mb5}>
                    {(this.props.WhiteBackBtn) ? (
                        <WhiteBackBtn
                            action={this.props.onPress}
                            text={this.props.children}
                            btnStyle={this.props.CustomBtnStyle}
                            txtStyle={this.props.CustomFontStyle} 
                        />
                    ) : (
                        (this.props.DefaultLineBtn) ? (
                            <DefaultLineBtn 
                                action={this.props.onPress}
                                text={this.props.children}
                                btnStyle={this.props.CustomBtnStyle}
                                txtStyle={this.props.CustomFontStyle}  
                            />
                        ) : (
                            (this.props.WhiteLineBtn) ? (
                                <WhiteLineBtn
                                    action={this.props.onPress} 
                                    text={this.props.children} 
                                    btnStyle={this.props.CustomBtnStyle}
                                    txtStyle={this.props.CustomFontStyle}
                                />
                        ) : (
                            <DefaultBtn
                                action={this.props.onPress} 
                                text={this.props.children}
                                btnStyle={this.props.CustomBtnStyle}
                                txtStyle={this.props.CustomFontStyle}
                            />
                        )
                    ))}
                </View>

            )
            
        );
    }
}


export default CustomButton;
