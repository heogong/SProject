import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import CustomBasicWrapper from '~/Common/Components/CustomBasicWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import RegProdInfo from '~/Main/Functions/RegProdInfo'
import GetCommonData from '~/Common/Functions/GetCommonData';

class InputProdInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        clientPrdNm: '',
        shareholders: [{ 
            clientBplaceId: this.props.value.bizId, 
            prdTypeId : this.props.prodTypeId,
            clientPrdNm: '', 
            clientPrdDsc: '',
            imgType: []     // imgType : 다음 페이지 이미지 타입 초기화 값(안해주면 다음 페이지 오류)
        }]
      };
    }

    // Header 우측버튼 제어
    componentWillMount() {
        this.props.navigation.setParams({
            'onRight': this._handleSubmit
        })
    }

    // 초기 render된 input 텍스트 입력 시 숨겨진 input 텍스트에 글자 입력
    _handleNameChange = (text) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            return (sidx == 0) ? { ...shareholder, clientPrdNm: text } : shareholder;
        });

        this.setState({ clientPrdNm: text });
        this.setState({ shareholders: newShareholders });
    }

    // 추가된 input 텍스트 입력
    _handleShareholderNameChange = (idx) => (text) => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, clientPrdNm: text };
        });
        
        this.setState({ shareholders: newShareholders });
    }

    // input 추가
    _handleAddShareholder = () => {
        this.setState({ shareholders: this.state.shareholders.concat([{ 
            clientBplaceId: this.props.value.bizId, 
            prdTypeId : this.props.prodTypeId, 
            clientPrdNm: '', 
            clientPrdDsc: '',
            imgType: [] }]) 
        });
    }
    
    // input 제거
    _handleRemoveShareholder = (idx) => () => {
        this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
    }

    // 등록된 제품유형타입 의 클라이언트 아이디 set : test
    _setslientPrdId = () => {
        // const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
        //     return { ...shareholder, clientPrdId: text };
        // });

        // this.setState({ shareholders: newShareholders });
    }

    // next
    _handleSubmit = () => {
        const { clientPrdNm, shareholders } = this.state;
        RegProdInfo(shareholders).then(result => {
            GetCommonData(result, this._handleSubmit).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("inputprodinfo : ",resultData);
                    if(ResultBool) {

                        Actions.InputProdImage({prodInfo : shareholders});
                    } else {
                        alert(resultData.msg);
                    }
                }
            });
        });
    }

    render() {
        return (
            <CustomBasicWrapper
                title="제품 등록"
                resetPage={ true }
                rightBtn={ true }
                rightAction={ this._handleSubmit }
            >
                <View style={{ width : 250 }}>
                    <Item regular>
                        <Input
                            placeholder={this.props.prodTypeNm}
                            value={this.state.clientPrdNm}
                            onChangeText={this._handleNameChange}
                        />
                    </Item>
                </View>

                <View>
                    <CustomButton
                        styleWidth={ false }
                        rounded={ true }
                        success={ true }
                        onPress={this._handleAddShareholder}
                    ><Text>+</Text>
                    </CustomButton>
                    {this.state.shareholders.map((shareholder, idx) => (
                        <View key={idx} style={(idx !== 0) ? styles.show : styles.hide }>
                            <Item regular >
                                <Input
                                    placeholder={`${this.props.prodTypeNm}${idx + 1}`}
                                    value={shareholder.clientPrdNm}
                                    onChangeText={this._handleShareholderNameChange(idx)}
                                />
                                <Icon onPress={this._handleRemoveShareholder(idx)} active name='ios-remove-circle-outline' />
                            </Item>
                        </View>
                    ))}
                </View>
            </CustomBasicWrapper>
        )
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputProdInfo = connect(mapStateToProps, undefined)(InputProdInfo);
export default InputProdInfo;