import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/busiregcert/image`;

function RegPartnerBizLicenseUrl() {
  return `${API_URL}`;
}

const RegPartnerBizLicense = (imgUri) => {
  const data = new FormData();

  data.append('photo', {
    uri: imgUri.uri,
    type: 'image/jpeg', // or photo.type
    name: imgUri.uri
  });

  return fetch(RegPartnerBizLicenseUrl(), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN
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