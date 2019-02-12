import React, { Component } from 'react';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId } from '~/Redux/Actions';

import GetBizList from '~/Main/Functions/GetBizList';
import GetCommonData from '~/Common/Functions/GetCommonData';
import CustomBlockWrapper from '~/Common/Components/CustomBlockWrapper';
import BusinessCard from '~/Main/Components/BusinessCard';

class ListBusinessPlace extends Component {
    constructor(props) {
      super(props);

      this.state = {
          data: [],
        };
    }

    componentWillMount() {
      clearInterval(this.props.afterService.intervalId); // 탭 이동 시 Interval 클리어
    }

    componentDidMount () {
      this._getBizList();
    }
    
    // 사업장 목록 가져오기
    _getBizList = () => {
      GetBizList().then(async result => {
          GetCommonData(result, this._getBizList).then(async resultData => {
              if(resultData !== undefined) {
                  const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                  //console.log(resultData);
                  if(ResultBool) {
                    this.setState({data : resultData.data});
                  } else {
                    alert(resultData.resultMsg);
                  }
              }
          });
      });
    }

    // 제품 리스트 페이지 이동
    _nextProdPage = (bizId) => () => {
      this.props.onSetBizId(bizId);  // 리덕스 사업장 ID SET
      Actions.ListBusinessProductType({bizId : bizId});
    }

    // 사업장 수정 페이지 이동
    _onEditPress = (bizId) => () => {
      this.props.onSetBizId(bizId);  // 리덕스 사업장 ID SET
      Actions.RegBusinessPlace({editBiz : true});
    }
    
    render() {
        return (
          <CustomBlockWrapper
            title="사업장 선택"
            padderLeftSize={ 15 }
            padderRightSize={ 15 }
          >
            {this.state.data.map((business, idx) =>
              <BusinessCard
                key={idx}
                index={idx}
                businessName={business.bplaceNm}
                address1={business.addr.addressName}
                address2={business.detail.detailAddr1}
                btnAction={this._nextProdPage(business.clientBplaceId)}
                btnEditAction={this._onEditPress(business.clientBplaceId)}
                editDel={ true }
              />
            )}
            <BusinessCard
              btnAction={Actions.RegBusinessPlace}
            />
          </CustomBlockWrapper>
        )
    }
}

let mapStateToProps = (state) => {
  return {
      afterService: state.AFTERSERVICE
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSetBizId: (value) => dispatch(setBizId(value))
  }
}

ListBusinessPlace = connect(mapStateToProps, mapDispatchToProps)(ListBusinessPlace);
export default ListBusinessPlace;