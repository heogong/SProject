import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import ImagePicker from 'react-native-image-picker';

import TakeAfterServiceImg from '~/Main/Functions/TakeAfterServiceImg';
import EditAfterServiceImg from '~/Main/Functions/EditAfterServiceImg';
import DelAfterServiceImg from '~/Main/Functions/DelAfterServiceImg';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomModal from '~/Common/Components/CustomModal';
import { styles, viewportWidth } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";


const DoAfterServiceImage = ({uri, action}) => (
    <View style={localStyles.prdPhoto}>
        <ImageBackground 
            style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
            source={{uri: uri}}>
            <TouchableOpacity 
                onPress={action}
                style={localStyles.prdPhotoBtnEn}
            >
                <Text style={localStyles.prdPhotoBtnTxt}>재등록하기</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
  )

const EmptyAfterServiceImage = ({action}) => (
    <TouchableOpacity 
        onPress={action}
        style={localStyles.photoNoBoxWrap}>
        <View style={localStyles.photoNoBox}>
            <Icon name="ios-camera" style={localStyles.phototNoIcon} />
        </View>
    </TouchableOpacity>
)

// 이미지 단순 조회 - 이미지 있을경우
const ViewAfterServiceImage = ({uri}) => (
    <View style={localStyles.prdVPhoto}>
        <ImageBackground 
            style={[styles.alignItemsEnd, styles.justiConEnd, {width: '100%', height: '100%'}]}
            source={{uri: uri}}
        >
            <TouchableOpacity 
                style={localStyles.prdVPhotoBtnEn}
                onPress={ () => alert("사진조회")}
            >
                <Image 
                    source={require("~/Common/Image/Zoomup_button.png")} 
                    resizeMode="contain" 
                    style={localStyles.prdVPhotoBtnEnIcon}
                />
            </TouchableOpacity>
        </ImageBackground>
    </View>
)

// 이미지 단순 조회 - 이미지 없을경우
const ViewAfterServiceEmptyImage = () => (
    <TouchableOpacity style={localStyles.photoVNoBoxWrap}>
        <View style={localStyles.photoNoBox}>
            <Image 
                source={require("~/Common/Image/camera_icon.png")} 
                style={localStyles.prdCardCameraIcon}
                resizeMode="contain" 
            />
        </View>
    </TouchableOpacity>
)

let SOURCE = null;
let IMG_ID = null;

class AfterServiceImage extends Component {
    constructor(props) { 
        super(props); 

        this.takePhotoTapped = this.takePhotoTapped.bind(this);

        this.state = {
            isImage : (this.props.imgUrl !== null) ? true : false,
            imgUri : this.props.imgUrl,
            isAlertModal : false, //alert 용
            resultMsg : null // alert 결과 메세지
        };
    }

    static defaultProps = {
        beforeAction : true, // 조치전/후 여부
        viewImage : false,
        asPrgsId : 5, //test
    }

    // 촬영
    takePhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                SOURCE = { uri: response.uri };

                // 촬영 후 조치 전 / 후 함수 호출 (true : 조치 전, false : 조치 후)
                if(this.props.beforeAction) {
                    this.props.takeBeforeImageAction();
                } else {

                    this.props.takeAfterImageAction();
                }

                // 재등록 여부 확인
                if(this.state.isImage) {
                    this._editAfterServiceImg();
                } else {
                    this._takeAfterServiceImg();
                }
                
            }
        })
    };

    // AS 조치전/후 사진 등록
    _takeAfterServiceImg = () => {
        TakeAfterServiceImg(this.props.beforeAction, this.props.asPrgsId, SOURCE.uri).then(result => {
            GetCommonData(result, this._takeAfterServiceImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({
                            imgUri : SOURCE.uri,
                            isImage : true
                        });

                        IMG_ID = resultData.data.imgId; // 이미지 삭제 없으면 필요 없을 듯

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

    // AS 조치전/후 사진 수정
    _editAfterServiceImg = () => {
        let imgId = (this.props.imgId !== null) ? this.props.imgId : IMG_ID;
        
        EditAfterServiceImg(this.props.beforeAction, SOURCE.uri, imgId ).then(result => {
            GetCommonData(result, this._delAfterServiceImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({
                            imgUri : SOURCE.uri,
                            isImage : true
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

    // AS 조치전/후 사진 삭제
    _delAfterServiceImg = () => {
        DelAfterServiceImg(this.props.beforeAction, IMG_ID, this.props.asPrgsId ).then(result => {
            GetCommonData(result, this._delAfterServiceImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({
                            isImage : false,
                            imgUri : null
                        });
                        this.takePhotoTapped();
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
            <View key={this.props.index}>
                { 
                    (this.props.viewImage) ? (
                        (this.props.imgUri) ? <ViewAfterServiceImage uri={this.props.imgUri}/> : <ViewAfterServiceEmptyImage/>
                    ) : (
                        (!this.state.isImage) ? (
                            <EmptyAfterServiceImage
                                key={ this.props.index }
                                action={ this.takePhotoTapped.bind(this) } 
                            />
                        ) : (
                            <DoAfterServiceImage
                                action={ this.takePhotoTapped.bind(this) }
                                uri={ this.state.imgUri }
                            />
                        ) 
                    )
                }

                {/* alert 메세지 모달 */}
                <CustomModal
                    modalType="ALERT"
                    isVisible={this.state.isAlertModal}
                    onPress={ () => this.setState({isAlertModal : false})}
                    infoText={this.state.resultMsg}
                    btnText="확인"
                />
            </View>
        );
    }
}

function wp (percentage, space) {
    const value = (percentage * (viewportWidth - space)) / 100;
    return Math.round(value);
  }
  
const asCardSize = wp(48, 72);
const asCardSize2 = wp(46, (styles.containerScroll.paddingLeft * 2) + 10 );

const localStyles = StyleSheet.create({
    prdPhoto: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor : color.defaultColor, 
        height : asCardSize, 
        width : asCardSize
    },
    prdVPhoto: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor : color.defaultColor, 
        height : asCardSize2, 
        width : asCardSize2
    },
    prdPhotoBtnEn: {
        width : "100%",
        backgroundColor: 'rgba(40, 200, 245, 0.6)'
    },
    prdPhotoBtnEnIcon: {
        width: 32,
        height: 32
    },
    prdVPhotoBtnEn: {
        height : 32,
        width : 32,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    prdVPhotoBtnEnIcon: {
        width: 32,
        height: 32
    },
    prdPhotoBtnTxt: {
        fontSize: 14,
        color: color.whiteColor,
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    photoNoBoxWrap: {
        flex: 5,
        borderColor : "#c9cacb",
        borderWidth : 1,
        margin: 5,
        height : asCardSize, 
        width : asCardSize
    },
    photoVNoBoxWrap: {
        flex: 5,
        borderColor : "#c9cacb",
        borderWidth : 1,
        margin: 5,
        height : asCardSize2, 
        width : asCardSize2
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
    prdCardCameraIcon: {
        width: 36,
        height: 36
    }
});

export default AfterServiceImage;