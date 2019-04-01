import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { CheckBox, Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import DateTimePicker from 'react-native-modal-datetime-picker';

import GetProdSpecialty from '~/Main/Functions/GetProdSpecialty';
import EditProdSpecialty from '~/Main/Functions/EditProdSpecialty';
import GetPartnerWork from '~/Main/Functions/GetPartnerWork';
import EditPartnerWork from '~/Main/Functions/EditPartnerWork';
import GetCommonData from '~/Common/Functions/GetCommonData';
import SelectSpecialty from "~/Main/Components/SelectSpecialty";
import SelectWeekDay from "~/Main/Components/SelectWeekDay";

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

let FULL_BTN = false;
let SELECT_BUTTON = []; // 요일 버튼 객체 배열 
let ARRAY_SELECT_SPECIALTY = []; // 선택된 전문분야 배열
let ARRAY_SELECT_DATA = []; // 선택된 날짜 배열
const ST_TYPE = 'work_st'; // 시작 시간 클릭 여부
const ED_TYPE = 'work_ed'; // 종료 시간 클릭 여부
let TIME_TYPE = ST_TYPE;

let INIT_DAY_DATA = [
  { text : "월", value : "mon", key : "monWorkYn", workDay : false },
  { text : "화", value : "tue", key : "tueWorkYn", workDay : false },
  { text : "수", value : "wed", key : "wedWorkYn", workDay : false },
  { text : "목", value : "thu", key : "thuWorkYn", workDay : false },
  { text : "금", value : "fri", key : "friWorkYn", workDay : false },
  { text : "토", value : "sat", key : "satWorkYn", workDay : false },
  { text : "일", value : "sun", key : "sunWorkYn", workDay : false },
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

class MyProfileCompany extends Component {
  constructor(props) {
    super(props);

    this.DateTimePicker = null;
    this._showDateTimePicker = this._showDateTimePicker.bind(this);
    this._handleFullBtnClick = this._handleFullBtnClick.bind(this);

    this.state = {
      data : [],
      workData : [],
      dayData : [],
      isDateTimePickerVisible: false, // 타임 picker 보임 여부
      setTime : '01/01/0000 09:00:00', // 타임 picker 기본 데이터
      stHour : '09',
      stMin : '00',
      edHour : '18',
      edMin : '00',
      fullWorkYn  : false,
      holidayWorkYn : false,
      checkBox : false,
      isAlertModal : false, // alert 용
      resultMsg : null// alert 용
    };
  }

  componentWillMount () {
    this._getProdSpecialty();
    this._getPartnerWork();
  }

  // 1. 업체 취급 제품 유형 목록 조회
  _getProdSpecialty = () => {
    GetProdSpecialty().then(result => {
        GetCommonData(result, this._getProdSpecialty).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log('업체 취급 제품 유형 목록 조회 - ',resultData);
                if(ResultBool) {
                  this.setState({data : resultData.data});
                  this._selectSpecialty();
                  
                } else {
                  this.setState({
                    isAlertModal : true,
                    resultMsg : resultData.resultMsg
                  })

                }
            }
        });
    });
  }

   // 2 .업체 근무 정보 조회
   _getPartnerWork = () => {
    GetPartnerWork().then(result => {
        GetCommonData(result, this._getPartnerWork).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log('업체 근무 정보 조회 - ',resultData);
                if(ResultBool) {
                  this.setState({workData : resultData.data});
                  this._drawWorkSchedule();
                } else {
                  this.setState({
                    isAlertModal : true,
                    resultMsg : resultData.resultMsg
                  })

                }
            }
        });
    });
  }

  // 업체 취급 제품 유형 목록 수정 - 테스트 진행
  _editProdSpecialty = () => {
    EditProdSpecialty(ARRAY_SELECT_SPECIALTY).then(result => {
        GetCommonData(result, this._editProdSpecialty).then(async resultData => {
            if(resultData !== undefined) {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
            }
        });
    });
  }

  // 업체 근무 정보 수정
  _editPartnerWork = () => {
    const { stHour, stMin, edHour, edMin } = this.state;
    const work = {
      stHour : stHour,
      stMin : stMin,
      edHour : edHour,
      edMin : edMin
    };
    // console.log('BUSINESS_DAY :', BUSINESS_DAY);
    // console.log('work :', work);

    EditPartnerWork(work, BUSINESS_DAY).then(result => {
        GetCommonData(result, this._editPartnerWork).then(async resultData => {
            if(resultData !== undefined) {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
            }
        });
    });
  }
  

  // 기존 선택된 전문분야 set
  _selectSpecialty = () => {
    const { data } = this.state;

    data.map((product) => {
      if(product.partnerId !== null) {
        ARRAY_SELECT_SPECIALTY = ARRAY_SELECT_SPECIALTY.concat({ prdTypeId : product.prdTypeId });
      }
    })
  }

  // 선택된 전문문야 데이터 array 추가
   _addDataArray = (value) => {
    ARRAY_SELECT_SPECIALTY = ARRAY_SELECT_SPECIALTY.concat({ prdTypeId : parseInt(value) });
      console.log("_addDataArray : ",ARRAY_SELECT_SPECIALTY);
  }

  // 해제된 전문문야 데이터 array 제거
  _removeDataArray = (value) => {
      ARRAY_SELECT_SPECIALTY = ARRAY_SELECT_SPECIALTY.filter((item, sidx) => item.prdTypeId !== parseInt(value));
      console.log("_removeDataArray : ",ARRAY_SELECT_SPECIALTY);
  }

  // 근무일 / 근무시간 set
  _drawWorkSchedule = () => {
    const { workData } = this.state;

    const newData = INIT_DAY_DATA.map((day) => {
      return { ...day, workDay : this._chkWorkDay(day.key) };
    });

    this.setState({
      dayData : newData,
      fullWorkYn : workData.fullWorkYn == 'Y' ?  true : false,
      holidayWorkYn : workData.holidayWorkYn == 'Y' ?  true : false,
    });

    FULL_BTN = workData.fullWorkYn == 'Y' ?  true : false;

    BUSINESS_DAY.fullWorkYn = workData.fullWorkYn;
    BUSINESS_DAY.holidayWorkYn = workData.holidayWorkYn;

    // 시간 값 가져와서 set
    this.setState({
      stHour : this.pad(workData.workStTime.substring(0, 2), 2),
      stMin : this.pad(workData.workStTime.substring(2, 4), 2),
      edHour : this.pad(workData.workEdTime.substring(0, 2), 2),
      edMin : this.pad(workData.workEdTime.substring(2, 4), 2)
    });
  }

  // 근무요일 set
  _chkWorkDay = (dayKey) => {
    const { workData } = this.state;

    switch (dayKey) {
      case 'monWorkYn' : 
        if (workData.monWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'mon' }); 
          BUSINESS_DAY.monWorkYn = 'Y'
          return true 
        } else {
          return false
        }
      case 'tueWorkYn' : 
        if (workData.tueWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'tue' }); 
          BUSINESS_DAY.tueWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      case 'wedWorkYn' : 
        if (workData.wedWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'wed' }); 
          BUSINESS_DAY.wedWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      case 'thuWorkYn' : 
        if (workData.thuWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'thu' }); 
          BUSINESS_DAY.thuWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      case 'friWorkYn' : 
        if (workData.friWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'fri' }); 
          BUSINESS_DAY.friWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      case 'satWorkYn' : 
        if (workData.satWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'sat' }); 
          BUSINESS_DAY.satWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      case 'sunWorkYn' : 
        if (workData.sunWorkYn == 'Y') {
          // ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'sun' }); 
          BUSINESS_DAY.sunWorkYn = 'Y';
          return true 
        } else {
          return false
        }
      default : return (workData.monWorkYn == 'Y') ? true : false;
    }
  }

  // 풀타임 버튼 클릭
  async _handleFullBtnClick() {
    FULL_BTN = !FULL_BTN;

    const { fullWorkYn } = await this.state;

    await this.setState({
        fullWorkYn : FULL_BTN,
        holidayWorkYn : false,
        stHour : '00',
        stMin : '00',
        edHour : '23',
        edMin : '59',
    });

    BUSINESS_DAY.fullWorkYn = ( BUSINESS_DAY.fullWorkYn == 'Y') ? 'N' : 'Y';

    if(FULL_BTN) {
      SELECT_BUTTON.map((button) => {
        button._handleFullAddBtn();
      });
      BUSINESS_DAY.holidayWorkYn = 'N'
    } else {
      SELECT_BUTTON.map((button) => {
        button._handleFullRemoveBtn();
      });
    }
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

    ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: value });
    // console.log(ARRAY_SELECT_DATA)
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
      ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.filter((item) => item.value !== value);
      // console.log(ARRAY_SELECT_DATA)
      this._chkFullBtn();
  }

   // 요일 풀타임 여부 확인
   _chkFullBtn = () => {
    if(ARRAY_SELECT_DATA.length == 7) {
        this.setState({fullWorkYn : true});
        FULL_BTN = true;
    } else {
        this.setState({fullWorkYn : false});
        FULL_BTN = false;
    }
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

  // 시간 2자리 표시
  pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

  render() {
    return (
      <Container style={styles.containerInnerPdNoBottom}>
        <CustomHeader title="사업자정보 수정"/>

        <View style={styles.contentWrap}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fx1}>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>개인정보를 안전하게 보호하기 위해 비밀번호를 입력해주세요.</Text>
            </View>

            <Text style={[styles.inputNbTitleTxt, styles.mb12]}>냉동기 전문분야</Text>

            <View style={[styles.fxDirRow, styles.fxWraWra]}>

              {this.state.data.map((product, idx) => (
                <SelectSpecialty
                  key={idx}
                  product={product}
                  specialty={(product.selectYn == 'Y') ? true : false}
                  addDataArray={ this._addDataArray }
                  removeDataArray={ this._removeDataArray }
                />
              ))}
            </View>

            <CustomButton 
                onPress={ this._editProdSpecialty }
                DefaultLineBtn={true}
                CustomBtnStyle={styles.mt13}
            >
                수정완료
            </CustomButton>

            <Text style={[styles.inputNbTitleTxt, styles.mb12]}>출장 가능시간</Text>
            <View>
              <View style={localStyles.weekWrap}>
                  {this.state.dayData.map((data, idx) => (
                    <SelectWeekDay
                      key={ idx }
                      index={ idx }
                      value={data.value}
                      text={data.text}
                      workDay={data.workDay}
                      addDataArray={ this._setData }
                      removeDataArray={ this._cancleData }
                      ref={ ref => {
                        SELECT_BUTTON[idx] = ref;
                      }}
                    />
                  ))}
              </View>
              
              <View>
                <View style={[styles.fxDirRow, styles.alignItemsCenter]}>
                  <TouchableOpacity 
                    onPress={this._showDateTimePicker(ST_TYPE)} 
                    style={localStyles.timeTxtWrap}
                  >
                    <Text style={localStyles.timeTxt}>{`${this.state.stHour}:${this.state.stMin}`}</Text>
                  </TouchableOpacity>
                  <Text style={localStyles.timeCenterTxt}>~</Text>
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

              <View style={[styles.fxDirRow, styles.justiConCenter]}>
                <View style={[styles.checkBoxWrap, {marginRight: 8}]}>
                  <CheckBox 
                    checked={this.state.fullWorkYn}
                    onPress={ this._handleFullBtnClick }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                  <Text style={styles.greyFont}>풀타임</Text>
                </View>
                
                <View style={[styles.checkBoxWrap, {marginLeft: 8}]}>
                  <CheckBox checked={this.state.holidayWorkYn}
                    onPress={async () => {
                        await this.setState({holidayWorkYn : !this.state.holidayWorkYn}),
                        BUSINESS_DAY.holidayWorkYn = await this.state.holidayWorkYn ? 'Y' : 'N'
                      }
                    }
                    style={[styles.checkboxReset, {borderColor: color.defaultColor}]}
                  />
                  <Text style={styles.greyFont}>공휴일</Text>
                </View>
              </View>
              <CustomButton 
                onPress={ this._editPartnerWork }
                DefaultLineBtn={true}
                CustomBtnStyle={{marginTop: 13, marginBottom: 26}}
              >
                수정완료
              </CustomButton>
            </View>
          </View>
          </ScrollView>
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

        {/* alert 메세지 모달 */}
        <CustomModal
            modalType="ALERT"
            isVisible={this.state.isAlertModal}
            onPress={ () => this.setState({isAlertModal : false})}
            infoText={this.state.resultMsg}
            btnText="확인"
        />

      </Container>
    );
  }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}
