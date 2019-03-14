import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import {
  Container,
  H1,
  H2,
  H3,
  Header,
  Title,
  Card,
  CardItem,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Picker,
  Body,
  Text,
  Textarea,
  Thumbnail,
  Footer,
  FooterTab,
  Form,
  Item,
  Input,
  IconNB,
  CheckBox
} from "native-base";

import { styles, viewportHeight, viewportWidth } from './css/common';
import { color } from './css/color';

class HistoryAfterServiceChk2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      beforeMatch : true
    }
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  product = () => (
    <TouchableOpacity onPress={ () => this._toggleModal()}>
      <View style={[styles.listPrdBoxFillWrap, {height: 120}]}>
        <View style={[styles.listPrdBoxImgWrap ,{marginTop: 4}]}>
          <Image 
            source={require("./img/product/01_icon_white.png")} 
            resizeMode="contain" 
            style={styles.listPrdBoxImg} 
          />
          <Text style={styles.listPrdBoxImgTxt}>육류 냉장고</Text>
        </View>
        <View style={styles.listPrdBoxRightTxtWrap}>
          <H3 style={styles.listPrdBoxRightTitleTxt}>세나정육점</H3>
          <Text style={[styles.listPrdBoxDeTxt, styles.mb12, {fontWeight: "500"}]}>2019년 01월 26일</Text>
          <Text style={styles.listPrdBoxDeTxt}>경기도 시흥시 산기대로</Text>
          <View style={styles.fxDirRow}>
            <Text style={[styles.listPrdBoxDeTxt, {paddingTop: 3}]}>만족도</Text>
            <View style={localStyles.starIconWrap}>
              <TouchableOpacity>
                  <Image source={require("./img/star_icon_100%.png")} resizeMode="contain" style={localStyles.starIconImg} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require("./img/star_icon_100%.png")} resizeMode="contain" style={localStyles.starIconImg} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require("./img/star_icon_100%.png")} resizeMode="contain" style={localStyles.starIconImg} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require("./img/star_icon_50%.png")} resizeMode="contain" style={localStyles.starIconImg} />
              </TouchableOpacity>
              <TouchableOpacity>
                  <Image source={require("./img/star_icon_50%.png")} resizeMode="contain" style={localStyles.starIconImg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.listPrdBoxNextIconWrap}>
          <TouchableOpacity>
            <Image source={require("./img/Next_icon_white.png")} resizeMode="contain" style={{width: 26, height: 26}} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <Header style={[styles.header, styles.noPadding]}>
          <Left style={styles.headerLeftWrap}>
            <Button style={styles.noPadding}  transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require("./img/btn_back_arrow.png")} resizeMode="contain" style={styles.btnBackArrowIcon} />
            </Button>
          </Left>
          <Body style={styles.headerCenterWrap}>
            <Title style={styles.headerTitleTxt}></Title>
          </Body>
          <Right style={styles.headerRightWrap}></Right>
        </Header>

        <View style={{marginBottom: 36}}>
          <View style={styles.fxDirRow}>
            <View style={styles.leftGuideTxtWrap}>
              <Text style={styles.leftGuideTxt}>A/S 받으신</Text>
              <Text style={styles.leftGuideTxt}>내역에 대해</Text>
              <Text style={styles.leftGuideTxt}>확인해보세요</Text>
            </View>

            <View style={styles.rigthTxtWrap}>
              <Text style={[styles.rightTxt, {fontWeight: "bold"}]}>
                04<Text style={styles.rightTxtSmall}>건</Text>
              </Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
          { this.product() }
        </ScrollView>

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  starIconImg: {
    width: 13,
    height: 13,
    marginLeft: 1,
    marginRight: 1
  },
  starIconWrap: {
    flexDirection: "row",
    marginLeft: 6,
    marginTop: 3
  }
});

export default HistoryAfterServiceChk2;