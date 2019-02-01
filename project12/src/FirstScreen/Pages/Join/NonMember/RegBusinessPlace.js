import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input, Text, Textarea} from 'native-base';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizNm, setBizDsc } from '~/Redux/Actions';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';
  
class RegBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizNm : '',
          bizDsc : '',
          bizData : []
      };
    }

    _nextButton = async () => {
        await this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        Actions.SetAddress(); // 등록 시
    }

    render() {
        return (
            <CustomBlockWrapper
                title="사업장 등록"
            >
                <Item regular>
                    <Input
                        value={this.state.bizNm}
                        placeholder='사업장명'
                        onChangeText={(text) => this.setState({bizNm : text})}
                    />
                </Item>
            </CustomBlockWrapper>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizNm: (value) => dispatch(setBizNm(value)),
        onSetBizDsc: (value) => dispatch(setBizDsc(value))
    }
}
RegBusinessPlace = connect(undefined, mapDispatchToProps)(RegBusinessPlace);

export default RegBusinessPlace;