const weekCardSize = wp(12, 52);

const localStyles = StyleSheet.create({
  prdBtnOn: {
    backgroundColor: color.defaultColor,
    borderRadius: 0,
    elevation: 0,
    width: "50%",
    shadowOpacity: 0,
    height: 34,
    justifyContent: "center"
  },
  prdBtnOnTxt: {
    fontSize: 14,
    color: color.whiteColor
  },
  prdBtnOff: {
    backgroundColor: "#d6f1ff",
    borderRadius: 0,
    elevation: 0,
    width: "50%",
    shadowOpacity: 0,
    height: 34,
    justifyContent: "center"
  },
  prdBtnOffTxt: {
    fontSize: 14,
    color: color.defaultColor
  },
  weekWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35
  },
  btnWeekOff: {
    alignItems: "center",
    justifyContent: "center",
    height : weekCardSize, 
    width : weekCardSize,
    borderColor : color.defaultColor, 
    borderWidth : 1
  },
  btnWeekOffTxt: {
    fontSize: 15,
    color: color.defaultColor
  },
  btnWeekOn: {
    alignItems: "center",
    justifyContent: "center",
    height : weekCardSize, 
    width : weekCardSize,
    borderColor : color.defaultColor, 
    borderWidth : 1,
    backgroundColor: color.defaultColor
  },
  btnWeekOnTxt: {
    fontSize: 15,
    color: color.whiteColor
  },
  bottomTxtWrap: {
    alignItems: "center",
    marginTop: 17,
    marginBottom: 17
  },
  timeTxtWrap: {
    flex: 3,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: color.defaultColor
  },
  timeTxt: {
    fontSize: 30,
    color: color.whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  timeCenterTxt: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: color.defaultColor,
    fontSize: 30,
    color: color.whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default MyProfileCompany; 
