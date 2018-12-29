import React, { Component } from "react";
import { View } from "react-native"

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';

import { ActionSheet, Container, Button, Content, Icon, Root, Text } from "native-base";
import SelectButton from "../../../Components/SelectButton";
import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';

class InputWorkHours extends Component {
    constructor(props) {
      super(props);

      this.SelectButton = [];

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
          fullBtnLight : true, //
          fullBtnWarning : false,
          fullTimeYn : false
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

        //await console.log("_addDataArray : ",this.state.data);

        this._chkFullBtn();
    }
    
    // 해제된 데이터 array 제거
    _removeDataArray = async (value) => {
        await this.setState({ data: this.state.data.filter((item, sidx) => item.value !== value) });

       // console.log("_removeDataArray : ",this.state.data);
       this._chkFullBtn();
    }


    _chkFullBtn = () => {
        console.log("_chkFullBtn : ",this.state.data.length);

        if(this.state.data.length !== 7) {
            this.setState({
                fullBtnLight : true,
                fullBtnWarning : false,
            });
        } else {
            this.setState({
                fullBtnLight : false,
                fullBtnWarning : true,
            });
        }
    }

    // next
    _nextBtn = () => {
        console.log("result : ",this.state.data);
        //this._regPartnerWork(); 개발중
    }

    // 파트너 근무 정보 등록
    _regPartnerWork = () => {
        RegPartnerWork(this.state.data).then(result => {
            GetCommonData(result, this._regPartnerWork).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {

                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 풀타임 버튼 클릭
    _handleFullBtnClick = () => {
        //console.log(this.SelectButton);

        this.setState({
            fullBtnLight : (this.state.fullBtnLight) ? false : true,
            fullBtnWarning : (this.state.fullBtnWarning) ? false : true,
            fullTimeYn : (this.state.fullTimeYn) ? false : true
        });

        this.SelectButton.map((button) => {
            button._handleBtnClick();
        });
      
    }

    render() {
        return (
            <Root>
                <Container>
                    <Content padder >
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            {this.state.mockData.map((data, idx) => (
                                <SelectButton 
                                    value={data.value}
                                    text={data.text}
                                    addDataArray={ this._addDataArray }
                                    removeDataArray={ this._removeDataArray }
                                    key={ idx }
                                    fullTime={ this.state.fullTimeYn }
                                    ref={ ref => {
                                        this.SelectButton[idx] = ref;
                                    }}
                                />
                            ))}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                            <CustomButton
                                block={ true }
                                light={ this.state.fullBtnLight }
                                warning= { this.state.fullBtnWarning }
                                icon={ true }
                                styleWidth={ false }
                                marginSize={ 0 }
                                onPress={ this._handleFullBtnClick }
                            >
                                <Icon name='md-build' />
                                <Text>
                                    풀타임
                                </Text>
                            </CustomButton>
                        </View>
                    
                        <CustomButton
                            block={ true }
                            info={ true }
                            onPress={ this._nextBtn }
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