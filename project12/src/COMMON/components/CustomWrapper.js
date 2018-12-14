import React, { Component } from "react";

import Layout from '../Styles/Layout';
import { Container, Content } from "native-base";

class CustomWrapper extends Component {
    render() {
        return (
            <Container style={Layout.align}>
                <Content/>
                <Content>
                    {this.props.children}
                </Content>
                <Content/>
            </Container>
        );
    }
}

export default CustomWrapper;

