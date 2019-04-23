import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Item, Input, Text } from "native-base";

import { Actions } from 'react-native-router-flux';

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

class NoticeInfoService extends Component {
  constructor(props) {
    super(props);

    this.state = {
        logo : 'https://post-phinf.pstatic.net/MjAxNzA5MTJfNTUg/MDAxNTA1MjAwMjMwOTY1.r-hkjFV9Hk_35hyO7hyy5dbGS1vJefzbzhJ_-dNsHWcg.QvI6TK8CYLHnwxilPutQgVzAbElzCvkl0oDWUFiD1Agg.JPEG/image_3359637611505200203003.jpg?type=w1200'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.avatar} source={{uri : this.state.logo}} />
        <Text>비회원으로 A/S를 신청 할 경우</Text>
        <Text>쿨리닉에서 제공하는 서비스에 제한이 있습니다.</Text>
        <CustomButton
            block={ true }
            info={ true }
            bordered={ true }
            onPress={ this._nextPage }>
            <Text>
                확인
            </Text>
        </CustomButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    avatar: {
      width: 400, 
      height: 400
    }
  });
  

export default NoticeInfoService;