import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import DeckModel from "./../../data/Deck";

import Button from "../Button";
import LabeledInput from "../LabeledInput";
import NormalText from "../NormalText";
import colors from "./../../styles/colors";

class NewCardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { font: "", back: ""};
    }

    _handleFront = text => {
        this.setState({ front: text });
    };

    _handleBack = text => {
        this.setState({ back: text});
    };

    _createCard = () => {
        console.warn("Not Implenented");
    };

    _reviewDec = () => {
        console.warn("Not implemented");
    };

    _doneCreating = () => {
        console.warn("Not implemented");
    };

    render() {
        return (
            <View>
                <LabeledInput
                    label="Front"
                    clearOnsubmit={false}
                    onEntry={this._handleFront}
                    onChange={this._handleFront} 
                />

                <LabeledInput
                    label="Back"
                    clearOnSubmit={flase}
                    onEntry={this._handleBack}
                    onChange={this._handleBack}
                />

                <Button style={StyleSheet.createButton} onPress={this._createCard}>
                    <NormalText>Create Card</NormalText>
                </Button>

                <View style={StyleSheet.buttonRow}>
                    <Button style={StyleSheet.secondaryButton} onPress={this._doneCreating}>
                        <NormalText>Done</NormalText>
                    </Button>

                    <Button style={StyleSheet.secondaryButton} onPress={this._reviewDec}>
                        <NormalText>Review Deck</NormalText>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    createButton : { backgroundColor: colors.green },
    secondaryButton: { backgroundColor: colors.blue },
    buttonRow: { flexDirection: "row"}
});

export default NewCardScreen;