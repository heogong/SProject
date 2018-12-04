import React, { Component } from 'react';

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
import { setBizNm, setBizDsc } from '../../../REDUX/actions';
  

class RegBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizNm : '테스트 사업장',
          bizDsc : '사업장 설명입니다.'
      };
    }

    _NextButton = () => {
        this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET
        Actions.SetAddress();
    }

    render() {
        return (
            <Container>
                <Content>
                    <Item rounded>
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
                    <Button rounded block dark onPress={this._NextButton} disabled={false}>
                        <Text>다음</Text>
                    </Button>
                </Content>
                
            </Container>
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