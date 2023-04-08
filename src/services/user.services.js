import { privateAxios, publicAxios } from "./axios.service";
//User realted api calls

//register new user

export const registerUser = (signUpData) => {
  return publicAxios.post(`/users`, signUpData).then((response) => {
    return response.data;
  });
};

// login user

export const loginUser = (loginData) => {
  return publicAxios
    .post(`auth/login`, loginData)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  /// server call
  return publicAxios.get(`/users/${userId}`).then((response) => {
    return response.data;
  });
};

//updating data of user inside data base
export const modifyUserData = (updateUserData) => {
  return privateAxios
    .put(`/users/${updateUserData.userId}`, updateUserData)
    .then((response) => {
      return response.data;
    });
};

export const getAllUsers = (pageNumber, pageSize, sortBy, sortDir) => {
  return privateAxios
    .get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

// update user profile picture

// export const updateUserProfilePicture = (file, userId)=>{

//   if(file === null){
//     return;
//   }

//    const data = new FormData();
//    data.append("userImage", file);

//   return privateAxios.post(`/users/image/${userId}`,data)
//   .then((response)=> response.data);
// }
