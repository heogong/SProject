import React, { Component } from 'react';
import { Body, Button, Icon, Left, List, ListItem, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '../../Common/Blend';

import SetDefaultCard from '../Functions/SetDefaultCard';
import GetCommonData from '../../Common/Functions/GetCommonData';

export default class ListCardInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            defalutIcon : ""
        };
    }

    componentDidMount() {
        if(this.props.defaultCard) {
            this.setState({ defalutIcon : 'md-checkmark' });
        } 
    }

    
    render() {
        return (
            <ListItem icon>
                <Left>
                    <Button onPress={this.props.setDefaultCard}>
                        {/* <Icon active name="md-checkmark" /> */}
                        <Icon active name={ this.state.defalutIcon } />
                    </Button>
                </Left>
                <Body>
                    <Text> {this.props.title} </Text>
                </Body>
            </ListItem>
        );
    }
}