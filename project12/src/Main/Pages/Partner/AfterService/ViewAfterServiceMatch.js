import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, H3, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceDetail from '~/Main/Functions/GetAfterServiceDetail'
import GetCommonData from '~/Common/Functions/GetCommonData';
import DrawMap from '~/Main/Components/DrawMap';

import CustomModal from '~/Common/Components/CustomModal';
import CustomHeader from "~/Common/Components/CustomHeader";
import { styles, viewportWidth, viewportHeight } from '~/Common/Styles/common';
import { stylesReg } from '~/Common/Styles/stylesReg';
import { color } from "~/Common/Styles/colors";

const AfterServiceImage = ({AfterService}) => (
    <View style={localStyles.prdPhoto}>
      <ImageBackground 
        style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%', backgroundColor:color.whiteColor}]}
        source={{ uri: AfterService.fileUrl }}>

        {(AfterService.fileUrl !== null) ? (
            <TouchableOpacity 
                style={localStyles.prdPhotoBtnEn}
                onPress={ () => alert("사진조회")}>
                <Icon name="expand" style={localStyles.prdPhotoBtnEnIcon}/>
            </TouchableOpacity>
        ) : (
            <View/>
        )}

      </ImageBackground>
    </View>
)

class ViewAfterServiceMatch extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : {
            clientPrdImgs : [] // 제품 이미지 데이터
        },
        region: {
            latitude: 37.566535,
            longitude: 126.97796919999996,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
        },
        marker: {
            latitude: 37.566535,
            longitude: 126.97796919999996
        },
        isAlertModal : false, // alert 용
      };
    }

    componentDidMount() {
        this._getAfterServiceDetail();
    }

    // AS 접수 상세 내용 조회
    _getAfterServiceDetail = () => {
        // GetAfterServiceDetail(96).then(result => {
        GetAfterServiceDetail(this.props.asRecvId).then(result => {
            GetCommonData(result, this._getAfterServiceDetail).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({ 
                            data: resultData.data,
                            region : {
                                ...this.state.region,
                                latitude  : Number(resultData.data.bplaceAddrLat),
                                longitude : Number(resultData.data.bplaceAddrLng)
                              },
                              marker: {
                                  latitude: Number(resultData.data.bplaceAddrLat),
                                  longitude: Number(resultData.data.bplaceAddrLng)
                              },
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

    render() {
        return (
            // <CustomBlockWrapper
            //     title="A/S 매칭 상세정보"
            // >
            //     <View>
            //         <Thumbnail large source={{ uri: this.state.data.prdTypeImgUrl }} />
            //         <Text>사업장 : {this.state.data.bplaceNm}</Text>
            //         <Text>주소 : {this.state.data.bplaceAddr} {this.state.data.bplaceAddrDtl}</Text>
            //     </View>

            //     <View style={{width:"100%", height:200}}>
            //         <DrawMap
            //             region={ this.state.region }
            //             // onRegionChangeComplete={ this._onRegionChangeComplete }
            //             makerYn={ true }
            //             marker={ this.state.marker }
            //         />
            //     </View>

            //     <View style={{ flex:1, justifyContent: 'center'}}>
            //         <View style={ styles.boxLayout }>
            //             {this.state.data.clientPrdImgs.map((info, idx) => (
            //                 <ProductImage 
            //                     key={idx}
            //                     prdTypeImgCateNm={ info.prdTypeImgCateNm }
            //                     clientPrdId={ this.state.data.clientPrdId }
            //                     clientPrdImgId={ info.clientPrdImgId }
            //                     prdImgCateId={ info.prdTypeImgCateId }
            //                     uri={ (info.fileUrl !== null) ? info.fileUrl : this.props.defaultImg }
            //                     defaultImg={ this.props.defaultImg }
            //                     imageTouch={ (info.fileUrl !== null) ? false : true }
            //                     viewProduct={ true }
            //                 />
            //             ))}
            //         </View>
            //     </View>
            // </CustomBlockWrapper>
            <Container style={styles.containerScroll}>
                <CustomHeader title="매칭상세정보"/>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.mb15}>
                        <View style={styles.boxShadow}>
                            <View style={{height : mapSize, backgroundColor : 'skyblue'}}>
                            <DrawMap
                                region={ this.state.region }
                                // onRegionChangeComplete={ this._onRegionChangeComplete }
                                makerYn={ true }
                                marker={ this.state.marker }
                            />
                            </View>

                            <View style={[
                                styles.fxDirRow, 
                                styles.justiConCenter, 
                                styles.pd15, 
                                {backgroundColor : color.whiteColor}]}>
                                <View style={[styles.fx3, styles.alignItemsStart, styles.justiConCenter]}>
                                    <Image 
                                        source={{ uri: this.state.data.prdTypeImgUrl }} 
                                        resizeMode="contain" 
                                        style={{height : productImgSize, width : productImgSize}} 
                                    />
                                </View>
                                <View style={[styles.justiConCenter, styles.fx6]}>
                                    <H3 style={[styles.mb15, localStyles.topBoxTxt]}>{this.state.data.bplaceNm}</H3>
                                    <Text style={localStyles.topBoxDeTxt}>{this.state.data.bplaceAddr}</Text>
                                    <Text style={localStyles.topBoxDeTxt}>{this.state.data.bplaceAddrDtl}</Text>
                                </View>
                        
                                <View style={styles.fx1}>
                                    <Icon  name="arrow-round-forward"/>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{marginTop: 16}}>
                            <View style={[styles.boxShadow, localStyles.bottomBoxWrap]}>
                                <View style={localStyles.boxDetailTitleWrap}>
                                    <Text style={localStyles.boxDetailTitleTxt}>A/S 신청내역</Text>
                                </View>

                                <View style={styles.mb20}>
                                    <Text style={localStyles.boxDetailSubTitleTxt}>업소용냉장고</Text>
                                    <Text style={localStyles.boxDetailSubTxt}>증상1. 냉동 온도가 올라가지 않음</Text>
                                </View>

                                <View style={styles.mb20}>
                                    <Text style={localStyles.boxDetailSubTitleTxt}>참고사항</Text>
                                    <Text style={localStyles.boxDetailSubTxt}>
                                        주차공간이 협소하니 어쩌구저저구
                                        주차공간이 협소하니 어쩌구저저구
                                        주차공간이 협소하니 어쩌구저저구
                                    </Text>
                                </View>

                                <View style={styles.mb20}>
                                    <Text style={localStyles.boxDetailSubTitleTxt}>쿨리닉 제품분석</Text>
                                    <View style={styles.fxDirRow}>
                                        <View style={styles.fx1}>
                                            <Text style={localStyles.boxDetailSubTxt}>용량 :</Text>
                                            <Text style={localStyles.boxDetailSubTxt}>전기 :</Text>
                                            <Text style={localStyles.boxDetailSubTxt}>압축기 :</Text>
                                        </View>
                                        <View style={styles.fx1}>
                                            <Text style={localStyles.boxDetailSubTxt}>응축기 :</Text>
                                            <Text style={localStyles.boxDetailSubTxt}>증발기 :</Text>
                                            <Text style={localStyles.boxDetailSubTxt}>제조사 :</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={localStyles.boxDetailSubTitleTxt}>제품상세사진</Text>
                                    <View style={localStyles.prdPhotoWrap}>

                                        {this.state.data.clientPrdImgs.map((info, idx) => (
                                            <AfterServiceImage
                                                key={idx}
                                                AfterService={info}
                                            />
                                        ))}

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

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
  
  function hp (percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
  }
  
  const productImgSize = wp(24, 52);
  const asCardSize = wp(48, 96);
  const mapSize = hp(26);
  
  const localStyles = StyleSheet.create({
    topBoxTxt: {
      fontSize: 21,
      color: "#1e1e32",
      fontWeight: "bold"
    },
    topBoxDeTxt: {
      fontSize: 13,
      color: "#8e8e98"
    },
    bottomBoxWrap: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 24,
      backgroundColor: "#fff"
    },
    boxDetailTitleWrap: {
      marginBottom: 24,
      borderColor: color.defaultColor,
      borderBottomWidth : 1
    },
    boxDetailTitleTxt: {
      fontSize: 18,
      color : color.defaultColor,
      paddingTop : 26,
      paddingBottom : 26,
      fontWeight: "bold"
    },
    boxDetailSubTitleTxt: {
      fontSize: 14,
      color: "#1e1e32",
      paddingBottom: 10
    },
    boxDetailSubTxt: {
      fontSize: 13,
      color: "#8e8e98"
    },
    prdPhotoWrap: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap : 'wrap'
    },
    prdPhoto: {
      marginBottom : 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor : color.defaultColor, 
      height : asCardSize, 
      width : asCardSize
    },
    prdPhotoBtnEn: {
      height : 32,
      width : 32,
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    prdPhotoBtnEnIcon: {
      textAlign: "center",
      color: color.whiteColor
    }
});


export default ViewAfterServiceMatch;