import React, { Component } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import GetCommonData from '~/Common/Functions/GetCommonData';
import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import DelCard from '~/FirstScreen/Functions/Card/DelCard';

import CustomButton from '~/Common/Components/CustomButton';
import CustomHeader from '~/Common/Components/CustomHeader';
import CustomModal from '~/Common/Components/CustomModal';
import { styles } from '~/Common/Styles/common';
import { Actions } from 'react-native-router-flux';

let SELECT_IDX = null;
export default class ListCardInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data : [],
            isAlertModal : false, // alert 용
            resultMsg : null // alert 용
        };
    }

    static defaultProps = {
      morePage : false
    }

    componentDidMount() {
      this._getListCard();
    }

    // 내 결제카드 목록 조회
    _getListCard = () => {
      ListCard().then(result => {
          GetCommonData(result, this._getListCard).then(async resultData => {
              if(resultData !== undefined) {
                  const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                  console.log(resultData);
                  if(ResultBool) {
                    this.setState({data : resultData.data});
                  } else {
                    this.setState({
                      isAlertModal : true,
                      resultMsg : resultData.resultMsg
                    })
                    
                  }
              }
          });
      });
    }

    // 카드삭제 API
    _cardDelete = () => {
      this.setState({isModalVisible : false});
      
      const { data } = this.state;

        DelCard(data[SELECT_IDX].billingKeyId).then(result => {
          GetCommonData(result, this._cardDelete).then(async resultData => {
            if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              if(ResultBool) {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
                // alert("삭제 완료");

                // ROW_MAP[`${SEC_ID}${ROW_ID}`].props.closeRow();
                // const newData = [...this.state.listViewData];

                // newData.splice(ROW_ID, 1);
        
                // this.setState({ listViewData: newData });
                this.setState({ data: this.state.data.filter((s, sidx) => SELECT_IDX !== sidx)})
              } else {
                this.setState({
                  isAlertModal : true,
                  resultMsg : resultData.resultMsg
                })
              }
            }
          });
        });
    }

    // // 디폴트 카드 설정
    // _setDefaultCard = () => {
    //     SetDefaultCard(CARD_ID).then(result => {
    //         GetCommonData(result, this._setDefaultCard).then(async resultData => {
    //           if(resultData !== undefined) {
    //             const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
    //             if(ResultBool) {
    //                 this.setState({ defalutIcon : 'md-checkmark' });
    //             } else {
    //               alert(resultData.resultMsg);
    //             }
    //           }
    //         });
    //     });
    // }

    render() {
        return (
          <Container style={styles.containerInnerPd}>
            <CustomHeader title="결제카드관리" />

            <View style={[styles.contentWrap, styles.alignItemsCenter]}>
              <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 1}}>
                <View style={{marginTop: 26}}>
                  <View style={localStyles.regCardStyle}>
                    <ImageBackground
                      source={require("~/Common/Image/credit_card_layout2.png")} 
                      resizeMode="contain"
                      style={localStyles.newCardStyle}> 
                      <TouchableOpacity 
                        onPress={ () => Actions.CardInputInfo({
                          morePage : true, 
                          refreshCard : this._getListCard
                        }
                      )}> 
                        <Image source={require('~/Common/Image/credit_card_regist.png')} style={localStyles.cardAddImg}/>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                  { this.state.data.map((card, index) => 
                    <View key={index} style={localStyles.regCardStyle}>
                      <ImageBackground
                        source={require("~/Common/Image/credit_card_layout.png")} 
                        resizeMode="contain"
                        style={localStyles.newCardStyle}> 
                        <View style={localStyles.cardTopWrap}>
                          <Text style={localStyles.cardNameTxt}>{card.cardName}</Text>
                          <TouchableOpacity style={localStyles.btnCloseIconWrap}
                            onPress={ async () => {SELECT_IDX = await index, this.setState({isModalVisible : true}) }}
                          >
                            <Icon name="close" style={localStyles.btnCloseIcon}></Icon>
                          </TouchableOpacity>
                        </View>
                        <View style={localStyles.cardBottomWrap}>
                          <Text style={localStyles.cardNumTxt}>{card.cardNum}</Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )}

                </View>

              </ScrollView>

            </View>

            <CustomModal
                modalType="CONFIRM"
                isVisible={this.state.isModalVisible}
                onPress1={() => this.setState({isModalVisible : false})}
                onPress2={this._cardDelete}
                infoText1="등록된 결제카드를 삭제하겠어요?"
                infoText2={null}
                btnText1="취소"
                btnText2="삭제"
            />

             {/* alert 메세지 모달 */}
              <CustomModal
                  modalType="ALERT"
                  isVisible={this.state.isAlertModal}
                  onPress={ () => this.setState({isAlertModal : false})}
                  infoText={this.state.resultMsg}
                  btnText="확인"
              />
        </Container>
        );
    }
}

const localStyles = StyleSheet.create({
  regCardStyle : {
    height : 160, 
    width : 298,
    marginBottom: 20,
    flex: 1
  },
  newCardStyle : {
    height : 160, 
    width : 298,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  cardTopWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  btnCloseIconWrap: {
    flex: 1,
    alignItems:'flex-end',
    marginRight: 20
  },
  btnCloseIcon: {
    width: 17,
    height: "auto"
  },
  cardNameTxt: {
    fontSize: 18,
    color: "#626270",
    fontWeight: "bold",
    paddingLeft: 30
  },
  cardBottomWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: "100%"
  },
  cardNumTxt: {
    fontSize: 15,
    color: "#626270",
    marginBottom: 37,
    marginRight: 20
  },
  cardAddWrap: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardAddImg: {
    width: 56,
    height: 56
  },
});
