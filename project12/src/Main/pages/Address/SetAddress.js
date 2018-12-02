import React, { Component } from 'react';

import { Container, Text, Button, Content, Item, Input, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import DrawMap from '../../components/DrawMap';


class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = { position : '' };
      
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (position) => {
                this.setState({position : position});
                console.log(this.state.position);
            }
        )
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ height: 150 }}>
                        <Content>
                            <Item fixedLabel>
                                <Label onPress={Actions.InputAddress}>주소</Label>
                                <Input />
                            </Item>
                            <Item fixedLabel>
                                <Label>상세주소</Label>
                                <Input />
                            </Item>
                        </Content>
                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 500 }}>
                        <DrawMap makerYn={false}/>
                    </Row>
                    
                </Grid>
            </Container>
        )
    }
}
export default SetAddress;