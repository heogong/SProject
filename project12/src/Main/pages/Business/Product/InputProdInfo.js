import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';

import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import CustomBasicWrapper from '../../../../Common/Components/CustomBasicWrapper';
import CustomButton from '../../../../Common/Components/CustomButton';
import RegProdInfo from '../../../Functions/RegProdInfo'

class InputProdInfo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        clientPrdNm: '',
        shareholders: [{ 
            clientPrdNm: '', 
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
        this.setState({ shareholders: this.state.shareholders.concat([{ clientPrdNm: '', imgType: [] }]) });
    }
    
    // input 제거
    _handleRemoveShareholder = (idx) => () => {
        this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
    }

    // next
    _handleSubmit = () => {
        const { clientPrdNm, shareholders } = this.state;
        // console.log(shareholders);
        // console.log(this.props.value);

        // RegProdInfo(this.props.value, this.props.typeId, shareholders).then(result => {
        //     console.log(result.data);
        // });

        Actions.InputProdImage({prodInfo : shareholders});
    }

    render() {
        return (
            <CustomBasicWrapper
                title="제품 등록"
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
                            <Item rounded >
                                <Input
                                    placeholder={`${this.props.prodTypeNm}${idx + 1}`}
                                    value={shareholder.clientPrdNm}
                                    onChangeText={this._handleShareholderNameChange(idx)}
                                />
                                <Icon onPress={this._handleRemoveShareholder(idx)} active name='ios-remove-circle-outline' />
                            </Item>
                            {/* <Button onPress={this._handleRemoveShareholder(idx)}><Text>-</Text></Button> */}
                        </View>
                    ))}
                    {/* <Button rounded onPress={this._handleSubmit}><Text>저장</Text></Button> */}
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