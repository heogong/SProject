import axios  from 'axios';

const API_URL = 'http://52.79.226.14:8180/iam/users/checkExist/';

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