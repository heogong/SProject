import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from "native-base";
import CustomButton from '../../Common/Components/CustomButton';

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
            <CustomButton
                styleWidth= { false }
                light={ !this.state.btnClick }
                onPress={ this._handleBtnClick }
                marginSize={ 5 }
            >
                <Text style= {{color: 'black'}}>{ this.props.text }</Text>
            </CustomButton>
        )
    }
}

export default SelectButton;