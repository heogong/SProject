import React, { Component } from "react";
import { Alert } from 'react-native';
import { Icon, Picker, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import GetAfterServiceCase from '~/Main/Functions/GetAfterServiceCase';
import RegAfterService from '~/Main/Functions/RegAfterService';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';
import { Actions } from "react-native-router-flux";

class ApplyBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            prdTypeImg : {
                fileUrl : null
            },
            images : [] // 제품 이미지 데이터
        }, // 제품 데이터
        asRecvDsc : null,
        etcComment : null,
        asCaseData: [], // 제품 증상 데이터
        selected: undefined
      };
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    componentWillMount() {
        this._getAfterServiceCase();
    }
   
    componentDidMount() {
        this._getProduct();
    }

    // 등록된 사업장 제품 조회
    _getProduct = () => {
        GetProduct(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data,
                        });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 제품 증상 조회
    _getAfterServiceCase = () => {
        GetAfterServiceCase(207).then(result => {
        //GetAfterServiceCase(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData.data);
                    if(ResultBool) {
                        this.setState({asCaseData : resultData.data});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 신청 API 호출
    _regAfterService = () => {
        const {asCaseData, selected, asRecvDsc, etcComment} = this.state

        RegAfterService(
            this.props.clientPrdId,
            selected,
            asRecvDsc, 
            etcComment).then(result => {
            GetCommonData(result, this._regAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        // 증상내역 text
                        asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm;
                        // 신청 내역 확인 페이지 이동
                        Actions.AfterServiceApplyProductCheck({
                            clientPrdId: this.props.clientPrdId,
                            asItemNm : asCaseData[asCaseData.findIndex(x => x.asItemId === selected)].asItemNm,
                            asItemId : selected,
                            asRecvDsc : asRecvDsc,
                            etcComment : etcComment,
                            asRecvId : resultData.data.asRecvId
                        });
                       
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
                title="A/S 제품"
            >
                <ProductShowCase
                    defaultImg={ this.state.data.prdTypeImg.fileUrl }
                    data={ this.state.data.images }
                    clientPrdId={ this.state.data.clientPrdId }
                    clientPrdNm={ this.state.data.clientPrdNm } 
                    index={ 0 }
                    copyBtn={ false }
                    viewProduct={ true }
                />

                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item label=" == 증상 선택 == " value={ -1 } />
                    {this.state.asCaseData.map((asCase) => 
                        <Picker.Item label={asCase.asItemNm} value={asCase.asItemId} />
                    )}
                </Picker>

                <Textarea 
                    value={this.state.bizDsc}
                    rowSpan={2} 
                    bordered 
                    placeholder="참고 사항"
                    onChangeText={(text) => this.setState({asRecvDsc : text})}
                />
                <Textarea 
                    value={this.state.bizDsc}
                    rowSpan={5} 
                    bordered 
                    placeholder="제품 분석"
                    onChangeText={(text) => this.setState({etcComment : text})}
                />

                <CustomButton
                    styleWidth={ false }
                    block={ true }
                    info={ true }
                    bordered={ true }
                    disabled={ (this.state.selected == -1) ? true : false }
                    onPress={this._regAfterService}>
                    <Text>
                        입력완료
                    </Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default ApplyBusinessProduct;