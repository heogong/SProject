import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { ActionSheet, Item, Input, Root, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { setIsAfterService } from '~/Redux/Actions';

import FindAfterServicePartner from '~/Main/Functions/FindAfterServicePartner'
import CancleAfterServicePartner from '~/Main/Functions/CancleAfterServicePartner'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';


class ApplyAfterServiceComplete extends Component {
    constructor(props) {
      super(props);

      this.state = {
        result : "매칭 중",
        asPrgsId : null
      };
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
                        this.setState({asPrgsId : result.data.asPrgsId});
                        this.props.onSetIsAfterService(true); // A/S 신청 확인 - interval 최소화 하기위함

                        // 타임아웃 clear 필요할듯
                        // setTimeout(() => {
                        //     this.setState({result : "매칭 완료"});
                        // }, 10000);
                        
                        
                    } else {
                        alert(resultData.resultMsg);
                        this.setState({result : "매칭 실패"});
                    }
                }
            });
        });
    }

    // 고객 AS 매칭(진행)중 취소
    _cancleAfterServicePartner = () => {
        CancleAfterServicePartner(this.state.asPrgsId).then(result => {
            GetCommonData(result, this._cancleAfterServicePartner).then(async resultData => {
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


    // 고객 AS 매칭(진행)중 취소 선택
    _cancleAfterServicePartnerConfirm = () => {
        Alert.alert(
            '',
            'A/S 매칭을 취소??',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._cancleAfterServicePartner()},
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <CustomBlockWrapper
                title="매칭완료"
            >
                <View>
                    <Text>매칭 신청이 완료되었습니다.</Text>
                    <Text>A/S 업체와 연결을 시작합니다.</Text>
                    <Text>{this.state.result}</Text>

                </View>
                <CustomButton
                    block={ true }
                    info={ true }
                    bordered={ true }
                    onPress={ this._cancleAfterServicePartnerConfirm }>
                    <Text>
                        매칭 취소
                    </Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}


let mapDispatchToProps = (dispatch) => {
    return {
        onSetIsAfterService: (value) => dispatch(setIsAfterService(value)),
    }
}
  
ApplyAfterServiceComplete = connect(undefined, mapDispatchToProps)(ApplyAfterServiceComplete);
export default ApplyAfterServiceComplete;
