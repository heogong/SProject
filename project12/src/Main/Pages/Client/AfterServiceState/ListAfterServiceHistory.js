import React, { Component } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceHistory from '~/Main/Functions/GetAfterServiceHistory'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ListAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getAfterServiceHistory();
    }

    // 고객 AS 내역 목록 조회
    _getAfterServiceHistory = () => {
        GetAfterServiceHistory().then(result => {
            GetCommonData(result, this._getAfterServiceHistory).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data });
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
                title="A/S 내역"
            >
                {this.state.data.map((afterService, idx) => 
                    <Card key={ idx }>
                        <CardItem body>
                            <Thumbnail large source={{ uri: afterService.prdTypeFileUrl }} />
                        </CardItem>
                        <CardItem>
                            <View>
                                <Text>
                                    사업장 : {afterService.bplaceNm}
                                </Text>
                                <Text>
                                    날짜 : {afterService.regDt}
                                </Text>
                                <Text>
                                    증상 : {afterService.evalDsc}
                                </Text>
                                <Text>
                                    만족도 : {afterService.evalPoint}
                                </Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <CustomButton onPress={ () => alert("작성") }>
                                <Text>작성</Text>
                            </CustomButton>
                        </CardItem>
                    </Card>
                )}
            </CustomBlockWrapper>
        )
    }
}

export default ListAfterServiceHistory;