import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

import { Container, Text, Button, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import DrawMap from '../../../components/DrawMap';


class SelectMapAddress extends Component {
    constructor(props) {
      super(props);

      this.state = { address : this.props.addressInfo };
    }
    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ backgroundColor: '#635DB7', height: 450 }}>
                        <DrawMap
                            lat={this.state.address.y}
                            lng= {this.state.address.x}
                        />
                    </Row>
                    <Row style={{ height: 200 }}>
                        <Content>
                            <Text>{this.state.address.address_name}</Text>
                            <Text>{(this.state.address.road_address != null) ? this.state.address.road_address.address_name : ''}</Text>
                            <Button block dark>
                                <Text>장소 선택하기</Text>
                            </Button>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        )
    }
}
export default SelectMapAddress;