import React, { Component } from "react";
import { View } from 'react-native';
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';
import { color } from "../Styles/colors";

// 기본 배경에 흰색 글씨
const DefaultBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnDefaultNoFill]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnDefaultNoFillTxt]}>{text}</Text>
    </Button>
)

// 기본 라인에 기본색 글씨
const DefaultLineBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnDefaultFill]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnDefaultFillTxt]}>{text}</Text>
    </Button>
)

// 흰색 라인에 기본 배경색 (기본 바탕 있을경우)
const WhiteLineBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnWhBoder]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnWhBoderTxt]}>{text}</Text>
    </Button>
)

// 흰색 바탕에 기본 글씨 (기본 바탕 있을경우)
const WhiteBackBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={[BStyles.btnDefault, BStyles.btnWhBack]}>
        <Text style={[BStyles.btnDefaultTxt, BStyles.btnWhBackTxt]}>{text}</Text>
    </Button>
)

// 모달 기본 버튼
const ModalDefaultBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={BStyles.modalBtnFill}>
        <Text style={BStyles.modalBtnFillTxt}>{text}</Text>
    </Button>
)

            

class CustomButton extends Component {
    static defaultProps = {
        disabled: false,
        edgeFill : false,
        whiteFill : false,
        fillTxt : false,
        bordered : false,
        backgroundColor : color.backgroundColor,
        textStyle : null,

        defaultBtn : false,
        DefaultLineBtn : false,
        WhiteLineBtn : false,
        WhiteBackBtn : false
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
                        />
                    ) : (
                        (this.props.DefaultLineBtn) ? (
                            <DefaultLineBtn 
                                action={this.props.onPress}
                                text={this.props.children}  
                            />
                        ) : (
                            (this.props.WhiteLineBtn) ? (
                                <WhiteLineBtn 
                                 action={this.props.onPress} 
                                    text={this.props.children} 
                                />
                        ) : (
                            <DefaultBtn
                                action={this.props.onPress} 
                                text={this.props.children}
                            />
                        )
                    ))}
                </View>

            )
            
        );
    }
}


export default CustomButton;
