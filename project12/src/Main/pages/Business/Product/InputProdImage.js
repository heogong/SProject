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
          uri : "https://facebook.github.io/react-native/docs/assets/favicon.png",
          data : this.props.prodInfo
      };
    }

    componentDidMount() {
        getProdImageType().then(result => {
            //console.log(result);
            //this.setState({ data : result.data});

            const newData = this.state.data.map((prodInfo, idx) => {
                return { ...prodInfo, imgType: result.data };
                
            });

            this.setState({ data: newData});
            //console.log(this.state.data);
        });
    }

    _renderListItem = (info) => (
        <ListItem>
            <Content>
                <Text>{info.clientPrdNm}</Text>
                {info.imgType.map((type) => (
                    <Button>
                        <Icon name='md-camera' />
                        <Text>{type.prdTypeImgCateNm}</Text>
                    </Button>
                ))}
            </Content>
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