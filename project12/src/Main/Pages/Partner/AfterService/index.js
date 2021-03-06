import React, { Component } from "react";
import { View } from 'react-native';

import { SUCCESS_RETURN_CODE } from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import ReactTimeout from 'react-timeout'

import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState'
import GetCommonData from '~/Common/Functions/GetCommonData';

import { styles } from '~/Common/Styles/common';
import { color } from "~/Common/Styles/colors";

class AfterService extends Component {
    constructor(props) {
      super(props);

      this.state = {
        spinner : false
      };
    }

    componentWillMount() {
        this.setState({spinner : true});
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

                        if(resultData.data.asPrgsYn == 'Y') {
                            setTimeout(() => {
                                Actions.ViewAfterServiceMatch({
                                    asRecvId : resultData.data.asPrgsMst.asRecvId,
                                    asPrgsId : resultData.data.asPrgsMst.asPrgsId
                                })
                                this.setState({spinner : false});
                            }, 700);
                        } else {
                            Actions.AfterServiceMatch();
                            this.setState({spinner : false});
                        }

                        // Actions.AfterServiceMatch();
                        // this.setState({spinner : false});
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
                    textContent={'파트너 A/S 상태를 확인중입니다.'}
                    textStyle={styles.whiteFont}
                    style={{color: color.whiteColor}}
                    overlayColor={"rgba(40, 200, 245, 1)"}
                />
            </View>
        )
    }
}
export default ReactTimeout(AfterService)