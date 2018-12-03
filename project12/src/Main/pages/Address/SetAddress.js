import React, { Component } from 'react';

import { Container, Text, Button, Content, Item, Input, Label, ListItem, Body, Form } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import DrawMap from '../../components/DrawMap';


class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = {
          lat : '',
          lng : '',
          addressName : '',
          makerYn : false,
          disSaveBtn : true,
          detailAddressName : ''
        };
    }

    // 초기 데이터 1. 리덕스 값 조회 2. 현재 위치 조회 3. default 값 조회 
    componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (pos) => {
                this.setState({
                    lng : pos.coords.longitude, 
                    lat : pos.coords.latitude
                });
            }
        )
    }

    _goInputAddress = () => (
        Actions.InputAddress({onResult : this.onResult})
    )

    // 주소검색 후 결과 데이터
    onResult = (address) => {
        this.setState({
            lng : address.result.x, 
            lat : address.result.y,
            addressName : address.result.address_name,
            makerYn : true
        });
    }

    _handleChange() {

    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ height: 250 }}>
                        <Content>
                            <ListItem onPress={this._goInputAddress}>
                                <Body>
                                    <Label>주소</Label>
                                    <Input disabled>{this.state.addressName}</Input>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <Text>상세주소</Text>
                                    {/* <Input onChangeText={(text) => this.setState({detailAddressName : text, disSaveBtn : false})}></Input> */}
                                    <Input onChange={this._handleChange}></Input>
                                </Body>
                            </ListItem>
                            <Button block dark disabled={this.state.disSaveBtn}>
                                <Text>주소 저장</Text>
                            </Button>
                        </Content>

                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 350 }}>
                        <DrawMap
                            lat={this.state.lat}
                            lng={this.state.lng}
                            makerYn={this.state.makerYn}
                        />
                    </Row>
                </Grid>
            </Container>
        )
    }
}
export default SetAddress;