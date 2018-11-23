import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}coolinic/payment/card?`;

function CardRegUrl(CARD) {
  return `${API_URL}cardNumner=${CARD.cardNumber}&expiry=${CARD.vaildTerm}&birth=${CARD.birthDay}&pwd2digit=${CARD.passwd}`;
}

let CardReg = (CARD) => {
  return fetch(CardRegUrl(CARD), {
    method : 'post',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
    }
  }).then(response => response.json())
    .then(responseJSON => {
      return {
        code: responseJSON.resultCode,
        msg : responseJSON.resultMsg
      };
    })
    .catch(error => {
        console.error(error);
    })
}

export default CardReg;