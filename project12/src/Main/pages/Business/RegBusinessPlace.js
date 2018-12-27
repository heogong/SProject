import React, { Component } from 'react';
import { View } from 'react-native';

import { 
    Form,
    Container, 
    Item, 
    Input, 
    Button, 
    Content,
    Text, 
    Textarea
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizNm, setBizDsc } from '../../../Redux/Actions';
import CustomBlockWrapper from '../../../Common/Components/CustomBlockWrapper';
import CustomButton from '../../../Common/Components/CustomButton';
  
let propsData = false; // 데이터 유무 (조회일 경우에는 데이터 존재)

class RegBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizNm : '',
          bizDsc : ''
      };
    }

    // 사업장 수정시 참고
    // componentDidMount() {
    //     //console.log(this.props.bizPlace);
    //     propsData = (this.props.bizPlace !== undefined ) ? true : false;

    //     if(propsData) {
    //         this.setState({
    //             bizNm : this.props.bizPlace.bplaceNm,
    //             bizDsc : this.props.bizPlace.bplaceDsc
    //         });
    //     }
    // }

    _NextButton = () => {
        this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET

        Actions.SetAddress();

        // if(propsData) {
        //     Actions.SetAddress({bizPlace : this.props.bizPlace});
        // } else {
        //     Actions.SetAddress();
        // }
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
                <Textarea 
                    value={this.state.bizDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="사업장 설명"
                    onChangeText={(text) => this.setState({bizDsc : text})}
                />
                <CustomButton 
                    styleWidth= { false }
                    block={ true }
                    info={ true }
                    bordered={ true }
                    onPress={this._NextButton} >
                    <Text>다음</Text>
                </CustomButton>
                
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