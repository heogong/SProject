import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import ChangeUsrName from '~/Main/Functions/ChangeUsrName';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


class MyProfileModName extends Component {
  constructor(props) {
    super(props);
    this.usrNameInput = null;

    this.state = {
      data : [],
      name : '',
      disableBtn : true,
      isAlertModal : false, // alert 용
      resultMsg : null, // alert 용
    };
  }

  componentDidMount() {
    this._getUserInfo();
  }

  //  사용자 정보 가져오기
  _getUserInfo = () => {
    GetUserInfo().then(async result => {
        GetCommonData(result, this._getUserInfo).then(async resultData => {
            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                    await this.setState({name : resultData.data.usrNm})
                    await this._chkButton();
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

  // 이름 변경 요청(로그인 상태)
  _changeUsrName = () => {
    const {name} = this.state;

    ChangeUsrName(name).then(async result => {
        GetCommonData(result, this._changeUsrName).then(async resultData => {
            if(resultData !== undefined) {
                console.log(resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                  this.props.refreshAction();
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

  // 이름 설정 완료 버튼 활성화 여부
  _chkButton = () => {
    const chkLen = 3;
    const { name } = this.state;

    if(name.length >= chkLen) {
      this.setState({disableBtn : false});
    } else {
      this.setState({disableBtn : true});
    }
  }

  render() {
    return (
      <Container style={styles.containerInnerPd}>
        <CustomHeader title="이름설정"/>
        <View style={styles.contentWrap}>

          <View style={styles.fx1}>
            <View style={styles.tooltipWrap}>
              <Text style={styles.tooltipTxt}>본인의 실명을 입력 후 [설정완료] 버튼을 누러주세요.</Text>
            </View>
            <Text style={styles.inputNbTitleTxt}>이름</Text>
            <Item regular style={styles.inputNbWhBackGreyBottomBo}>
              <Input 
                ref={(input) => { this.usrNameInput = input; }}
                onChangeText={ async (text) => { await this.setState({ name : text }), this._chkButton() }}
                value={this.state.name}
                placeholder="이름을 입력해주세요." 
                placeholderTextColor={color.inputPlaceHodler} 
                style={styles.inputNbDefaultBox}
              />
              <TouchableOpacity onPress={ async () => { await this.setState({disableBtn : true}), this.usrNameInput._root.clear()} }>
                <Icon name="close-circle" style={localStyles.phototIcon} style={{color: "#8e8e98"}} />
              </TouchableOpacity>
            </Item>
          </View>

          <View style={styles.footerBtnWrap}>
            <CustomButton
              onPress={this._changeUsrName}
              disabled={this.state.disableBtn}
            >
              설정완료
            </CustomButton>
          </View>
        </View>

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
  inputIcon: {
    paddingLeft: 0,
    marginRight: 6,
    width: 24,
    height: 24
  },
});

export default MyProfileModName; 
