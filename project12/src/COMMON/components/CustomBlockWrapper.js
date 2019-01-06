import React, { Component } from "react";
import { View } from "react-native"

import { Container, Content } from "native-base";
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
        menuBtn : false,
        padder : true,
        padderLeftSize : 0,
        padderRightSize : 0,
        customAction : null
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
                    actionName={ this.props.actionName }
                    rightAction={ this.props.rightAction }
                    customAction={ this.props.customAction }
                />
                
                <Container>
                    <Content padder={ this.props.padder } 
                        style={{ 
                            paddingLeft : this.props.padderLeftSize, 
                            paddingRight: this.props.padderRightSize
                        }}>
                        {this.props.children}
                    </Content>
                </Container>
            </View>
        );
    }
}

export default CustomBasicWrapper;