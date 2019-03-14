import React, { Component } from "react";
import { Image, StyleSheet } from "react-native"
import { Button, Body, Header, Left, Right, Icon, Title, Text } from "native-base";

import { Actions } from "react-native-router-flux";
import { HStyles } from '~/Common/Styles/Header';
import { styles } from '~/Common/Styles/common';

class CustomHeader extends Component {
    static defaultProps = {
        title : '',
        backAction : false,
        actionName : '',
        resetPage : false,
        backBtn : true,
        rightBtn : false,
        menuBtn : false,
        closeBtn : false,
        customAction: null
    }

    // 뒤로가기 버튼
    _handleBackButton = () => {
        if(this.props.backAction) {
            Actions.popTo(this.props.actionName);
        } else {
            if(this.props.customAction !== null) {
                this.props.customAction();
            } else {
                Actions.pop();
            }
        }
    }

    render() {
        return (
            <Header style={[HStyles.header, styles.noPadding]}>
                <Left style={[HStyles.headerLeftWrap, (this.props.resetPage) ? localStyles.hide : localStyles.show ]}>
                    <Button 
                        transparent 
                        onPress={this._handleBackButton}
                        style={[styles.noPadding, (this.props.backBtn) ? localStyles.show : localStyles.hide ]}>
                            <Image source={require("~/Common/Image/btn_back_arrow.png")} />
                    </Button>
                    <Button 
                        transparent
                        onPress={ Actions.drawerOpen }
                        style={[styles.noPadding, (this.props.menuBtn) ? localStyles.show : localStyles.hide ]}>
                            <Icon name='menu' />
                    </Button>
                    <Button 
                        transparent
                        onPress={ this.props.cancelAction }
                        style={[styles.noPadding, (this.props.closeBtn) ? localStyles.show : localStyles.hide ]}>
                        <Icon name='md-close' />
                    </Button>
                </Left>
                <Body style={HStyles.headerCenterWrap}>
                    <Title style={HStyles.headerTitleTxt}>{ this.props.title }</Title>
                </Body>
                <Right style={[HStyles.headerRightWrap, (this.props.resetPage) ? localStyles.hide : localStyles.show ]}></Right>
            </Header>
        );
    }
}

const localStyles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});

export default CustomHeader;
