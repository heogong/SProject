import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/clients/products/image`;

function RegProdImgUrl() {
  return `${API_URL}`;
}

const regProdImg = (imgUri, clientPrdId, prdImgCateId) => {
  console.log(imgUri, " // ", clientPrdId, " // ", prdImgCateId);

  const data = new FormData();

  data.append('clientPrdId', clientPrdId); // you can append anyone.
  data.append('prdImgCateId', prdImgCateId); // you can append anyone.
  data.append('photo', {
    uri: imgUri,
    type: 'image/jpeg', // or photo.type
    name: imgUri
  });

  console.log("data " ,data);
  
  return fetch(RegProdImgUrl(), {
    method: 'POST',
    body:  data,
    headers: {
      "Authorization": ACCESS_TOKEN,
      "Content-Type": "multipart/form-data",
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

export default regProdImg;