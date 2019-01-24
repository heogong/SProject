import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// AS 조치전/후 사진 삭제
const BEFORE_API_URL = `${DOMAIN}coolinic/as/prgs/report/images/before?`;
const AFTER_API_URL = `${DOMAIN}coolinic/as/prgs/report/images/after?`;

function DelAfterServiceImgUrl(isBefore, imgId, asPrgsId) {
  let API_URL = (isBefore) ? `${BEFORE_API_URL}`: `${AFTER_API_URL}`;

  return `${API_URL}imgId=${imgId}&asPrgsId=${asPrgsId}`;
}

const DelAfterServiceImg = async (isBefore, imgId, asPrgsId) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  return fetch(DelAfterServiceImgUrl(isBefore, imgId, asPrgsId), {
    method: 'DELETE',
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

export default DelAfterServiceImg;