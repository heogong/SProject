import React, { Component } from "react";
import { View } from "react-native"

import { Container, Text } from "native-base";
import CustomHeader from './CustomHeader';
import Style from '../Styles/Style';


class CustomBasicWrapper extends Component {
    static defaultProps = {
        title : '제목없음',
        backAction : false,
        actionName : '',
        resetPage : false,
        backBtn : true,
        rightBtn : false,
        menuBtn : false
    }
    render() {
        return (
            <View style={ Style.area }>
                <CustomHeader
                    title={ this.props.title }
                    backBtn={ this.props.backBtn }
                    rightBtn={ this.props.rightBtn }
                    resetPage={ this.props.resetPage }
                    backAction={ this.props.backAction }
                    rightAction={ this.props.rightAction }
                    actionName={ this.props.actionName }
                    menuBtn={ this.props.menuBtn }
                />
                
                <Container style={Style.align}>
                    <View style={{flexDirection: 'column'}}>
                        {this.props.children}
                    </View>
                </Container>
            </View>
        );
    }
}

export default CustomBasicWrapper;