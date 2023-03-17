import { publicAxios } from "./axios.service";
//User realted api calls

//register new user

export const registerUser = (userData) => {
  return publicAxios.post(`/users`, userData).then((response) => {
    return response.data;
  });
};
