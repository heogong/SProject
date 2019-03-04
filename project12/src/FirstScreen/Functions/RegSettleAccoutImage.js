import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/account/image`;

function RegSettleAccoutImageUrl() {
  return `${API_URL}`;
}

const RegSettleAccoutImage = async (imgUri) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  data.append('photo', {
    uri: imgUri,
    type: 'image/jpeg', // or photo.type
    name: imgUri
  });

  return fetch(RegSettleAccoutImageUrl(), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN,
      //"Authorization": TEST_ACCESS_TOKEN,
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

export default RegSettleAccoutImage;