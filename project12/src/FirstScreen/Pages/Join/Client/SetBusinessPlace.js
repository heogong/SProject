import React, { Component } from 'react';
import { Image, View } from 'react-native'
import { Container, H1, H2, Text } from "native-base";

import {SUCCESS_RETURN_CODE} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetBizPlace from '~/Main/Functions/GetBizPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class SetBusinessPlace extends Component {
  constructor(props) { 
    super(props); 

    this.state = {
      data : []
    };
  }

  componentDidMount () {
    this._getBizPlace();
  }

  // 사업장 가져오기
  _getBizPlace = () => {
    GetBizPlace(this.props.value.bizId).then(async result => {
        GetCommonData(result, this._getBizPlace).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
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
      <Container style={styles.containerInnerPd}>
        <CustomHeader />

        <View style={styles.fx1}>

          <View style={styles.fx1}>
            <View style={[styles.mb10, styles.fxDirRow]}>
              <View style={styles.fx1}>
                <H1>사업장</H1>
                <H1>정보등록이</H1>
                <H1>완료되었어요</H1>
              </View>
              <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                <Image source={require('~/Common/Image/input-able.png')} />
              </View>
            </View>

            <View>
              <Text style={styles.greyFont}>사업장 정보가 제대로 입력되었나요?</Text>
              <Text style={styles.greyFont}>이제A/S 받을 제품의 정보를 등록해주세요.</Text>
            </View>
          </View>

          <View style={styles.fx2}>

            <View style={[styles.pd10, styles.fx4, {backgroundColor : color.defaultColor}]}>
              <View style={[styles.fx3, styles.alignItemsCenter, styles.justiConCenter]}>
                <Image source={require('~/Common/Image/license-depart02.png')} style={{height : imageSize, width : imageSize}} />
              </View>
              <View style={[styles.fx2, styles.alignItemsCenter]}>
                <H2 style={[styles.mb10, {color : color.whiteColor}]}>{this.state.data.bplaceNm}</H2>
                <Text style={styles.whiteFont}>{this.state.data.addressName}</Text>
                <Text style={styles.whiteFont}>{this.state.data.detailAddr1}</Text>
              </View>
            </View>

            <View style={styles.footerBtnWrap}>
              <CustomButton
                  onPress={Actions.InputProdType}
                  backgroundColor={color.whiteColor}
                  edgeFill={true}
              >
                  제품등록하러가기
              </CustomButton>
            </View>
          </View>
          
        </View>
      </Container>
    )
  }
}

function wp (percentage) {
  const value = (percentage * (viewportWidth - 60)) / 100;
  return Math.round(value);
}

const imageSize = wp(37);

let mapStateToProps = (state) => {
  return {
      value: state.BIZ
  };
}

SetBusinessPlace = connect(mapStateToProps, undefined)(SetBusinessPlace);
export default SetBusinessPlace;