import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceIncomplete from '~/Main/Functions/GetAfterServiceIncomplete';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class ListInCompleteReport extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : []
      };
    }

    componentDidMount() {
        this._getAfterServiceIncomplete();
    }

    // 파트너 미작성 보고서 목록 조회
    _getAfterServiceIncomplete = () => {
        GetAfterServiceIncomplete().then(result => {
            GetCommonData(result, this._getAfterServiceIncomplete).then(async resultData => {
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
                title="미 작성 보고서 리스트"
            >
                {this.state.data.map((report, idx) => 
                    <Card key={ idx }>
                        <CardItem body>
                            <Thumbnail large source={{ uri: report.prdTypeFileUrl }} />
                        </CardItem>
                        <CardItem>
                            <View>
                                <Text>
                                    사업장 : {report.bplaceNm}
                                </Text>
                                <Text>
                                    증상 : {report.asItemNm}
                                </Text>
                                <Text>
                                    제품 타입 : {report.prdTypeKoNm}
                                </Text>
                            </View>
                        </CardItem>
                        <CardItem>
                            <CustomButton onPress={ () => Actions.RegReportBeforePic({asPrgsId : report.asPrgsId}) }>
                                <Text>작성</Text>
                            </CustomButton>
                        </CardItem>
                    </Card>
                )}
            </CustomBlockWrapper>
        )
    }
}

export default ListInCompleteReport;