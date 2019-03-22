import React, { Component } from "react";
import { StyleSheet, View, TextInput } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import AddPayAfterService from '~/Main/Functions/AddPayAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';

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
      disabledBtn : true,
      asText : '',
      asCost : '',
      asComment : '',
      isAlertModal : false, //alert 용
      resultMsg : null // alert 결과 메세지
    };
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  // 업체 AS 추가 진행(결제) 요청
  _addPayAfterService = () => {

    const {asText, asCost, asComment} = this.state;

    AddPayAfterService(this.props.asPrgsId, asText, asCost, asComment).then(result => {
        GetCommonData(result, this._addPayAfterService).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
                if(ResultBool) {

                    Actions.pop();
                    
                } else {
                    this.setState({
                        isAlertModal : true,
                        resultMsg : resultData.resultMsg
                    })
                }
            }
        });
    });
  }

  // 등록완료 버튼 활성화 체크
  _chkNextButton = () => {
    const lenChkNum = 5; // 5글자 이상 
    const {asText, asCost, asComment} = this.state;

    if(asText.length >= lenChkNum && asCost.length >= lenChkNum && asComment.length >= lenChkNum) {
      this.setState({disabledBtn : false});
    } else {
      this.setState({disabledBtn : true});
    }
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
                  onChangeText={ (text) => { this.setState({asText : text}), this._chkNextButton()} }
                  placeholder="A/S 내역을 작성해주세요" 
                  style={[styles.inputBox, styles.pl9]} 
                  placeholderTextColor={color.inputPlaceHodler}
                />
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 비용</Text>
              <Item regular style={[styles.mb14, styles.inputWhBackWhBo]}>
                <Input 
                  onChangeText={ (text) => { this.setState({asCost : text}), this._chkNextButton() } }
                  placeholder="추가비용을 입력해주세요" 
                  style={[styles.inputBox, styles.pl9]} 
                  placeholderTextColor={color.inputPlaceHodler}
                  keyboardType="number-pad"
                />
              </Item>
              
              <Text style={localStyles.inputTitleTxt}>추가 A/S 사유</Text>
              <Item regular style={[styles.mb14, styles.textInputWhBackWhBo]}>
                <TextInput
                  onChangeText={ (text) => { this.setState({asComment : text}), this._chkNextButton() } }
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
              disabled={ this.state.disabledBtn }
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
            infoText2={`추가비용 : ${this.state.asCost}원`}
            btnText1="취소"
            btnText2="전송"
        />

         {/* alert 메세지 모달 */}
         <CustomModal
              modalType="ALERT"
              isVisible={this.state.isAlertModal}
              onPress={ () => this.setState({isAlertModal : false})}
              infoText={this.state.resultMsg}
              btnText="확인"
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
    height: 350,
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
