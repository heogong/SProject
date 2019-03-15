import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceReport from '~/Main/Functions/GetAfterServiceReport';
import GetCommonData from '~/Common/Functions/GetCommonData';

import AfterServiceImage from '~/Main/Components/AfterServiceImage';
import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


class ViewAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getAfterServiceReport();
    }

    // AS 보고서 접수(신청) 정보 조회
    _getAfterServiceReport = () => {
        GetAfterServiceReport(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ data : resultData.data });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (
            // <CustomBlockWrapper
            //     title="출장 보고서"
            // >
            //     <Card>
            //         <CardItem body>
            //             <Thumbnail large source={{ uri: afterService.prdTypeFileUrl }} />
            //         </CardItem>
            //         <CardItem>
            //             <View>
            //                 <Text>
            //                     사업장 : {afterService.bplaceNm}
            //                 </Text>
            //                 <Text>
            //                     날짜 : {afterService.regDt}
            //                 </Text>
            //                 <Text>
            //                     증상 : {afterService.evalDsc}
            //                 </Text>
            //                 <Text>
            //                     만족도 : {afterService.evalPoint}
            //                 </Text>
            //             </View>
            //         </CardItem>
            //         <CardItem>
            //             <CustomButton onPress={ () => alert("작성") }>
            //                 <Text>작성</Text>
            //             </CustomButton>
            //         </CardItem>
            //     </Card>
            // </CustomBlockWrapper>
            <Container style={styles.containerScroll}>
                <CustomHeader title="A/S 보고서"/>

                <ScrollView showsVerticalScrollIndicator={false}>
        
                    <View style={localStyles.contentWrap}>
                        <View style={localStyles.titleWrap}>
                            <Image source={require('~/Common/Image/product/01_icon_white.png')} style={localStyles.titleImg}/>
                            <Text style={localStyles.titleNameTxt}>세나정육점</Text>
                            <Text style={localStyles.subNameTxt}>육류용냉장고</Text>
                        </View>

                        <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                            <Text style={localStyles.histBoxTitleTxt}>A/S신청내역</Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>육류용 냉장고</Text>
                            <Text style={localStyles.histBoxInfoTxt}>경기도 시흥시 산기대로</Text>
                            <Text style={localStyles.histBoxInfoTxt}>bbbbbbbbbbb</Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>참고사항</Text>
                            <Text style={localStyles.histBoxInfoTxt}>12312312312312312312312312321</Text>

                            <Text style={localStyles.histBoxSubTitleTxt}>쿨리닉데이터</Text>
                            <View style={styles.fxDirRow}>
                                <View style={styles.fx1}>
                                    <Text style={localStyles.histBoxInfoTxt}>용량 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>전기 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>압축기 :</Text>
                                </View>
                                <View style={styles.fx1}>
                                    <Text style={localStyles.histBoxInfoTxt}>응축기 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>증발기 :</Text>
                                    <Text style={localStyles.histBoxInfoTxt}>제조사 :</Text>
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
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                    </View>
                                    <View style={localStyles.prdPhotoTxtWrap}>
                                        <Text style={localStyles.histBoxSubTitleTxt}>출장 전 상태</Text>
                                        <Text style={localStyles.histBoxInfoTxt}>ㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹ</Text>
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
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                        />
                                        <AfterServiceImage 
                                            viewImage={true}
                                            imgUri={"https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg"}
                                        />
                                    </View>
                                    <View style={localStyles.prdPhotoTxtWrap}>
                                        <Text style={localStyles.histBoxSubTitleTxt}>A/S 조치내역</Text>
                                        <Text style={localStyles.histBoxInfoTxt}>ㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹㅁㅇㄴㄹㅁㅇㄹ</Text>
                                    </View>
                                </View>
                                

                            </View>
                        </View>
                        
                        <View>
                            <View style={[localStyles.boxTitleWrap]}>
                                <Text style={localStyles.boxTitleTxt}>추가 A/S</Text>
                                <View style={[styles.line, {flex: 2, borderColor: color.whiteColor}]}></View>
                            </View>
                            <View style={[styles.boxShadow, localStyles.histBoxWrap]}>
                                <Text style={localStyles.histBoxTitleTxt}>청구비용</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가 A/S 비용</Text>
                                <Text style={localStyles.histBoxInfoTxt}>120,000원</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가A/S내역</Text>
                                <Text style={localStyles.histBoxInfoTxt}>1231231231231231231231231232112312312312312312312312312321</Text>

                                <Text style={localStyles.histBoxSubTitleTxt}>추가A/S사유</Text>
                                <Text style={localStyles.histBoxInfoTxt}>12312312312312312312312312321123123123123123123123123123211231231231231231231231231232112312312312312312312312312321</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>

            </Container>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
  const asCardSize = wp(45, (styles.containerScroll.paddingLeft * 4) + 10 );
  
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
    photoNoBoxWrap: {
      flex: 5,
      borderColor : "#c9cacb",
      borderWidth : 1,
      margin: 5,
      height : asCardSize, 
      width : asCardSize
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