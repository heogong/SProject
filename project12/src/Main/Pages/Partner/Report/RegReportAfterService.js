import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Linking, View } from 'react-native'
import { Textarea, Button, Container, Icon, Text, Item } from "native-base";

import { SUCCESS_RETURN_CODE, ADD_AS } from '~/Common/Blend';

import { Actions, ActionConst} from 'react-native-router-flux';

import GetAfterServiceActionInfo from '~/Main/Functions/GetAfterServiceActionInfo';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import RegAfterServiceReport from '~/Main/Functions/RegAfterServiceReport';
import CompleteAfterService from '~/Main/Functions/CompleteAfterService';
import GetCommonData from '~/Common/Functions/GetCommonData';
import AfterServiceImage from '~/Main/Components/AfterServiceImage';

import CustomHeader from "~/Common/Components/CustomHeader";
import CustomButton from "~/Common/Components/CustomButton";
import CustomEtcButton from "~/Common/Components/CustomEtcButton";
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

let BEFORE_IMG_CNT = 4; // 등록할 A/S 조치전 이미지 카운트
let AFTER_IMG_CNT = 4; // 등록할 A/S 조치 후 이미지 카운트
let ALREADY_IMG_CNT = 0; // 이미 등록된 A/S 조치전 이미지 카운트
let ALREADY_AFTER_IMG_CNT = 0; // 이미 등록된 A/S 조치 후 이미지 카운트

const AS_PROCESS_PERCENT = 25; // 조치전/후 이미지 등록시 percent

export const ProcessOn = ({processTxt}) => (
    <View style={styles.fx1}>
        <View style={stylesReg.procBarOn} />
        <Text style={stylesReg.procBarTxt}>{processTxt}</Text>
    </View>
)

export const ProcessOff = ({processTxt}) => (
    <View style={styles.fx1}>
        <View style={stylesReg.procBarOff} />
        <Text style={stylesReg.procBarTxt}>{processTxt}</Text>
    </View>
)

class RegReportBeforePic extends Component {
    constructor(props) {
      super(props);

      this.state =  {
        imgData : [],
        afterImgData : [],
        asData : {
            asPrgsMst : {
                asPrgsStatDSC : null
            }
        },
        reportPercent : 0,
        asCauseDsc : '',
        asActionDsc : '',
        btnDisabled : true,
        isArriveModal : false,
        isAlertModal : false, //alert 용
        resultMsg : null // alert 결과 메세지
      };
    }

    // static defaultProps = {
    //     asPrgsId : 157 // test
    // }

