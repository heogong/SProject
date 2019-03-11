import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text, Item } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

let BEFORE_IMG_CNT = 4; // 등록할 A/S 조치전 이미지 카운트
let ALREADY_IMG_CNT = 0; // 이미 등록된 A/S 조치전 이미지 카운트

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        imgData : [],
        asData : {
            asPrgsMst : {
                asPrgsStatDSC : null
            }
        },
        asCauseDsc : '',
        asActionDsc : '',
        btnDisabled : true,
        isAlertModal : false, //alert 용
        resultMsg : null // alert 결과 메세지
      };
    }

    // static defaultProps = {
    //     asPrgsId : 157 // test
    // }

    componentWillMount() {
        //this._getAfterServiceBeforeInfo();
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
                        });

                        ALREADY_IMG_CNT = resultData.data.images.length; // 등록된 조치전 이미지 카운트
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

    // AS 보고서 기본 정보 등록
    _regAfterServiceReport = () => {
        const method ='POST'; // AS 조치전 정보 조회 정보 여부에 따른 메소드 값
        const { asCauseDsc, asActionDsc } = this.state;

        RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc, method).then(result => {
            GetCommonData(result, this._regAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.RegAsAfterReport({asPrgsId : this.props.asPrgsId});
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

    // 등록된 조치전 이미지 카운트 만큼 제거 후 draw
    _createBeforeAsImg = () => {
        BEFORE_IMG_CNT -= ALREADY_IMG_CNT; 

        let imageCompArray = [];

        for (let i = 0; i < BEFORE_IMG_CNT; i++) {
            imageCompArray.push(<AfterServiceImage 
                key={i + ALREADY_IMG_CNT} 
                imgUrl={ null }
                asPrgsId={ this.props.asPrgsId }
                beforeAction={ true }
                takeBeforeImageAction={ this._addBeforASImg }
            />); 
        }
        return imageCompArray;
    }


    // 이미지 등록시 next 버튼 활성화
    _addBeforASImg = () => {
        this.setState({btnDisabled : false});
     }

     // 이미지 등록시 next 버튼 활성화 - 현 페이지에서는 조치 후 사진은 등록 해도 넥스트 버튼 활성화 의미 없음
    _addAfterASImg = () => {
        //this.setState({btnDisabled : false});
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
            <Container style={styles.containerScroll}>
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
                        <View style={stylesReg.procBarWrap}>
                            <View style={styles.fx1}>
                                <View style={stylesReg.procBarOn} />
                                <Text style={stylesReg.procBarTxt}>조치전사진</Text>
                            </View>
                        <View style={styles.fx1}>
                            <View style={stylesReg.procBarOff} />
                            <Text style={stylesReg.procBarTxt}>조치전증상</Text>
                        </View>
                        <View style={styles.fx1}>
                            <View style={stylesReg.procBarOff} />
                            <Text style={stylesReg.procBarTxt}>조치후사진</Text>
                            </View>
                        <View style={styles.fx1}>
                        <View style={stylesReg.procBarOff} />
                        <Text style={stylesReg.procBarTxt}>수리한내역</Text>
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


                                    {/* 미리 등록된 조치전 이미지 있을 경우 */}
                                    {this.state.imgData.map((beforeImg, idx) => 
                                        <AfterServiceImage
                                            key={ idx }
                                            index={ idx }
                                            imgUrl={ beforeImg.fileUrl }
                                            imgId={ beforeImg.imgId }
                                            asPrgsId={ this.props.asPrgsId }
                                            takeBeforeImageAction={ this._addBeforASImg }
                                        />
                                    )}
                                    
                                    { this._createBeforeAsImg() }

                                </View>
                                <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                    <TextInput
                                        value={this.state.asCauseDsc}
                                        onChangeText={ (text) => this.setState({asCauseDsc : text}) }
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

                        <View style={[styles.mb20, {marginTop: 32}]}>
                            <View style={[localStyles.boxTitleWrap, styles.justiConCenter, styles.alignItemsCenter]}>
                                <Text style={localStyles.boxTitleTxt}>A/S 조치 후</Text>
                                <View style={[styles.line, styles.fx2,{borderColor: color.blueColor}]}></View>
                            </View>

                            <View style={styles.boxShadow}>
                                <View style={localStyles.prdPhotoWrap}>

                                    <AfterServiceImage 
                                        imgUrl={ null }
                                        asPrgsId={ this.props.asPrgsId }
                                        beforeAction={ false }
                                        takeAfterImageAction={ this._addAfterASImg }
                                    />
                                    <AfterServiceImage 
                                        imgUrl={ null }
                                        asPrgsId={ this.props.asPrgsId }
                                        beforeAction={ false }
                                        takeAfterImageAction={ this._addAfterASImg }
                                    />
                                    <AfterServiceImage 
                                        imgUrl={ null }
                                        asPrgsId={ this.props.asPrgsId }
                                        beforeAction={ false }
                                        takeAfterImageAction={ this._addAfterASImg }
                                    />
                                    <AfterServiceImage 
                                        imgUrl={ null }
                                        asPrgsId={ this.props.asPrgsId }
                                        beforeAction={ false }
                                        takeAfterImageAction={ this._addAfterASImg }
                                    />

                                </View>
                                <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                    <TextInput
                                        value={this.state.asActionDsc}
                                        onChangeText={ (text) => this.setState({asActionDsc : text}) }
                                        placeholder="수리한 내역에 대해 적어주세요."
                                        placeholderTextColor={color.inputPlaceHodler}
                                        numberOfLines={10}
                                        multiline={true}
                                        style={styles.textInputBox1}
                                    />
                                </Item>
                            </View>
                        </View>

                        {/* TEST */}
                        <CustomButton 
                            onPress={ this._regAfterServiceReport }
                            disabled={this.state.btnDisabled}>
                            넥스트
                        </CustomButton>

                    </ScrollView>
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
    }
});

export default RegReportBeforePic;