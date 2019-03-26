import React, { Component } from "react";
import { Alert, Image, ImageBackground, Icon, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, Item, Input, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import EditProductMst from '~/Main/Functions/EditProductMst'
import DelProductMst from '~/Main/Functions/DelProductMst'
import GetProduct from '~/Main/Functions/GetProduct';
import ProductImage from '~/Main/Components/ProductImage';

import CustomHeader from '~/Common/Components/CustomHeader';
import CustomButton from '~/Common/Components/CustomButton';
import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

let INFO_TXT1 = null; // 모달 메세지1
let INFO_TXT2 = null; // 모달 메세지2
let ON_PRESS_ACTION_TYPE = 0; // 터치한 액션 

const ACTION_TYPE = {
    cancleAction : 0, // 취소 터치 시
    editAction : 1, // 수정완료 터치 시
    delAction: 2 // 삭제 터치 시
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


class EditProdShowCase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            images : [],
            prdTypeImg : []
        },
        clientPrdNm : '',
        clientPrDsc : '',
        disableBtn : true,
        isModalVisible : false, // confirm modal
        isAlertModal : false, // alert modal
        resultMsg : null,
      };
    }

    static defaultProps = {
        source : null,
        prdTypeId : 1 // test!!!!
    }


    componentDidMount() {
        this._getProduct();
    }


   // 제품 단건 조회
   _getProduct = () => {
        GetProduct(this.props.clientPrdId).then(result => {
            GetCommonData(result, this._getProduct).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data : resultData.data,
                            clientPrdNm : resultData.data.clientPrdNm,
                            clientPrDsc : resultData.data.clientPrDsc
                        });
                        this._chkBtn();
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

    // 제품 수정
    _editProductMst = () => {
        const {clientPrdNm, clientPrdDsc } = this.state;

        EditProductMst(this.props.clientPrdId, clientPrdNm, clientPrdDsc).then(result => {
            GetCommonData(result, this._editProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {

                        INFO_TXT1 = "수정을 완료하였습니다.";
                        INFO_TXT2 = "추가수정 하시겠습니까?";
                        ON_PRESS_ACTION_TYPE = ACTION_TYPE.editAction;

                        this.setState({isModalVisible : true});

                        
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

   // showCase 카드 추가
   _handleAddShowCase = () => {
        this._regProductMst();
    }

    // showCase 카드 복사
    _handleCopyShowCase = (idx) => () => {
        CLIENT_PRODUCT_ID = this.state.showCase[idx].clientPrdId;
        this._copyProductMst();
    }

     // showCase 카드 제거
    _handleRemoveShowCase = (idx) => () => {

        this.setState({isModalVisible : true});

        INFO_TXT1 = "삭제 하시겠습니까?";
        INFO_TXT2 = null;
        DEL_IDX = idx;

        ON_PRESS_ACTION_TYPE = ACTION_TYPE.delAction;
    }

     // 모달 '아니오' Action
    _onPress1Action = () => {
        if(ON_PRESS_ACTION_TYPE == ACTION_TYPE.editAction) {
            Actions.ResetMain({client : true});
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
            this.setState({isModalVisible : false})
        }
    }

    // 등록완료 활성화 여부
    _chkBtn = () => {
        const { clientPrdNm } = this.state;
        if(clientPrdNm !== 0) {
            this.setState({disableBtn : (clientPrdNm.length > 1) ? false : true })
        }
    }


    render() {
        return (
            <Container style={styles.containerInnerPd}>
              <CustomHeader />

                <View style={styles.contentWrap}>
                    <View>
                        <View style={styles.fxDirRow}>
                            <View style={stylesReg.leftGuideTxtWrap}>
                                <Text style={stylesReg.leftGuideTxt}>등록할</Text>
                                <Text style={stylesReg.leftGuideTxt}>제품정보를</Text>
                                <Text style={stylesReg.leftGuideTxt}>선택해주세요</Text>
                            </View>
                            <View style={[stylesReg.rightStepNumWrap, {paddingRight: 26}]}>
                                <Text style={stylesReg.rightStepNum}></Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={localStyles.prdCardWrap}>
                            <View style={localStyles.prdCardTopWrap}>
                                <View style={[styles.fx3, styles.justiConCenter, styles.alignItemsCenter]}>
                                    <Text style={localStyles.prdCardTopNumTxt}>{ pad(this.props.number, 2) }</Text>
                                    <Image source={{uri : this.state.data.prdTypeImg.fileUrl}} style={{height : imageSize, width : imageSize}} />
                                </View>
                                <View/>
                            </View>
                
                            <View style={localStyles.prdCardInputWrap}>
                                <Text style={localStyles.prdCardInfoTxt}>제품 이름</Text>
                                <Item 
                                    regular 
                                    style={[localStyles.prdCardInputBox, {width: "70%"}]}
                                >
                                    <Input 
                                        value={ this.state.clientPrdNm }
                                        onChangeText={async (text) => { 
                                            await this.setState({clientPrdNm : text}),
                                            this._chkBtn()
                                        }}
                                        // style={localStyles.prdCardNameInput}
                                        placeholder="제품이름" 
                                        style={[styles.inputBox, styles.pl9]} 
                                        placeholderTextColor={color.inputPlaceHodler}
                                    />
                                </Item>
                                
                                <Text style={localStyles.prdCardInfoTxt}>제품 설명</Text>
                                <Item regular style={localStyles.prdCardInputBox}>
                                    <Input
                                        value={ this.state.clientPrdDsc }
                                        onChangeText={(text) => this.setState({clientPrdDsc  :text}) }
                                        // style={localStyles.prdCardDscInput}
                                        placeholder="제품설명" 
                                        style={[styles.inputBox, styles.pl9]}
                                        placeholderTextColor={color.inputPlaceHodler}
                                    />
                                </Item>
                            </View>
                
                            <View style={styles.alignItemsCenter}>
                                <Text style={styles.whiteFont}>제품 사진</Text>
                
                                <View style={localStyles.prdCardPhotoWrap}>
                                    <View style={localStyles.prdCardPhoto}>

                                    {
                                        this.state.data.images.map((imgType, idx) => (
                                            <ProductImage
                                                key={idx}
                                                clientPrdId={this.props.clientPrdId}
                                                prdTypeImgCateId={imgType.prdTypeImgCateId}
                                                uri={imgType.fileUrl}
                                                clientPrdImgId={imgType.clientPrdImgId}
                                            />
                                        ))
                                    }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footerBtnWrap}>
                        <CustomButton
                            onPress={ this._editProductMst }
                            disabled={this.state.disableBtn}
                            DefaultLineBtn={true}
                        >
                            제품수정완료
                        </CustomButton>
                    </View>

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


const imageSize = wp(40, 0);

const localStyles = StyleSheet.create({
  prdCardWrap: {
    padding: 17,
    backgroundColor : "#7be6fd"
  },
  prdCardTopWrap: {
    marginBottom: 10,
    flexDirection: "row"
  },
  prdCardTopIconImg: {
    width: 36,
    height: 36
  },
  prdCardTopNumTxt: {
    fontSize: 36,
    color: "#038dbd",
    fontWeight: "bold",
    marginBottom: 16
  },
  prdCardInfoTxt: {
    fontSize: 14,
    color: color.whiteColor,
    marginBottom: 8
  },
  prdCardInputWrap: {
    alignItems : 'center'
  },
  prdCardInputBox: {
    marginBottom: 20,
    backgroundColor: color.whiteColor,
    borderColor : color.whiteColor,
    height : 32
  },
  prdCardNameInput: {
    fontSize : 14,
    textAlign: "center",
    height : 32
  },
  prdCardDscInput: {
    fontSize : 13,
    textAlign: "center",
    height : 32
  },
  prdCardPhotoWrap: {
    flex: 1,
    justifyContent : 'center'
  },
  prdCardPhoto: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});
  
export default EditProdShowCase;