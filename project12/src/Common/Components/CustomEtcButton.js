import React, { Component } from "react";
import { View } from 'react-native';
import { Button, Text } from "native-base";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';

// 모달 기본 버튼
const ModalDefaultBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={BStyles.modalBtnFill}>
        <Text style={BStyles.modalBtnFillTxt}>{text}</Text>
    </Button>
)

// 모달 흰색바탕 버튼
const ModalDefaultBtn = ({action, text}) => (
    <Button 
        onPress={action}
        style={BStyles.modalBtnNoFill} >
        <Text style={BStyles.modalBtnNoFillTxt}>{text}</Text>
    </Button>
)


class CustomEtcButton extends Component {
    static defaultProps = {
        defaultBtn : false,
        WhiteBackBtn : false
      }

    render() {
        return (
            <View style={styles.mb5}>

                {(this.props.WhiteBackBtn) ? (
                    <WhiteBackBtn
                        action={this.props.onPress}
                        text={this.props.children} 
                    />
                ) : (
                    <ModalDefaultBtn
                        action={this.props.onPress} 
                        text={this.props.children}
                    />
                )}
            </View>
        )
    }
}


export default CustomEtcButton;
