
const API_URL2 = 'http://52.79.226.14:8180/iam/users/client?';

function SignUpUrl(sendId, number) {
  return `${API_URL2}usrId=${sendId}&usrPwd=test&usrPhoneNum=${sendId}&snsSignupYn=Y`;
}

let SignUp = (USER) => {
    console.log("signUP : ", USER);

    return fetch(SignUpUrl(sendId, number), {method : 'post'})
    .then(response => response.json())
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

export default SignUp;