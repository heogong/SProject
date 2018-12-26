import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/payment/cards/`;

function SetDefaultCardUrl(cardId) {
  return `${API_URL}${cardId}/default`;
}

const SetDefaultCard = async (cardId) => {
  console.log(SetDefaultCardUrl(cardId));
  return fetch(SetDefaultCardUrl(cardId), {
    method : 'PUT',
    headers: {
      "Authorization": ACCESS_TOKEN
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

export default SetDefaultCard;