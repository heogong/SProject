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
import { color } from '~/Common/Styles/colors';

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

    // 입력완료버튼 활성화 여부
    _handleChkBusinessName = async (text) => {
        await this.setState({bizNm : text});
        
        this.setState({btnDisabled : (this.state.bizNm.length > BIZ_NAME_LEN) ? false : true})
    } 

    _nextButton = async () => {
        await this.props.onSetBizNm(this.state.bizNm);  // 리덕스 사업장 명 SET
        await this.props.onSetBizDsc(this.state.bizDsc);  // 리덕스 사업장 설명 SET

        Actions.SetAddress();
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
                            {/* 선택사항이므로 주석처리
                            <View style={stylesReg.rightStepNumWrap}>
                                <Text style={stylesReg.rightStepNum}>04</Text>
                            </View>
                             */}
                        </View>
                        {/* 선택사항이므로 주석처리
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
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                            </View>
                        </View>
                         */}
                    </View>
        
                    <View style={[styles.fx3, styles.justiConCenter]}>
                        <Item regular style={styles.inputWhBackGreyBo}>
                            <Input 
                                onChangeText={ this._handleChkBusinessName }
                                placeholder="상호명을 입력해주세요" 
                                placeholderTextColor={color.inputPlaceHodler} 
                                style={styles.inputDefaultBox}
                            />
                        </Item>
                    </View>
            
                    <View style={styles.footerBtnWrap}>
                        <CustomButton 
                            onPress={this._nextButton}
                            disabled={ this.state.btnDisabled }
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