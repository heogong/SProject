import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Body, Button, Card, CardItem, Icon, Text, Thumbnail } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import ImagePicker from 'react-native-image-picker';
import ImageOverlay from "react-native-image-overlay";

import TakeAfterServiceImg from '~/Main/Functions/TakeAfterServiceImg';
import DelAfterServiceImg from '~/Main/Functions/DelAfterServiceImg';
import GetCommonData from '~/Common/Functions/GetCommonData';

import CustomButton from '~/Common/Components/CustomButton';

class AfterServiceImage extends Component {
    constructor(props) { 
        super(props); 

        this.takePhotoTapped = this.takePhotoTapped.bind(this);

        this.state = {
            avatarSource : { uri: this.props.imgUrl },
            isImage : (this.props.imgUrl) ? true : false,
            imgId : this.props.imgId
        };
    }

    static defaultProps = {
        beforeAction : true, // 조치전/후 여부
        imgUrl : null,
        imgId : null,
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
                let source = { uri: response.uri };
        
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    avatarSource: source,
                    isImage : true
                });

                this._takeAfterServiceImg();
            }
        })
    };

    // AS 조치전/후 사진 등록
    _takeAfterServiceImg = () => {
        const { avatarSource } = this.state

        TakeAfterServiceImg(this.props.beforeAction, this.props.asPrgsId, avatarSource.uri).then(result => {
            GetCommonData(result, this._takeAfterServiceImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({imgId : resultData.data.imgId});
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 조치전/후 사진 삭제
    _delAfterServiceImg = () => {
        DelAfterServiceImg(this.props.beforeAction, this.state.imgId, this.props.asPrgsId ).then(result => {
            GetCommonData(result, this._delAfterServiceImg).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        this.setState({
                            isImage : false,
                            avatarSource : null
                        });
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // AS 조치전/후 사진 선택
    _delAfterServiceImgConfirm = () => {
        Alert.alert(
            '',
            `삭제??`,
            [
                { text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                { text: '예', onPress: () => this._delAfterServiceImg() },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View key={this.props.index}>
                { (this.state.isImage) ? (
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
                )}
            </View>
        );
    }
}

export default AfterServiceImage;