import React, { Component } from 'react';
import { Alert, StyleSheet, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Body, Button, Card, CardItem, Icon, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import ImagePicker from 'react-native-image-picker';

import TakeAfterServiceImg from '~/Main/Functions/TakeAfterServiceImg';
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
        asPrgsId : 5 //test
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

                this.props.takeImageAction();
                this._takeAfterServiceImg();
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
                {/* { (this.state.isImage) ? (
                    <Card>
                        <CardItem cardBody>
                            <ImageOverlay 
                                containerStyle={ {height: 200, width: null, flex: 1} }
                                source={this.state.avatarSource} 
                                overlayAlpha={0.5}
                                contentPosition="center"
                            >
                                <CustomButton 
                                    styleWidth={ false }
                                    block={ true } 
                                    light={ true }
                                    bordered={ true }
                                    onPress={ () => alert("조회") }
                                    >
                                    <Icon active name="md-eye" />
                                    <Text>보기</Text>
                                </CustomButton>
                                <CustomButton 
                                    styleWidth={ false }
                                    block={ true } 
                                    light={ true }
                                    bordered={ true }
                                    onPress={ this._delAfterServiceImgConfirm }>
                                    <Icon active name="md-trash" />
                                    <Text>삭제</Text>
                                </CustomButton>
                            </ImageOverlay>
                        </CardItem>
                    </Card>
                ) :(
                    <TouchableOpacity  onPress={ this.takePhotoTapped.bind(this) }>
                        <Card>
                            <CardItem cardBody>
                                <Image source={this.state.avatarSource} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                )} */}

                { (!this.state.isImage) ? (
                    <EmptyAfterServiceImage
                        key={ this.props.index }
                        action={ this.takePhotoTapped.bind(this) } 
                    />
                ) : (
                    <DoAfterServiceImage
                        action={ this._delAfterServiceImg }
                        uri={ SOURCE.uri }
                    />
                ) }

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

const localStyles = StyleSheet.create({
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
    }
});

export default AfterServiceImage;