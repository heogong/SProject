import React, { Component } from 'react';
import { View } from 'react-native';

import { SUCCESS_RETURN_CODE} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setIsAfterService } from '~/Redux/Actions';
import Spinner from 'react-native-loading-spinner-overlay';

import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

class AfterServiceState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {
    clearInterval(this.props.afterService.intervalId); // 탭 이동 시 Interval 클리어
  }

  componentDidMount() {
    this.setState({spinner : true});
    this._getClientAfterServiceState();
  }

  // 현재 나의(고객) AS 진행 상태 체크
  _getClientAfterServiceState = () => {
    GetClientAfterServiceState().then(async result => {
      GetCommonData(result, this._getClientAfterServiceState).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              
              if(ResultBool) {
                  if(resultData.data.asPrgsYn == 'Y') {
                    this.props.onSetIsAfterService(true);

                    setTimeout(() => {
                        Actions.ViewAfterServiceState();
                        this.setState({spinner : false});
                    }, 700);

                  } else {
                    setTimeout(() => {
                        Actions.AfterServiceHistory();
                        this.setState({spinner : false});
                    }, 700);
                  }
              } else {
                alert(resultData.resultMsg);
                this.setState({spinner : false});
              }
          }
      });
    });
  }

  render() {
    return (
        <View>
            {/* 로딩 */}
            <Spinner
                visible={this.state.spinner}
                textContent={'클라이언트 A/S 상태를 확인중입니다.'}
                style={{color: '#FFF'}}
            />
        </View>
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
      onSetIsAfterService: (value) => dispatch(setIsAfterService(value))
  }
}

AfterServiceState = connect(mapStateToProps, mapDispatchToProps)(AfterServiceState);
export default AfterServiceState;