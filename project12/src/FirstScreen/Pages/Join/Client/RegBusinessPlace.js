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
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';

const BIZ_NAME_LEN = 1;
class RegBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          bizNm : '',
          bizDsc : '',
          btnDisabled : true,
          bizData : []
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
                            bizDsc: resultData.data.bplaceDsc,
                            bizData : resultData.data
                        })
                    } else {
                        alert(result.resultMsg);
                    }
                }
            });
        });
    }

    // 사업장 수정
    _editBusiness = async () => {
        await this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        await this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET

        EditBizNm(this.props.value).then(async result => {
            GetCommonData(result, this._editBusiness).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(result);
                    if(ResultBool) {
                        await this.props.onSetBizId(resultData.data.clientBplaceId); // 사업장 ID 리덕스 SET
                        //Actions.RegBusinessShowCase();

                        
                    } else {
                        alert(result.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            // <CustomBlockWrapper
            //     title="사업장 등록"
            // >
            //     <Item regular>
            //         <Input
            //             value={this.state.bizNm}
            //             placeholder='사업장명'
            //             onChangeText={(text) => this.setState({bizNm : text})}
            //         />
            //     </Item>
            //     <Textarea 
            //         value={this.state.bizDsc}
            //         rowSpan={5} 
            //         bordered 
            //         placeholder="사업장 설명"
            //         onChangeText={(text) => this.setState({bizDsc : text})}
            //     />


            //     {(this.props.editBiz) ? (
            //         <View>
            //             <CustomButton 
            //                 styleWidth= { false }
            //                 block={ true }
            //                 info={ true }
            //                 bordered={ true }
            //                 onPress={this._nextButton} >
            //                 <Text>사업장 주소 변경</Text>
            //             </CustomButton>
            //             <CustomButton 
            //                 styleWidth= { false }
            //                 block={ true }
            //                 info={ true }
            //                 bordered={ true }
            //                 onPress={this._editBusiness} >
            //                 <Text>사업장명 변경</Text>
            //             </CustomButton>
            //         </View>
            //     ) : (
            //         <CustomButton 
            //             styleWidth= { false }
            //             block={ true }
            //             info={ true }
            //             bordered={ true }
            //             onPress={this._nextButton} >
            //             <Text>다음 단계로 이동</Text>
            //         </CustomButton>
            //     )}
                
                
            // </CustomBlockWrapper>
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
                            <View style={stylesReg.rightStepNumWrap}>
                                <Text style={stylesReg.rightStepNum}>03</Text>
                            </View>
                        </View>

                        <View style={stylesReg.procBarWrap}>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                        </View>
                    </View>
        
                    <View style={[styles.fx2, styles.justiConCenter]}>
                        <Item regular style={[styles.mb15, {height : 48}]}>
                            <Input 
                                onChangeText={ this._handleChkBusinessName }
                                placeholder="상호명 입력" />
                        </Item>
                    </View>
            
                    <View style={styles.footerBtnWrap}>
                        <CustomButton 
                            onPress={this._nextButton}
                            disabled={ this.state.btnDisabled }
                            edgeFill={true}
                            fillTxt={true}
                        >
                            입력완료
                        </CustomButton>
                    </View>
                </View>
        
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