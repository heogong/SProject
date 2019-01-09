import React, { Component } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Picker, Text, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetProduct from '~/Main/Functions/GetProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';
import GetAfterServiceCase from '~/Main/Functions/GetAfterServiceCase';

import CustomButton from '~/Common/Components/CustomButton';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';

class ApplyBusinessProduct extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [], // 제품 데이터
        images : [], // 제품 이미지 데이터
        asRecvDsc : null,
        etcComment : null,
        asCaseData: [],
        selected2: undefined
      };
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }
   
    componentDidMount() {
        this._getProduct();
        this._getAfterServiceCase();
    }

    // 등록된 사업장 제품 조회
    _getProduct = () => {
        GetProduct(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    //console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data,
                            images : resultData.data.images
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
        GetAfterServiceCase(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({asCaseData : resultData.data});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 입력완료
    _submitAfterService = () => {

    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 제품"
            >
                <ProductShowCase
                    defaultImg={ this.state.defaultImg }
                    data={ this.state.images }
                    clientPrdId={ this.state.data.clientPrdId }
                    clientPrdNm={ this.state.data.clientPrdNm } 
                    index={ 0 }
                    copyBtn= { false }
                />

                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                >
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
                    onPress={this._submitAfterService}>
                    <Text>
                        입력완료
                    </Text>
                </CustomButton>
            </CustomBlockWrapper>
        )
    }
}

export default ApplyBusinessProduct;