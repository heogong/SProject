import React, { Component } from "react";
import { Image, ScrollView, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from "react-native-router-flux";

import SelectProduct from "~/Main/Components/SelectProduct";
import GetProdType from '~/Main/Functions/GetProdType';
import RegPartnerProdType from '~/FirstScreen/Functions/RegPartnerProdType';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data : [],
          selectData : [],
          btnDisabled : true,
          isAlertModal : false, // alert 용
          resultMsg : null // alert 용
        };
    }

    componentDidMount() {
        this._drawProductType();
    }

    // 제품 타입 조회
    _drawProductType = () => {
        GetProdType().then(result => {
            GetCommonData(result, this._drawProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data: resultData.data });
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

    // 제품 타입 등록
    _regProductType = () => {
        RegPartnerProdType(this.state.selectData).then(result => {
            GetCommonData(result, this._regProductType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.JoinInputWorkHours();
                        // Actions.JoinSetPartnerAddress();
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

     // 선택된 데이터 array 추가
    _addDataArray = async (value) => {
        await this.setState({ selectData: this.state.selectData.concat([{ prdTypeId : value }]) 
        });
        //await this.setState({ selectData: this.state.selectData.concat([value]) });

        console.log("_addDataArray : ",this.state.selectData);
        this.setState({ btnDisabled : false })
    }
    
    // 해제된 데이터 array 제거
    _removeDataArray = async (value) => {
        await this.setState({ selectData: this.state.selectData.filter((item, sidx) => item.prdTypeId !== value) });
        //await this.setState({ selectData: this.state.selectData.filter((item, sidx) => item !== value) });

        console.log("_removeDataArray : ",this.state.selectData);

        this.setState({ btnDisabled : (this.state.selectData.length > 0) ? false : true});
        //this.state.selectData
    }

    // next
    _nextPress = () => {
        console.log("result : ",this.state.selectData);
        this._regProductType();

        //Actions.JoinSetPartnerAddress();
    }

    render() {
        return (
            <Container style={styles.containerInnerPd}>
                <CustomHeader resetPage={true} />
                <View style={{marginBottom: 36}}>
                    <View style={styles.fxDirRow}>
                    <View style={stylesReg.leftGuideTxtWrap}>
                        <Text style={stylesReg.leftGuideTxt}>전문분야를</Text>
                        <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                        <Text style={stylesReg.leftGuideTxt}>(복수선택)</Text>
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

                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>

                <View style={[styles.fxDirRow, styles.justiConBetween, styles.fxWraWra]}>

                    {this.state.data.map((item, index) => (
                        <SelectProduct
                            value={item.prdTypeId}
                            text={item.prdTypeKoNm}
                            imgUri={item.image.fileUrl}
                            addDataArray={ this._addDataArray }
                            removeDataArray={ this._removeDataArray }
                            key={ index }
                        />
                    ))}

                </View>
                
                </ScrollView>

                <View style={styles.footerBtnWrap}>
                    <CustomButton 
                        onPress={this._nextPress}
                        DefaultLineBtn={true}
                        disabled={ this.state.btnDisabled }
                    >
                        등록완료
                    </CustomButton>
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
        )
    }
}
export default InputProdType;