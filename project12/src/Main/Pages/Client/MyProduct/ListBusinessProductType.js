import React, { Component } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetBizProductTypeList from '~/Main/Functions/GetBizProductTypeList'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

class ListBusinessProductType extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getBizProductTypeList();
    }

    // 등록된 사업장 제품 타입 조회
    _getBizProductTypeList = () => {
        GetBizProductTypeList(this.props.bizId).then(result => {
            GetCommonData(result, this._getBizProductTypeList).then(async resultData => {
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
    
   // 제품 타입 선택에 따른 제품 조회
   _nextButton = (bizId, prodTypeId) => () => {
        Actions.ListBusinessShowCase({
            bizId : bizId,
            prodTypeId : prodTypeId
        })
    }

    // 제품 등록
    _addButton = () => {
        Actions.InputBusinessProdType();
    }


    render() {
        return (
            <CustomBlockWrapper
                title="제품 타입 선택"
            >
                <View style={ {flex: 1, justifyContent:'center'} }>
                    <View style={ styles.container }>
                    {this.state.data.map((productType, idx) => 
                        <TouchableOpacity key={idx} 
                            onPress={this._nextButton(productType.clientBplaceId, productType.prdTypeId)}
                        >
                            <View style={styles.slide}>
                                <ImageBackground source={{ uri: productType.prdTypeImg.fileUrl }} style={{width: '100%', height: '100%'}}/>
                            </View>
                            <Text style={styles.title}>{productType.prdType.prdTypeKoNm}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={this._addButton}
                    >
                        <View style={styles.slide}>
                        <Text>+</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </CustomBlockWrapper>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 5
    },
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

export default ListBusinessProductType;