import React, { Component } from "react";
import { View } from "react-native"
import { ActionSheet, Container, Button, Content, Item, Input, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerWork from '~/FirstScreen/Functions/RegPartnerWork';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import SelectButton from "~/Common/Components/SelectButton";

class InputWorkHours extends Component {
    constructor(props) {
      super(props);

      this.SelectButton = [];

      this.state = {
          mockData : [
              { text : "월", value : "mon" },
              { text : "화", value : "tue" },
              { text : "수", value : "wed" },
              { text : "목", value : "thu" },
              { text : "금", value : "fri" },
              { text : "토", value : "sat" },
              { text : "일", value : "sun" },
          ],
          data :[],
          fullBtnLight : true, //
          fullBtnWarning : false,
          fullTimeYn : false,
          workStTime : '0000',
          workEdTime : '2400',
          monWorkYn : 'N',
          tueWorkYn : 'N',
          wedWorkYn : 'N',
          thuWorkYn : 'N',
          friWorkYn : 'N',
          satWorkYn : 'N',
          sunWorkYn : 'N',
          holidayWorkYn : 'N',
          fullWorkYn : 'N'
        };
    }


    // 선택된 데이터 값 변경 - 요일:Y
    _setData = async (value) => {

        switch (value) {
            case 'mon' : this.setState({monWorkYn : 'Y'}); break;
            case 'tue' : this.setState({tueWorkYn : 'Y'}); break;
            case 'wed' : this.setState({wedWorkYn : 'Y'}); break;
            case 'thu' : this.setState({thuWorkYn : 'Y'}); break;
            case 'fri' : this.setState({friWorkYn : 'Y'}); break;
            case 'sat' : this.setState({satWorkYn : 'Y'}); break;
            case 'sun' : this.setState({sunWorkYn : 'Y'}); break;
            default : this.setState({monWorkYn : 'Y'}); break;
        }

        await this.setState({ data: this.state.data.concat([{ value: value}]) });

        this._chkFullBtn();
    }
    
    // 해제된 데이터 값 변경 - 요일:N
    _cancleData = async (value) => {
        switch (value) {
            case 'mon' : this.setState({monWorkYn : 'N'}); break;
            case 'tue' : this.setState({tueWorkYn : 'N'}); break;
            case 'wed' : this.setState({wedWorkYn : 'N'}); break;
            case 'thu' : this.setState({thuWorkYn : 'N'}); break;
            case 'fri' : this.setState({friWorkYn : 'N'}); break;
            case 'sat' : this.setState({satWorkYn : 'N'}); break;
            case 'sun' : this.setState({sunWorkYn : 'N'}); break;
            default : this.setState({monWorkYn : 'N'}); break;
        }

        await this.setState({ data: this.state.data.filter((item, sidx) => item.value !== value) });

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
        this._regPartnerWork();
    }

    // 풀타임 버튼 클릭
    _handleFullBtnClick = () => {
        //console.log(this.SelectButton);

        this.setState({
            fullBtnLight : (this.state.fullBtnLight) ? false : true,
            fullBtnWarning : (this.state.fullBtnWarning) ? false : true,
            fullTimeYn : (this.state.fullTimeYn) ? false : true,
            fullWorkYn : (this.state.fullWorkYn == 'Y') ? 'N' : 'Y'
        });

        this.SelectButton.map((button) => {
            button._handleBtnClick();
        });
      
    }

    // 파트너 근무 정보 등록
    _regPartnerWork = () => {
        RegPartnerWork(this.state).then(result => {
            GetCommonData(result, this._regPartnerWork).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.JoinInputSettleAccount(); // 은행계좌등록 페이지
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            <Container>
                <Content padder >
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        {this.state.mockData.map((data, idx) => (
                            <SelectButton 
                                value={data.value}
                                text={data.text}
                                addDataArray={ this._setData }
                                removeDataArray={ this._cancleData }
                                key={ idx }
                                fullTime={ this.state.fullTimeYn }
                                ref={ ref => {
                                    this.SelectButton[idx] = ref;
                                }}
                            />
                        ))}
                    </View>
                    {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}

                        <Item regular>
                            <Input 
                                onChangeText={ (text) => this.setState({workStTime : text}) }
                                value={this.state.text}
                                placeholder='00'
                                keyboardType='numeric'
                                maxLength={4}
                            />
                        </Item>
                        <Item regular>
                            <Input 
                                onChangeText={ (text) => this.setState({workEdTime : text}) }
                                value={this.state.text}
                                placeholder='24'
                                keyboardType='numeric'
                                maxLength={4}
                            />
                        </Item>

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
                    {/* </View> */}
                
                    <CustomButton
                        block={ true }
                        info={ true }
                        onPress={ this._nextBtn }
                        disabled={ this.state.btnDisabled }>
                        <Text>
                            다음단계로 이동 (4/5)
                        </Text>
                    </CustomButton>
                    
                </Content>
            </Container>
        )
    }
}

export default InputWorkHours;