import React, { Component } from "react";

import { Container, Button, Content, Text } from "native-base";
import SelectButton from "../../../Components/SelectButton";

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          mockData : [
              { text : "aaaa", value : "aaaa" },
              { text : "bbbb", value : "bbb" },
              { text : "cccc", value : "ccc" },
              { text : "dddd", value : "ddd" },
              { text : "eeee", value : "eee" },
              { text : "ffff", value : "fff" },
              { text : "gggg", value : "ggg" },
              { text : "hhhh", value : "hhh" },
              { text : "iiii", value : "iii" },
              { text : "jjjj", value : "jjj" }
          ],
          data : []
        };
    }

     // 선택된 데이터 array 추가
    _addDataArray = async (value) => {
        await this.setState({ data: this.state.data.concat([{ value: value}]) });

        console.log("_addDataArray : ",this.state.data);
    }
    
    // 해제된 데이터 array 제거
    _removeDataArray = async (value) => {
        await this.setState({ data: this.state.data.filter((item, sidx) => item.value !== value) });

        console.log("_removeDataArray : ",this.state.data);
    }

    // next
    _onPress = () => {
        console.log("result : ",this.state.data);
    }

    render() {
        return (
            <Container>
                <Content padder>
                    {this.state.mockData.map((data, idx) => (
                        <SelectButton 
                            value={data.value}
                            text={data.text}
                            addDataArray={ this._addDataArray }
                            removeDataArray={ this._removeDataArray }
                        />
                    ))}
                    <Button 
                        rounded 
                        success 
                        bordered 
                        block
                        onPress={ this._onPress }>
                        <Text>다음</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default InputProdType;