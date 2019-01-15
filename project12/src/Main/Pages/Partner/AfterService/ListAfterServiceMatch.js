import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { Body, Button, Card, CardItem, Text,Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterService from '~/Main/Functions/GetAfterService'
import RegAfterServiceMatch from '~/Main/Functions/RegAfterServiceMatch'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';

let SELECT_INDEX = null; // 선택된 A/S
class ListAfterServiceMatch extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    static defaultProps = {
        defaultImg : 'https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png'
    }

    componentDidMount() {
        this._getAfterService();
    }

    // 나의 AS 매칭 목록 조회
    _getAfterService = () => {
        GetAfterService().then(result => {
            GetCommonData(result, this._getAfterService).then(async resultData => {
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

    // AS 진행 의사 등록(파트너)
    _regAfterServiceMatch = () => {
        const { data } = this.state;

        RegAfterServiceMatch(data[SELECT_INDEX].clientPrdId).then(result => {
            GetCommonData(result, this._regAfterServiceMatch).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        alert(resultData.resultMsg);
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 선택
    _selectAfterService = (idx) => () => {
        SELECT_INDEX = idx;

        Alert.alert(
            '',
            'A/S 매칭을 수락하시겠습니까?// 수락 후 1시간 30분 내에 도착하셔야 합니다.',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '수락', onPress: () => this._regAfterServiceMatch()},
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 매칭"
            >
                <Card>
                    <CardItem>
                        <Thumbnail large source={{ uri: this.props.defaultImg }} />
                            <Button onPress={ this._selectAfterService(1) }>
                                <Text>A/S 매칭 수락하기</Text>
                            </Button>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Text>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</Text>
                        </Body>
                    </CardItem>
                </Card>
            </CustomBlockWrapper>
        )
    }
}


export default ListAfterServiceMatch;