import axios from "axios";
import cheerio from "cheerio";
import { getCookie } from "../utils/cookie";
import { IPurchase } from "../types/IPurchase.type";
import parsePurchaseData from "../utils/parse";
import { instance42 } from "./axios.instance";

export const getToken = async (): Promise<any> => {
  try {
    const params = {
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_REACT_APP_UID,
      client_secret: import.meta.env.VITE_REACT_APP_SECRET,
      code: getCookie(`code`),
      redirect_uri: "http://localhost:4000/main",
    };
    const response = await instance42.post(`/oauth/token`, {}, { params });
    return response.data.access_token;
  } catch (e) {
    throw new Error();
  }
};

export const getTokenInfo = async (): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${getCookie("access_token")}`,
  };
  try {
    const response = await instance42.get(`/oauth/token/info`, {
      headers: { Authorization: headers.Authorization },
    });
    return response;
  } catch (e) {
    throw new Error();
  }
};

export const getDatas = async (year: number): Promise<any> => {
  const url = import.meta.env.VITE_REACT_APP_CLOUD_DB;
  const dataArr: string[] = [];
  let rtn: IPurchase[] = [];
  await axios
    .get(url)
    .then((html) => {
      const $ = cheerio.load(html.data);
      $("table.table")
        .find("tbody")
        .find("tr")
        .each((i, el) => {
          dataArr.push(
            $(el)
              .text()
              .replace(/\n/g, "")
              .replace(/- [0-9]+/g, "")
              .replace(/ +/g, " ")
          );
        });
      rtn = parsePurchaseData(dataArr, year);
    })
    .catch((e) => console.error(e));
  return rtn;
};

export const getEvents = async (year: number): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${getCookie("access_token")}`,
  };
  try {
    const rtn: any[] = [];
    let index = 1;
    let length = 100;
    while (length === 100) {
      const response = await instance42.get(`/v2/campus/29/events`, {
        params: {
          "range[begin_at]": `${year}-01-01, ${year}-12-31`,
          "page[size]": 100,
          "page[number]": index++,
        },
        headers: { Authorization: headers.Authorization },
      });
      length = response.data.length;
      for (let i = 0; i < length; i += 1) rtn.push(response.data[i]);
    }
    return rtn;
  } catch (e) {
    throw new Error();
  }
};
