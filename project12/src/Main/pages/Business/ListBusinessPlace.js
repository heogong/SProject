import React, { Component } from 'react';
import { AsyncStorage, BackHandler } from "react-native"

import { 
    Body,
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
import GetBizList from '../../Functions/GetBizList';
import GetBizPlace from '../../Functions/GetBizPlace';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { setBizId } from '../../../Redux/Actions';

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
        BackHandler.addEventListener('hardwareBackPress', () => this._handleBackPress) // Listen for the hardware back button on Android to be pressed
    }

    // 물리버튼 뒤로가기 제어
    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', () => this._handleBackPress) // Remove listener
    }

    componentWillReceiveProps () {
        this._getBizList();
    }

    _handleBackPress = () => {
        return false;
    }

    // 사업장 목록 가져오기
    _getBizList = async ()  => {
        const AccessToken = await AsyncStorage.getItem('AccessToken');

        GetBizList(AccessToken).then(result => {
            this.setState({data : result.data});
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
        this.props.onSetBizId(bizPlaceId)
        Actions.InputProdType({bizPlaceId : bizPlaceId});
    }
    
    render() {
        return (
            <Container>
                <Content padder>
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