import React, { Component } from "react";
import { View } from 'react-native';
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';

// 모달 기본 버튼
const ModalDefaultBtn = ({action, text, customStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.modalBtnFill, customStyle]}>
        <Text style={BStyles.modalBtnFillTxt}>{text}</Text>
    </Button>
)

// 모달 흰색바탕 버튼
const ModalWhitetBtn = ({action, text, customStyle}) => (
    <Button 
        onPress={action}
        style={[BStyles.modalBtnNoFill, customStyle]} >
        <Text style={BStyles.modalBtnNoFillTxt}>{text}</Text>
    </Button>
)

const SmallBtn = ({action, text, customStyle}) => (
    <Button 
        onPress={action}
        style={[
            BStyles.btnDefaultSmall, BStyles.btnDefaultNoFill, customStyle]}>
        <Text style={[BStyles.btnDefaultSmallTxt, BStyles.btnDefaultNoFillTxt]}>{text}</Text>
    </Button>
)


class CustomEtcButton extends Component {
    static defaultProps = {
        defaultBtn : false,
        WhiteBackBtn : false,
        SmallBtn : false,
        customStyle : {width : 110},
        modalCustomStyle : ''
    }

    render() {
        return (
            <View style={styles.mb5}>
            {(this.props.disabled) ? (
                <ModalDefaultBtn
                    text={this.props.children}
                />
            ) : (
                (this.props.SmallBtn) ? (
                    <SmallBtn
                        action={this.props.onPress}
                        text={this.props.children}
                        customStyle={this.props.customStyle} 
                    />
                ) : (
                    (this.props.WhiteBackBtn) ? (
                        <ModalWhitetBtn
                            action={this.props.onPress}
                            text={this.props.children} 
                            customStyle={this.props.modalCustomStyle}
                        />
                    ) : (
                        <ModalDefaultBtn
                            action={this.props.onPress} 
                            text={this.props.children}
                            customStyle={this.props.modalCustomStyle}
                        />
                    )
                )
            )}
            </View>
        )
    }
}


export default CustomEtcButton;
