import axios  from 'axios';
import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}iam/users/phonenum/`;

function ChkUrl(number) {
  return `${API_URL}${number}`;
}

async function CheckUsr(number) {
  try {
    const response = await axios.get(ChkUrl(number));
    return {
      code: response.data.resultCode,
      msg : response.data.resultMsg
    };
  } catch (error) {
    console.error(error);
  }

}
  // return fetch(ChkUrl(number), {method : 'get'})
  //   .then(response => response.json())
  //   .then(responseJSON => {
  //     return {
  //       code: responseJSON.resultCode,
  //       msg : responseJSON.resultMsg
  //     };
  //   })
  //   .catch(error => {
  //       console.error(error);
  //   })

export default CheckUsr;