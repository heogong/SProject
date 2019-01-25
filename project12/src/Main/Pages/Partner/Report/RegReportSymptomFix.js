import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import RegAfterServiceReportComplete from '~/Main/Functions/RegAfterServiceReportComplete';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class RegReportSymptom extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        asCauseDsc : null,
        asActionDsc : null
      };
    }

    static defaultProps = {
        asPrgsId : 5, //test
    }

     // AS 보고서 기본 정보 등록
     _regAfterServiceReport = () => {
        const { asCauseDsc, asActionDsc } = this.state;

        RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc).then(result => {
            GetCommonData(result, this._regAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this._regAfterServiceReportComplete();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 보고서 작성 완료
    _regAfterServiceReportComplete = () => {
        RegAfterServiceReportComplete(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._regAfterServiceReportComplete).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        alert(resultData.resultMsg);
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 조치 전 증상"
            >
                <Textarea 
                    // value={this.state.bizDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="조치전 증상(파악한 문제 또는 증상)"
                    onChangeText={(text) => this.setState({asCauseDsc : text})}
                />

                <Textarea 
                    // value={this.state.bizDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="수리한 내역"
                    onChangeText={(text) => this.setState({asActionDsc : text})}
                />

                <CustomButton 
                    //disabled={ this.state.btnDisabled }
                    onPress={ this._regAfterServiceReport }>
                    <Text>다음</Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default RegReportSymptom;