import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Container, Text, Item } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const BEFORE_IMG_CNT = 4; // A/S 조치전 이미지 카운트

export const BeforeServiceImage = () => (
    <View style={localStyles.prdPhoto}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}>
        <TouchableOpacity 
          style={localStyles.prdPhotoBtnEn}
          onPress={ () => alert("사진조회")}>
          <Text style={localStyles.prdPhotoBtnTxt}>재등록하기</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )

const AfterServiceNoImage = () => (
    <TouchableOpacity style={localStyles.photoNoBoxWrap}>
        <View style={localStyles.photoNoBox}>
        <Icon name="ios-camera" style={localStyles.phototNoIcon} />
        </View>
    </TouchableOpacity>
)

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        data : [],
        imgData : [],
        asData : {
            asPrgsMst : {
                asPrgsStatDSC : null
            }
        },
        asCauseDsc : '',
        asActionDsc : '',
        btnDisabled : true,
        asImgCnt : BEFORE_IMG_CNT,
        method : 'POST' // AS 조치전 정보 조회 정보 여부에 따른 메소드 값
      };
    }

    // static defaultProps = {
    //     asPrgsId : 157 // test
    // }

    componentWillMount() {
        this._getAfterServiceState();
        this._getAfterServiceBeforeInfo();
    }

    // 현재 나의(파트너) AS 진행 상태 체크
    _getAfterServiceState = () => {
        GetAfterServiceState().then(result => {
            GetCommonData(result, this._getAfterServiceState).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("현재 나의(파트너) AS 진행 상태 체크 : ", resultData);
                    if(ResultBool) {
                        this.setState({asData : resultData.data});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 조치전 정보 조회
    _getAfterServiceBeforeInfo = () => {
        GetAfterServiceActionInfo(true, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 조치전 정보 조회 : ", resultData);
                    if(ResultBool) {
                        this.setState({
                            data : resultData.data,
                            imgData : resultData.data.images,
                            asImgCnt : this.state.asImgCnt - resultData.data.images.length
                        });

                        if(resultData.data.info !== null) {
                            this.setState({
                                asCauseDsc : resultData.data.info.asCauseDsc,
                                method : 'PUT',
                                btnDisabled : (resultData.data.images.length > 0) ? false : true
                            })
                        }
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 보고서 기본 정보 등록
    _regAfterServiceReport = () => {
        const { asCauseDsc, asActionDsc, method } = this.state;

        RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc, method).then(result => {
            GetCommonData(result, this._regAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.RegAsAfterReport({asPrgsId : this.props.asPrgsId});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // A/S 이미지 뷰어
    _createBeforeAsImg = () => {
        let imageCompArray = [];

        for (let i = 0; i < this.state.asImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage asPrgsId={ this.props.asPrgsId }/>); 
        }
        return imageCompArray;
    }

    _checkAsCauseDsc = async (text) => {
        await this.setState({asCauseDsc : text});

        if(this.state.asCauseDsc.length > 3) {
            this.setState({btnDisabled : (this.state.imgData.length > 0) ? false : true});
        } else {
            this.setState({btnDisabled : true});
        }
    }

    render() {
        return (
            // <ScrollView style={{flex:1}}>
            //     <CustomHeader
            //         title="A/S 보고서"
            //         backBtn={ false }
            //     />
            //     <Card>
            //         <CardItem>
            //             <Text>{this.state.asData.asPrgsMst.asPrgsStatDSC}</Text>
            //         </CardItem>
            //         <CardItem cardBody>
            //             <Text>상태 이미지</Text>
            //         </CardItem>
            //         <CardItem cardBody>
            //             <CustomButton 
            //                 bordered={ true }
            //                 onPress={ () => alert("업체 전화연결") } >
            //                 <Text>업체 전화연결</Text>
            //             </CustomButton>
            //             <CustomButton 
            //                 bordered={ true }
            //                 onPress={ () => alert("추가 A/S 진행") }>
            //                 <Text>추가 A/S 진행</Text>
            //             </CustomButton>
            //         </CardItem>
            //     </Card>

            //     {this.state.imgData.map((beforeImg, idx) => 
            //         <AfterServiceImage
            //             key={ idx }
            //             index={ idx }
            //             imgUrl={ beforeImg.fileUrl }
            //             imgId={ beforeImg.imgId }
            //             asPrgsId={ this.props.asPrgsId }
            //         />
            //     )}

            //     {this._createBeforeAsImg()}

            //     <Textarea 
            //         value={this.state.asCauseDsc}
            //         rowSpan={5} 
            //         bordered 
            //         placeholder="조치전 증상(파악한 문제 또는 증상)"
            //         onChangeText={ this._checkAsCauseDsc }
            //     />
            //     <CustomButton 
            //         // disabled={ this.state.btnDisabled }
            //         onPress={ this._regAfterServiceReport }>
            //         <Text>다음</Text>
            //     </CustomButton>
            // </ScrollView>
            <Container style={styles.containerInnerPd}>
                <CustomHeader />
                <View style={styles.contentWrap}>

                <View style={{marginBottom: 30}}>
                    
                    <View style={styles.fxDirRow}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                            <Text style={stylesReg.leftGuideTxt}>수리내역</Text>
                            <Text style={stylesReg.leftGuideTxt}>A/S 보고서를</Text>
                            <Text style={stylesReg.leftGuideTxt}>작성해주세요</Text>
                        </View>
                        <View style={stylesReg.rigthTxtWrap}>
                            <Text style={[stylesReg.rightTxt, {fontWeight: "bold"}]}>
                                25<Text style={stylesReg.rightTxtSmall}>%</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.procBarWrap}>
                        <View style={styles.fx1}>
                            <View style={styles.procBarOn} />
                            <Text style={styles.procBarTxt}>조치전사진</Text>
                        </View>
                    <View style={styles.fx1}>
                        <View style={styles.procBarOff} />
                        <Text style={styles.procBarTxt}>조치전증상</Text>
                    </View>
                    <View style={styles.fx1}>
                        <View style={styles.procBarOff} />
                        <Text style={styles.procBarTxt}>조치후사진</Text>
                        </View>
                    <View style={styles.fx1}>
                    <View style={styles.procBarOff} />
                    <Text style={styles.procBarTxt}>수리한내역</Text>
                    </View>
                    </View>
                    
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View>
                            <View style={[localStyles.boxTitleWrap, styles.justiConCenter, styles.alignItemsCenter]}>
                            <Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
                            <View style={[styles.line, styles.fx2, { borderColor: color.blueColor}]}></View>
                            </View>

                            <View style={styles.boxShadow}>
                            <View style={localStyles.prdPhotoWrap}>
                                <BeforeServiceImage/>
                                <BeforeServiceImage/>
                                <AfterServiceNoImage/>
                                <AfterServiceNoImage/>
                            </View>
                            <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                <TextInput
                                placeholder="A/S 조치 전의 증상에 대해 적어주세요."
                                placeholderTextColor={color.inputPlaceHodler}
                                numberOfLines={10}
                                multiline={true}
                                style={styles.textInputBox1}
                                />
                            </Item>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                </View>

            </Container>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
const asCardSize = wp(48, 72);
  
const localStyles = StyleSheet.create({
    boxTitleWrap: {
        marginBottom: 20,
        flexDirection: "row",
        flex: 1
    },
    boxTitleTxt: {
        flex: 1,
        fontSize: 18,
        color : "#038dbd",
        fontWeight: "bold"
    },
    prdPhotoWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap : 'wrap',
        backgroundColor: color.defaultColor,
    },
    prdPhoto: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor : color.defaultColor, 
        height : asCardSize, 
        width : asCardSize
    },
    prdPhotoBtnEn: {
        height : 35,
        width : "100%",
        backgroundColor: 'rgba(40, 200, 245, 0.6)'
    },
    prdPhotoBtnTxt: {
        fontSize: 14,
        color: color.whiteColor,
        textAlign: "center",
        marginTop: 10
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
    phototNoIcon: {
        color: color.defaultColor,
        fontSize: 50
    }
});

export default RegReportBeforePic;