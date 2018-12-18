import React, { Component } from "react";

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';
import { Container, Button, Content, Text } from "native-base";
import SelectButton from "../../../Components/SelectButton";

import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import GetProdType from '../../../../Main/Functions/GetProdType';
import GetCommonData from '../../../../Common/Functions/GetCommonData';
import { Actions } from "react-native-router-flux";

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data : [],
          selectData : []
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

     // 선택된 데이터 array 추가
    _addDataArray = async (value) => {
        await this.setState({ selectData: this.state.selectData.concat([{ value: value}]) });

        console.log("_addDataArray : ",this.state.selectData);
    }
    
    // 해제된 데이터 array 제거
    _removeDataArray = async (value) => {
        await this.setState({ selectData: this.state.selectData.filter((item, sidx) => item.value !== value) });

        console.log("_removeDataArray : ",this.state.selectData);
    }

    // next
    _nextPress = () => {
        console.log("result : ",this.state.selectData);
        Actions.JoinInputWorkHours();
    }

    render() {
        return (
            <CustomBasicWrapper>
                <Content padder>
                {this.state.data.map((item, idx) => (
                    <SelectButton 
                        value={item.prdTypeId}
                        text={item.prdTypeKoNm}
                        addDataArray={ this._addDataArray }
                        removeDataArray={ this._removeDataArray }
                        key={ idx }
                    />
                ))}
                    <CustomButton
                        block={ true }
                        info={ true }
                        onPress={ this._nextPress }
                        disabled={ this.state.btnDisabled }>
                        <Text>
                            NEXT
                        </Text>
                    </CustomButton>
                </Content>
            </CustomBasicWrapper>
        )
    }
}

export default InputProdType;