import { publicAxios } from "./axios.service";
//User realted api calls

//register new user

export const registerUser = (signUpData) => {
  return publicAxios.post(`/users`, signUpData).then((response) => {
    return response.data;
  });
};

// login user

export const loginUser = (loginData)=>{

  return publicAxios.post(`auth/login`,loginData)
  .then( (response) => response.data);

}