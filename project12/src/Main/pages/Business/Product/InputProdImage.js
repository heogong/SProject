import React, { Component } from "react";
import { TouchableHighlight } from 'react-native'


import { Badge, Button, Container, Content, Col, Grid, Row, Text, Thumbnail, List, ListItem, Icon } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import GetProdImageType from '../../../Functions/GetProdImgType'

import ProductImage from '../../../Components/ProductImage'

class InputProdImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          defaultImg : "https://facebook.github.io/react-native/docs/assets/favicon.png",
          //data : this.props.prodInfo

          data : [
            {
                clientPrdNm : 'test1', 
                imgType : [
                    {prdTypeImgCateNm : '앞면', clientPrdId : 2, prdImgCateId : 2 }, 
                    {prdTypeImgCateNm : '뒷면', clientPrdId : 2, prdImgCateId : 2 }, 
                    {prdTypeImgCateNm : '측면', clientPrdId : 2, prdImgCateId : 2 }
                ]
            },{
                clientPrdNm : 'test2', 
                imgType : [
                    {prdTypeImgCateNm : '앞면', clientPrdId : 2, prdImgCateId : 2 }, 
                    {prdTypeImgCateNm : '뒷면', clientPrdId : 2, prdImgCateId : 2 }, 
                    {prdTypeImgCateNm : '측면', clientPrdId : 2, prdImgCateId : 2 }
                ]
            },
        ]
      };
    }

    // componentDidMount() {
    //     GetProdImageType().then(result => {
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

    _renderListItem = (info) => (
        <ListItem>
            <Text>{info.clientPrdNm} </Text>
            {info.imgType.map((type) => (
                <ProductImage 
                    prdTypeImgCateNm = { type.prdTypeImgCateNm }
                    clientPrdId = { type.clientPrdId }
                    prdImgCateId = { type.prdImgCateId }
                    uri = { this.state.defaultImg }
                />
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