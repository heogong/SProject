import React, { Component } from 'react';

import { Button, Content, Text, Thumbnail, Icon } from "native-base";

class SelectButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
          btnClick : false
      };
    }

    _handleBtnClick = () => {
        this.setState({btnClick : (this.state.btnClick) ? false : true});

        if(!this.state.btnClick) {
            this.props.addDataArray(this.props.value);
        } else {
            this.props.removeDataArray(this.props.value);
        }
    }

    render() {
        return (
            <Content>
                <Button
                    bordered 
                    light={ !this.state.btnClick }
                    onPress={ this._handleBtnClick }
                >
                    <Text>{ this.props.text }</Text>
                </Button>
            </Content>
        )
    }
}

export default SelectButton;