import React, { Component } from "react";
import { View } from "react-native"
import Style from '../Styles/Style';
import { Container, Content } from "native-base";

class CustomBasicWrapper extends Component {
    render() {
        return (
            <Container style={Style.align}>
                {/* <Content padder> */}
                <View style={{flexDirection: 'column'}}>
                    {this.props.children}
                </View>
                {/* </Content> */}
            </Container>
        );
    }
}

export default CustomBasicWrapper;