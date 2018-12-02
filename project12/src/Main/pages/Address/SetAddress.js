import React, { Component } from 'react';

import { Container, Text, Button, Content, Item, Input, Label, ListItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import DrawMap from '../../components/DrawMap';


class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = {
          lat : '',
          lng : '' 
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (pos) => {
                this.setState({
                    lng : pos.coords.longitude, 
                    lat : pos.coords.latitude,
                });
            }
        )
    }

    _goInputAddress = () => (
        Actions.InputAddress({onResult : this.onResult})
    )

    // 결과는 정상인데 set이 이상함 확인 필요
    onResult = (addressInfo) => {
        console.log(addressInfo);

        this.setState({
            lng : addressInfo.y, 
            lat : addressInfo.x,
        });

        console.log(this.state);
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ height: 150 }}>
                        <Content>
                            <ListItem onPress={this._goInputAddress}>
                                <Body>
                                    <Text>주소</Text>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text>상세주소</Text>
                                </Body>
                            </ListItem>
                        </Content>
                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 500 }}>
                        <DrawMap
                            lat={this.state.lat}
                            lng={this.state.lng}
                            makerYn={false}
                        />
                    </Row>
                    
                </Grid>
            </Container>
        )
    }
}
export default SetAddress;