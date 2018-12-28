import { DEV_SNS_DOMAIN } from '../../Common/Blend';

const API_URL = `${DEV_SNS_DOMAIN}iam/users/checkExistBySnsUsrId`;

function CertSnsLogInfoUrl() {
  return `${API_URL}`;
}

const CertSnsLogInfo = (snsToken, snsCode) => {
  const data = new FormData();

  data.append('snsSiteCd', snsCode);
  data.append('snsSiteAccessToken', snsToken);

  return fetch(CertSnsLogInfoUrl(), {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: data
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('login err');
    console.log(err);
  });
};

export default CertSnsLogInfo;