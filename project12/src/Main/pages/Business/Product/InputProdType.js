import React, { Component } from "react";
import { BackHandler } from 'react-native';

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';
import { Root, ActionSheet, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import GetProdType from '../../../Functions/GetProdType';
import GetCommonData from '../../../../Common/Functions/GetCommonData';

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          buttonTitle : '유형 선택',
          selectIndex : 0,
          selectYn : false, // 제품 타입 선택 여부
          BUTTONS : [
              { text : "데이터가 없습니다.", typeId : ''}
          ]
        };
    }

    componentDidMount() {
        this._drawProductType();
        BackHandler.addEventListener('hardwareBackPress', () => Actions.ListBusinessPlace()) // Listen for the hardware back button on Android to be pressed
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => Actions.ListBusinessPlace()) // Remove listener
    }

    // 제품 타입 조회
    _drawProductType = () => {
        GetProdType().then(result => {
            GetCommonData(result, this._drawProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                   // console.log(resultData);
                    if(ResultBool) {
                        const prodSet = resultData.data.map((prod) => {
                            return { ...prod, text : prod.prdTypeKoNm, typeId : prod.prdTypeId };
                        });
                        this.setState({ BUTTONS: prodSet });
                    }
                }
            });
        });
    }

    // 제품 타입 선택
    _onPress = () => {
        Actions.InputProdInfo({
            prodTypeId : this.state.BUTTONS[this.state.selectIndex].typeId,
            prodTypeNm : this.state.BUTTONS[this.state.selectIndex].text
        })
    }

    render() {
        return (
            <Root>
                <CustomBasicWrapper
                    title="제품 타입 등록"
                >
                    <CustomButton
                        onPress={() =>
                            ActionSheet.show(
                            {
                                options: this.state.BUTTONS,
                                cancelButtonIndex: this.state.selectIndex,
                                title: "제품유형"
                            },
                            buttonIndex => {
                                this.setState({ buttonTitle: this.state.BUTTONS[buttonIndex].text });
                                this.setState({ selectIndex : buttonIndex });
                                this.setState({ selectYn : true });
                            }
                        )}
                    >
                        <Text>{this.state.buttonTitle}</Text>
                    </CustomButton>
                    <CustomButton rounded success bordered block 
                        onPress={this._onPress}
                        disabled={!this.state.selectYn}
                    ><Text>다음</Text>
                    </CustomButton>
                </CustomBasicWrapper>
            </Root>
        )
    }
}

export default InputProdType;