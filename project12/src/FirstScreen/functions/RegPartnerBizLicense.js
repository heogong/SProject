import { AsyncStorage } from "react-native"
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/busiregcert/image`;

function RegPartnerBizLicenseUrl() {
  return `${API_URL}`;
}

const RegPartnerBizLicense = async (imgUri) => {
  // 토큰값 가져오기
  const ACCESS_TOKEN = `Bearer ${await AsyncStorage.getItem('AccessToken')}`; 

  const data = new FormData();

  console.log("imguri : ", imgUri);
  console.log("ACCESS_TOKEN : ", ACCESS_TOKEN);

  data.append('photo', {
    uri: imgUri,
    type: 'image/jpeg', // or photo.type
    name: imgUri
  });

  return fetch(RegPartnerBizLicenseUrl(), {
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

export default RegPartnerBizLicense;