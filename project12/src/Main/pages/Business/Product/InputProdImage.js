import React, { Component } from "react";
import { View } from 'react-native';

import { SUCCESS_RETURN_CODE } from '../../../../Common/Blend';
import { Container, Content, Text, List, ListItem } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import GetProdImageType from '../../../Functions/GetProdImgType'

import ProductImage from '../../../Components/ProductImage'
import GetCommonData from '../../../../Common/Functions/GetCommonData';

class InputProdImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png",
        data : []
      };
    }

    componentDidMount() {
        this._drawProductImageType();
    }

    // 제품 이미지 가져오기
    _drawProductImageType = () => {
        GetProdImageType().then(result => {
            GetCommonData(result, this._drawProductImageType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        const newData = this.props.prodInfo.map((prodInfo, idx) => {
                            return { ...prodInfo, imgType: result.data };
                        });
                        //console.log("newData :" ,newData);
                        this.setState({ data: newData });
                    }
                }
            });
        });
    }

    _renderListItem = (info, idx) => (
        <ListItem key={ idx }>
            <View>
                <Text>{info.clientPrdNm} </Text>
            </View>
            {info.imgType.map((type, sidx) => (
                <ProductImage 
                    prdTypeImgCateNm={ type.prdTypeImgCateNm }
                    clientPrdId={ type.prdTypeId }
                    prdImgCateId={ type.prdTypeImgCateId }
                    uri={ this.state.defaultImg }
                    index={ sidx }
                />
            ))}
        </ListItem>
    );

    render() {
        return (
            <Container>
                <Content padder>
                    <List dataArray={this.state.data} renderRow={this._renderListItem} />
                </Content>
            </Container>
        )
    }
}

export default InputProdImage;