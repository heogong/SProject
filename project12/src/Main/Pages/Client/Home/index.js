import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Button, Content, Input, Item, Icon, Text } from "native-base";

import {SUCCESS_RETURN_CODE} from '~/Common/Blend';

import { ActionConst, Actions } from 'react-native-router-flux';

import GetBizList from '~/Main/Functions/GetBizList';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ServiceRequestSwiper from '~/Main/Components/ServiceRequestSwiper';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    };
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackPress) // Listen for the hardware back button on Android to be pressed

    this._getBizList();
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackPress) // Remove listener
  }

  handleBackPress = () => {
    return false;
  }

   // 사업장 목록 가져오기
  _getBizList = () => {
    GetBizList().then(async result => {
        GetCommonData(result, this._getBizList).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                //console.log(resultData);
                if(ResultBool) {
                    this.setState({data : resultData.data});
                }
            }
        });
    });
  }

  render() {
    return (
        <View style={{ flex : 1, flexDirection: 'column'}}>
            <CustomHeader
                title='메인'
                backBtn={ false }
                menuBtn={ true }
            />
            <View style={{ flex : 1}}>
              <ServiceRequestSwiper
                bizList={ this.state.data }
                ListBusinessProduct={ Actions.ListBusinessProduct }
              />
            </View>
            <View style={{ flex : 1, backgroundColor : 'skyblue'}}>
                <Text>컨텐츠2</Text>
                <CustomButton
                  onPress={ Actions.ListBusinessProduct }
                >
                  <Text>A/S</Text>
                </CustomButton>
            </View>
        </View>
    )
  }
}
