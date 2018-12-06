import React, { Component } from "react";

import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

class InputProdInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        productNm: '',
        shareholders: [{ productNm: '' }],
      };
    }

    static renderRightButton = (props) => {
        console.log(props);
        return (
            <Button rounded onPress={() => console.log(this._handleSubmit2)}><Text>저장</Text></Button>
        );
    }

    _handleShareholderNameChange = (idx) => (text) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, productNm: text };
        });
        
        this.setState({ shareholders: newShareholders });
    }

    _handleAddShareholder = () => {
        this.setState({ shareholders: this.state.shareholders.concat([{ productNm: '' }]) });
    }
    
    _handleRemoveShareholder = (idx) => () => {
        if(idx != 0) {
            this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
        } else {
            alert('첫 번째 값 삭제 못함');
        }
    }

    _handleSubmit = () => {
        const { productNm, shareholders } = this.state;
        console.log(shareholders);
    }
    _handleSubmit2 = () => {
        alert("dd");
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.shareholders.map((shareholder, idx) => (
                        <Content>
                            <Item rounded>
                                <Input
                                    placeholder={`Shareholder #${idx + 1} name`}
                                    value={shareholder.productNm}
                                    onChangeText={this._handleShareholderNameChange(idx)}
                                    key={idx}
                                />
                                <Icon onPress={this._handleRemoveShareholder(idx)} active name='ios-remove-circle-outline' />
                            </Item>
                            {/* <Button onPress={this._handleRemoveShareholder(idx)}><Text>-</Text></Button> */}
                        </Content>
                    ))}
                    <Button rounded success onPress={this._handleAddShareholder}><Text>+</Text></Button>
                    <Button rounded onPress={this._handleSubmit}><Text>저장</Text></Button>
                </Content>
            </Container>
        )
    }
}

export default InputProdInfo;