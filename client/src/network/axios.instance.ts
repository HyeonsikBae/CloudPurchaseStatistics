import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.intra.42.fr",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Mobile": "false",
  },
});

export default instance;
