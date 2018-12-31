import React, { Component } from 'react';
import{ Alert, View, TouchableOpacity } from 'react-native';

import { Right, Left, List, ListItem, Icon, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

export default class MyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _onPress = () => {
        Actions.ListBusinessPlace();
    }

    render() {
        return (
        <CustomBlockWrapper
            title="내 정보"
        >
            <List>
                <ListItem selected onPress={ this._onPress }>
                    <Left>
                        <Text>사업장</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem>
                    <Left>
                        <Text>Nathaniel Clyne</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            </List>
        </CustomBlockWrapper>
        )
    }
}