import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import { SUCCESS_RETURN_CODE, PARTNER_USER} from '~/Common/Blend';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setIsAfterService } from '~/Redux/Actions';

import GetUserInfo from '~/FirstScreen/Functions/GetUserInfo';
import GetAfterServiceState from '~/Main/Functions/GetAfterServiceState';
import GetClientAfterServiceState from '~/Main/Functions/GetClientAfterServiceState';
import GetCommonData from '~/Common/Functions/GetCommonData';

class IntroPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            logo : 'https://post-phinf.pstatic.net/MjAxNzA5MTJfNTUg/MDAxNTA1MjAwMjMwOTY1.r-hkjFV9Hk_35hyO7hyy5dbGS1vJefzbzhJ_-dNsHWcg.QvI6TK8CYLHnwxilPutQgVzAbElzCvkl0oDWUFiD1Agg.JPEG/image_3359637611505200203003.jpg?type=w1200'
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
              // this._getAfterServiceState(); // 파트너 - 파트너 index 에서 체크로 인해 주석 처리
              Actions.PartnerMain(); // 파트너
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
                      Actions.PartnerAfterService();
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
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.avatar} source={{uri : this.state.logo}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    avatar: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
});


let mapDispatchToProps = (dispatch) => {
  return {
      onSetIsAfterService: (value) => dispatch(setIsAfterService(value))
  }
}
IntroPage = connect(undefined, mapDispatchToProps)(IntroPage);
export default IntroPage;