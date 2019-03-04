import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Container, Text, CheckBox} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import GetCommonData from '~/Common/Functions/GetCommonData';
import RegPartnerWork from '~/FirstScreen/Functions/RegPartnerWork';
import SelectWeekDay from "~/Main/Components/SelectWeekDay";

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";


const ST_TYPE = 'work_st'; // 시작 시간 클릭 여부
const ED_TYPE = 'work_ed'; // 종료 시간 클릭 여부
const MOCK_DATA = [
    { text : "월", value : "mon" },
    { text : "화", value : "tue" },
    { text : "수", value : "wed" },
    { text : "목", value : "thu" },
    { text : "금", value : "fri" },
    { text : "토", value : "sat" },
    { text : "일", value : "sun" },
]
let BUSINESS_DAY = {
    monWorkYn : 'N',
    tueWorkYn : 'N',
    wedWorkYn : 'N',
    thuWorkYn : 'N',
    friWorkYn : 'N',
    satWorkYn : 'N',
    sunWorkYn : 'N',
    holidayWorkYn : 'N',
    fullWorkYn : 'N'
}

let TIME_TYPE = ST_TYPE;
let SELECT_BUTTON = []; // 요일 버튼 객체 배열 
let SELECT_DATA = []; // 선택된 날짜 배열

class InputWorkHours extends Component {
    constructor(props) {
      super(props);

      this.DateTimePicker = null;
      this._showDateTimePicker = this._showDateTimePicker.bind(this);
      this._handleFullBtnClick = this._handleFullBtnClick.bind(this);

    //   this.SelectButton = []; // 선택된 요일

      this.state = {
          fullBtnLight : true, // 풀타임 비활성화
          fullBtnWarning : false, // 풀타임 활성화
          btnDisabled : true, // 다음단계 버튼 활성화 여부
          isDateTimePickerVisible: false, // 타임 picker 보임 여부
          setTime : '01/01/0000 09:00:00', // 타임 picker 기본 데이터
          stHour : '09',
          stMin : '00',
          edHour : '18',
          edMin : '00',
          spinner: false, // 로딩
          checkBox : false
        };
    }

    // 선택된 데이터 값 변경 - 요일:Y
    _setData = (value) => {

        switch (value) {
            case 'mon' : BUSINESS_DAY.monWorkYn = 'Y'; break;
            case 'tue' : BUSINESS_DAY.tueWorkYn = 'Y'; break;
            case 'wed' : BUSINESS_DAY.wedWorkYn = 'Y'; break;
            case 'thu' : BUSINESS_DAY.thuWorkYn = 'Y'; break;
            case 'fri' : BUSINESS_DAY.friWorkYn = 'Y'; break;
            case 'sat' : BUSINESS_DAY.satWorkYn = 'Y'; break;
            case 'sun' : BUSINESS_DAY.sunWorkYn = 'Y'; break;
            default : BUSINESS_DAY.monWorkYn = 'Y'; break;
        }

        SELECT_DATA = SELECT_DATA.concat([{ value: value}]);
        this._chkFullBtn();
    }
    
    // 해제된 데이터 값 변경 - 요일:N
    _cancleData = (value) => {
        switch (value) {
            case 'mon' : BUSINESS_DAY.monWorkYn = 'N'; break;
            case 'tue' : BUSINESS_DAY.tueWorkYn = 'N'; break;
            case 'wed' : BUSINESS_DAY.wedWorkYn = 'N'; break;
            case 'thu' : BUSINESS_DAY.thuWorkYn = 'N'; break;
            case 'fri' : BUSINESS_DAY.friWorkYn = 'N'; break;
            case 'sat' : BUSINESS_DAY.satWorkYn = 'N'; break;
            case 'sun' : BUSINESS_DAY.sunWorkYn = 'N'; break;
            default : BUSINESS_DAY.monWorkYn = 'N'; break;
        }
        SELECT_DATA = SELECT_DATA.filter((item, sidx) => item.value !== value);
        this._chkFullBtn();
    }

