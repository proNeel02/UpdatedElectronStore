//product related api calls

import { privateAxios } from './axios.service' 
export const addCategory=(category)=>{

return privateAxios.post(`/categories`,category)
.then((response) => response.data);
}

