import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceReport from '~/Main/Functions/GetAfterServiceReport';
import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomModal from '~/Common/Components/CustomModal';
import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';

let BEFORE_DATA = [];
let AFTER_DATA = [];
const AFTER_SERVICE_IMG_CNT = 4;

class ViewAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: {
            asPrgsMst : {
              asPrgsStatNm : null,
              asPrgsStatDSC : null,
              asRecvDsc : null
            },
            clinePrdInfo : {
              bplace : {
                bplaceNm : null,
                addr : {
                  addressName : null
                },
                detail : {
                  detailAddr1 : null
                }
              },
              prdType : {
                prdTypeKoNm: null
              },
              clientPrdNm : null,
              prdTypeImg : {
                fileUrl : null
              }
            },
            clientPrdParts : []
        },
        beforeData : {
            images : [],
            info : {
                asCauseDsc : null
            }
        },
        afterData : {
            images : [],
            info : {
                asActionDsc : null
            }
        },
        isAlertModal : false, // alert 용
        resultMsg : null // alert 용
      };
    }

    componentDidMount() {
        this._getAfterServiceReport();
        this._getBeforeActionInfo();
        this._getAfterActionInfo();
    }

    // AS 보고서 신청내역, 결제정보 조회
    _getAfterServiceReport = () => {
        GetAfterServiceReport(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("신청내역, 결제정보 조회 -", resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data });
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

    // AS 보고서 조치전 정보 조회
    _getBeforeActionInfo = () => {
        GetAfterServiceActionInfo(true, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getBeforeActionInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("조치전 정보 조회 - ",resultData);
                    if(ResultBool) {
                        this.setState({ beforeData : resultData.data });
                        // BEFORE_DATA = resultData.data;
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

    // AS 보고서 조치후 정보 조회
    _getAfterActionInfo = () => {
        GetAfterServiceActionInfo(false, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterActionInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("조치후 정보 조회 - ", resultData);
                    if(ResultBool) {
                        this.setState({ afterData : resultData.data });
                        // AFTER_DATA = resultData.data;
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

    _drawBeforeImg = () => {
        let beforeImgArray = [];
        const { beforeData } = this.state;
        let beforeImgCnt = beforeData.images.length;

        for( let i = 0 ; i < AFTER_SERVICE_IMG_CNT; i++ ) {
            if(beforeImgCnt > 0) {
                beforeImgArray.push( 
                    <AfterServiceImage key={i} viewImage={true} imgUri={beforeData.images[i].fileUrl} />
                )
                beforeImgCnt--;
            } else {
                beforeImgArray.push( 
                    <AfterServiceImage key={i} viewImage={true} imgUri={null} />
                )
            }
        }

        return beforeImgArray;
    }

    _drawAfterImg = () => {
        let afterImgArray = [];
        const { afterData } = this.state;
        let afterImgCnt = afterData.images.length;

        for( let i = 0 ; i < AFTER_SERVICE_IMG_CNT; i++ ) {
            if(afterImgCnt > 0) {
                afterImgArray.push( 
                    <AfterServiceImage key={i} viewImage={true} imgUri={afterData.images[i].fileUrl} />
                )
                afterImgCnt--;
            } else {
                afterImgArray.push( 
                    <AfterServiceImage key={i} viewImage={true} imgUri={null} />
                )
            }
        }

        return afterImgArray;
    }

    

    render() {
        return (
            <Container style={styles.container}>
                <View style={{
                    paddingLeft : styles.containerScroll.paddingLeft,
                    paddingRight : styles.containerScroll.paddingRight
                }}>
                    <CustomHeader title="A/S 보고서"/>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
        
                    <View style={localStyles.contentWrap}>
                        <View style={localStyles.titleWrap}>
                            <Image source={require('~/Common/Image/product/01_icon_white.png')} style={localStyles.titleImg}/>
                            <Text style={localStyles.titleNameTxt}>{this.state.data.clinePrdInfo.bplace.bplaceNm}</Text>
                            <Text style={localStyles.subNameTxt}>{this.state.data.clinePrdInfo.prdType.prdTypeKoNm}</Text>
                        </View>

                        <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                            <Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>{this.state.data.clinePrdInfo.clientPrdNm}</Text>
                            <Text style={localStyles.histBoxInfoTxt}>{this.state.data.clinePrdInfo.bplace.addr.addressName}</Text>
                            <Text style={localStyles.histBoxInfoTxt}>{this.state.data.clinePrdInfo.bplace.detail.detailAddr1}</Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
                            <Text style={localStyles.histBoxInfoTxt}>
                                {
                                    (this.state.data.asPrgsMst.asRecvDsc == "null") ? '입력된 내용이 없습니다.' : this.state.data.asPrgsMst.asRecvDsc
                                }
                            </Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>쿨리닉데이터</Text>
                            <View style={styles.fxDirRow}>
                                
                                {/* <View style={styles.fx1}>
                                    <Text style={localStyles.histBoxInfoTxt}>용량 : </Text>
                                    <Text style={localStyles.histBoxInfoTxt}>전기 : </Text>
                                    <Text style={localStyles.histBoxInfoTxt}>압축기 :</Text>
                                </View>
                                <View style={styles.fx1}>
                                    <Text style={localStyles.histBoxInfoTxt}>응축기 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>증발기 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>제조사 :</Text>
                                </View> */}

                                <View style={styles.fx1}>
                                    {this.state.data.clientPrdParts.map((info, idx) =>
                                        <Text key={idx} style={localStyles.histBoxInfoTxt}>{info.rootPrdPartKoNm} : {info.prdPartKoNm}</Text>
                                    )}
                                </View>

                            </View>
                        </View>

                        <View>
                            <View>
                                <View style={[localStyles.boxTitleWrap]}>
                                    <Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
                                    <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                                </View>

                                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                                    <View style={localStyles.prdPhotoWrap}>

                                        {this._drawBeforeImg()}

                                    </View>
                                    <View style={localStyles.prdPhotoTxtWrap}>
                                        <Text style={localStyles.histBoxSubTitleTxt}>출장 전 상태</Text>
                                        <Text style={localStyles.histBoxInfoTxt}>
                                            {
                                                this.state.beforeData.info !== null ? this.state.beforeData.info.asCauseDsc : '입력된 내용이 없습니다.'
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={[localStyles.boxTitleWrap]}>
                                    <Text style={localStyles.boxTitleTxt}>A/S 조치 후</Text>
                                    <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                                </View>

                                <View style={[styles.boxShadow, {backgroundColor: color.whiteColor}]}>
                                    <View style={localStyles.prdPhotoWrap}>

                                       {this._drawAfterImg()}

                                    </View>
                                    <View style={localStyles.prdPhotoTxtWrap}>
                                        <Text style={localStyles.histBoxSubTitleTxt}>A/S 조치내역</Text>
                                        <Text style={localStyles.histBoxInfoTxt}>
                                            {
                                                this.state.afterData.info !== null ? this.state.afterData.info.asActionDsc : '입력된 내용이 없습니다.'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View>

                        {(this.state.data.asPrgsMst.asAddYn == "Y") ? (
                             <View>
                                <View style={[localStyles.boxTitleWrap]}>
                                    <Text style={localStyles.boxTitleTxt}>추가 A/S</Text>
                                    <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                                </View>
                                <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                                    <Text style={localStyles.histBoxTitleTxt}>청구비용</Text>
    
                                    <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 비용</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>{this.state.data.asPrgsMst.asAddCost} 원</Text>
    
                                    <Text style={localStyles.histBoxSubTitleTxt}>추가A/S내역</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>{this.state.data.asPrgsMst.asAddTitle}</Text>
    
                                    <Text style={localStyles.histBoxSubTitleTxt}>추가A/S사유</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>{this.state.data.asPrgsMst.asAddComment}</Text>
                                </View>
                            </View>
                        ) : (
                            <View/>
                        )}

                    </View>
                </ScrollView>

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

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
  const asCardSize = wp(50, (styles.containerScroll.paddingLeft * 2));
  
  const localStyles = StyleSheet.create({
    titleWrap: {
      alignItems : 'center'
    },
    titleImg: {
      width: 80,
      height: 80,
      marginTop: -40
    },
    boxTitleWrap: {
      marginBottom: 20,
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 25
    },
    boxTitleTxt: {
      flex: 1,
      fontSize: 18,
      color : color.whiteColor,
      fontWeight: "bold"
    },
    prdPhotoWrap: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap : 'wrap',
      backgroundColor: color.whiteColor,
      width: "100%"
    },
    photoNoBox: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.whiteColor
    },
    contentWrap: {
      paddingLeft: 26,
      paddingRight: 26,
      marginTop: 40,
      paddingBottom: 26,
      backgroundColor: color.defaultColor
    },
    titleNameTxt: {
      marginTop: 14,
      fontSize: 18,
      fontWeight: "bold",
      color: color.whiteColor
    },
    subNameTxt: {
      marginTop: 7,
      marginBottom: 30,
      fontSize: 14,
      fontWeight: "bold",
      color: color.whiteColor
    },
    histBoxWrap: {
      backgroundColor: color.whiteColor,
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 24,
      paddingRight: 24
    },
    histBoxTitleTxt: {
      color:'#28c8f5',
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 6
    },
    histBoxSubTitleTxt: {
      fontSize: 15,
      color: "#1e1e32",
      fontWeight: "bold",
      marginBottom: 10,
      marginTop: 20
    },
    histBoxInfoTxt: {
      fontSize: 13,
      color: "#8e8e98",
      lineHeight: 20
    },
    prdPhotoTxtWrap: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      borderTopWidth: 1,
      borderColor: "#c9cacb"
    },
  });

export default ViewAfterServiceHistory;