import React, { Component } from "react";

import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import regProdInfo from '../../../functions/RegProdInfo'

class InputProdInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        clientPrdNm: '',
        shareholders: [{ clientPrdNm: '', imgType: [] }] // imgType : 다음 페이지 이미지 타입 초기화 값(안해주면 다음 페이지 오류)
      };
    }

    componentWillMount() {
        this.props.navigation.setParams({
            'onRight': this._handleSubmit
        })
    }

    _handleNameChange = (text) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            return (sidx == 0) ? { ...shareholder, clientPrdNm: text } : shareholder;
        });

        this.setState({ clientPrdNm: text });
        this.setState({ shareholders: newShareholders });
    }

    _handleShareholderNameChange = (idx) => (text) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, clientPrdNm: text };
        });
        
        this.setState({ shareholders: newShareholders });
    }

    _handleAddShareholder = () => {
        this.setState({ shareholders: this.state.shareholders.concat([{ clientPrdNm: '', imgType: [] }]) });
    }
    
    _handleRemoveShareholder = (idx) => () => {
        this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
    }

    _handleSubmit = () => {
        const { clientPrdNm, shareholders } = this.state;
        // console.log(shareholders);
        // console.log(this.props.value);

        // regProdInfo(this.props.value, this.props.typeId, shareholders).then(result => {
        //     console.log(result.data);
        // });

        Actions.InputProdImage({prodInfo : shareholders});
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Item rounded>
                        <Input
                            placeholder={this.props.prodTypeNm}
                            value={this.state.clientPrdNm}
                            onChangeText={this._handleNameChange}
                        />
                    </Item>
                    <Content padder>
                        <Button rounded success onPress={this._handleAddShareholder}><Text>+</Text></Button>
                    </Content>
                    {this.state.shareholders.map((shareholder, idx) => (
                        <Content padder style={(idx !== 0) ? styles.show : styles.hide }>
                            <Item rounded>
                                <Input
                                    placeholder={`${this.props.prodTypeNm}${idx + 1}`}
                                    value={shareholder.clientPrdNm}
                                    onChangeText={this._handleShareholderNameChange(idx)}
                                    key={idx}
                                />
                                <Icon onPress={this._handleRemoveShareholder(idx)} active name='ios-remove-circle-outline' />
                            </Item>
                            {/* <Button onPress={this._handleRemoveShareholder(idx)}><Text>-</Text></Button> */}
                        </Content>
                    ))}
                    {/* <Button rounded onPress={this._handleSubmit}><Text>저장</Text></Button> */}
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputProdInfo = connect(mapStateToProps, undefined)(InputProdInfo);
export default InputProdInfo;