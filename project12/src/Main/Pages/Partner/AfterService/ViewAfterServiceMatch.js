import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Body, Button, Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import ProductImage from '~/Main/Components/ProductImage';
import DrawMap from '~/Main/Components/DrawMap';

class ViewAfterServiceMatch extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            clientPrdImgs : [] // 제품 이미지 데이터
        },
        region: {
            latitude: 37.566535,
            longitude: 126.97796919999996,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        },
        marker: {
            latitude: 37.566535,
            longitude: 126.97796919999996
        }
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
        // GetAfterServiceDetail(96).then(result => {
        GetAfterServiceDetail(this.props.asRecvId).then(result => {
            GetCommonData(result, this._getAfterServiceDetail).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data,
                            region : {
                                ...this.state.region,
                                latitude  : Number(resultData.data.bplaceAddrLat),
                                longitude : Number(resultData.data.bplaceAddrLng)
                              },
                              marker: {
                                  latitude: Number(resultData.data.bplaceAddrLat),
                                  longitude: Number(resultData.data.bplaceAddrLng)
                              },
                        });
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
                    <Thumbnail large source={{ uri: this.state.data.prdTypeImgUrl }} />
                    <Text>사업장 : {this.state.data.bplaceNm}</Text>
                    <Text>주소 : {this.state.data.bplaceAddr} {this.state.data.bplaceAddrDtl}</Text>
                </View>

                <View style={{width:"100%", height:200}}>
                    <DrawMap
                        region={ this.state.region }
                        // onRegionChangeComplete={ this._onRegionChangeComplete }
                        makerYn={ true }
                        marker={ this.state.marker }
                    />
                </View>

                <View style={{ flex:1, justifyContent: 'center'}}>
                    <View style={ styles.boxLayout }>
                        {this.state.data.clientPrdImgs.map((info, idx) => (
                            <ProductImage 
                                key={idx}
                                prdTypeImgCateNm={ info.prdTypeImgCateNm }
                                clientPrdId={ this.state.data.clientPrdId }
                                clientPrdImgId={ info.clientPrdImgId }
                                prdImgCateId={ info.prdTypeImgCateId }
                                uri={ (info.fileUrl !== null) ? info.fileUrl : this.props.defaultImg }
                                defaultImg={ this.props.defaultImg }
                                imageTouch={ (info.fileUrl !== null) ? false : true }
                                viewProduct={ true }
                            />
                        ))}
                    </View>
                </View>

                {/* <Item regular>
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
                /> */}
            </CustomBlockWrapper>
        )
    }
}

const styles = StyleSheet.create({
    boxLayout : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 5
    }
});


export default ViewAfterServiceMatch;