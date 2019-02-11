import React, { Component } from 'react';
import { View, ListView  } from 'react-native';
import { Body, Button, Icon, Left, List, ListItem, Text } from 'native-base';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';
import GetCommonData from '~/Common/Functions/GetCommonData';

import DelCard from '~/FirstScreen/Functions/Card/DelCard';
import CardList from '~/FirstScreen/Components/Card/CardList';

const datas = [
    {text : 'Simon Mignolet', id : 1, defalut : false},
    {text : 'Nathaniel Clyne', id : 2, defalut : false},
    {text : 'Dejan Lovren', id : 3, defalut : false},
    {text : 'Mama Sakho', id : 4, defalut : true},
    {text : 'Alberto Moreno', id : 5, defalut : false},
    {text : 'Emre Can', id : 6, defalut : false},
    {text : 'Joe Allen', id : 7, defalut : false},
    {text : 'Phil Coutinho', id : 8, defalut : false}
];

let CARD_ID, SEC_ID, ROW_ID, ROW_MAP;
export default class ListCardInfo extends Component {
    constructor(props) {
        super(props);
    
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: datas,
        };
    }

    // 카드 row 삭제
    deleteRow(data, secId, rowId, rowMap) {
        CARD_ID = data.id;
        SEC_ID = secId;
        ROW_ID = rowId;
        ROW_MAP = rowMap;

        this._cardDelete();
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
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
          <CustomBlockWrapper
            title="카드 목록"
          >
            <List
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={data =>
                    <CardList
                        title={ data.text }
                        setDefaultCard={ this._setDefaultCard }
                        defaultCard={ data.default }
                    />
                }
                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}>
                    <Icon active name="trash" />
                </Button>}
            />
          </CustomBlockWrapper>
        );
    }
}

