import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import GetProdType from '~/Main/Functions/GetProdType';
import GetCommonData from '~/Common/Functions/GetCommonData';
import SelectSpecialty from "~/Main/Components/SelectSpecialty";
import SelectWeekDay from "~/Main/Components/SelectWeekDay";

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

let ARRAY_SELECT_SPECIALTY = []; // 선택된 전문분야 배열
let ARRAY_SELECT_DATA = []; // 선택된 날짜 배열
const ST_TYPE = 'work_st'; // 시작 시간 클릭 여부
const ED_TYPE = 'work_ed'; // 종료 시간 클릭 여부
let TIME_TYPE = ST_TYPE;

let DAY_DATA = [
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

    this.state = {
      data : [],
      isDateTimePickerVisible: false, // 타임 picker 보임 여부
      setTime : '01/01/0000 09:00:00', // 타임 picker 기본 데이터
      stHour : '09',
      stMin : '00',
      edHour : '18',
      edMin : '00',
      // partner 선택한 전문분야 - TEST
      selctedSpecialty : [
        {
          prdTypeId : 1
        },
        {
          prdTypeId : 5
        },
        {
          prdTypeId : 6
        },
        {
          prdTypeId : 7
        }
      ],
      // partner 근무요일 - TEST
      selectedDay : {
        monWorkYn : 'N',
        tueWorkYn : 'N',
        wedWorkYn : 'Y',
        thuWorkYn : 'N',
        friWorkYn : 'Y',
        satWorkYn : 'Y',
        sunWorkYn : 'N',
      },
      checkBox : false,
      isAlertModal : false, // alert 용
      resultMsg : null// alert 용
    };
  }

  componentWillMount() {
    this._drawProductType();
    this._drawWorkSchedule();
  }

   // 제품 타입 조회
   _drawProductType = () => {
    GetProdType().then(result => {
        GetCommonData(result, this._drawProductType).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                // console.log(resultData);
                if(ResultBool) {
                  await this.setState({ data: resultData.data });
                  await this._selectSpecialty();
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

  // 선택한 전문분야 조회 - api없어 현재는 하드코딩 20190310
  _selectSpecialty = () => {
    const { data, selctedSpecialty } = this.state;

    ARRAY_SELECT_SPECIALTY = selctedSpecialty;

    const newData = data.map((product) => {
      let isSpecialty = false;

      isSpecialty = selctedSpecialty.some((Specialty) => { // [function some] 조건이 충족하면 break
        if(product.prdTypeId == Specialty.prdTypeId) {
          return true;
        }
      })
      return { ...product, selSpecialty : isSpecialty };
    });
    
    // console.log(ARRAY_SELECT_SPECIALTY);
    this.setState({data : newData});
  }


   // 선택된 데이터 array 추가
   _addDataArray = (value) => {
    ARRAY_SELECT_SPECIALTY = ARRAY_SELECT_SPECIALTY.concat({ prdTypeId : value });
      console.log("_addDataArray : ",ARRAY_SELECT_SPECIALTY);
  }

  // 해제된 데이터 array 제거
  _removeDataArray = (value) => {
      ARRAY_SELECT_SPECIALTY = ARRAY_SELECT_SPECIALTY.filter((item, sidx) => item.prdTypeId !== value);
      console.log("_removeDataArray : ",ARRAY_SELECT_SPECIALTY);
  }

  // 진행 중
  _drawWorkSchedule = () => {

    const newData = DAY_DATA.map((day) => {
      return { ...day, workDay : this._chkWorkDay(day.key) };
    });

    console.log(newData);

    DAY_DATA = newData;

    // 시간 값 가져와서 set
    this.setState({
      stHour : this.pad('9', 2),
      stMin : this.pad('30', 2),
      edHour : this.pad('18', 2),
      edMin : this.pad('0', 2)
    });
  }

  _chkWorkDay = (dayKey) => {
    const { selectedDay } = this.state;

    switch (dayKey) {
      case 'monWorkYn' : 
        if (selectedDay.monWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'mon' }); 
          return true 
        } else {
          return false
        }
      case 'tueWorkYn' : 
        if (selectedDay.tueWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'tue' }); 
          return true 
        } else {
          return false
        }
      case 'wedWorkYn' : 
        if (selectedDay.wedWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'wed' }); 
          return true 
        } else {
          return false
        }
      case 'thuWorkYn' : 
        if (selectedDay.thuWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'thu' }); 
          return true 
        } else {
          return false
        }
      case 'friWorkYn' : 
        if (selectedDay.friWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'fri' }); 
          return true 
        } else {
          return false
        }
      case 'satWorkYn' : 
        if (selectedDay.satWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'sat' }); 
          return true 
        } else {
          return false
        }
      case 'sunWorkYn' : 
        if (selectedDay.sunWorkYn == 'Y') {
          ARRAY_SELECT_DATA = ARRAY_SELECT_DATA.concat({ value: 'sun' }); 
          return true 
        } else {
          return false
        }
      default : return (selectedDay.monWorkYn == 'Y') ? true : false;
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
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="사업자정보 수정"/>

        <View style={styles.contentWrap}>
          <View>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>개인정보를 안전하게 보호하기 위해 비밀번호를 입력해주세요.</Text>
            </View>

            <Text style={[styles.inputNbTitleTxt, styles.mb12]}>냉동기 전문분야</Text>

            <View style={[styles.fxDirRow, styles.fxWraWra]}>

              {this.state.data.map((product, idx) => (
                <SelectSpecialty
                  key={idx}
                  product={product}
                  specialty={product.selSpecialty}
                  addDataArray={ this._addDataArray }
                  removeDataArray={ this._removeDataArray }
                />
              ))}
            </View>

            <Text style={[styles.inputNbTitleTxt, styles.mb12]}>출장 가능시간</Text>
            <View>
              <View style={localStyles.weekWrap}>
                  {DAY_DATA.map((data, idx) => (
                    <SelectWeekDay
                      key={ idx }
                      index={ idx }
                      value={data.value}
                      text={data.text}
                      workDay={data.workDay}
                      addDataArray={ this._setData }
                      removeDataArray={ this._cancleData }
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
                  <Text style={[localStyles.timeTxtWrap, localStyles.timeTxt, {flex: 1}]}>~</Text>
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
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={ this._logOut }
            >
              변경완료
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
    marginTop: 35,
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
  }
});

export default MyProfileCompany; 
