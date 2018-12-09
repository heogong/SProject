import React, { Component } from "react";
import { TouchableHighlight } from 'react-native'


import { Badge, Button, Container, Content, Col, Grid, Row, Text, Thumbnail, List, ListItem, Icon } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import getProdImageType from '../../../functions/GetProdImgType'

class InputProdImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          uri : "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
          //data : this.props.prodInfo

          data : [
            {
                clientPrdNm : 'test1', 
                imgType : [
                    {prdTypeImgCateNm : '앞면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}, 
                    {prdTypeImgCateNm : '뒷면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}, 
                    {prdTypeImgCateNm : '측면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}
                ]
            },{
                clientPrdNm : 'test2', 
                imgType : [
                    {prdTypeImgCateNm : '앞면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}, 
                    {prdTypeImgCateNm : '뒷면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}, 
                    {prdTypeImgCateNm : '측면', defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png"}
                ]
            },
        ]
      };
    }

    // componentDidMount() {
    //     getProdImageType().then(result => {
    //         //console.log(result);
    //         //this.setState({ data : result.data});

    //         const newData = this.state.data.map((prodInfo, idx) => {
    //             return { ...prodInfo, imgType: result.data };
    //         });

    //         this.setState({ data: newData});
    //         //console.log(this.state.data);
    //     });
    // }

    // _handleTakeImage = (idx) => {
    //     //alert(idx);
    //     console.log(idx);
    // }

    _handleTakeImage = (pIdx, idx) => () => {
        const newData = this.state.data.map((prodInfo, prodInx) => {
            const newImgType = prodInfo.imgType.map((imgType, sidx) => {
                if(pIdx == prodInx) {
                    if(idx == sidx) { 
                        return { ...imgType, defaultImg: this.state.uri };
                    } else {
                        return imgType;
                    }
                } else {
                    return imgType;
                }
            })
            return { ...prodInfo, imgType: newImgType };
        });
        this.setState({ data: newData });
    }

    _renderListItem = (info, sectionID, rowID ) => (
        <ListItem>
            <Text>{info.clientPrdNm} </Text>
            <Text>{rowID} </Text>
            {info.imgType.map((type, idx) => (
                <Content>
                    <Thumbnail square large source={{uri: type.defaultImg}} />
                    <Button onPress={this._handleTakeImage(rowID, idx)}>
                        <Icon name='md-camera' />
                        <Text>{type.prdTypeImgCateNm}</Text>
                    </Button>
                </Content>
            ))}
            
        </ListItem>
    );

    render() {
        return (
            <Container>
                <Content padder>
                    <List dataArray={this.state.data} renderRow={this._renderListItem} />
                </Content>
            </Container>
        )
    }
}

export default InputProdImage;