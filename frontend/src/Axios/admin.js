import axios from "axios";

export const Axios =  axios.create({
    baseURL: "https://takecareofficial.online/admin",
    withCredentials:true
  });