import  { useEffect, useState } from 'react'
import { privateAxios } from '../../services/axios.service';
import Swal from 'sweetalert2';

const useLoader = () => {

    const [loading, setLoading] = useState(false);

    
  useEffect(() => {
    // request Axios intercepter
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(() => true);
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // response Axios intercepet
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(() => false);

        return config;
      },
      (err) => {
        setLoading(() => false);
           if(err.code === "ERR_NETWORK"){
            Swal.fire("NetWork Error!","Backend Server is Down","info")
           }
        return Promise.reject(err);
      }
    );

    // publicAxios.interceptors.request.use(
    //   (config) => {
    //     setLoading(() => true);
    //     return config;
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );

    // // response Axios intercepet
    // publicAxios.interceptors.response.use(
    //   (config) => {
    //     setLoading(() => false);

    //     return config;
    //   },
    //   (err) => {
    //     return Promise.reject(err);
    //   }
    // );
  }, []);
  
  return loading;
}

export default useLoader