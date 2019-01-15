import React, { Component } from "react";
import { Alert, View } from 'react-native';
import { Body, Button, Card, CardItem, Text,Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductShowCase from '~/Main/Components/ProductShowCase';

class ViewAfterServiceMatch extends Component {
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
        this._getAfterServiceDetail();
    }

    // AS 접수 상세 내용 조회
    _getAfterServiceDetail = () => {
        GetAfterServiceDetail().then(result => {
            GetCommonData(result, this._getAfterServiceDetail).then(async resultData => {
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

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 매칭 상세정보"
            >
                <View>
                    <Text>사업장 : {this.state.data.bplace.bplaceNm}</Text>
                    <Text>주소 : {this.state.data.bplace.addr.addressName}</Text>
                </View>

                <ProductShowCase
                    defaultImg={ this.state.data.prdTypeImg.fileUrl }
                    data={ this.state.data.images }
                    clientPrdId={ this.state.data.clientPrdId }
                    clientPrdNm={ this.state.data.clientPrdNm } 
                    index={ 0 }
                    copyBtn={ false }
                    viewProduct={ true }
                />

                <Item regular>
                    <Input
                        value={ this.props.asItemNm }
                        disabled
                    />
                </Item>

                <Textarea 
                    value={ this.props.asRecvDsc }
                    rowSpan={2} 
                    bordered 
                    disabled
                />
            </CustomBlockWrapper>
        )
    }
}

export default ViewAfterServiceMatch;