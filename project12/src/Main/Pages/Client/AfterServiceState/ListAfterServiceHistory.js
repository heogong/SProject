import React, { Component } from "react";
import { Image, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native'
import { Container, Icon, Text, H3 } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceHistory from '~/Main/Functions/GetAfterServiceHistory'
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from '~/Common/Styles/colors';

class ListAfterServiceHistory extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentDidMount() {
        this._getAfterServiceHistory();
    }

    // 고객 AS 내역 목록 조회
    _getAfterServiceHistory = () => {
        GetAfterServiceHistory().then(result => {
            GetCommonData(result, this._getAfterServiceHistory).then(async resultData => {
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
            //     title="A/S 내역"
            // >
            //     { 
            //         (this.state.data.length > 0) ? (
            //             this.state.data.map((afterService, idx) => 
            //             <Card key={ idx }>
            //                 <CardItem body>
            //                     <Thumbnail large source={{ uri: afterService.prdTypeFileUrl }} />
            //                 </CardItem>
            //                 <CardItem>
            //                     <View>
            //                         <Text>
            //                             사업장 : {afterService.bplaceNm}
            //                         </Text>
            //                         <Text>
            //                             날짜 : {afterService.regDt}
            //                         </Text>
            //                         <Text>
            //                             증상 : {afterService.evalDsc}
            //                         </Text>
            //                         <Text>
            //                             만족도 : {afterService.evalPoint}
            //                         </Text>
            //                     </View>
            //                 </CardItem>
            //                 <CardItem>
            //                     <CustomButton onPress={ () => Actions.ViewAfterServiceHistory({asPrgsId : afterService.asPrgsId}) }>
            //                         <Text>조회</Text>
            //                     </CustomButton>
            //                 </CardItem>
            //             </Card>
            //             )
            //         ) : (
            //             <View> 
            //                 <Text>A/S 서비스를 받은 내역이 없습니다.</Text>
            //             </View>
            //         )
            //     }
            // </CustomBlockWrapper>
            <Container style={styles.containerScroll}>
                <CustomHeader />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={[styles.fxDirRow, styles.mb20]}>
                        <View style={stylesReg.leftGuideTxtWrap}>
                            <Text style={stylesReg.leftGuideTxt}>A/S받으신</Text>
                            <Text style={stylesReg.leftGuideTxt}>내역에 대해</Text>
                            <Text style={stylesReg.leftGuideTxt}>확인해보세요</Text>
                        </View>
                        <View style={stylesReg.rightStepNumWrap}>
                            <Text style={{fontSize : 20, color : color.defaultBackColor}}>
                                {this.state.data.length} 건
                            </Text>
                        </View>
                    </View>
                    { 
                    (this.state.data.length > 0) ? (
                        this.state.data.map((afterService, idx) => 

                        <View 
                            key={idx}
                            style={[
                                styles.fxDirRow, 
                                styles.justiConCenter, 
                                styles.mb10, 
                                styles.pd15, 
                                {backgroundColor : color.defaultColor}
                            ]}
                        >
                            <View style={[styles.fx3, styles.alignItemsStart, styles.justiConCenter]}>
                                <Image 
                                    source={{ uri: afterService.prdTypeFileUrl }} 
                                    resizeMode="contain" 
                                    style={{height : productImgSize, width : productImgSize}} 
                                />
                                <Text style={styles.whiteFont}>{afterService.prdTypeKoNm}</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => Actions.ViewAfterServiceHistory({asPrgsId : afterService.asPrgsId})} 
                                style={[styles.justiConCenter, {flex:6}]
                            }>
                                <View>
                                <H3 style={{color : color.whiteColor}}>{afterService.bplaceNm}</H3>
                                <Text style={styles.whiteFont}>{afterService.regDt}</Text>
                                <Text style={styles.whiteFont}>{afterService.evalDsc}</Text>
                                <Text style={styles.whiteFont}>만족도 {afterService.evalPoint}</Text>
                                </View>
                            </TouchableOpacity>
                    
                            <View style={styles.fx1}>
                                <Icon style={{color : color.whiteColor}} name="arrow-round-forward"/>
                            </View>
                        </View>
                        )
                      ) : (
                        <View style={[styles.justiConCenter, styles.alignItemsCenter, {height : emptyFlexSize}]}> 
                            <View style={{
                                borderStyle : 'dashed',
                                borderRadius: 100, 
                                borderColor : color.defaultColor, 
                                borderWidth : 1,
                                height : emptyFlexSize - 160,
                                width : emptyFlexSize - 160
                            }}>
                                <View style={[styles.fx1, styles.justiConCenter, styles.alignItemsCenter]}>
                                    <Image 
                                        source={require("~/Common/Image/license-depart01.png")} 
                                        style={{height : '40%', width : '40%'}}  
                                    />
                                    <Text style={{fontSize:12}}>A/S 서비스를</Text>
                                    <Text style={{fontSize:12}}>받은 내역이 없습니다.</Text>
                                </View>
                                
                            </View>
                            
                        </View>
                    )
                }
                
                </ScrollView>

            </Container>
        )
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
}

function hp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}
  
  
const productImgSize = wp(24, 52);
const emptyFlexSize = hp(55);

export default ListAfterServiceHistory;