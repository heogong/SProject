import React, { Component } from "react";
import { Alert, ScrollView, View } from 'react-native';
import { Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import RegAfterServiceReportComplete from '~/Main/Functions/RegAfterServiceReportComplete';
import CompleteAfterService from '~/Main/Functions/CompleteAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceImage from '~/Main/Components/AfterServiceImage';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

const AFTER_IMG_CNT = 3; // A/S 조치후 이미지 카운트

class RegReportAfterPic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : [],
        imgData : [],
        asActionDsc : '',
        asCauseDsc : '',
        btnDisabled : true,
        asImgCnt : AFTER_IMG_CNT
      };
    }

    componentWillMount() {
        this._getAfterServiceAfterInfo();
    }

    // AS 조치후 정보 조회
    _getAfterServiceAfterInfo = () => {
        GetAfterServiceActionInfo(false, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 조치후 정보 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({
                            data : resultData.data,
                            imgData : resultData.data.images,
                            asImgCnt : this.state.asImgCnt - resultData.data.images.length
                        });

                        if(resultData.data.info !== null) {
                            this.setState({
                                asActionDsc : resultData.data.info.asActionDsc,
                                method : 'PUT'
                            })
                        }
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 보고서 기본 정보 등록
    _regAfterServiceReport = () => {
        const { asCauseDsc, asActionDsc, method } = this.state;

        RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc, method).then(result => {
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
                        this._completeAfterService();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 업체 AS 매칭(진행) 완료
    _completeAfterService = () => {
        CompleteAfterService(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._completeAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        alert(`업체 AS 매칭(진행) ${resultData.resultMsg}`);
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 보고서 기본 정보 등록 완료
    _regAfterServiceReportConfirm = () => {
        Alert.alert(
            '',
            'A/S 완료??\nA/S가 완료됩니다.',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '예', onPress: () => this._regAfterServiceReport()},
            ],
            { cancelable: false }
        )
    }

    // A/S 이미지 뷰어
    _createBeforeAsImg = () => {
        let imageCompArray = [];

        for (let i = 0; i < this.state.asImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage beforeAction={ false } asPrgsId={ this.props.asPrgsId }/>); 
        }

        return imageCompArray;
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 조치 후"
            >
                {this.state.imgData.map((afterImg, idx) => 
                    <AfterServiceImage
                        index={ idx }
                        imgUrl={ afterImg.fileUrl }
                        imgId={ afterImg.imgId }
                        beforeAction={ false }
                        asPrgsId={ this.props.asPrgsId }
                    />
                )}

                {this._createBeforeAsImg()}

                <Textarea 
                    value={this.state.asActionDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="수리한 내역"
                    onChangeText={(text) => this.setState({asActionDsc : text})}
                />

                <CustomButton 
                    //disabled={ this.state.btnDisabled }
                    onPress={ this._regAfterServiceReportConfirm }>
                    <Text>A/S 완료</Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default RegReportAfterPic;