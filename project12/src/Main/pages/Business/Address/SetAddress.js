import React, { Component } from 'react';

import { Container, Text, Button, Content, Item, Input, Label, ListItem, Body, Form } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import DrawMap from '../../../components/DrawMap';
import { connect } from 'react-redux';
import { setBizAddress, setBizAddressDsc } from '../../../../REDUX/actions';
import regBizPlace from '../../../functions/RegBizPlace';

const ADDRESS_DETAIL_LEN = 1;

class SetAddress extends Component {
    constructor(props) {
      super(props);

      this.state = {
          lat : '',
          lng : '',
          addressName : '',
          makerYn : false,
          disSaveBtn : true,
          detailAddressName : '',
          addressObj : []
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
    // param : this.onResult => 주소 결과 값 리턴
    _goInputAddress = () => (
        Actions.InputAddress({onResult : this.onResult}) 
    )

    // 주소검색 후 결과 데이터
    onResult = (address) => {
        this.setState({
            lng : address.result.x, 
            lat : address.result.y,
            addressName : address.result.address_name,
            makerYn : true,
            addressObj : address.result,
            disSaveBtn : (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true
        });
    }

    // 주소 저장 버튼 활성화 여부
    _handleChange = (text) => {
        this.setState({detailAddressName : text})

        if(this.state.addressName !== '') {
            this.setState({disSaveBtn : (this.state.detailAddressName.length > ADDRESS_DETAIL_LEN) ? false : true})
        }
    }

    // 사업장 저장
    async _SaveButton() {
        await this.props.onSetBizAddress(this.state.addressObj);  // 리덕스 주소 오브젝트 SET
        await this.props.onSetBizAddressDsc(this.state.detailAddressName);  // 리덕스 상세주소 SET

        regBizPlace(this.props.value).then(result => {
            console.log(result);
        });
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
                                    <Input onChangeText={this._handleChange}></Input>
                                </Body>
                            </ListItem>
                            <Button block dark 
                                disabled={this.state.disSaveBtn} 
                                onPress={() => this._SaveButton()}
                                >
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

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizAddress: (value) => dispatch(setBizAddress(value)),
        onSetBizAddressDsc: (value) => dispatch(setBizAddressDsc(value))
    }
}
  
SetAddress = connect(mapStateToProps, mapDispatchToProps)(SetAddress);
export default SetAddress;