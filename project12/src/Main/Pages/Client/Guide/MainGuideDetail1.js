import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Text } from "native-base";

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

class MainGuideDetail1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.container}>
        <CustomHeader title="쿨리닉 사용가이드" customStyle={{paddingLeft: 26, paddingRight: 26}}/>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require("~/Common/Image/main/client/guide/M1_Contents_01.png")} resizeMode="contain" style={localStyles.guideImg}  />
          <Image source={require("~/Common/Image/main/client/guide/M1_Contents_02.png")} resizeMode="contain" style={localStyles.guideImg}  />
          <Image source={require("~/Common/Image/main/client/guide/M1_Contents_03.png")} resizeMode="contain" style={localStyles.guideImg}  />
          <Image source={require("~/Common/Image/main/client/guide/M1_Contents_04.png")} resizeMode="contain" style={localStyles.guideImg}  />
          <Image source={require("~/Common/Image/main/client/guide/M1_Contents_05.png")} resizeMode="contain" style={localStyles.guideImg}  />
        </ScrollView>
      </Container>
    );  
  }
}

const localStyles = StyleSheet.create({
  guideImg: {
    width: viewportWidth
  }
});

export default MainGuideDetail1;

