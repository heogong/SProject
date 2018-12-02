import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

import { Container, Text, Button, Content, Item, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import DrawMap from '../../components/DrawMap';


class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = { position : '' };
      
    }

    componentDidMount() {
        alert(1)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({position : position});
            }
        )

    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ height: 200 }}>
                        <Content>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" />
                        </Item>
                        </Content>
                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 450 }}>
                        {/* <DrawMap
                            lat={this.state.coords.latitude}
                            lng={this.state.coords.longitude}
                        /> */}
                    </Row>
                    
                </Grid>
            </Container>
        )
    }
}
export default SetAddress;