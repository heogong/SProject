import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/clients/products/masters`;

function RegProdInfoUrl(bizId, prodTypeId, prodObj) {
  // return `${API_URL}clientBplaceId=${bizId}&prdTypeId=${prodTypeId}&masters=${prodObj}`;
  return `${API_URL}`;
}

const regProdInfo = (bizId, prodTypeId, prodObj) => {
  
  const data = new FormData();

  let aa = new Array();

  console.log(JSON.stringify(data))

  prodObj.forEach((item) => {
    aa.concat("clientPrdNm", item.clientPrdNm);
  });


  console.log(aa);

  return fetch(RegProdInfoUrl(bizId, prodTypeId, prodObj), {
    method: 'POST',
    headers: {
      "Authorization": ACCESS_TOKEN,
      "Content-Type" :"application/json"
    },
    body: JSON.stringify({
      prodObj,
      "clientBplaceId": bizId,
      "prdTypeId": prodTypeId,
    })
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