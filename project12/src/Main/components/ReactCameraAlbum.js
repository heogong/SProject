import React, {Component} from 'react';
import { ScrollView, View, ImageBackground, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';
import CustomHeader from '~/Common/Components/CustomHeader';

let IMG_URI = null; // 이미지 uri 저장
class ReactCameraAlbum extends Component {
  constructor(props) { 
    super(props); 

    this.onPress = this._handleSelectImage.bind(this);
  }

  // 이미지 선택
  _handleSelectImage = (image) => {
    IMG_URI = image;

    Actions.ViewImage({
      imageUri : image, 
      title : '사업자 등록증 리스트',
      rightBtn : true,
      rightAction : this._imageSendPage
    });
  }

  // 요청 페이지 이미지 전송
  _imageSendPage = () => {
    Actions.popTo("JoinInputBizLicense"); // 사업자 등록증 페이지
    this.props.result({ data: IMG_URI });
  }

  render() {
      return (
        <View>
            <CustomHeader
                title="사업장 등록증"
            />
            <ScrollView>
                {this.props.photos.map((p, i) => {
                return (
                  <TouchableHighlight onPress={() => this._handleSelectImage(p.node.image.uri)}>
                    <ImageBackground
                      key={i}
                      style={{
                        width: 300,
                        height: 100,
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableHighlight>
                );
              })}
            </ScrollView>
        </View>
      );
  }
}

export default ReactCameraAlbum;