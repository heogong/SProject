import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import DrawMap from '../../components/DrawMap';


class SelectMapAddress extends Component {
    constructor(props) {
      super(props);

      this.state = { address : this.props.addressInfo };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.address.address_name}</Text>
                <DrawMap
                    lat={this.state.address.y}
                    lng= {this.state.address.x}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default SelectMapAddress;