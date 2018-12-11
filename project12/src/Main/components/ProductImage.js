import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Content, Text, Thumbnail, Icon } from "native-base";
import { Actions } from 'react-native-router-flux';
import regProdImg from '../functions/RegProdImg';

class ProductImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          uri : this.props.uri,
          insertYn : true,
          modifyYn : false,
          deleteYn : false,
          defaultImg : this.props.uri
      };
    }

    _handleTakeImage = () => {
      Actions.reactCamera({onResult : this.onResult});
    }

    _handleImageModify = () => {
        Actions.reactCamera({onResult : this.onResult});
        this.setState({ deleteYn : true, modifyYn : false });
    }

    _handleImageDelete = () => {
        this.setState({ uri : this.state.defaultImg , deleteYn : false, modifyYn : true });
    }

    onResult = (result) => {
        console.log(result.data);

        // const data = new FormData();

        // data.append('name', 'testName'); // you can append anyone.
        // data.append('photo', {
        //     uri: result.data.uri,
        //     type: 'image/jpeg', // or photo.type
        //     name: 'testPhotoName'
        // });

        // regProdImg(data, this.props.clientPrdId, this.props.prdImgCateId).then(result => {
        //     console.log(result);
        // });

        this.setState({ uri : result.data.uri , deleteYn : true, insertYn : false});

    }

    render() {
        return (
            <Content>
                <Thumbnail square large source={{uri: this.state.uri}} />
                <Button 
                    onPress={this._handleTakeImage}
                    style={(this.state.insertYn) ? styles.show : styles.hide }>
                    <Icon name='md-camera' />
                    <Text>{this.props.prdTypeImgCateNm}</Text>
                </Button>
                <Button 
                    onPress={this._handleImageModify}
                    style={(this.state.modifyYn) ? styles.show : styles.hide }>
                    <Text>{this.props.prdTypeImgCateNm} 수정</Text>
                </Button>
                <Button 
                    onPress={this._handleImageDelete}
                    style={(this.state.deleteYn) ? styles.show : styles.hide }>
                    <Text>삭제</Text>
                </Button>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    hide: {
        display: 'none'
    },
    show: {
        display: 'flex'
    }
});


export default ProductImage;