import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceBeforeImg from '~/Main/Functions/GetAfterServiceBeforeImg';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceImage from '~/Main/Components/AfterServiceImage';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

const BEFORE_IMG_CNT = 3; // A/S 조치전 이미지 카운트

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : [],
        btnDisabled : true,
        asImgCnt : BEFORE_IMG_CNT
      };
    }

    componentWillMount() {
        this._getAfterServiceBeforeImg();
    }

    // AS 조지전 사진 조회
    _getAfterServiceBeforeImg = () => {
        GetAfterServiceBeforeImg(5).then(result => {
        //GetAfterServiceBeforeImg(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        
                        this.setState({
                            data : resultData.data,
                            asImgCnt : this.state.asImgCnt - resultData.data.length
                        });

                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 이미지 뷰어
    _createBeforeAsImg = () => {
        let table = []
    
        for (let i = 0; i < this.state.asImgCnt; i++) {
            table.push(<AfterServiceImage/>); 
        }

        return table;
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 조치 전"
            >
                {this.state.data.map((beforeImg, idx) => 
                    <AfterServiceImage
                        key={idx}
                    />
                )}

                {this._createBeforeAsImg()}

                <CustomButton 
                    //disabled={ this.state.btnDisabled }
                    onPress={ Actions.RegReportAfterPic }>
                    <Text>다음</Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default RegReportBeforePic;