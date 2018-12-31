import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Container, Content, Text, List, ListItem } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import GetProdImageType from '~/Main/Functions/GetProdImgType'

import ProductImage from '~/Main/Components/ProductImage'
import GetCommonData from '~/Common/Functions/GetCommonData';
import CustomHeader from '~/Common/Components/CustomHeader';


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
        <View key={ idx } style={{ flex:1, justifyContent: 'center'}}>
            <View style={{ alignItems: 'center', paddingTop : 5 }}>
                <Text> {info.clientPrdNm} </Text>
            </View>
            <ListItem>
                <View style={ styles.boxLayout }>
                {info.imgType.map((type, sidx) => (
                    <ProductImage 
                        prdTypeImgCateNm={ type.prdTypeImgCateNm }
                        clientPrdId={ type.prdTypeId }
                        prdImgCateId={ type.prdTypeImgCateId }
                        uri={ this.state.defaultImg }
                        index={ sidx }
                    />
                ))}
                </View>
            </ListItem>
        </View>
    );

    _nextButton = () => {
        Alert.alert(
            '',
            '등록되지 않은 이미지는 어딘가에서 등록 가능 \ 제품을 추가 등록 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => Actions.MainStack() },
              {text: '네', onPress: () => Actions.InputProdType() },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <CustomHeader
                    title="제품 이미지 등록"
                    resetPage={ true }
                    rightBtn={ true }
                    rightAction={ this._nextButton }
                />
                {/* <View style={{ flex:1, justifyContent: 'center'}}>
                    <Content>
                        <List dataArray={this.state.data} renderRow={this._renderListItem} />
                    </Content>
                </View> */}
                
                <Content>
                    <List dataArray={this.state.data} renderRow={this._renderListItem} />
                </Content>
                </View>
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

export default InputProdImage;