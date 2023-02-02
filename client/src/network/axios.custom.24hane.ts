import { getCookie } from "../utils/cookie";
import { instance24hane, instance42 } from "./axios.instance";

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

export const getMonthlyLog = async (
  intraId: string,
  year: number,
  month: number
): Promise<any> => {
  const params = {
    year,
    month,
  };
  try {
    const response = await instance24hane.get(
      `/v1/tag-log/admin/permonth/${intraId}`,
      {
        params,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    throw new Error();
  }
};
