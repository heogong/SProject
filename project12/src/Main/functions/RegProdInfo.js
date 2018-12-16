import { DOMAIN } from '../../Common/Blend';

const API_URL = `${DOMAIN}/coolinic/clients/products/masters?`;

function RegProdInfoUrl(bizObj, prodTypeId, prodObj) {
  return `${API_URL}
  clientBplaceId=${bizObj.bizId}
  &prdTypeId=${prodTypeId}
  &masters=${prodObj}
  `;
}

const regProdInfo = (bizObj, prodTypeId, prodObj) => {
  return fetch(RegProdInfoUrl(bizObj, prodTypeId, prodObj), {
    method: 'POST',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a",
      "Content-Type" : "application/x-www-form-urlencoded"
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default regProdInfo;