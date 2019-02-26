import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, H3, Icon, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';
import GetCommonData from '~/Common/Functions/GetCommonData';

import ListCard from '~/FirstScreen/Functions/Card/ListCard';
import DelCard from '~/FirstScreen/Functions/Card/DelCard';

import CustomHeader from '~/Common/Components/CustomHeader';
import { styles, viewportHeight, viewportWidth } from '~/Common/Styles/common';
import { color } from '~/Common/Styles/colors';


let CARD_ID;
export default class ListCardInfo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data : []
        };
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
                      alert(resultData.resultMsg);
                  }
              }
          });
      });
    }


    // 카드 row 삭제
    deleteRow(id, idx) {
        CARD_ID = id;

        Alert.alert(
          '',
          '삭제하시겠습니까?',
          [
            {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {
              text: '네', onPress: () => (
                  this.setState({ data: this.state.data.filter((s, sidx) => idx !== sidx)})
                  //this._cardDelete()
              )
            },
          ],
          { cancelable: false }
        )
    }

    // 카드삭제 API
    _cardDelete = () => {
        DelCard(CARD_ID).then(result => {
          GetCommonData(result, this._cardDelete).then(async resultData => {
            if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              if(ResultBool) {
                alert("삭제 완료");

                ROW_MAP[`${SEC_ID}${ROW_ID}`].props.closeRow();
                const newData = [...this.state.listViewData];

                newData.splice(ROW_ID, 1);
        
                this.setState({ listViewData: newData });
              } else {
                alert(resultData.resultMsg);
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
          // <CustomBlockWrapper
          //   title="카드 목록"
          // >
          //   <List
          //       rightOpenValue={-75}
          //       dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          //       renderRow={data =>
          //           <CardList
          //               title={ data.text }
          //               setDefaultCard={ this._setDefaultCard }
          //               defaultCard={ data.default }
          //           />
          //       }
          //       renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          //       <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}>
          //           <Icon active name="trash" />
          //       </Button>}
          //   />
          // </CustomBlockWrapper>

          <Container style={styles.containerScroll}>
            <CustomHeader title="결제카드관리" />

            <ScrollView>

              { this.state.data.map((card, index) => 
                <View 
                  key={index}
                  style={[styles.fx1, localStyles.regCardStyle, styles.mb20, styles.pd15]
                }>
                  <View style={[styles.fx1, styles.fxDirRow]}>
                    <View style={styles.fx1}>
                      <H3>{card.cardName}</H3>
                    </View>


                    {/* 여기부터!!! */}
                    <TouchableOpacity onPress={ () => this.deleteRow(card.billingKeyId, index)}>
                      <View style={[styles.fx1, styles.alignItemsEnd]}>
                        <Icon name="close"></Icon>
                      </View>
                    </TouchableOpacity>


                    
                  </View>
                  <View style={[styles.fx3, styles.justiConCenter]}>
                    <Image source={require('~/Common/Image/join-end.png')} style={{height:iconSize, width : iconSize}}/>
                  </View>
                  <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                    <Text>{card.cardNum}</Text>
                    <Text style={styles.greyFont}>COOLINIC</Text>
                  </View>
              </View>
              )
            }

              <View style={[styles.fx1, localStyles.newCardStyle, styles.pd15]}>
                <View style={styles.fx1}>
                  <H3>카드등록</H3>
                </View>
                <View style={[styles.fx3, styles.alignItemsCenter]}>
                  <Image source={require('~/Common/Image/join-end.png')} resizeMode='center'/>
                </View>
                <View style={[styles.fx1, styles.alignItemsEnd, styles.justiConEnd]}>
                  <Text style={styles.greyFont}>COOLINIC</Text>
                </View>
              </View>
              
            
          </ScrollView>
  
        </Container>
        );
    }
}

function wp (percentage, space) {
  const value = (percentage * (viewportWidth - space)) / 100;
  return Math.round(value);
}

const layoutCount = 3;
const cardHeight = (viewportHeight / layoutCount) * 0.8;

const iconSize = wp(14 ,60);

const localStyles = StyleSheet.create({
  regCardStyle : {
    height : cardHeight, 
    width : '100%',
    backgroundColor : color.defaultBackColor,
    borderColor : color.defaultColor,
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  },
  newCardStyle : {
    height : cardHeight, 
    width : '100%',
    borderColor : color.greyColor,
    borderTopWidth : 2,
    borderBottomWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderRadius : 5
  }
});

