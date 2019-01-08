import React, { Component } from "react";
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetProdType from '~/Main/Functions/GetProdType';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data : []
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
                        this.setState({ data : resultData.data});
                    } else {
                        alert(resultData.resultMsg)
                    }
                }
            });
        });
    }

    // 제품 타입 선택
    _nextButton = (prodTypeId, prodTypeNm) => () => {
        Actions.RegBusinessShowCase({
            prodTypeId : prodTypeId,
            prodTypeNm : prodTypeNm
        })
    }

    render() {
        return (
            <CustomBlockWrapper
                title="제품 군 선택"
            >
                <View style={ {flex: 1, justifyContent:'center'} }>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: 5
                    }}>
                    {this.state.data.map((productType, idx) => 
                        <TouchableOpacity key={idx} 
                            onPress={this._nextButton(productType.prdTypeId, productType.prdTypeKoNm)}
                        >
                            <View style={styles.slide}>
                                <Text style={styles.title}>{productType.prdTypeKoNm}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    </View>
                </View>
            </CustomBlockWrapper>
        )
    }
}

const styles = StyleSheet.create({
    slide: { 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 150,
        width: 150,
        backgroundColor: '#d6d7da',
    },
    title: { color: 'black', fontSize: 20 },
});



export default InputProdType;