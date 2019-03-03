import React, { Component } from "react";
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native'
import { Container, H2, Card, CardItem, Text, Thumbnail, CheckBox} from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceReport from '~/Main/Functions/GetAfterServiceReport'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';


const AfterServiceImage = () => (
    <View 
      style={[
        styles.mb15, 
        styles.alignItemsCenter,
        styles.justiConCenter,
        { 
          backgroundColor : color.defaultColor, 
          height : asCardSize, 
          width : asCardSize
    }]}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
        source={{uri: 'https://dispatch.cdnser.be/wp-content/uploads/2017/12/20171226203808_page_00299.jpg'}}
      >
        <TouchableOpacity 
          style={[{height : '25%', width : '25%', backgroundColor : 'rgba(0, 0, 0, 0.6)'}]}
          onPress={ () => alert("사진조회")}>
        </TouchableOpacity>
      </ImageBackground>
    
    </View>
)

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
                <CustomHeader title="출장보고서"/>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                    <View style={[styles.mb20, styles.alignItemsCenter] }>
                        <Thumbnail square large source={require('~/Common/Image/license-depart01.png')} />
                        <H2>세나정육점</H2>
                        <Text style={styles.greyFont}>육류용냉장고</Text>
                    </View>

                    <View style={styles.mb20}>
                        <H2 style={{color:color.defaultColor}}>A/S신청내역</H2>
                        <Card>
                            <CardItem style={styles.mg10}>
                                <View style={styles.mg10}>
                                <View style={styles.mb10} />

                                <Text>육류용 냉장고</Text>
                                <Text style={styles.greyFont}>경기도 시흥시 산기대로</Text>
                                <Text style={styles.greyFont}>bbbbbbbbbbb</Text>
                                <View style={styles.mb10} />

                                <Text>참고사항</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                                <View style={styles.mb10} />

                                <Text>클리닉데이터</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>

                                </View>
                            </CardItem>
                        </Card>
                    </View>

                    <View>
                        <H2 style={{color : color.defaultColor}}>A/S 조치 전</H2> 
                    </View>

                    <View style={ styles.mb20 }>
                        <Card>
                        <CardItem style={styles.mg10}>
                            <View>
                                <View style={[styles.fxDirRow, styles.justiConBetween, { flexWrap : 'wrap'}]}>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                </View>
                            <View>
                                <Text>출장 전 상태</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                            </View>
                            </View>
                        </CardItem>
                        </Card>
                    </View>

                    <View>
                        <H2 style={{color : color.defaultColor}}>A/S 조치 후</H2> 
                    </View>

                    <View style={styles.mb20} >
                        <Card>
                        <CardItem style={styles.mg10}>
                            <View>
                                <View style={[styles.fxDirRow, styles.justiConBetween, { flexWrap : 'wrap'}]}>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                    <AfterServiceImage/>
                                </View>
                            <View>
                                <Text>A/S 조치내역</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                            </View>
                            </View>
                        </CardItem>
                        </Card>
                    </View>

                    <View>
                        <H2 style={{color : color.defaultColor}}>A/S 청구비용</H2> 
                    </View>
                    <View>
                        <Card>
                            <CardItem style={styles.mg10}>
                                <View style={styles.fxDirRow}>
                                <View style={styles.fx1}>
                                    <Text style={styles.greyFont}>출장비</Text>
                                    <Text style={styles.greyFont}>추가 A/S비</Text>
                                    <Text>총계</Text>
                                </View>
                                <View style={[styles.fx1, styles.alignItemsEnd]}>
                                    <Text style={styles.greyFont}>30,000 원</Text>
                                    <Text style={styles.greyFont}>120,000 원</Text>
                                    <Text>150,000 원</Text>
                                </View>
                                </View>
                            </CardItem>

                            <CardItem style={styles.mg10}>
                                <View style={[styles.fx1, styles.fxDirRow]}>
                                <View style={styles.fx1}>
                                    <H2 style={{color : color.defaultColor}}>추가A/S</H2>
                                </View>

                                <CheckBox 
                                    checked={this.state.checkBox} 
                                    color={color.defaultColor} 
                                    onPress={ () => this.setState({
                                        checkBox : (this.state.checkBox) ? false : true
                                        })
                                    }/>
                                <Text style={{paddingLeft : '5%'}}>공인</Text>

                                <CheckBox 
                                    checked={this.state.checkBox} 
                                    color={color.defaultColor} 
                                    onPress={ () => this.setState({
                                        checkBox : (this.state.checkBox) ? false : true
                                        })
                                    }/>
                                <Text style={{paddingLeft : '5%'}}>부품교체</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.mg10}>
                                <View>
                                <Text>추가 A/S 내역</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                                </View>
                            </CardItem>
                            <CardItem style={styles.mg10}>
                                <View>
                                <Text>추가 A/S 사유</Text>
                                <Text style={styles.greyFont}>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</Text>
                                </View>
                            </CardItem>
                        </Card>

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

const asCardSize = wp(48, 72);

export default ViewAfterServiceHistory;