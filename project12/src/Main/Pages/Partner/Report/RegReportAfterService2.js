import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text, Item, Textarea } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import RegCompleteReport from '~/Main/Functions/RegCompleteReport';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

let BEFORE_IMG_CNT = 4; // 등록할 A/S 조치 전 이미지 카운트
let AFTER_IMG_CNT = 4; // 등록할 A/S 조치 후 이미지 카운트
let ALREADY_BEFORE_IMG_CNT = 0; // 이미 등록된 A/S 조치 전 이미지 카운트
let ALREADY_AFTER_IMG_CNT = 0; // 이미 등록된 A/S 조치 후 이미지 카운트
let CURRENT_BEFORE_IMG_CNT = 0; // 화면에 등록된 A/S 조치 전 이미지 카운트(유효성 체크용 변수)
let CURRENT_AFTER_IMG_CNT = 0; // 화면에 등록된 A/S 조치 후 이미지 카운트(유효성 체크용 변수)

const AS_PROCESS_PERCENT = 25; // 조치전/후 이미지 등록시 percent

export const ProcessOn = ({processTxt}) => (
    <View style={[styles.fx1, {borderRightWidth: 0, borderLeftWidth: 0}]}>
        <View style={stylesReg.procBarOn} />
        <Text style={stylesReg.procBarTxt}>{processTxt}</Text>
    </View>
)

