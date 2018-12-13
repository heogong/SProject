import { domain } from '../../Common/ApiDomain';

const API_URL = `${domain}/coolinic/clients/products/image`;


function RegProdImgUrl(photo, clientPrdId, prdImgCateId) {
  return `${API_URL}
  photo=${photo}
  &clientPrdId=${clientPrdId}
  &prdImgCateId=${prdImgCateId}
  `;
}

const regProdImg = (photo, clientPrdId, prdImgCateId) => {
  return fetch(RegProdImgUrl(photo, clientPrdId, prdImgCateId), {
    method: 'POST',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a",
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default regProdImg;