import { useEffect, useState } from "react";
import { privateAxios, publicAxios } from "../../services/axios.service";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

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
        // console.log("err => ",err);
        if (err.code === "ERR_BAD_RESPONSE") {
          Swal.fire(
            "NetWork Error!",
            "Backend Server is Down Please try Later!",
            "info"
          );
        }
        return Promise.reject(err);
      }
    );

    publicAxios.interceptors.request.use(
      (config) => {
        setLoading(() => true);
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // response Axios intercepet
    publicAxios.interceptors.response.use(
      (config) => {
        setLoading(() => false);
        return config;
      },
      (err) => {
        setLoading(() => false);
        if (err.code === "ERR_NETWORK") {
          Swal.fire(
            "NetWork Error!",
            "Backend Server is Under Maintainance!",
            "info"
          );
        }

        return Promise.reject(err);
      }
    );
  }, []);

  return loading;
};

export default useLoader;