export const ProcessOff = ({processTxt}) => (
    <View style={[styles.fx1, {borderRightWidth: 0, borderLeftWidth: 0}]}>
        <View style={stylesReg.procBarOff} />
        <Text style={stylesReg.procBarTxt}>{processTxt}</Text>
    </View>
)

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.asCauseDsc = null;
      this.asActionDsc = null;

      this.state =  {
        beforeImgData : [],
        afterImgData : [],
        asData : {
            asPrgsMst : {
                asPrgsStatDSC : null
            }
        },
        reportPercent : 0,
        asCauseDsc : '',
        asActionDsc : '',
        btnDisabled : false,
        isModalVisible : false,
        isAlertModal : false, //alert 용
        resultMsg : null, // alert 결과 메세지
        spinner : false
      };
    }

    // static defaultProps = {
    //     asPrgsId : 157 // test
    // }

    componentWillMount() {
        this._getAfterServiceBeforeInfo();
        this._getAfterServiceAfterInfo();
    }

    // AS 조치전 정보 조회
    _getAfterServiceBeforeInfo = () => {
        GetAfterServiceActionInfo(true, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceBeforeInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 조치전 정보 조회 : ", resultData);
                    if(ResultBool) {
                        ALREADY_BEFORE_IMG_CNT = resultData.data.images.length; // 등록된 조치전 이미지 카운트
                        CURRENT_BEFORE_IMG_CNT = ALREADY_BEFORE_IMG_CNT;

                        if(ALREADY_BEFORE_IMG_CNT > 0) {
                            this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                            if(resultData.data.info.asCauseDsc !== null) {
                                this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                            } 
                        }

                        this.setState({
                            beforeData : resultData.data,
                            beforeImgData : resultData.data.images,
                            asCauseDsc : resultData.data.info.asCauseDsc
                        });
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

    // AS 조치후 정보 조회
    _getAfterServiceAfterInfo = () => {
        GetAfterServiceActionInfo(false, this.props.asPrgsId).then(result => {
            GetCommonData(result, this._getAfterServiceAfterInfo).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log("AS 조치후 정보 조회 : ", resultData);
                    if(ResultBool) {
                        ALREADY_AFTER_IMG_CNT = resultData.data.images.length; // 등록된 조치전 이미지 카운트
                        CURRENT_AFTER_IMG_CNT = ALREADY_AFTER_IMG_CNT;

                        if(ALREADY_AFTER_IMG_CNT > 0) {
                            this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                            if(resultData.data.info.asActionDsc !== null) {
                                this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                            } 
                        }

                        this.setState({
                            //afterData : resultData.data,
                            afterImgData : resultData.data.images,
                            asActionDsc : resultData.data.info.asActionDsc
                        });

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
        this.setState({
            isModalVisible : false,
            spinner: true
        });

        const method ='PUT'; // AS 조치전 정보 조회 정보 여부에 따른 메소드 값
        const { asCauseDsc, asActionDsc } = this.state;

        if(CURRENT_BEFORE_IMG_CNT > 0 && CURRENT_AFTER_IMG_CNT > 0 && (asCauseDsc !== '' && asCauseDsc !== null) && (asActionDsc !== '' && asActionDsc !== null))  {
            RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc, method).then(result => {
                GetCommonData(result, this._regAfterServiceReport).then(async resultData => {

                    if(resultData !== undefined) {
                        const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                        console.log(resultData);
                        if(ResultBool) {
                            this.setState({
                                isAlertModal : true,
                                resultMsg : resultData.resultMsg
                            });
                            // 보고서 완료 액션 호출
                            this._regCompleteReport();
                        } else {
                            this.setState({
                                isAlertModal : true,
                                resultMsg : resultData.resultMsg,
                                spinner: false
                            })
                        }
                    }
                });
            });
        } else {

            this.setState({ spinner: false });

            if(CURRENT_BEFORE_IMG_CNT == 0) {
                this.setState({
                    isAlertModal : true,
                    resultMsg : 'A/S조치전 이미지를 등록해주세요.'
                })
            } else if(CURRENT_AFTER_IMG_CNT == 0) {
                this.setState({
                    isAlertModal : true,
                    resultMsg : 'A/S조치후 이미지를 등록해주세요.'
                })
            } else if(asCauseDsc == '' || asCauseDsc == null) {
                this.setState({
                    isAlertModal : true,
                    resultMsg : 'A/S조치전 증상을 입력해주세요.'
                })
            } else {
                this.setState({
                    isAlertModal : true,
                    resultMsg : 'A/S조치후 증상을 입력해주세요.'
                })
            }
        }
    }

    // AS 보고서 작성 완료
    _regCompleteReport = () => {
        RegCompleteReport(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._regCompleteReport).then(async resultData => {

                this.setState({ spinner: false });

                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        Actions.ResetMain();
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
        let beforeImgCnt = BEFORE_IMG_CNT;

        beforeImgCnt -= ALREADY_BEFORE_IMG_CNT; 

        let imageCompArray = [];

        for (let i = 0; i < beforeImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage 
                key={i + ALREADY_BEFORE_IMG_CNT} 
                imgUrl={ null }
                imgId={ null }
                asPrgsId={ this.props.asPrgsId }
                beforeAction={ true }
                takeBeforeImageAction={ this._addBeforASImg }
                imgSizeType={1}
            />); 
        }
        return imageCompArray;
    }

    // 등록된 조치후 이미지 카운트 만큼 제거 후 draw
    _createAfterAsImg = () => {
        let afterImgCnt = AFTER_IMG_CNT;

        afterImgCnt -= ALREADY_AFTER_IMG_CNT; 
        let imageCompArray = [];

        for (let i = 0; i < afterImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage 
                key={i + ALREADY_AFTER_IMG_CNT} 
                imgUrl={ null }
                imgId={ null }
                asPrgsId={ this.props.asPrgsId }
                beforeAction={ false }
                takeAfterImageAction={ this._addAfterASImg }
                imgSizeType={1}
            />); 
        }
        return imageCompArray;
    }

    // 조치 전 이미지 등록시 카운트
    _addBeforASImg = () => {
       ++CURRENT_BEFORE_IMG_CNT;
        //this._chkInvaildButton();
    }

    // 조치 후 이미지 등록시 카운트
    _addAfterASImg = () => {
       ++CURRENT_AFTER_IMG_CNT; 
        //this._chkInvaildButton();
    }


    _chkInvaildButton() {
        // alert("조치후 : "+ CURRENT_BEFORE_IMG_CNT + " /// 조치전 : " + CURRENT_AFTER_IMG_CNT);

        const dscLen = 5; // 내역 최소 글자 수
        const { asCauseDsc, asActionDsc } = this.state;

        if(CURRENT_BEFORE_IMG_CNT > 0 && CURRENT_AFTER_IMG_CNT > 0 && asCauseDsc !== null && asActionDsc !== null ) {
            this.setState({btnDisabled : false});
        } else {
            this.setState({btnDisabled : true});
        }
    }

    render() {
        return (
            <Container style={styles.containerScroll}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'A/S 보고서를 저장중입니다.'}
                    textStyle={styles.whiteFont}
                    style={{color: color.whiteColor}}
                />
                <CustomHeader />
                <View style={styles.contentWrap}>
                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>

                    <View style={{marginBottom: 30}}>
                        
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>수리내역</Text>
                                <Text style={stylesReg.leftGuideTxt}>A/S 보고서를</Text>
                                <Text style={stylesReg.leftGuideTxt}>작성해주세요</Text>
                            </View>
                            <View style={stylesReg.rigthTxtWrap}>
                                <Text style={[stylesReg.rightTxt, {fontWeight: "bold"}]}>
                                    {this.state.reportPercent}<Text style={stylesReg.rightTxtSmall}>%</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={stylesReg.procBarWrap}>
                            {this.state.beforeImgData.length > 0
                            ? <ProcessOn processTxt='조치전사진'/>
                            :<ProcessOff processTxt='조치전사진'/>}

                            {this.state.asCauseDsc !== null && this.state.asCauseDsc != ""
                            ? <ProcessOn processTxt='조치전증상'/>
                            :<ProcessOff processTxt='조치전증상'/>}

                            {this.state.afterImgData.length > 0
                            ? <ProcessOn processTxt='조치후사진'/>
                            :<ProcessOff processTxt='조치후사진'/>}


                            {this.state.asActionDsc !== null && this.state.asActionDsc != ""
                            ? <ProcessOn processTxt='조치후증상'/>
                            :<ProcessOff processTxt='조치후증상'/>}
                        </View>
                    </View>
                    <View>
                        <View>
                            <View>
                                <View style={[localStyles.boxTitleWrap, styles.justiConCenter, styles.alignItemsCenter]}>
                                <Text style={localStyles.boxTitleTxt}>A/S 조치 전</Text>
                                <View style={[styles.line, styles.fx2, { borderColor: color.blueColor}]}></View>
                                </View>

                                <View style={styles.boxShadow}>
                                <View style={localStyles.prdPhotoWrap}>


                                    {/* 미리 등록된 조치전 이미지 있을 경우 */}
                                    {this.state.beforeImgData.map((beforeImg, idx) => 
                                        <AfterServiceImage
                                            key={ idx }
                                            index={ idx }
                                            imgUrl={ beforeImg.fileUrl }
                                            imgId={ beforeImg.imgId }
                                            asPrgsId={ this.props.asPrgsId }
                                            takeBeforeImageAction={ this._addBeforASImg }
                                            imgSizeType={1}
                                        />
                                    )}
                                    
                                    { this._createBeforeAsImg() }

                                </View>
                                <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                    <Textarea
                                        ref={(input) => { this.asCauseDsc = input; }}
                                        value={this.state.asCauseDsc}
                                        onChangeText={ (text) => {this.setState({asCauseDsc : text}) } }
                                        placeholder="A/S 조치 전의 증상에 대해 적어주세요."
                                        placeholderTextColor={color.inputPlaceHodler}
                                        rowSpan={10}
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

                                    {/* 미리 등록된 조치후 이미지 있을 경우 */}
                                    {this.state.afterImgData.map((afterImg, idx) => 
                                        <AfterServiceImage
                                            key={ idx }
                                            index={ idx }
                                            imgUrl={ afterImg.fileUrl }
                                            imgId={ afterImg.imgId }
                                            beforeAction={ false }
                                            asPrgsId={ this.props.asPrgsId }
                                            takeAfterImageAction={ this._addAfterASImg }
                                            imgSizeType={1}
                                        />
                                    )}
                                    
                                    { this._createAfterAsImg() }

                                </View>
                                <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                    <Textarea
                                        ref={(input) => { this.asActionDsc = input; }}
                                        value={this.state.asActionDsc}
                                        onChangeText={ (text) => { this.setState({asActionDsc : text}) } }
                                        placeholder="수리한 내역에 대해 적어주세요."
                                        placeholderTextColor={color.inputPlaceHodler}
                                        rowSpan={10}
                                        style={styles.textInputBox1}
                                    />
                                </Item>
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    <View style={styles.footerBtnWrap}>
                        <CustomButton  
                            onPress={ () => this.setState({isModalVisible : true}) }
                            disabled={this.state.btnDisabled}>
                            작성완료
                        </CustomButton>
                    </View>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={ () => this.setState({isModalVisible : false}) }
                    onPress2={this._regAfterServiceReport}
                    infoText1="A/S 보고서 작성을 완료하시겠습니까?"
                    infoText2={null}
                    btnText1="취소"
                    btnText2="확인"
                />
                
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