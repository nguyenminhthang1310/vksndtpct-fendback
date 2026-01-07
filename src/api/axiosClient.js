import axios from "axios";

const api = axios.create({
  baseURL: "https://vksndtpct-fendback-be.onrender.com/api",
});

export default api;
