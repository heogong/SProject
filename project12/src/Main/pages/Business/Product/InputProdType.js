import React, { Component } from "react";

import { Root, Container, Button, Content, ActionSheet, Text } from "native-base";
import { Actions } from 'react-native-router-flux';
import GetProdType from '../../../Functions/GetProdType';

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          buttonTitle : '유형 선택',
          selectIndex : 0,
          selectYn : false, // 제품 타입 선택 여부
          BUTTONS : [
              { text : "데이터가 없습니다.", typeId : ''}
          ]
        };
    }

    componentDidMount() {
        GetProdType().then(result => {
            //console.log(result.data);
            //this.setState({BUTTONS : result.data});

            const prodSet =  result.data.map((prod) => {
                //console.log(prod);
                return { ...prod, text : prod.prdTypeKoNm, typeId : prod.prdTypeId };
            });

            this.setState({ BUTTONS: prodSet });
        });
    }

    _onPress = () => {
        Actions.InputProdInfo({
            prodTypeId : this.state.BUTTONS[this.state.selectIndex].typeId,
            prodTypeNm : this.state.BUTTONS[this.state.selectIndex].text
        })
    }

    render() {
        return (
            <Root>
                <Container>
                    <Content padder>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                {
                                    options: this.state.BUTTONS,
                                    cancelButtonIndex: this.state.selectIndex,
                                    title: "제품유형"
                                },
                                buttonIndex => {
                                    this.setState({ buttonTitle: this.state.BUTTONS[buttonIndex].text });
                                    this.setState({ selectIndex : buttonIndex });
                                    this.setState({ selectYn : true });
                                }
                            )}
                        >
                            <Text>{this.state.buttonTitle}</Text>
                        </Button>
                        <Content padder>
                            <Button rounded success bordered block 
                                onPress={this._onPress}
                                disabled={!this.state.selectYn}
                            ><Text>다음</Text>
                            </Button>
                        </Content>
                    </Content>
                </Container>
            </Root>
        )
    }
}

export default InputProdType;