    // 요일 풀타임 여부 확인
    _chkFullBtn = () => {
        // console.log("_chkFullBtn : ",SELECT_DATA.length);

        if(SELECT_DATA.length == 7) {
            this.setState({
                fullBtnLight : false,
                fullBtnWarning : true,
                btnDisabled : false
            });
        } else {
            if(SELECT_DATA.length == 0) {
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
    _handleFullBtnClick() {
        // this.setState({spinner : true });
        const { fullBtnLight, fullBtnWarning } = this.state;

        this.setState({
            fullBtnLight : (fullBtnLight) ? false : true,
            fullBtnWarning : (fullBtnWarning) ? false : true,
            stHour : '00',
            stMin : '00',
            edHour : '24',
            edMin : '00',
        });

        BUSINESS_DAY.fullWorkYn = ( BUSINESS_DAY.fullWorkYn == 'Y') ? 'N' : 'Y';
        BUSINESS_DAY.holidayWorkYn = ( BUSINESS_DAY.holidayWorkYn == 'Y') ? 'N' : 'Y';

        if(this.state.fullBtnWarning) {
            SELECT_BUTTON.map((button) => {
                button._handleFullRemoveBtn();
            });
        } else {
            SELECT_BUTTON.map((button) => {
                button._handleFullAddBtn();
            });
        }

        // this.setState({spinner : false });
    }

    // 타임 picker 표시
    _showDateTimePicker = (type) => () => {
        const {stHour, stMin, edHour, edMin} = this.state;

        // 시작 시간 클릭 시
        if(type == ST_TYPE) {
          this.setState({ 
            isDateTimePickerVisible: true,
            setTime : `01/01/0000 ${stHour}:${stMin}:00`,
            // timeType : type
          });
        } else { // 종료 시간 클릭 시
          this.setState({ 
            isDateTimePickerVisible: true,
            setTime : `01/01/0000 ${edHour}:${edMin}:00`,
            // timeType : type
          });
        }
        TIME_TYPE = type;
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
        //console.log(this.state);
        console.log(BUSINESS_DAY);
        
        RegPartnerWork(this.state, BUSINESS_DAY).then(result => {
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

    toggleSwitch() {
        this.setState({
          checkbox: !this.state.checkbox
        });
    }

    render() {
        return (
            // <Container>
            //     <Content padder >
            //         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            //             { MOCK_DATA.map((data, idx) => (
            //                 <SelectButton 
            //                     value={data.value}
            //                     text={data.text}
            //                     addDataArray={ this._setData }
            //                     removeDataArray={ this._cancleData }
            //                     key={ idx }
            //                     ref={ ref => {
            //                         SELECT_BUTTON[idx] = ref;
            //                     }}
            //                 />
            //             ))}
            //         </View>
            //         {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}

            //             <TouchableOpacity onPress={this._showDateTimePicker(ST_TYPE)}>
            //                 <View style={{borderColor: '#9B9B9B', borderWidth: 1 / PixelRatio.get()}}>
            //                     <Text>시작시간</Text>
            //                     <Text>{`${this.state.stHour}:${this.state.stMin}`}</Text>
            //                 </View>
            //             </TouchableOpacity>

            //             <TouchableOpacity onPress={this._showDateTimePicker(ED_TYPE)}>
            //                 <View style={{borderColor: '#9B9B9B', borderWidth: 1 / PixelRatio.get()}}>
            //                     <Text>종료시간</Text>
            //                     <Text>{`${this.state.edHour}:${this.state.edMin}`}</Text>
            //                 </View>
            //             </TouchableOpacity>

            //             <CustomButton
            //                 block={ true }
            //                 light={ this.state.fullBtnLight }
            //                 warning= { this.state.fullBtnWarning }
            //                 icon={ true }
            //                 styleWidth={ false }
            //                 marginSize={ 0 }
            //                 onPress={ this._handleFullBtnClick }
            //             >
            //                 <Icon name='md-build' />
            //                 <Text>
            //                     풀타임
            //                 </Text>
            //             </CustomButton>
            //         {/* </View> */}
                
            //         <CustomButton
            //             block={ true }
            //             info={ true }
            //             onPress={ this._nextBtn }
            //             disabled={ this.state.btnDisabled }>
            //             <Text>
            //                 다음단계로 이동 (4/5)
            //             </Text>
            //         </CustomButton>
                    
            //         {/* 로딩 */}
            //         <Spinner
            //             visible={this.state.spinner}
            //             textContent={'Loading...'}
            //             style={{color: '#FFF'}}
            //         />
            //     </Content>
                
            //     <DateTimePicker
            //         isVisible={this.state.isDateTimePickerVisible}
            //         onConfirm={this._handleDatePicked}
            //         onCancel={this._hideDateTimePicker}
            //         mode='time'
            //         datePickerModeAndroid='spinner'
            //         is24Hour={true}
            //         date={ new Date(this.state.setTime) }
            //         type={ TIME_TYPE }
            //         ref={ref => {
            //             this.DateTimePicker = ref;
            //         }}
            //     />
            // </Container>
            <Container style={styles.containerInnerPd}>
                <CustomHeader />
                <View style={styles.contentWrap}>

                    <View style={styles.mb10}>
                        <View style={styles.fxDirRow}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                            <Text style={stylesReg.leftGuideTxt}>일하실</Text>
                            <Text style={stylesReg.leftGuideTxt}>시간대를</Text>
                            <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                        </View>
                        <View style={stylesReg.rightStepNumWrap}>
                            <Text style={stylesReg.rightStepNum}>04</Text>
                        </View>
                        </View>

                        <View style={stylesReg.procBarWrap}>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOff} />
                            </View>
                        </View>
                    </View>

                    <View style={localStyles.contentWrap}>
                        <View style={localStyles.weekWrap}>

                        {MOCK_DATA.map((data, idx) => (
                            <SelectWeekDay
                                value={data.value}
                                text={data.text}
                                addDataArray={ this._setData }
                                removeDataArray={ this._cancleData }
                                key={ idx }
                                index={ idx }
                                ref={ ref => {
                                    SELECT_BUTTON[idx] = ref;
                                }}
                            />
                        ))}

                        </View>
                        
                        <View style={styles.fx1}>
                            <View style={[styles.fx1, styles.fxDirRow, styles.alignItemsCenter]}>
                                <TouchableOpacity 
                                    onPress={this._showDateTimePicker(ST_TYPE)}
                                    style={localStyles.timeTxtWrap}
                                >
                                    <Text style={localStyles.timeTxt}>{`${this.state.stHour}:${this.state.stMin}`}</Text>
                                </TouchableOpacity>
                                <Text style={[localStyles.timeTxt, {textAlign: "center", flex: 1, color: color.greyColor}]}>~</Text>
                                <TouchableOpacity 
                                    onPress={this._showDateTimePicker(ED_TYPE)}
                                    style={localStyles.timeTxtWrap}
                                >
                                    <Text style={localStyles.timeTxt}>{`${this.state.edHour}:${this.state.edMin}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={localStyles.bottomTxtWrap}>
                            <Text style={styles.greyFont}>취약시간에는 출장비가 상승합니다</Text>
                            <Text style={styles.greyFont}>취약시간 기준 : 18시 ~ 09시, 일요일 및 공휴일 포함</Text>
                        </View>

                        <View style={[styles.fxDirRow, styles.fx1, styles.justiConCenter]}>

                            <View style={[styles.fxDirRow, {marginRight: 8}]}>
                                <CheckBox 
                                    checked={this.state.checkbox}
                                    onPress={ this._handleFullBtnClick }
                                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                                />
                                <Text style={styles.greyFont}>풀타임</Text>
                            </View>

                            <View style={[styles.fxDirRow, {marginLeft: 8}]}>
                                <CheckBox 
                                    checked={this.state.checkbox}
                                    onPress={ () => this.toggleSwitch() }
                                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                                />
                                <Text style={styles.greyFont}>공휴일</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footerBtnWrap}>
                        <CustomButton 
                            onPress={this._nextPress}
                            disabled={ this.state.btnDisabled }
                            edgeFill={true}
                            fillTxt={true}
                        >
                            선택완료
                        </CustomButton>
                    </View>
                </View>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    datePickerModeAndroid='spinner'
                    is24Hour={true}
                    date={ new Date(this.state.setTime) }
                    type={ TIME_TYPE }
                    ref={ref => {
                        this.DateTimePicker = ref;
                    }}
                />
            </Container>
        )
    }
}


const localStyles = StyleSheet.create({
    contentWrap: {
      flex: 5,
      marginTop: 37
    },
    weekWrap: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 35
    },
    bottomTxtWrap: {
      alignItems: "center",
      marginTop: 35,
      marginBottom: 17
    },
    timeTxtWrap: {
      flex: 2,
      borderWidth: 2,
      borderColor: color.defaultColor,
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10
    },
    timeTxt: {
      fontSize: 37,
      color: color.defaultColor,
      fontWeight: "bold"
    }
});

export default InputWorkHours;