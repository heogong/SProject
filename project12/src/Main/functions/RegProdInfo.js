import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/clients/products/masters?`;

function RegProdInfoUrl() {
  return `${API_URL}`;
}

const regProdInfo = (bizId, prodTypeId, prodObj) => {

  console.log(prodObj);

  let details = {
    'clientBplaceId': bizId,
    'prdTypeId': prodTypeId,
    'masters': JSON.stringify(prodObj)
  };

  let formBody = [];

  for (let property in details) {
      //let encodedKey = encodeURIComponent(property);
      //let encodedValue = encodeURIComponent(details[property]);
      let encodedKey = property;
      let encodedValue = details[property];
      formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");
  console.log(formBody);

  console.log(RegProdInfoUrl());

  return fetch(RegProdInfoUrl(), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN,
      "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formBody
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

export default regProdInfo;