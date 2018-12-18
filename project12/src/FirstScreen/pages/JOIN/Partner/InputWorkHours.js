import React, { Component } from "react";
import { View } from "react-native"

import { ActionSheet, Container, Button, Content, Root, Text } from "native-base";
import SelectButton from "../../../Components/SelectButton";
import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';

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
          data : [],
          hour : [],
          selectIndex : 0,
          startHourTitle : "시작시간",
          endHourTitle : "종료시간",
        };
    }

    // 시간 set
    async componentDidMount() {
        for(let i = 0; i < 24; i++) {
            await this.setState({hour : this.state.hour.concat([ { text : i, value : i}]) });
        }
        
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
            <Root>
                <Container>
                    <Content padder >
                        <View style={{flexDirection: 'row'}}>
                            {this.state.mockData.map((data, idx) => (
                                <SelectButton 
                                    value={data.value}
                                    text={data.text}
                                    addDataArray={ this._addDataArray }
                                    removeDataArray={ this._removeDataArray }
                                    key={ idx }
                                />
                            ))}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                    {
                                        options: this.state.hour,
                                        cancelButtonIndex: this.state.selectIndex,
                                        title: "시작 시간"
                                    },
                                    buttonIndex => {
                                        this.setState({ startHourTitle: this.state.hour[buttonIndex].text });
                                        this.setState({ selectIndex : buttonIndex });
                                        //this.setState({ selectYn : true });
                                    }
                                )}
                                >
                                <Text>{this.state.startHourTitle}</Text>
                            </Button>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                    {
                                        options: this.state.hour,
                                        cancelButtonIndex: this.state.selectIndex,
                                        title: "종료 시간"
                                    },
                                    buttonIndex => {
                                        this.setState({ endHourTitle: this.state.hour[buttonIndex].text });
                                        this.setState({ selectIndex : buttonIndex });
                                        //this.setState({ selectYn : true });
                                    }
                                )}
                                >
                                <Text>{this.state.endHourTitle}</Text>
                            </Button>
                        </View>
                    
                        <CustomButton
                            block={ true }
                            info={ true }
                            onPress={ this._nextPress }
                            disabled={ this.state.btnDisabled }>
                            <Text>
                                NEXT
                            </Text>
                        </CustomButton>
                        
                    </Content>
                </Container>
            </Root>
        )
    }
}

export default InputWorkHours;