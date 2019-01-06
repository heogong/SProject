import React, { Component } from 'react';
import{ View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from "native-base";

import {SUCCESS_RETURN_CODE} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetBizList from '~/Main/Functions/GetBizList';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import BusinessCard from '~/Main/Components/BusinessCard';
import CustomButton from '~/Common/Components/CustomButton';

export default class Business extends Component {
  constructor(props) { 
    super(props); 

    this.state = {
      data :[]
    };
  }

  componentDidMount () {
    this._getBizList();
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
        resetPage={ true }
        title="사업장/제품 등록"
        padderLeftSize={ 15 }
        padderRightSize={ 15 }
      >
        {this.state.data.map((business, idx) =>
          <BusinessCard
            index={idx}
            businessName={business.bplaceNm}
            address1={business.addr.addressName}
            address2={business.detail.detailAddr1}
          />
        )}
        <CustomButton
          styleWidth={ false }
          block={ true }
          info={ true }
          bordered={ true }
          onPress={ Actions.InputProdType }>
          <Text>
            제품등록 하러가기
          </Text>
        </CustomButton>
      </CustomBlockWrapper>
    )
  }
}