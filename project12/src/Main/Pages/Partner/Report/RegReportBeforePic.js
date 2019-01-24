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

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : [],
        btnDisabled : true
      };
    }

    componentDidMount() {
        // this._getAfterServiceBeforeImg();
    }

    // AS 조지전 사진 조회
    _getAfterServiceBeforeImg = () => {
        GetAfterServiceBeforeImg(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({data : resultData.data});
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
                title="A/S 조치 전"
            >
                <AfterServiceImage/>
                <AfterServiceImage/>
                <AfterServiceImage/>

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