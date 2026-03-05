import axios from "axios";

// const baseURL =  
//   import.meta.env.VITE_MODE === 'developement'
//     ? "http://localhost:5000/api"
//     : "/api";
const baseURL = "http://localhost:5000/api";
console.log("Base URL:", baseURL);
export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
