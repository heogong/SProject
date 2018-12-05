import React, { Component } from "react";

import { Root, Container, Button, Content, ActionSheet, Text } from "native-base";
import { Actions } from 'react-native-router-flux';

var BUTTONS = ["워크인저장고1", "워크인저장고2", "워크인저장고3", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class InputProdType extends Component {
    constructor(props) {
      super(props);

      this.state = {
          buttonTitle : 'abc'
      };
    }

    render() {
        return (
            <Root>
                <Container>
                    <Content padder>
                        <Button
                            onPress={() =>
                            ActionSheet.show(
                            {
                                options: BUTTONS,
                                cancelButtonIndex: CANCEL_INDEX,
                                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                title: "제품유형"
                            },
                            buttonIndex => {
                                this.setState({ buttonTitle: BUTTONS[buttonIndex] });
                                
                            }
                            )}
                        >
                            <Text>{this.state.buttonTitle}</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
        )
    }
}

export default InputProdType;