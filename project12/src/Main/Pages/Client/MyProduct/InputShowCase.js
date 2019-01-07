import React, { Component } from "react";
import { Alert, StyleSheet, ImageBackground, View, scrollToEnd } from 'react-native';
import { Button, Container,  Footer, Text } from "native-base";

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GetCommonData from '~/Common/Functions/GetCommonData';
import GetProdImageType from '~/Main/Functions/GetProdImgType'
import RegProductMst from '~/Main/Functions/RegProductMst'
import DelProductMst from '~/Main/Functions/DelProductMst'
import CopyProductMst from '~/Main/Functions/CopyProductMst'
import ProductShowCase from '~/Main/Components/ProductShowCase'

import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import CustomButton from '~/Common/Components/CustomButton';

let DEL_IDX = null; // 제품 삭제 인덱스
let CLIENT_PRODUCT_ID = null; // 제품 복제 아이디
class InputShowCase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        defaultImg : "https://i.pinimg.com/originals/b8/29/fd/b829fd8f5df3e09589575e4ca939bc9f.png",
        data : [], // 첫번째 SHOW CASE 이미지 데이터
        addData : [], // 추가 SHOW CASE 이미지 데이터
        copyData : [], // 복제 SHOW CASE 이미지 데이터
        newShowCase: [{
            clientPrdId : null,
            clientPrdNm : null,
            clientPrdImgId : null
        }], // 추가/복제 SHOW CASE
        clientPrdArray : [], //추가/복제 제품아이디 (뒤로가기 버튼 시 제품 한번에 삭제)
        btnAddAction : true // 추가/복제 여부
      };
    }

    componentWillMount(){
        this._drawProductImageType();
    }

    componentDidMount() {
        this._regProductMst();
    }

    // 제품 이미지 타입 가져오기
    _drawProductImageType = () => {
        GetProdImageType(this.props.prodTypeId).then(result => {
        //GetProdImageType(2).then(result => {
            GetCommonData(result, this._drawProductImageType).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({data : resultData.data});
                    }
                }
            });
        });
    }

    // 제품 마스터 초기 등록 
    _regProductMst = () => {
        RegProductMst(this.props.value.bizId, this.props.prodTypeId).then(result => {
            GetCommonData(result, this._regProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        
                        const newData = this.state.data.map((prodImgType, idx) => {
                            return { ...prodImgType, clientPrdId: resultData.data.clientPrdId, fileUrl : null };
                        });

                        // 제품 아이디 array 추가
                        this.setState({
                            clientPrdArray : this.state.clientPrdArray.concat([{
                                clientPrdId : resultData.data.clientPrdId
                            }])
                        })

                        // 화면 로드 시 초기 생성된 카드 clientPrdId 세팅
                        if(this.state.newShowCase.length == 0 ) {
                            this.setState({ 
                                data: newData
                            });
                        } else {
                            // showCase 추가 후 마지막 배열에 clientPrdId 세팅
                            const addClientPrdShowCase = this.state.newShowCase.map((showCase, sidx) => {
                                return (sidx == this.state.newShowCase.length - 1) ? { ...showCase, clientPrdId: resultData.data.clientPrdId } : showCase;
                            });

                            this.setState({
                                addData: newData,
                                newShowCase: addClientPrdShowCase
                            });
                        }
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 복제
    _copyProductMst = () => {
        CopyProductMst(CLIENT_PRODUCT_ID).then(result => {
            GetCommonData(result, this._copyProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {

                        this.setState({ 
                            btnAddAction : false,
                            newShowCase: this.state.newShowCase.concat([{ 
                                clientPrdId : resultData.data.clientPrdId,
                                clientPrdNm : resultData.data.clientPrdNm
                            }]),
                            //defaultImg : "http://img.asiatoday.co.kr/file/2018y/03m/19d/20180319001047295_1521424194_1.jpg?1521424194"
                            copyData :  resultData.data.images,
                            clientPrdArray : this.state.clientPrdArray.concat([{
                                clientPrdId : resultData.data.clientPrdId
                            }])
                        });

                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 삭제
    _delProductMst = () => {
        DelProductMst(this.state.newShowCase[DEL_IDX].clientPrdId).then(result => {
            GetCommonData(result, this._delProductMst).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({ 
                            newShowCase: this.state.newShowCase.filter((s, sidx) => DEL_IDX !== sidx),
                            clientPrdArray : this.state.clientPrdArray.filter((s, sidx) => DEL_IDX !== sidx),
                        })
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    // 제품 array 삭제(등록된 제품 뒤로가기 시 한번에 삭제)
    _delArrayProductMst = async () => {
        await this.state.clientPrdArray.map((client) => {
            DelProductMst(client.clientPrdId).then(result => {
                GetCommonData(result, this._delArrayProductMst).then(async resultData => {
                    if(resultData !== undefined) {
                        const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                        if(!ResultBool) {
                            alert(resultData.resultMsg);
                        }
                    }
                });
            });
        });
        await Actions.pop();
    }

   // showCase 카드 추가
   _handleAddShowCase = () => {
        this.setState({
            btnAddAction : true,
            newShowCase: this.state.newShowCase.concat([{
                clientPrdId : null, 
                clientPrdNm : null,
                clientPrdImgId : null
            }])
        });

        this._regProductMst();
       //this.showCase.scrollToEnd();
    }

    // showCase 카드 복사
    _handleCopyShowCase = (idx) => () => {
        CLIENT_PRODUCT_ID = this.state.newShowCase[idx].clientPrdId;
        this._copyProductMst();
    }

     // showCase 카드 제거
    _handleRemoveShowCase = (idx) => () => {
        Alert.alert(
            '',
            '삭제 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: '네', onPress: () => {
                DEL_IDX = idx;
                this._delProductMst();
                }
              },
            ],
            { cancelable: false }
        )
    }

    _nextButton = () => {
        Alert.alert(
            '',
            '등록되지 않은 이미지는 어딘가에서 등록 가능 \ 제품을 추가 등록 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => Actions.ClientMain() },
              {text: '네', onPress: () => Actions.InputProdType() },
            ],
            { cancelable: false }
        )
    }

    // 뒤로 가기 버튼 클릭 시 등록된 제품 모두 삭제 하기 위함
    _handleBackAction = () => {
        Alert.alert(
            '',
            '제품 등록을 취소 하시겠습니까?',
            [
              // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: '아니오', onPress: () => console.log('cancle') },
              {text: '네', onPress: () => this._delArrayProductMst() },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <Container>
                <CustomBlockWrapper
                    title="제품 등록"
                    customAction={this._handleBackAction}
                >
                    {this.state.newShowCase.map((showCase, idx) =>(
                        <ProductShowCase
                            defaultImg={ this.state.defaultImg }
                            data={ (this.state.btnAddAction) ? this.state.addData : this.state.copyData }
                            clientPrdId={ showCase.clientPrdId }
                            clientPrdNm={ showCase.clientPrdNm } 
                            clientPrdImgId={ showCase.clientPrdImgId } 
                            handleCopyShowCase={ this._handleCopyShowCase }
                            handleRemoveShowCase={ this._handleRemoveShowCase }
                            index={ idx }
                        />
                    ))}
                </CustomBlockWrapper>

                <Footer>
                    <Button onPress={ this._handleAddShowCase }>
                        <Text>추가</Text>
                    </Button>
                    <Button onPress={ this._nextButton }>
                        <Text>등록완료</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        value: state.BIZ
    };
}

InputShowCase = connect(mapStateToProps, undefined)(InputShowCase);
export default InputShowCase;