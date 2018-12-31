import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Content, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import GetCommonData from '~/Common/Functions/GetCommonData';

import { Actions } from "react-native-router-flux";
import SelectButton from "~/Common/Components/SelectButton";
import GetProdType from '~/Main/Functions/GetProdType';
import RegPartnerProdType from '../../../Functions/RegPartnerProdType';

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data : [],
          selectData : [],
          btnDisabled : true
        };
    }

    componentDidMount() {
        this._drawProductType();
    }

    // 제품 타입 조회
    _drawProductType = () => {
        GetProdType().then(result => {
            GetCommonData(result, this._drawProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data: resultData.data });
                    }
                }
            });
        });
    }

    // 제품 타입 등록
    _regProductType = () => {
        RegPartnerProdType(this.state.selectData).then(result => {
            GetCommonData(result, this._regProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //Actions.JoinInputWorkHours();
                        Actions.JoinSetPartnerAddress();
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

     // 선택된 데이터 array 추가
    _addDataArray = async (value) => {
        //await this.setState({ selectData: this.state.selectData.concat([{ prdTypeIds: value }]) });
        await this.setState({ selectData: this.state.selectData.concat([value]) });

        console.log("_addDataArray : ",this.state.selectData);
        this.setState({ btnDisabled : false })
    }
    
    // 해제된 데이터 array 제거
    _removeDataArray = async (value) => {
        //await this.setState({ selectData: this.state.selectData.filter((item, sidx) => item.prdTypeIds !== value) });
        await this.setState({ selectData: this.state.selectData.filter((item, sidx) => item !== value) });

        console.log("_removeDataArray : ",this.state.selectData);

        this.setState({ btnDisabled : (this.state.selectData.length > 0) ? false : true});
        //this.state.selectData
    }

    // next
    _nextPress = () => {
        console.log("result : ",this.state.selectData);
        this._regProductType();

        //Actions.JoinSetPartnerAddress();
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                <CustomHeader
                    title='제품 타입 선택'
                    backBtn={ true }
                    rightBtn={ false }
                    resetPage={ false }
                    backAction={ false }
                    actionName=''
                />
                <View style={ [styles.centerAlign, { flexWrap: 'wrap', padding: 10, }] }>
                    
                    {this.state.data.map((item, idx) => (
                        <SelectButton 
                            value={item.prdTypeId}
                            text={item.prdTypeKoNm}
                            addDataArray={ this._addDataArray }
                            removeDataArray={ this._removeDataArray }
                            key={ idx }
                        />
                    ))}
                </View>
                <View style={ [styles.centerAlign] }>
                    <CustomButton
                        block={ true }
                        info={ true }
                        onPress={ this._nextPress }
                        disabled={ this.state.btnDisabled }>
                        <Text>
                            NEXT
                        </Text>
                    </CustomButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerAlign : {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default InputProdType;