import React, { Component } from "react";
import { Alert, Image, ImageBackground, Icon, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetProdImageType from '~/Main/Functions/GetProdImgType'
import RegProductMst from '~/Main/Functions/RegProductMst'
import DelProductMst from '~/Main/Functions/DelProductMst'
import CopyProductMst from '~/Main/Functions/CopyProductMst'
import ProductShowCase from '~/Main/Components/ProductShowCase'

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';

let DEL_IDX = null; // 제품 삭제 인덱스
let CLIENT_PRODUCT_ID = null; // 제품 복제 아이디
let CLIENT_PRD_ARRAY = []; //추가/복제 제품아이디 (뒤로가기 버튼 시 제품 한번에 삭제)

let INFO_TXT1 = null; // 모달 메세지1
let INFO_TXT2 = null; // 모달 메세지2
let ON_PRESS_ACTION_TYPE = 0; // 터치한 액션 

const ACTION_TYPE = {
    cancleAction : 0, // 취소 터치 시
    regAction : 1, // 등록완료 터치 시
    delAction: 2 // 삭제 터치 시
}

class InputShowCase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        prdTypeImgData : [], // 첫번째 SHOW CASE 이미지 데이터
        showCase : [], // 제품 데이터
        slider1ActiveSlide: 0,

        isModalVisible : false, // confirm modal
        isAlertModal : false, // alert modal
        resultMsg : null
      };
    }

    static defaultProps = {
        source : null,
        // prodTypeId : 1 // test!!!!
    }

    componentWillMount(){
        this._drawProductImageType();
    }

    componentDidMount() {
        this._regProductMst();
    }

    // 제품 이미지 타입 가져오기
    _drawProductImageType = () => {
        GetProdImageType(this.props.prodTypeId).then(result => {
            GetCommonData(result, this._drawProductImageType).then(async resultData => {
                if(resultData !== undefined) {
                    console.log(resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    
                    if(ResultBool) {
                        this.setState({prdTypeImgData : resultData.data});
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

    // 제품 마스터 초기 등록 및 추가
    _regProductMst = () => {
        // RegProductMst(104, this.props.prodTypeId).then(result => {
        RegProductMst(this.props.value.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._regProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {

                        const {prdTypeImgData, showCase} = this.state;

                        // 촬영 컴포넌트 에서 필요한 데이터 세팅(clientPrdId, fileUrl)
                        const imgNData = prdTypeImgData.map((prodImgType, idx) => {
                            return { ...prodImgType, clientPrdId: resultData.data.clientPrdId, fileUrl : null };
                        });

                        console.log(imgNData);

                        this.setState({
                            showCase : showCase.concat([{
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                prdType : resultData.data.prdType,
                                prdTypeImg : this.props.prodFileUrl,
                                imgTypeArray : imgNData,
                            }]),
                            // slider1ActiveSlide : showCase.length
                        })

                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.concat({
                            clientPrdId : resultData.data.clientPrdId
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

    // 제품 복제
    _copyProductMst = () => {
        CopyProductMst(CLIENT_PRODUCT_ID).then(result => {
            GetCommonData(result, this._copyProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(" 제품 복제 - ",resultData);
                    if(ResultBool) {

                        // 촬영 컴포넌트 에서 필요한 데이터 세팅(clientPrdId, fileUrl)
                        const imgNData = resultData.data.images.map((prodImgType, idx) => {
                            return { ...prodImgType, clientPrdId: resultData.data.clientPrdId };
                        });

                        await this.setState({ 
                            showCase: this.state.showCase.concat([{ 
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                clientPrdDsc : resultData.data.clientPrdDsc,
                                prdType : resultData.data.prdType,
                                prdTypeImg : resultData.data.prdTypeImg.fileUrl,
                                imgTypeArray : imgNData
                            }]),
                        });

                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.concat({
                            clientPrdId : resultData.data.clientPrdId
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

    // 제품 삭제
    _delProductMst = () => {
        DelProductMst(this.state.showCase[DEL_IDX].clientPrdId).then(result => {
            GetCommonData(result, this._delProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this._carousel.snapToPrev();
                        this.setState({ 
                            showCase: this.state.showCase.filter((s, sidx) => DEL_IDX !== sidx),
                            isModalVisible : false
                        })
                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.filter((s, sidx) => DEL_IDX !== sidx);
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

    // 제품 array 삭제(등록된 제품 뒤로가기 시 한번에 삭제)
    _delArrayProductMst = () => {
        CLIENT_PRD_ARRAY.map((client) => {
            DelProductMst(client.clientPrdId).then(result => {
                GetCommonData(result, this._delArrayProductMst).then(async resultData => {
                    if(resultData !== undefined) {
                        const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                        if(!ResultBool) {
                            this.setState({
                                isAlertModal : true,
                                resultMsg : resultData.resultMsg
                            })
                        }
                    }
                });
            });
        });
        //Actions.popTo("InputProdType");
        Actions.pop();
    }

   // showCase 카드 추가
   _handleAddShowCase = async () => {
       this._regProductMst();
        // 옆으로 이동 (추가된 카드로 이동)
        let nextCard = setTimeout(() => {
            // this._carousel.snapToNext();
            this._carousel.snapToItem(this.state.showCase.length);
            clearTimeout(nextCard);
        }, 500);
    }

    // showCase 카드 복사
    _handleCopyShowCase = (idx) => () => {
        CLIENT_PRODUCT_ID = this.state.showCase[idx].clientPrdId;
        this._copyProductMst();

        // 옆으로 이동 (추가된 카드로 이동)
        let nextCard = setTimeout(() => {
            // this._carousel.snapToNext();
            this._carousel.snapToItem(this.state.showCase.length);
            clearTimeout(nextCard);
        }, 500);
    }

     // showCase 카드 제거
    _handleRemoveShowCase = (idx) => () => {

        this.setState({isModalVisible : true});

        INFO_TXT1 = "삭제 하시겠습니까?";
        INFO_TXT2 = null;
        DEL_IDX = idx;

        ON_PRESS_ACTION_TYPE = ACTION_TYPE.delAction;
    }

    // 등록 완료
    _nextButton = () => {
        this.setState({isModalVisible : true});

        INFO_TXT1 = "등록되지 않은 정보는 '나의제품'메뉴에서 수정가능합니다.";
        INFO_TXT2 = "제품을 추가 등록 하시겠습니까?";

        ON_PRESS_ACTION_TYPE = ACTION_TYPE.regAction;
    }

    // 뒤로 가기 버튼 클릭 시 등록된 제품 모두 삭제 하기 위함
    _handleBackAction = () => {
        this.setState({isModalVisible : true});

        INFO_TXT1 = "제품 등록을 취소 하시겠습니까?";
        INFO_TXT2 = null;
        
        ON_PRESS_ACTION_TYPE = ACTION_TYPE.cancleAction;
    }

     // 모달 '아니오' Action
    _onPress1Action = () => {
        if(ON_PRESS_ACTION_TYPE == ACTION_TYPE.regAction) {
            Actions.SuccessRegProduct({
                bizId : this.props.value.bizId,
                prodTypeId : this.props.prodTypeId
            });
        }
        this.setState({isModalVisible : false})
    }

    // 모달 '예' Action
    _onPress2Action = () => {
        if (ON_PRESS_ACTION_TYPE == ACTION_TYPE.delAction) {
            this._delProductMst();
        } else if(ON_PRESS_ACTION_TYPE == ACTION_TYPE.cancleAction) {
            this._delArrayProductMst();
        } else {
            //Actions.popTo("InputProdType");
            Actions.pop();
        }
    }
    

    _renderItem = ({item, index}) => (
        <ProductShowCase
            key={ index }
            index={ index }
            item={ item }
            clientPrdNm={ item.clientPrdNm } 
            clientPrdDsc={ item.clientPrdDsc }
            handleAddShowCase={ this._handleAddShowCase }
            handleCopyShowCase={ this._handleCopyShowCase }
            handleRemoveShowCase={ this._handleRemoveShowCase }
            source={ this.props.source }
        />
    )

    render() {
        return (
            <Container style={styles.containerSlide}>
              <CustomHeader customAction={this._handleBackAction} customStyle={{paddingLeft: 26}} />
            
                <View style={styles.contentWrap}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
                        <View style={{paddingLeft: 26, paddingRight: 26, marginBottom: 21}}>
                            <View style={styles.fxDirRow}>
                                <View style={stylesReg.leftGuideTxtWrap}>
                                    <Text style={stylesReg.leftGuideTxt}>제품의</Text>
                                    <Text style={stylesReg.leftGuideTxt}>상세정보를</Text>
                                    <Text style={stylesReg.leftGuideTxt}>입력해주세요</Text>
                                </View>
                                {/* 선택사항이므로 주석처리
                                <View style={[stylesReg.rightStepNumWrap]}>
                                    <Text style={stylesReg.rightStepNum}>04</Text>
                                </View> 
                                 */}
                            </View>
                        </View>
                        {/* 선택사항이므로 주석처리              
                        <View style={[stylesReg.procBarWrap, {paddingRight: 26, marginBottom: 47, paddingLeft: 26}]}>
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
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            renderItem={this._renderItem}
                            sliderWidth={viewportWidth}
                            activeSlideAlignment={'start'}
                            itemWidth={itemWidth}
                            data={this.state.showCase}
                            firstItem={this.state.slider1ActiveSlide}
                            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                            containerCustomStyle={{ paddingLeft: 26 }}
                        />
                    </ScrollView>
                </View>
      
                <View style={[styles.footerBtnWrap, {flex: 0, paddingRight: 26, paddingLeft: 26}]}>
                    <CustomButton
                        onPress={ () => this._nextButton() }
                        DefaultLineBtn={true}
                    >
                        제품등록완료
                    </CustomButton>
                </View>

                <CustomModal
                    modalType="CONFIRM"
                    isVisible={this.state.isModalVisible}
                    onPress1={this._onPress1Action}
                    onPress2={this._onPress2Action}
                    infoText1={INFO_TXT1}
                    infoText2={INFO_TXT2}
                    btnText1="아니오"
                    btnText2="네"
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
  
  // 메인 상품 카드 사이즈
  const slideWidth = wp(85, 26);
  const itemHorizontalMargin = wp(2, 0);
  const itemWidth = slideWidth + itemHorizontalMargin * 2;
  
  
let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputShowCase = connect(mapStateToProps, undefined)(InputShowCase);
export default InputShowCase;