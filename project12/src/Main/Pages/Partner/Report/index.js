import React, { Component } from "react";
import { Alert, StyleSheet, View } from 'react-native';
import { Body, Button, Card, CardItem, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class Report extends Component {
    constructor(props) {
      super(props);

      this.state =  {};
    }

    componentWillMount() {
        //this._getLocation();
    }

    render() {
        return (
            <CustomBlockWrapper
                title="A/S 보고서"
                resetPage={true}
            >
                <CustomButton onPress={ () => alert("업체전화연결") }>
                    <Text>업체전화연결</Text>
                </CustomButton>

                <CustomButton onPress={ Actions.RegAfterServiceAdd }>
                    <Text>추가 A/S 진행</Text>
                </CustomButton>

                <CustomButton onPress={ () => alert("A/S 전") }>
                    <Text>A/S 전</Text>
                </CustomButton>

                <CustomButton onPress={ () => alert("A/S 후") }>
                    <Text>A/S 후</Text>
                </CustomButton>

                <CustomButton onPress={ () => alert("A/S 완료") }>
                    <Text>A/S 완료</Text>
                </CustomButton>
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

export default Report;