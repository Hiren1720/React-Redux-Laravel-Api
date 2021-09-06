import axios from "axios";

// axios.interceptors.request.use(
//     request =>{

//             request.headers['Content-Type'] = "multipart/form-data";
//             return request;
//     },
//     error=>{
//         return Promise.reject(error);
//     }
// )

// axios.interceptors.response.use(
//     response => {

//     }
// )
const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export { axios, setToken };
