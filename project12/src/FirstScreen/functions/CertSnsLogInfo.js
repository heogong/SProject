import { DEV_SNS_DOMAIN } from '../../Common/Blend';

const API_URL = `${DEV_SNS_DOMAIN}iam/users/checkExistBySnsUsrEmail`;

function CertSnsLogInfoUrl() {
  return `${API_URL}`;
}

const CertSnsLogInfo = (snsToken, snsCode) => {
  const formData = new URLSearchParams();

  formData.append('snsSiteCd', snsCode);
  formData.append('snsSiteAccessToken', snsToken);

  return fetch(CertSnsLogInfoUrl(), {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:  formData
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default CertSnsLogInfo;