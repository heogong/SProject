import React, { Component } from "react";
import { PixelRatio, TouchableOpacity, View } from "react-native"
import { ActionSheet, Container, Button, Content, Item, Input, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerWork from '~/FirstScreen/Functions/RegPartnerWork';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import SelectButton from "~/Common/Components/SelectButton";

import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';

const ST_TYPE = 'work_st'; // 시작 시간 클릭 여부
const ED_TYPE = 'work_ed'; // 종료 시간 클릭 여부

class InputWorkHours extends Component {
    constructor(props) {
      super(props);

      this.DateTimePicker = null;
      this.onPress = this._showDateTimePicker.bind(this);

      this.SelectButton = []; // 선택된 요일

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
          fullBtnLight : true, // 풀타임 비활성화
          fullBtnWarning : false, // 풀타임 활성화
          btnDisabled : true, // 다음단계 버튼 활성화 여부
          monWorkYn : 'N',
          tueWorkYn : 'N',
          wedWorkYn : 'N',
          thuWorkYn : 'N',
          friWorkYn : 'N',
          satWorkYn : 'N',
          sunWorkYn : 'N',
          holidayWorkYn : 'N',
          fullWorkYn : 'N',
          isDateTimePickerVisible: false, // 타임 picker 보임 여부
          setTime : '01/01/0000 09:00:00', // 타임 picker 기본 데이터
          stHour : '09',
          stMin : '00',
          edHour : '18',
          edMin : '00',
          timeType : ST_TYPE, // 시작시간, 종료시간 구분 값
          spinner: false // 로딩
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

    // 요일 풀타임 여부 확인
    _chkFullBtn = () => {
        //console.log("_chkFullBtn : ",this.state.data.length);

        if(this.state.data.length == 7) {
            this.setState({
                fullBtnLight : false,
                fullBtnWarning : true,
                btnDisabled : false
            });
        } else {
            if(this.state.data.length == 0) {
                this.setState({
                    btnDisabled : true
                });
            } else {
                this.setState({
                    fullBtnLight : true,
                    fullBtnWarning : false,
                    btnDisabled : false
                });
            }
        }
    }

    // 풀타임 버튼 클릭
    _handleFullBtnClick = () => {
        // console.log(this.SelectButton);
        //this.setState({spinner : true});

        const {fullBtnLight, fullBtnWarning, fullWorkYn, holidayWorkYn} = this.state;

        this.setState({
            fullBtnLight : (fullBtnLight) ? false : true,
            fullBtnWarning : (fullBtnWarning) ? false : true,
            fullWorkYn : (fullWorkYn == 'Y') ? 'N' : 'Y',
            holidayWorkYn : (holidayWorkYn == 'Y') ? 'N' : 'Y',
            stHour : '00',
            stMin : '00',
            edHour : '24',
            edMin : '00',
        });

        if(this.state.fullBtnWarning) {
            this.SelectButton.map((button) => {
                button._handleFullRemoveBtn();
            });
        } else {
            this.SelectButton.map((button) => {
                button._handleFullAddBtn();
            });
        }

        //this.setState({spinner : false });
    }

    // 타임 picker 표시
    _showDateTimePicker = (type) => () => {
        const {stHour, stMin, edHour, edMin} = this.state;

        // 시작 시간 클릭 시
        if(type == ST_TYPE) {
          this.setState({ 
            isDateTimePickerVisible: true,
            setTime : `01/01/0000 ${stHour}:${stMin}:00`,
            timeType : type
          });
        } else { // 종료 시간 클릭 시
          this.setState({ 
            isDateTimePickerVisible: true,
            setTime : `01/01/0000 ${edHour}:${edMin}:00`,
            timeType : type
          });
        }
    }

    // 타임 picker 숨김
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    // 타임 picker 확인
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        //console.log(this.DateTimePicker.props.type);

        var d = new Date(date);

        // 시작 시간 클릭 시
        if(this.DateTimePicker.props.type == ST_TYPE) {
            this.setState({ 
                stHour : this.pad(d.getHours(), 2),
                stMin : this.pad(d.getMinutes(), 2)
            });
        } else {// 종료 시간 클릭 시
            this.setState({ 
                edHour : this.pad(d.getHours(), 2),
                edMin : this.pad(d.getMinutes(), 2)
            });
        }
        this._hideDateTimePicker();
    };


    // 파트너 근무 정보 등록
    _regPartnerWork = () => {
        console.log(this.state);
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

    // 시간 2자리 표시
    pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    // next
    _nextBtn = () => {
        this._regPartnerWork();
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
                                ref={ ref => {
                                    this.SelectButton[idx] = ref;
                                }}
                            />
                        ))}
                    </View>
                    {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}

                        <TouchableOpacity onPress={this._showDateTimePicker(ST_TYPE)}>
                            <View style={{borderColor: '#9B9B9B', borderWidth: 1 / PixelRatio.get()}}>
                                <Text>시작시간</Text>
                                <Text>{`${this.state.stHour}:${this.state.stMin}`}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._showDateTimePicker(ED_TYPE)}>
                            <View style={{borderColor: '#9B9B9B', borderWidth: 1 / PixelRatio.get()}}>
                                <Text>종료시간</Text>
                                <Text>{`${this.state.edHour}:${this.state.edMin}`}</Text>
                            </View>
                        </TouchableOpacity>

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
                    
                    {/* 로딩 */}
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Loading...'}
                        style={{color: '#FFF'}}
                    />
                </Content>
                
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    datePickerModeAndroid='spinner'
                    is24Hour={true}
                    date={ new Date(this.state.setTime) }
                    type={this.state.timeType}
                    ref={ref => {
                        this.DateTimePicker = ref;
                    }}
                />
            </Container>
        )
    }
}

export default InputWorkHours;