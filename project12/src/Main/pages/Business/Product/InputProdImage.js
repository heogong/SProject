import React, { Component } from "react";

import { Badge, Button, Container, Content, Col, Grid, Row, Text, Thumbnail, TouchableHighlight } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import getProdImageType from '../../../functions/GetProdImgType'

class InputProdImage extends Component {
    constructor(props) {
      super(props);

      this.state = {
          uri : "https://facebook.github.io/react-native/docs/assets/favicon.png"
      };
    }

    componentDidMount() {
        getProdImageType().then(result => {
            console.log(result);
        });
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ backgroundColor: '#635DB7', height: 100 }}>
                        <Thumbnail square large source={{uri: this.state.uri}} />
                        <Thumbnail square large source={{uri: this.state.uri}} />
                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 100 }}>
                        <Thumbnail square large source={{uri: this.state.uri}} />
                        <Thumbnail square large source={{uri: this.state.uri}} />
                    </Row>
                </Grid>
                <Grid>
                    <Row style={{ backgroundColor: '#635DB7', height: 100 }}>
                        <Thumbnail square large source={{uri: this.state.uri}} />
                        <Thumbnail square large source={{uri: this.state.uri}} />
                    </Row>
                    <Row style={{ backgroundColor: '#635DB7', height: 100 }}>
                        <Thumbnail square large source={{uri: this.state.uri}} />
                        <Thumbnail square large source={{uri: this.state.uri}} />
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default InputProdImage;