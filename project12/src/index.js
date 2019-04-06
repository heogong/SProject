import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';

import { SUCCESS_RETURN_CODE, PARTNER_USER, ARRIVE} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setBizId, setIsAfterService } from '~/Redux/Actions';

import GetPartnerInfo from '~/Main/Functions/GetPartnerInfo';
import GetPartnerInputState from '~/Main/Functions/GetPartnerInputState';
import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';


import { styles } from '~/Common/Styles/common';

class IntroPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          data : []
        }
    }
    
    async componentDidMount() {
      try {
          const AccessToken = await AsyncStorage.getItem('AccessToken');
          const RefreshToken = await AsyncStorage.getItem('RefreshToken');

          console.log("AccessToken : "+AccessToken);
          if (AccessToken !== null) {
            this._getUserInfo();
          } else {
            Actions.InitPage();
          }
      } catch (error) {
          console.log(error);
      }
  }

  // 로그인 사용자 정보 조회
  _getUserInfo = () => {
    GetUserInfo().then(result => {
      GetCommonData(result, this._getUserInfo).then(async resultData => {
        if(resultData !== undefined) {
          const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
          console.log(resultData);
          if(ResultBool) {

            // 사용자 구분 페이지 이동
            if(resultData.data.usrTypeCd == PARTNER_USER) {
              // this._getAfterServiceState(); // 파트너 메인 에서 체크로 인해 주석 처리
              this._getPartnerInfo(); // 파트너 정보 조회를 통한 현재 상태 체크 (가입시 필수값 여부 체크)
            } else {
              this._getClientAfterServiceState(); // 클라이언트
            }
            
          } else {
            alert(resultData.resultMsg);
          }
        }
      });
    });
  }

  // 1. 업체 정보를 조회(승인여부)
  _getPartnerInfo = () => {
    GetPartnerInfo().then(async result => {
        GetCommonData(result, this._getPartnerInfo).then(async resultData => {
            if(resultData !== undefined) {
                console.log('_getPartnerInfo - ', resultData);
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인

                if(ResultBool) {
                  if(resultData.data == null) {
                    this._getPartnerInputState();
                  } else {
                    Actions.PartnerMain(); // 메인
                  }
                    
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


  
  // 업체 정보 등록 상태 조회
  _getPartnerInputState = () => {
    GetPartnerInputState().then(result => {
        GetCommonData(result, this._getPartnerInputState).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                if(ResultBool) {
                  console.log('업체 정보 등록 상태 조회1 : ',resultData.data);

                  const checkPage = [
                    [{'value' : resultData.data.partnerBusiCertYn}, {'action' : 'JoinInputBizLicense'}], 
                    [{'value' : resultData.data.partnerAccountYn}, {'action' : 'JoinInputSettleAccount'}], 
                    [{'value' : resultData.data.partnerHandleYn}, {'action' : 'JoinInputWorkHours'}], 
                    [{'value' : resultData.data.partnerWorkTimeYn}, {'action' : 'JoinInputWorkHours'}]
                  ];

                  const resultVaildPage = checkPage.filter((page) => page[0].value !== 'Y');

                  // console.log('업체 정보 등록 상태 조회2 : ',resultVaildPage);

                  if(resultVaildPage.length > 0) {
                    Actions[resultVaildPage[0][1].action].call();
                  } else {
                    Actions.PartnerMain(); // 메인
                  }

                } else {
                    alert(resultData.resultMsg);
                }
            }
        });
    });
  } 



  // 현재 나의(파트너) AS 진행 상태 체크
  _getAfterServiceState = () => {
    GetAfterServiceState().then(result => {
        GetCommonData(result, this._getAfterServiceState).then(async resultData => {
            if(resultData !== undefined) {
                const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
                console.log(resultData);
                if(ResultBool) {
                    //this.setState({ data: resultData.data });
                    if(resultData.data.asPrgsYn == 'Y') {

                      if(resultData.data.asPrgsMst.asPrgsStatCd == ARRIVE.VALUE) {
                        // 조치전 페이지 이동
                      }
                    } else {
                      Actions.PartnerMain();
                    }
                } else {
                    alert(resultData.resultMsg);
                }
            }
        });
    });
  } 

  // 현재 나의(클라이언트) AS 진행 상태 체크
  _getClientAfterServiceState = () => {
    GetClientAfterServiceState().then(async result => {
      GetCommonData(result, this._getClientAfterServiceState).then(async resultData => {
          if(resultData !== undefined) {
              const ResultBool = await (resultData.resultCode == SUCCESS_RETURN_CODE) ? true : false; // API 결과 여부 확인
              console.log(resultData);
              
              if(ResultBool) {
                if(resultData.data.asPrgsMst !== null) {
                  this.props.onSetIsAfterService(true);
                }
                Actions.ClientMain();
              } else {
                alert(resultData.resultMsg);
              }
          }
      });
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.fx1}>
          <View style={[styles.fx1, styles.alignItemsCenter, styles.justiConCenter]}>
            <Image source={require('~/Common/Image/intro-logo.png')} resizeMode='contain' style={{width : 132, flex: 15}} />
            <Text style={localStyles.versionTxt}>Coolonic Ver. 1.00</Text>
          </View>
        </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
    versionTxt: {
    fontSize: 14,
    color: '#1e1e32',
    flex: 1
  }
});


let mapDispatchToProps = (dispatch) => {
  return {
      onSetBizId: (value) => dispatch(setBizId(value)),
      onSetIsAfterService: (value) => dispatch(setIsAfterService(value))
  }
}
IntroPage = connect(undefined, mapDispatchToProps)(IntroPage);
export default IntroPage;