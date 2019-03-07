import React, { Component } from "react";
import { StyleSheet, View, TextInput } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

class RegAddAfterService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      checkBox : false,
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  _chkNextButton = () => {

  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader/>
        <View style={styles.contentWrap}>
          <View>
            <View style={styles.fxDirRow}>
              <View style={stylesReg.leftGuideTxtWrap}>
                <Text style={stylesReg.leftGuideTxt}>추가된</Text>
                <Text style={stylesReg.leftGuideTxt}>A/S 내역을</Text>
                <Text style={stylesReg.leftGuideTxt}>작성해주세요</Text>
              </View>
            </View>
          </View>

          <View style={localStyles.addAsInputWrap}>
            <View style={localStyles.inputBoxWrap}>
              <Text style={localStyles.inputTitleTxt}>추가 A/S 내역</Text>
              <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                <Input 
                  onChangeText={ (text) => this.setState({asCauseDsc : text}) }
                  placeholder="A/S 내역을 작성해주세요" 
                  style={[styles.inputBox, styles.pl9]} 
                  placeholderTextColor={color.inputPlaceHodler}
                />
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 비용</Text>
              <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                <Input placeholder="추가비용을 입력해주세요" style={[styles.inputBox, styles.pl9]} placeholderTextColor={color.inputPlaceHodler}/>
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 사유</Text>
              <Item regular style={[styles.mb14, styles.textInputWhBackWhBo]}>
                <TextInput
                  placeholder="추가 A/S가 필요한 이유를 적어주세요"
                  placeholderTextColor={color.inputPlaceHodler}
                  numberOfLines={10}
                  multiline={true}
                  style={styles.textInputBox}
                />
              </Item>
            </View>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton 
              onPress={() => this._toggleModal()}
              DefaultLineBtn={true}
            >
              등록완료
            </CustomButton>
          </View>
        </View>

        <CustomModal
            modalType="CONFIRM"
            isVisible={this.state.isModalVisible}
            onPress1={this._toggleModal}
            onPress2={this._toggleModal}
            infoText1="추가 A/S에 대한 내역을 청구합니다."
            infoText2="추가비용 : 100,00원"
            btnText1="취소"
            btnText2="전송"
        />

      </Container>
    );
  }
}

const localStyles = StyleSheet.create({
  addAsInputWrap: {
    flex: 2,
    marginTop: 20
  },
  inputBoxWrap: {
    paddingTop : 28,
    paddingLeft : 20,
    paddingRight : 20,
    flex: 1,
    backgroundColor : color.defaultColor
  },
  blankBoxWrap: {
    flex: 1,
    backgroundColor : color.defaultColor,
    justifyContent : 'center',
    alignItems : 'center'
  },
  inputTitleTxt: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6
  }
});

export default RegAddAfterService;
