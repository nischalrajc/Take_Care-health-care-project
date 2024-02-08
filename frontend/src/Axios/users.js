import axios from "axios";
// const baseURL = `http://localhost:5000`

export const Axios =  axios.create({
    baseURL: "http://localhost:5000"
  });