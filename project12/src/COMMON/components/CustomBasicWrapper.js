import React, { Component } from "react";

import Style from '../Styles/Style';
import { Container, Content } from "native-base";

class CustomBasicWrapper extends Component {
    render() {
        return (
            <Container style={Style.align}>
                <Content padder>
                    {this.props.children}
                </Content>
            </Container>
        );
    }
}

export default CustomBasicWrapper;