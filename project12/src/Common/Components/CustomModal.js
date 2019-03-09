import React, { Component } from "react";
import { View } from 'react-native';
import { Button, Text } from "native-base";

import Modal from "react-native-modal";

import { styles } from '~/Common/Styles/common';
import { BStyles } from '~/Common/Styles/Button';
import CustomEtcButton from '~/Common/Components/CustomEtcButton';

// 모달 alert
const ModalAlert = ({isVisible, action, infoText1, btnText}) => (
    <Modal isVisible={isVisible}>
        <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
                <View style={styles.modalTopTxtWrap}>
                    <Text style={styles.modalTopTxt}>{infoText1}</Text>
                </View>
                <View style={styles.modalBtnWrap}>
                    <CustomEtcButton onPress={action}>
                        {btnText}
                    </CustomEtcButton>
                </View>
            </View>
        </View>
    </Modal>
)

// 모달 alert - 2줄 info
const ModalAlert2 = ({isVisible, action, infoText1, infoText2, btnText}) => (
    <Modal isVisible={isVisible}>
        <View style={[styles.modalWrap, {height: 128}]}>
            <View style={styles.modalContent}>
                <View style={styles.modalTop2LTxtWrap}>
                    <Text style={styles.modalTopTxt}>{infoText1}</Text>
                    <Text style={styles.modalTopTxt}>{infoText2}</Text>
                </View>
                <View style={styles.modalBtnOneWrap}>
                    <CustomEtcButton onPress={action}>
                        {btnText}
                    </CustomEtcButton>
                </View>
            </View>
        </View>
    </Modal>
)

// 모달 confirm
const ModalConfirm = ({isVisible, action1, action2, infoText1, btnText1, btnText2}) => (
    <Modal isVisible={isVisible}>
        <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
            <View style={styles.modalTopTxtWrap}>
                <Text style={styles.modalTopTxt}>{infoText1}</Text>
            </View>
            <View style={[styles.modalBtnTwinWrap, styles.fx1]}>
                    <View style={{marginRight: 9}}>
                        <CustomEtcButton
                            onPress={action1}
                            WhiteBackBtn={true}
                        >
                            {btnText1}
                        </CustomEtcButton>
                    </View>
                    <View style={{marginLeft: 9}}>
                        <CustomEtcButton onPress={action2}>
                            {btnText2}
                        </CustomEtcButton>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
)

// 모달 confirm - 2줄 info
const ModalConfirm2 = ({isVisible, action1, action2, infoText1, infoText2, btnText1, btnText2}) => (
    <Modal isVisible={isVisible}>
        <View style={[styles.modalWrap, {height: 128}]}>
            <View style={styles.modalContent}>
                <View style={[styles.modalTop2LTxtWrap]}>
                    <Text style={styles.modalTopTxt}>{infoText1}</Text>
                    <Text style={styles.modalTopTxt}>{infoText2}</Text>
                </View>
                <View style={styles.modalBtnTwinWrap}>
                    <View style={{marginRight: 9}}>
                        <CustomEtcButton
                            onPress={action1}
                            WhiteBackBtn={true}
                        >
                            {btnText1}
                        </CustomEtcButton>
                    </View>
                    <View style={{marginLeft: 9}}>
                        <CustomEtcButton
                            onPress={action2}
                        >
                            {btnText2}
                        </CustomEtcButton>
                    </View>
                </View>
            </View>
        </View>
    </Modal>

)

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible : this.props.isVisible
        }
    }

    static defaultProps = {
        modalType : 'ALERT',
    }

    componentWillReceiveProps(nextProps){
        // console.log("componentWillReceiveProps: ", nextProps);
        this.setState({isVisible : nextProps.isVisible});
    }

    render() {
        return (
            this.props.modalType == 'ALERT' ? ( 
                this.props.infoText2 == null ? (
                <ModalAlert
                    isVisible={this.state.isVisible}
                    action={this.props.onPress}
                    infoText1={this.props.infoText}
                    btnText={this.props.btnText}
                /> 
                ) : (
                    <ModalAlert2
                        isVisible={this.state.isVisible}
                        action={this.props.onPress}
                        infoText1={this.props.infoText}
                        infoText2={this.props.infoText2}
                        btnText={this.props.btnText}
                    />
                )
            ) : ( 
                this.props.infoText2 == null ? (
                    <ModalConfirm 
                        isVisible={this.state.isVisible}
                        action1={this.props.onPress1}
                        action2={this.props.onPress2}
                        infoText1={this.props.infoText1}
                        btnText1={this.props.btnText1}
                        btnText2={this.props.btnText2}
                    />
                ) : (
                    <ModalConfirm2
                        isVisible={this.state.isVisible}
                        action1={this.props.onPress1}
                        action2={this.props.onPress2}
                        infoText1={this.props.infoText1}
                        infoText2={this.props.infoText2}
                        btnText1={this.props.btnText1}
                        btnText2={this.props.btnText2}
                    />
                )
            )
            
        )
    }
}


export default CustomModal;
