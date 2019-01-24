import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

// AS 조치전/후 사진 등록
const BEFORE_API_URL = `${DOMAIN}coolinic/as/prgs/report/images/before`;
const AFTER_API_URL = `${DOMAIN}coolinic/as/prgs/report/images/after`;

function TakeAfterServiceImgUrl(isBefore) {
  return (isBefore) ? `${BEFORE_API_URL}` : `${AFTER_API_URL}`;
}

const TakeAfterServiceImg = async (isBefore, asPrgsId, imgUri) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  data.append('asPrgsId', asPrgsId);
  data.append('photo', {
    uri: imgUri,
    type: 'image/jpeg', // or photo.type
    name: imgUri
  });

  return fetch(TakeAfterServiceImgUrl(isBefore), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN
      "Content-Type": "multipart/form-data"
    },
    body: data
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

export default TakeAfterServiceImg;