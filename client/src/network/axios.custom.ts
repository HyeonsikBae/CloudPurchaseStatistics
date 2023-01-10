import axios from "axios";
import cheerio from "cheerio";
import { getCookie } from "../components/utils/cookie";
import { IPurchase } from "../types/IPurchase.type";
import convertDate from "../utils/convertDate";
import instance from "./axios.instance";

export const getToken = async () => {
  try {
    console.log(`start get token..`);
    const params = {
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_REACT_APP_UID,
      client_secret: import.meta.env.VITE_REACT_APP_SECRET,
      code: getCookie(`code`),
      redirect_uri: "http://localhost:4000/main",
    };
    const response = await instance.post(`/oauth/token`, {}, { params });
    return response.data.access_token;
  } catch (e) {
    throw new Error();
  }
};

export const getTokenInfo = async () => {
  const headers = {
    Authorization: `Bearer ${getCookie("access_token")}`,
  };
  try {
    const response = await instance.get(`/oauth/token/info`, {
      headers: { Authorization: headers.Authorization },
    });
    console.log(response);
    return response;
  } catch (e) {
    throw new Error();
  }
};

export const getDatas = async () => {
  const url = import.meta.env.VITE_REACT_APP_CLOUD_DB;
  const dataArr: string[] = [];
  const result = await axios
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
      return dataArr.map((item) => {
        const obj: IPurchase = {
          id: "",
          transaction_id: "",
          user_id: "",
          intra_id: "",
          item: "",
          amount: "",
          create_at: new Date(),
          is_validated: "",
          validated_at: new Date(),
        };
        const dataString = item.split(" ");
        let i = 1;
        obj.id = dataString[i++];
        obj.transaction_id = dataString[i++];
        obj.user_id = dataString[i++];
        obj.intra_id = dataString[i++];
        obj.item =
          dataString[i] === "AWS" || dataString[i] === "NCP"
            ? dataString[i++]
            : `${dataString[i++]} ${dataString[i++]}`;
        obj.amount = dataString[i++];
        obj.create_at = convertDate(
          `${dataString[i++]} ${dataString[i++]} ${dataString[i++]} ${
            dataString[i++]
          } ${dataString[i++]}`
        );
        obj.is_validated = dataString[i++];
        obj.validated_at = convertDate(
          `${dataString[i++]} ${dataString[i++]} ${dataString[i++]} ${
            dataString[i++]
          } ${dataString[i]}`
        );
        return obj;
      });
    })
    .catch((e) => console.error(e));
  console.log(result);
  return result;
};

export const getEvents = async () => {
  const headers = {
    Authorization: `Bearer ${getCookie("access_token")}`,
  };
  try {
    const response = await instance.get(`/v2/campus/29/events`, {
      headers: { Authorization: headers.Authorization },
    });
    return response.data;
  } catch (e) {
    throw new Error();
  }
};
