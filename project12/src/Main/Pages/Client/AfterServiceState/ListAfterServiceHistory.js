import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Icon, Text, H3 } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomModal from '~/Common/Components/CustomModal';
import GetAfterServiceHistory from '~/Main/Functions/GetAfterServiceHistory'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class ListAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : [],
        isAlertModal : false, // alert 용
        resultMsg : null // alert 용
      };
    }

    componentDidMount() {
        this.setState({spinner : true});
        this._getAfterServiceHistory();
    }

    // 고객 AS 내역 목록 조회
    _getAfterServiceHistory = () => {
        GetAfterServiceHistory().then(result => {
            GetCommonData(result, this._getAfterServiceHistory).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data });
                    } else {
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
                    }
                    this.setState({spinner : false});
                }
            });
        });
    }

    // 만족도 별점 그리기
    _drawStarPoint = (point) => {
        let starPointArray = [];

        for(let i = 0; i < 5; i++) {
            starPointArray.push(<View key={i}>
                <Image source={
                    (point-- > 0) ? require("~/Common/Image/star_icon_100.png") : require("~/Common/Image/star_icon_50.png")
                } 
                resizeMode="contain" style={localStyles.starIconImg} />
            </View>); 
        }

        return starPointArray;
    }

    // 메인페이지 이동 - 그냥 pop 하면 index페이지로 이동 함
    _goToMain = () => {
        Actions.ClientMain();
    }
    
    render() {
        return (
            <Container style={styles.containerScroll}>
                {/* 로딩 */}
                <Spinner
                    visible={this.state.spinner}
                    textContent={'A/S 내역을 불러오고 있습니다.'}
                    style={{color: '#FFF'}}
                />
                <CustomHeader 
                    customAction={this._goToMain}
                />
                
                    <View style={{marginBottom: 36}}>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>A/S 받으신</Text>
                                <Text style={stylesReg.leftGuideTxt}>내역에 대해</Text>
                                <Text style={stylesReg.leftGuideTxt}>확인해보세요</Text>
                            </View>

                            <View style={stylesReg.rigthTxtWrap}>
                                <Text style={[stylesReg.rightTxt, {fontWeight: "bold"}]}>
                                    {this.state.data.length}
                                    <Text style={stylesReg.rightTxtSmall}>건</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    { 
                    (this.state.data.length > 0) ? (
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {this.state.data.map((afterService, idx) => 
                                <TouchableOpacity 
                                    key={idx}
                                    onPress={() => Actions.ViewAfterServiceHistory({asPrgsId : afterService.asPrgsId})}
                                >
                                    <View style={[styles.listPrdBoxFillWrap, {height: 120}]}>
                                        <View style={[styles.listPrdBoxImgWrap, {marginTop: 4}]}>
                                            <Image 
                                                source={{ uri: afterService.prdTypeFileUrl }} 
                                                resizeMode="contain" 
                                                style={styles.listPrdBoxImg} 
                                            />
                                            <Text style={styles.listPrdBoxImgTxt}>{afterService.prdTypeKoNm}</Text>
                                        </View>
                                        <View style={styles.listPrdBoxRightTxtWrap}>
                                            <H3 style={styles.listPrdBoxRightTitleTxt}>{afterService.bplaceNm}</H3>
                                            <Text style={[styles.listPrdBoxDeTxt, styles.mb12, {fontWeight: "500"}]}>{afterService.regDt}</Text>
                                            <Text style={styles.listPrdBoxDeTxt}>{afterService.evalDsc}</Text>
                                            <View style={styles.fxDirRow}>
                                                <Text style={[styles.listPrdBoxDeTxt, {paddingTop: 3}]}>만족도</Text>
                                                    <View style={localStyles.starIconWrap}>
                                                        {this._drawStarPoint(parseInt(afterService.evalPoint))}
                                                    </View>
                                            </View>
                                        </View>

                                        <View style={styles.listPrdBoxNextIconWrap}>
                                        <TouchableOpacity 
                                            onPress={() => Actions.ViewAfterServiceHistory({asPrgsId : afterService.asPrgsId})} 
                                        >
                                            <Image source={require("~/Common/Image/Next_icon_white.png")} resizeMode="contain" style={{width: 26, height: 26}} />
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                      ) : (
                        <View style={styles.listPrdBoxEmptyImgWrap}>
                            <Image 
                                source={require("~/Common/Image/No_alram_icon.png")} 
                                style={{height: 219, width: 219, marginTop: -36}} 
                            />
                        </View>
                    )
                }
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

export default ListAfterServiceHistory;