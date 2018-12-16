import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}/coolinic/clients/products/bplace/`;

function GetBizPlaceUrl(bizPlaceId) {
  return `${API_URL}${bizPlaceId}`;
}

const getBizList = (bizPlaceId) => {
  return fetch(GetBizPlaceUrl(bizPlaceId), {
    method: 'GET',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default getBizList;