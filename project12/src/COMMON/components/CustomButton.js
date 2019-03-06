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
                <Button 
                    disabled={ this.props.disabled }
                    bordered={ this.props.bordered }
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
                // <Button
                //     info
                //     onPress={ this.props.onPress }
                //     style={
                //         [{backgroundColor : this.props.backgroundColor},
                //         BStyles.btnDefault, 
                //         styles.mb5,
                //         (this.props.edgeFill) ? // 테두리 여부
                //         (this.props.whiteFill) ? BStyles.btnDefaultWhiteEdgeFill : BStyles.btnDefaultFill // 화이트 or 디폴트 테두리
                //         : BStyles.btnDefaultNoFill // 테두리 x
                //     ]}
                // >
                //     <Text style={[
                //         (this.props.textStyle !== null ) ? this.props.textStyle : BStyles.btnDefaultTxt, 
                //         (this.props.fillTxt) ? BStyles.btnDefaultFillTxt : BStyles.btnDefaultNoFillTxt // 글자배경 채움 여부
                //     ]}>
                //         {this.props.children}
                //     </Text>
                // </Button>
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
