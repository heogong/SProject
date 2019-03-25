import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Text } from 'native-base';

import { Actions } from 'react-native-router-flux';

import { styles } from '~/Common/Styles/common';

class ResetMain extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        client: false
    }

    componentDidMount() {
        if(this.props.client) {
            Actions.ClientMain();
        } else {
            Actions.PartnerMain();
        }
    }
    
    render() {
        return (
        <Container style={styles.container}>
            <View style={styles.fx1}>
                <Text>완료!!!</Text>
            </View>
        </Container>
        )
    }
}

export default ResetMain;