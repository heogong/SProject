import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from "native-base";
import CustomButton from '~/Common/Components/CustomButton';

class SelectButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
          btnClick : false
      };
    }
    _handleBtnClick = async () => {
        await this.setState({btnClick : (this.state.btnClick) ? false : true});

        if(this.state.btnClick) {
            this.props.addDataArray(this.props.value);
        } else {
            this.props.removeDataArray(this.props.value);
        }
        
    }

    _handleFullAddBtn = async () => {
        await this.setState({btnClick : true});
        await this.props.removeDataArray(this.props.value);
        await this.props.addDataArray(this.props.value);
    }

    _handleFullRemoveBtn = async () => {
        await this.setState({btnClick : false});
        this.props.removeDataArray(this.props.value);
    }

    render() {
        return (
            <CustomButton
                styleWidth= { false }
                light={ !this.state.btnClick }
                onPress={ this._handleBtnClick }
                marginSize={ 2 }
            >
                <Text style= {{color: 'black'}}>{ this.props.text }</Text>
            </CustomButton>
        )
    }
}

export default SelectButton;