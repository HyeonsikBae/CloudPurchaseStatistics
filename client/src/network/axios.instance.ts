import axios from "axios";

export const instance42 = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_FR,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Mobile": "false",
  },
});

export const instance24hane = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_24HANE,
  headers: {
    Authorization: `Bearer ${
      import.meta.env.VITE_REACT_APP_24HANE_ACCESS_TOKEN
    }`,
    "Access-Control-Allow-Origin":
      "https://api.24hoursarenotenough.42seoul.kr/",
  },
});
