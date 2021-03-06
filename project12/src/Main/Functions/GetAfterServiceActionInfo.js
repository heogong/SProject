import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// AS 조지전/후 정보 조회
const BEFORE_API_URL = `${DOMAIN}coolinic/as/prgs/report/action/before/me?asPrgsId=`;
const AFTER_API_URL = `${DOMAIN}coolinic/as/prgs/report/action/after/me?asPrgsId=`;

function GetAfterServiceActionInfoUrl(isBefore, asPrgsId) {
  return (isBefore) ? `${BEFORE_API_URL}${asPrgsId}` : `${AFTER_API_URL}${asPrgsId}`;
}

const GetAfterServiceActionInfo = async (isBefore, asPrgsId) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  console.log(GetAfterServiceActionInfoUrl(isBefore, asPrgsId));
  return fetch(GetAfterServiceActionInfoUrl(isBefore, asPrgsId), {
    method: 'GET',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN
    }
  }).then((response) => response.json()).then(async (responseJson) => {
    // 액세스 토큰 만료
    if(responseJson.error == INVAILD_TOKEN) {
      await GetAccessToken();
      return REFRESH_TOKEN;
    } else {
      return responseJson;
    }
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default GetAfterServiceActionInfo;