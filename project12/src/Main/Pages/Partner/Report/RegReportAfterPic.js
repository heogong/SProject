import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceActionImg from '~/Main/Functions/GetAfterServiceActionImg';
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
        asActionDsc : null,
        btnDisabled : true,
        asImgCnt : AFTER_IMG_CNT
      };
    }

    componentWillMount() {
        this._getAfterServiceAfterImg();
    }

    // AS 조지후 사진 조회
    _getAfterServiceAfterImg = () => {
        //GetAfterServiceActionImg(false, 5).then(result => {
        GetAfterServiceActionImg(false, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceAfterImg).then(async resultData => {
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
                {this.state.data.map((afterImg, idx) => 
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
                    // value={this.state.bizDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="수리한 내역"
                    onChangeText={(text) => this.setState({asActionDsc : text})}
                />

                <CustomButton 
                    //disabled={ this.state.btnDisabled }
                    onPress={ () => Actions.RegReportSymptomFix({asPrgsId : this.props.asPrgsId}) }>
                    <Text>다음</Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default RegReportAfterPic;