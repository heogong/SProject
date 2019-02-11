import React, { Component } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import GetBizProduct from '~/Main/Functions/GetBizProduct'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

class ListAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getBizProduct();
    }

    // 등록된 사업장 제품 조회
    _getBizProduct = () => {
        GetBizProduct(this.props.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._getBizProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data: resultData.data });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }
    
   // A/S 제품 선택
   _nextButton = (clientPrdId) => () => {
        Actions.AfterServiceApplyProduct({ clientPrdId : clientPrdId})
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 제품 선택"
            >
                <View style={ {flex: 1, justifyContent:'center'} }>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        padding: 5
                    }}>
                    {this.state.data.map((product, idx) => 
                        <TouchableOpacity key={idx} 
                            onPress={this._nextButton(product.clientPrdId)}
                        >
                            <View style={styles.slide}>
                                <ImageBackground source={{ uri: product.prdTypeImg.fileUrl }} style={{width: '100%', height: '100%'}}/>
                            </View>
                            <Text style={styles.title}>{product.clientPrdNm}</Text>
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

export default ListAfterServiceHistory;