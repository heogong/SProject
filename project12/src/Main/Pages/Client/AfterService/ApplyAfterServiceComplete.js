import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { ActionSheet, Item, Input, Root, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import FindAfterServicePartner from '~/Main/Functions/FindAfterServicePartner'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';


class ApplyAfterServiceComplete extends Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentWillMount() {
        this._findAfterServicePartner();
    }
   
    // AS 가능 업체 찾기(AS 진행 시작)
    _findAfterServicePartner = () => {
        FindAfterServicePartner(this.props.asRecvId).then(result => {
            GetCommonData(result, this._findAfterServicePartner).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        
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
                title="매칭완료"
            >
                <View>
                    <Text>매칭 신청이 완료되었습니다.</Text>
                    <Text>A/S 업체와 연결을 시작합니다.</Text>
                </View>
               
            </CustomBlockWrapper>
        )
    }
}

export default ApplyAfterServiceComplete;