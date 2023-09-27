import axios from "axios";

const instance = axios.create({
  baseURL: "https://asaptaxi.ir/api/",
});

export default instance;