    componentDidMount() {
        this._getAfterServiceState();
        this._getAfterServiceBeforeInfo();
        this._getAfterServiceAfterInfo();
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
                        this.setState({
                            isAlertModal : true,
                            resultMsg : resultData.resultMsg
                        })
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

                        ALREADY_IMG_CNT = await resultData.data.images.length; // 등록된 조치전 이미지 카운트

                        // 조치전 이미지 존재 시 A/S완료 버튼 활성화
                        if(ALREADY_IMG_CNT > 0) {
                            this._addBeforASImg();
                            this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                        }

                        this.setState({
                            // data : resultData.data,
                            imgData : resultData.data.images,
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

                        if(ALREADY_AFTER_IMG_CNT > 0) {
                            this.setState({reportPercent : this.state.reportPercent+=AS_PROCESS_PERCENT});
                        }
                        
                        this.setState({
                            afterImgData : resultData.data.images,
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
        this.setState({isArriveModal : false});

        const method ='POST'; // AS 조치전 정보 조회 정보 여부에 따른 메소드 값
        const { asCauseDsc, asActionDsc } = this.state;

        RegAfterServiceReport(this.props.asPrgsId, asCauseDsc, asActionDsc, method).then(result => {
            GetCommonData(result, this._regAfterServiceReport).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //Actions.RegAsAfterReport({asPrgsId : this.props.asPrgsId});
                        this._completeAfterService();
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

     // 업체 AS 매칭(진행) 완료
     _completeAfterService = () => {
        CompleteAfterService(this.props.asPrgsId).then(result => {
            GetCommonData(result, this._completeAfterService).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
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

        beforeImgCnt -= ALREADY_IMG_CNT; 

        let imageCompArray = [];

        for (let i = 0; i < beforeImgCnt; i++) {
            imageCompArray.push(<AfterServiceImage 
                key={i + ALREADY_IMG_CNT} 
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

    // 진행상태 BAR 생성
    _createProcBar = () => {
        let processOnArray = [];
        let processOffArray = [];


        if(this.state.imgData.length > 0) {
            processOnArray.push(<ProcessOn key={0} processTxt='조치전사진'/>);
        } else {
            processOffArray.push(<ProcessOff key={0} processTxt='조치전사진'/>);
        }

        if(this.state.afterImgData.length > 0) { 
            processOnArray.push(<ProcessOn key={1} processTxt='조치후사진'/>);
        } else {
            processOffArray.push(<ProcessOff key={1} processTxt='조치후사진'/>);
        }

        processOffArray.push(<ProcessOff key={2} processTxt='조치전증상'/>);
        processOffArray.push(<ProcessOff key={3} processTxt='조치후증상'/>);

        const resultArray = processOnArray.concat(processOffArray);
        
        return resultArray;
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
            <Container style={styles.containerScroll}>
                <CustomHeader resetPage={true} />
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

                            {this._createProcBar()}

                        </View>
                    </View>

                    <View>
                        <View>
                            <View style={{backgroundColor : color.defaultColor, marginBottom: 32}}>
                                <View>
                                    <Text style={localStyles.asMatchStateDscTxt}>{this.state.asData.asPrgsMst.asPrgsStatDsc}</Text>
                                    <View style={styles.fxDirRow}>
                                        <View style={localStyles.asMatchIconWrap}>
                                            <Image source={require("~/Common/Image/partner_as_step_icon/Default/as_wait_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                                            <Text style={localStyles.asMatchStateTxt}>A/S 대기</Text>
                                        </View>
                                        <View style={localStyles.asMatchIconWrap}>
                                            <Image source={require("~/Common/Image/partner_as_step_icon/Default/as_start_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                                            <Text style={localStyles.asMatchStateTxt}>A/S 출발</Text>
                                        </View>
                                        <View style={localStyles.asMatchIconWrap}>
                                            <Image source={require("~/Common/Image/partner_as_step_icon/Default/as_arrive_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                                            <Text style={localStyles.asMatchStateTxt}>A/S 도착</Text>
                                        </View>
                                        <View style={localStyles.asMatchIconWrap}>
                                            <Image source={require("~/Common/Image/partner_as_step_icon/Step_on/as_progress_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                                            <Text style={[localStyles.asMatchStateTxt, {color: "#0364c8"}]}>A/S 진행</Text>
                                        </View>
                                        <View style={localStyles.asMatchIconWrap}>
                                            <Image source={require("~/Common/Image/partner_as_step_icon/Default/as_complete_icon.png")} resizeMode="contain" style={{height : stateImgSize, width : stateImgSize}} />
                                            <Text style={localStyles.asMatchStateTxt}>A/S 완료</Text>
                                        </View>
                                    </View> 

                                    <View style={[styles.modalBtnTwinWrap, styles.fx1, styles.justiConCenter, {marginTop: 18, marginBottom: 18}]}>
                                        <View style={{marginRight: 9}}>
                                            <CustomEtcButton
                                                action={() => Linking.openURL(`tel:${this.state.asData.clientPhoneNum}`)}
                                                WhiteBackBtn={true}
                                            >
                                                업체전화연결
                                            </CustomEtcButton>
                                        </View>

                                        <View style={{marginLeft: 9}}>
                                        {this.state.asData.asPrgsMst.asPrgsStatCd !== ADD_AS.VALUE ? (
                                            <CustomEtcButton 
                                                onPress={() => Actions.RegAddAfterService({
                                                    asPrgsId : this.props.asPrgsId,
                                                    refreshActions : this._getAfterServiceState 
                                                })}
                                                ModalDefaultBtn={true}
                                                modalCustomStyle={{backgroundColor: "#0397bd"}}>
                                                추가A/S진행
                                            </CustomEtcButton>

                                        ) : (
                                            <CustomEtcButton 
                                                onPress={() => Actions.ViewAfterServiceMatch({
                                                    asRecvId : this.state.asData.asPrgsMst.asRecvId,
                                                    isReport : true
                                                })}
                                                ModalDefaultBtn={true}
                                                modalCustomStyle={{backgroundColor: "#0397bd"}}>
                                                매칭상세정보
                                            </CustomEtcButton>
                                        )}

                                        </View>
                                    </View>

                                </View>
                            </View>

                        </View>

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
                                            imgSizeType={1}
                                        />
                                    )}
                                    
                                    { this._createBeforeAsImg() }

                                </View>
                                <Item regular style={[styles.mb14, styles.textInputWhBack]}>
                                    <Textarea
                                        value={this.state.asCauseDsc}
                                        onChangeText={ (text) => this.setState({asCauseDsc : text}) }
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
                                        value={this.state.asActionDsc}
                                        onChangeText={ (text) => this.setState({asActionDsc : text}) }
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
                            onPress={ () => this.setState({isArriveModal : true}) }
                            disabled={this.state.btnDisabled}>
                            A/S완료
                        </CustomButton>
                    </View>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isArriveModal}
                    onPress1={() => this.setState({isArriveModal : false})}
                    onPress2={this._regAfterServiceReport}
                    infoText1="A/S 완료하시겠습니까?"
                    infoText2="미작성된 보고서는 '보고서' 탭에서 작성하실 수 있습니다."
                    btnText1="취소"
                    btnText2="완료"
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

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
  const asCardSize = wp(48, 72);
  const stateImgSize = wp(15, 52);
  
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
      backgroundColor: color.defaultColor
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
    },
    asMatchStateDscTxt: {
      marginBottom: 15,
      textAlign:'center',
      color: "#0364c8",
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 20
  },
    asMatchIconWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    asMatchStateTxt: {
        fontSize : 12,
        color: color.whiteColor,
        fontWeight: "bold",
        marginTop: 10
    }
  });

export default RegReportBeforePic;
