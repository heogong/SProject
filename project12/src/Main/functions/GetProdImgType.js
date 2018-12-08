import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}/coolinic/products/types/2/imgcates`;

function GetProdImgTypeUrl() {
  return `${API_URL}`;
}

const getProdImgType = () => {
  return fetch(GetProdImgTypeUrl(), {
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

export default getProdImgType;