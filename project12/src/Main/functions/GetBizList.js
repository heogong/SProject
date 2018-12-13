import { domain } from '../../Common/ApiDomain';

const API_URL = `${domain}/coolinic/clients/products/bplaces/me`;

function GetBizListUrl() {
  return `${API_URL}`;
}

const getBizList = () => {
  return fetch(GetBizListUrl(), {
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