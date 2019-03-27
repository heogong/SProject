import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Text, Item, Input } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId, setBizNm, setBizDsc } from '~/Redux/Actions';

import EditBizNm from '~/Main/Functions/EditBizNm';
import GetBizPlace from '~/Main/Functions/GetBizPlace';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

const BIZ_NAME_LEN = 1;
class RegBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizNm : null,
          bizDsc : '',
          btnDisabled : true,
          bizData : [],
          isModalVisible : false,
          isAlertModal : false, // alert 용
          resultMsg : null // alert 용
      };
    }

    static defaultProps = {
        editBiz : false // 사업장명 수정 페이지 여부
    }

    componentDidMount() {
        // 사업장 수정 페이지 접근 시
        if(this.props.editBiz) {
            this._getBizPlace();
        }
    }

    // 사업장 정보 가져오기
    _getBizPlace = async () => {
        GetBizPlace(this.props.value.bizId).then(async result => {
            GetCommonData(result, this._getBizPlace).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(result);
                    if(ResultBool) {
                        this.setState({
                            bizNm : resultData.data.bplaceNm,
                            bizData : resultData.data
                        })
                        this._chkBtn();
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

    // 사업장 수정
    _editBusiness = async () => {
        this.setState({isModalVisible : false});

        await this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        await this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET

        EditBizNm(this.props.value).then(async result => {
            GetCommonData(result, this._editBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(result);
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        //Actions.EditBusinessAddress();
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

    // 입력완료버튼 활성화 여부
    _handleChkBusinessName = async (text) => {
        await this.setState({bizNm : text});

        this.setState({btnDisabled : (this.state.bizNm.length > BIZ_NAME_LEN) ? false : true})
    } 

    _nextButton = async () => {
        await this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        await this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET

        // 수정 시
        if(this.props.editBiz) {
            Actions.EditBusinessAddress({
                bizData : this.state.bizData
            }); 
        } else {
            Actions.SetAddress(); // 등록 시
        }
        
    }

    // 버튼 활성화 여부
    _chkBtn = () => {
        const { bizNm } = this.state;

        if(bizNm.length > 0) {
            this.setState({
                btnDisabled : (bizNm.length > BIZ_NAME_LEN) ? false : true
            })
        }
    }

    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader />
                <View style={styles.contentWrap}>
                    <View>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>귀하의</Text>
                                <Text style={stylesReg.leftGuideTxt}>사업장정보를</Text>
                                <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                            </View>
                        </View>
                    </View>
        
                    <View style={[styles.fx3, styles.justiConCenter]}>
                        <Item regular style={styles.inputWhBackGreyBo}>
                            <Input 
                                onChangeText={ this._handleChkBusinessName }
                                placeholder="상호명을 입력해주세요" 
                                placeholderTextColor={color.inputPlaceHodler} 
                                style={styles.inputDefaultBox}
                            >{this.state.bizNm}</Input>
                        </Item>
                    </View>
            
                    <View style={styles.footerBtnWrap}>
                        <CustomButton 
                            onPress={() => (this.props.editBiz) ? this.setState({isModalVisible : true}) : this._nextButton()}
                            disabled={ this.state.btnDisabled }
                        >
                            입력완료
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


                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={this._editBusiness}
                    onPress2={() => { this.setState({isModalVisible : false}), this._nextButton() } }
                    infoText1="사업장주소 변경 하시겠습니까???"
                    infoText2={null}
                    btnText1="아니오"
                    btnText2="예"
                />
        
            </Container>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizId: (value) => dispatch(setBizId(value)),
        onSetBizNm: (value) => dispatch(setBizNm(value)),
        onSetBizDsc: (value) => dispatch(setBizDsc(value))
    }
}
  
RegBusinessPlace = connect(mapStateToProps, mapDispatchToProps)(RegBusinessPlace);
  
export default RegBusinessPlace;