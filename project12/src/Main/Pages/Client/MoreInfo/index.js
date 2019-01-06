import React, { Component } from 'react';
import{ Alert, View, TouchableOpacity } from 'react-native';

import { Accordion, Right, Left, List, ListItem, Icon, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

const dataArray = [
    { title: "사업장", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

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
            padder={ false }
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

            {/* <Accordion
                dataArray={dataArray}
            /> */}
        </CustomBlockWrapper>
        )
    }
}