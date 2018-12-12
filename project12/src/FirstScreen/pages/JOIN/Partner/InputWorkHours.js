import React, { Component } from "react";

import { Container, Button, Content, Text } from "native-base";
import SelectButton from "../../../components/SelectButton";

class InputWorkHours extends Component {
    constructor(props) {
      super(props);

      this.state = {
          mockData : [
              { text : "월", value : "aaaa" },
              { text : "화", value : "bbb" },
              { text : "수", value : "ccc" },
              { text : "목", value : "ddd" },
              { text : "금", value : "eee" },
              { text : "토", value : "fff" },
              { text : "일", value : "ggg" },
          ],
          data : []
        };
    }

    _addDataArray = async (value) => {
        await this.setState({ data: this.state.data.concat([{ value: value}]) });

        console.log("_addDataArray : ",this.state.data);
    }
    
    _removeDataArray = async (value) => {
        await this.setState({ data: this.state.data.filter((item, sidx) => item.value !== value) });

        console.log("_removeDataArray : ",this.state.data);
    }

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

export default InputWorkHours;