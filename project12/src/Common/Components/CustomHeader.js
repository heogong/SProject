import React, { Component } from "react";
import { StyleSheet } from "react-native"

import { Button, Body, Header, Left, Right, Icon, Title, Text } from "native-base";
import { Actions } from "react-native-router-flux";

class CustomHeader extends Component {
    static defaultProps = {
        title : '제목없음',
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
            <Header>
                <Left style={(this.props.resetPage) ? styles.hide : styles.show }>
                    <Button 
                        transparent 
                        onPress={this._handleBackButton}
                        style={(this.props.backBtn) ? styles.show : styles.hide }>
                        <Icon name='ios-arrow-back' />
                    </Button>
                    <Button 
                        transparent
                        onPress={ Actions.drawerOpen }
                        style={(this.props.menuBtn) ? styles.show : styles.hide }>
                        <Icon name='menu' />
                    </Button>
                    <Button 
                        transparent
                        onPress={ this.props.cancelAction }
                        style={(this.props.closeBtn) ? styles.show : styles.hide }>
                        <Icon name='md-close' />
                    </Button>
                </Left>
                <Body>
                    <Title>{ this.props.title }</Title>
                </Body>
                <Right style={(this.props.rightBtn) ? styles.show : styles.hide }>
                    <Button transparent onPress={ this.props.rightAction }>
                        <Icon name='md-checkbox-outline' />
                    </Button>
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});


export default CustomHeader;