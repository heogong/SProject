import React, { Component } from 'react';
import { AsyncStorage, BackHandler } from "react-native"

import { SUCCESS_RETURN_CODE } from '../../../Common/Blend';
import { 
    Body,
    Button,
    Card,
    CardItem,
    Container, 
    Content,
    Text,
    List,
    ListItem,
    Left,
    Right,
    Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId } from '../../../Redux/Actions';

import GetBizList from '../../Functions/GetBizList';
import GetBizPlace from '../../Functions/GetBizPlace';
import GetCommonData from '../../../Common/Functions/GetCommonData';

class ListBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data: [],
        };
    }

    componentDidMount() {
        this._getBizList();
        // 물리버튼 뒤로가기 제어
        //BackHandler.addEventListener('hardwareBackPress', () => this._handleBackPress) // Listen for the hardware back button on Android to be pressed
    }

    // 물리버튼 뒤로가기 제어
    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => this._handleBackPress) // Remove listener
    }

    _handleBackPress = () => {
        return false;
    }

    // 사업장 목록 가져오기
    _getBizList = () => {
        GetBizList().then(async result => {
            GetCommonData(result, this._getBizList).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    if(ResultBool) {
                        this.setState({data : resultData.data});
                    }
                }
            });
        });
    }

    // 디폴트 리스트 
    _renderListItem = (item) => (
        <ListItem onPress={() => this._onPress(item.clientBplaceId)}>
            <Left>
                <Body>
                    <Text>{item.bplaceNm}</Text>
                    <Text note>{item.bplaceDsc}</Text>
                </Body>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem>
    );

    // 카드 리스트
    _renderCardItem = (item) => (
        <Card>
            <CardItem header bordered button onPress={() => this._onPress(item.clientBplaceId)}>
                <Text>{item.bplaceNm}</Text>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text note>{item.bplaceDsc}</Text>
                </Body>
            </CardItem>
        </Card>
    );
    
    // 사업장 수정시 참고
    // _onPress = (bizPlaceId) => {
    //     GetBizPlace(bizPlaceId).then(result => {
    //         console.log(result);
    //         Actions.RegBusinessPlace({bizPlace : result.data});
    //         //this.setState({data : result.data});
    //     });
    // }

    _onPress = (bizPlaceId) => {
        this.props.onSetBizId(bizPlaceId); // 사업장 ID 리덕스 SET
        Actions.InputProdType({bizPlaceId : bizPlaceId});
    }

    // 임시 로그아웃
    removeItemValue = async () => {
        try {
          await AsyncStorage.removeItem("AccessToken");
          await AsyncStorage.removeItem("RefreshToken");

          Actions.InitPage();
          return true;
        }
        catch(exception) {
          return false;
        }
    }

    
    render() {
        return (
            <Container>
                <Content padder>
                    <Button onPress={ this.removeItemValue }><Text>로그아웃</Text></Button>
                    <List dataArray={this.state.data} renderRow={this._renderCardItem} />
                </Content>
            </Container>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSetBizId: (value) => dispatch(setBizId(value))
    }
}
  
ListBusinessPlace = connect(undefined, mapDispatchToProps)(ListBusinessPlace);

export default ListBusinessPlace;