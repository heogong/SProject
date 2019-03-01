import React, { Component } from "react";
import { Alert, Image, ImageBackground, Icon, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, H1, H2, Button, Text, Footer, FooterTab, Item, Input,} from "native-base";

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
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

let DEL_IDX = null; // 제품 삭제 인덱스
let CLIENT_PRODUCT_ID = null; // 제품 복제 아이디
let CLIENT_PRD_ARRAY = []; //추가/복제 제품아이디 (뒤로가기 버튼 시 제품 한번에 삭제)

const SLIDER_1_FIRST_ITEM = 0;

class InputShowCase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        prdTypeImgData : [], // 첫번째 SHOW CASE 이미지 데이터
        showCase : [], // 제품 데이터
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,

        setProductName : false, // 제품명 입력 여부
        productName : null
      };
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
                    // console.log(resultData);
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({prdTypeImgData : resultData.data});
                    }
                }
            });
        });
    }

    // 제품 마스터 초기 등록 및 추가
    _regProductMst = () => {
        RegProductMst(this.props.value.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._regProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {

                        const {prdTypeImgData, showCase} = this.state;

                        this.setState({
                            showCase : showCase.concat([{
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                prdType : resultData.data.prdType,
                                prdTypeImg : resultData.data.prdTypeImg,
                                imgTypeArray : prdTypeImgData
                            }])
                        })

                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.concat({
                            clientPrdId : resultData.data.clientPrdId
                        });

                    } else {
                        alert(resultData.resultMsg);
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
                    console.log(resultData);
                    if(ResultBool) {

                        this.setState({ 
                            showCase: this.state.showCase.concat([{ 
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm,
                                prdType : resultData.data.prdType,
                                prdTypeImg : resultData.data.prdTypeImg,
                                imgTypeArray : resultData.data.images
                            }]),
                        });

                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.concat({
                            clientPrdId : resultData.data.clientPrdId
                        });

                    } else {
                        alert(resultData.resultMsg);
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
                        this.setState({ 
                            showCase: this.state.showCase.filter((s, sidx) => DEL_IDX !== sidx),
                        })
                        CLIENT_PRD_ARRAY = CLIENT_PRD_ARRAY.filter((s, sidx) => DEL_IDX !== sidx)
                    } else {
                        alert(resultData.resultMsg);
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
                            alert(resultData.resultMsg);
                        }
                    }
                });
            });
        });
        Actions.InputProdType();
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
        Alert.alert(
            '',
            '삭제 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '네', onPress: () => {
                DEL_IDX = idx;
                this._delProductMst();
                }
              },
            ],
            { cancelable: false }
        )
    }

    _nextButton = () => {
        Alert.alert(
            '',
            '등록되지 않은 이미지는 어딘가에서 등록 가능 \ 제품을 추가 등록 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => Actions.ClientMain() },
              {text: '네', onPress: () => Actions.InputProdType() },
            ],
            { cancelable: false }
        )
    }

    // 뒤로 가기 버튼 클릭 시 등록된 제품 모두 삭제 하기 위함
    _handleBackAction = () => {
        Alert.alert(
            '',
            '제품 등록을 취소 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('cancle') },
              {text: '네', onPress: () => this._delArrayProductMst() },
            ],
            { cancelable: false }
        )
    }



    _renderItem = ({item, index}) => {
        console.log("renderItem : ", item)
        return (
            <ProductShowCase
                key={index}
                index={index}
                item={item}
                handleAddShowCase={ this._handleAddShowCase }
                handleCopyShowCase={ this._handleCopyShowCase }
                handleRemoveShowCase={ this._handleRemoveShowCase }
            />
        );
      }

    render() {
        return (
            // <Container>
            //     <CustomBlockWrapper
            //         title="제품 등록"
            //         customAction={this._handleBackAction}
            //     >
            //         {this.state.newShowCase.map((showCase, idx) => (
            //             <ProductShowCase
            //                 defaultImg={ this.state.defaultImg }
            //                 data={ (this.state.btnAddAction) ? this.state.addData : this.state.copyData }
            //                 clientPrdId={ showCase.clientPrdId }
            //                 clientPrdNm={ showCase.clientPrdNm } 
            //                 clientPrdImgId={ showCase.clientPrdImgId } 
            //                 handleCopyShowCase={ this._handleCopyShowCase }
            //                 handleRemoveShowCase={ this._handleRemoveShowCase }
            //                 index={ idx }
            //             />
            //         ))}
            //     </CustomBlockWrapper>

            //     <Footer>
            //         <Button onPress={ this._handleAddShowCase }>
            //             <Text>추가</Text>
            //         </Button>
            //         <Button onPress={ this._nextButton }>
            //             <Text>등록완료</Text>
            //         </Button>
            //     </Footer>
            // </Container>
            <Container style={{ 
                flex: 1,
                backgroundColor: color.whiteColor,
                paddingLeft: 26
            }}>
              <CustomHeader customAction={this._handleBackAction}/>
      
              <ScrollView showsVerticalScrollIndicator={false}>
      
                <View style={[styles.mb15, {paddingRight : 26}]}>
                  <View style={[styles.mb10, styles.fxDirRow]}>
                    <View style={styles.fx1}>
                      <H1>제품의</H1>
                      <H1>상세정보를</H1>
                      <H1>입력해주세요</H1>
                    </View>
                    <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                      <H1 style={{color:color.defaultColor}}>03</H1>
                    </View>
                  </View>
                  <View style={{height : 10, backgroundColor : color.defaultColor }} />
                </View>
      
                <Carousel
                    renderItem={this._renderItem}
                    sliderWidth={viewportWidth}
                    activeSlideAlignment={'start'}
                    itemWidth={itemWidth}
                    data={this.state.showCase}
                    firstItem={this.state.slider1ActiveSlide}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                >
                </Carousel>
                  
              </ScrollView>
      
              <Footer style={{marginRight : 26, elevation: 0}}>
                <FooterTab>
                  <Button 
                    style={[styles.btnDefault, {marginTop : 5}]}
                    block info bordered onPress={ () => alert("결제카드등록")}>
                    <Text>제품등록완료</Text>
                  </Button>
                </FooterTab>
              </Footer>
                
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