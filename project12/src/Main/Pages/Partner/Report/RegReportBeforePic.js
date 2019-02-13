import React, { Component } from "react";
import { ScrollView, View } from 'react-native';
import { Card, CardItem, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceImage from '~/Main/Components/AfterServiceImage';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';

const BEFORE_IMG_CNT = 3; // A/S 조치전 이미지 카운트

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : [],
        imgData : [],
        asData : {
            asPrgsMst : {
                asPrgsStatDSC : null
            }
        },
        asCauseDsc : '',
        asActionDsc : '',
        btnDisabled : true,
        asImgCnt : BEFORE_IMG_CNT,
        method : 'POST' // AS 조치전 정보 조회 정보 여부에 따른 메소드 값
      };
    }

    // static defaultProps = {
    //     asPrgsId : 157 // test
    // }

    componentWillMount() {
        this._getAfterServiceState();
        this._getAfterServiceBeforeInfo();
    }

    // 현재 나의(파트너) AS 진행 상태 체크
    _getAfterServiceState = () => {
        GetAfterServiceState().then(result => {
            GetCommonData(result, this._getAfterServiceState).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("현재 나의(파트너) AS 진행 상태 체크 : ", resultData);
                    if(ResultBool) {
                        this.setState({asData : resultData.data});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 조치전 정보 조회
    _getAfterServiceBeforeInfo = () => {
        GetAfterServiceActionInfo(true, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 조치전 정보 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({
                            data : resultData.data,
                            imgData : resultData.data.images,
                            asImgCnt : this.state.asImgCnt - resultData.data.images.length
                        });

                        if(resultData.data.info !== null) {
                            this.setState({
                                asCauseDsc : resultData.data.info.asCauseDsc,
                                method : 'PUT',
                                btnDisabled : (resultData.data.images.length > 0) ? false : true
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
                        Actions.RegAsAfterReport({asPrgsId : this.props.asPrgsId});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 이미지 뷰어
    _createBeforeAsImg = () => {
        let imageCompArray = [];

        for (let i = 0; i < this.state.asImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage asPrgsId={ this.props.asPrgsId }/>); 
        }
        return imageCompArray;
    }

    _checkAsCauseDsc = async (text) => {
        await this.setState({asCauseDsc : text});

        if(this.state.asCauseDsc.length > 3) {
            this.setState({btnDisabled : (this.state.imgData.length > 0) ? false : true});
        } else {
            this.setState({btnDisabled : true});
        }
    }

    render() {
        return (
            <ScrollView style={{flex:1}}>
                <CustomHeader
                    title="A/S 보고서"
                    backBtn={ false }
                />
                <Card>
                    <CardItem>
                        <Text>{this.state.asData.asPrgsMst.asPrgsStatDSC}</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <Text>상태 이미지</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <CustomButton 
                            bordered={ true }
                            onPress={ () => alert("업체 전화연결") } >
                            <Text>업체 전화연결</Text>
                        </CustomButton>
                        <CustomButton 
                            bordered={ true }
                            onPress={ () => alert("추가 A/S 진행") }>
                            <Text>추가 A/S 진행</Text>
                        </CustomButton>
                    </CardItem>
                </Card>

                {this.state.imgData.map((beforeImg, idx) => 
                    <AfterServiceImage
                        key={ idx }
                        index={ idx }
                        imgUrl={ beforeImg.fileUrl }
                        imgId={ beforeImg.imgId }
                        asPrgsId={ this.props.asPrgsId }
                    />
                )}

                {this._createBeforeAsImg()}

                <Textarea 
                    value={this.state.asCauseDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="조치전 증상(파악한 문제 또는 증상)"
                    onChangeText={ this._checkAsCauseDsc }
                />
                <CustomButton 
                    // disabled={ this.state.btnDisabled }
                    onPress={ this._regAfterServiceReport }>
                    <Text>다음</Text>
                </CustomButton>
            </ScrollView>
        )
    }
}

export default RegReportBeforePic;