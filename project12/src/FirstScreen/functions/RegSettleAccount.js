import { ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN, REFRESH_TOKEN } from '../../Common/Blend';
import GetAccessToken from '../../Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}coolinic/partners/account/info?`;

function RegSettleAccountUrl(bank, account) {
  return `${API_URL}
  bankCd=${bank.bankCode}
  &accountHolder=${account.name}
  &accountNum=${account.number}
  &managerNm=''
  &managerPhoneNum=''`;
}

const RegSettleAccount = (bank, account) => {
  console.log(RegSettleAccountUrl(bank, account))
  return fetch(RegSettleAccountUrl(bank, account), {
    method: 'POST',
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

export default RegSettleAccount;