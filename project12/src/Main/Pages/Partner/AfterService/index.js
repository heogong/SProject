import React, { Component } from "react";
import { View } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';

import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState'
import GetCommonData from '~/Common/Functions/GetCommonData';

class AfterService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data : []
      };
    }

    componentWillMount() {
        this._getAfterServiceState();
    }

    // 현재 나의(업체) AS 진행 상태 체크
    _getAfterServiceState = () => {
        GetAfterServiceState().then(result => {
            GetCommonData(result, this._getAfterServiceState).then(async resultData => {
                if(resultData !== undefined) {
                    const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                    console.log(resultData);
                    if(ResultBool) {
                        //this.setState({ data: resultData.data });
                        if(resultData.data.asPrgsYn == 'Y') {
                            Actions.ViewAfterServiceState({
                                asRecvId : resultData.data.asPrgsMst.asRecvId,
                                asPrgsId : resultData.data.asPrgsMst.asPrgsId,
                                isProcess : false
                            });
                        } else {
                            Actions.AfterServiceMatch();
                        }
                    } else {
                        alert(resultData.resultMsg);
                    }
                }
            });
        });
    }

    render() {
        return (<View></View>)
    }
}


export default AfterService;